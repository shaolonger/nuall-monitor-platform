package service

import (
	"go.uber.org/zap"
	"math"
	"strconv"
	"time"
	"web.monitor.com/global"
	"web.monitor.com/model"
	"web.monitor.com/model/response"
	"web.monitor.com/model/validation"
)

func AddProject(r validation.AddProject) (err error, data interface{}) {
	var project model.PmsProject
	var userList []*model.UmsUser
	db := global.WM_DB.Model(&model.PmsProject{})

	// 保存关联关系
	err, userList = GetUserListByUserIdList(r.UserList)
	if err != nil {
		global.WM_LOG.Error("查询用户列表失败", zap.Any("err", err))
		return err, nil
	}

	// 保存实体
	project = model.PmsProject{
		ProjectName:       r.ProjectName,
		ProjectIdentifier: r.ProjectIdentifier,
		Description:       r.Description,
		AccessType:        r.AccessType,
		ActiveFuncs:       r.ActiveFuncs,
		IsAutoUpload:      r.IsAutoUpload,
		CreateTime:        time.Now(),
		UpdateTime:        time.Now(),
		NotifyDtToken:     r.NotifyDtToken,
		NotifyEmail:       r.NotifyEmail,
		UmsUsers:          userList,
	}
	err = db.Create(&project).Error
	if err != nil {
		global.WM_LOG.Error("保存项目实体失败", zap.Any("err", err))
		return err, nil
	}
	return nil, project
}

func GetProject(r validation.GetProject) (err error, data interface{}) {
	var projects []model.PmsProject
	var records []response.ProjectListItem
	db := global.WM_DB.Model(&model.PmsProject{})
	var totalNum int64
	limit := r.PageSize
	offset := limit * (r.PageNum - 1)
	// 项目名称
	if r.ProjectName != "" {
		db = db.Where("`project_name` like ?", "%"+r.ProjectName+"%")
	}
	err = db.Count(&totalNum).Error
	err = db.Limit(limit).Offset(offset).Preload("UmsUsers").Find(&projects).Error
	if err != nil {
		return err, nil
	}
	for _, project := range projects {
		var userList string
		if len(project.UmsUsers) > 0 {
			for _, umsUser := range project.UmsUsers {
				userList = userList + strconv.FormatUint(umsUser.Id, 10) + ","
			}
		}
		records = append(records, response.ProjectListItem{
			Id:                project.Id,
			ProjectName:       project.ProjectName,
			ProjectIdentifier: project.ProjectIdentifier,
			Description:       project.Description,
			CreateTime:        project.CreateTime,
			UpdateTime:        project.UpdateTime,
			UserList:          userList,
		})
	}
	data = map[string]interface{}{
		"totalNum":  totalNum,
		"totalPage": math.Ceil(float64(totalNum) / float64(r.PageSize)),
		"pageNum":   r.PageNum,
		"pageSize":  r.PageSize,
		"records":   records,
	}
	return err, data
}
