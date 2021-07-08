package v1

import (
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"web.monitor.com/global"
	"web.monitor.com/model/response"
	"web.monitor.com/model/validation"
	"web.monitor.com/service"
)

func AddProject(c *gin.Context) {
	var err error
	var r validation.AddProject
	// 因gin暂时还不支持从content-type: multipart/form-data中解析出array等复杂结构
	// ，因此这里暂时改为content-type: application/json的方式，跟java后台写的方案不一致
	err = c.ShouldBind(&r)
	if err != nil {
		global.WM_LOG.Error("新增项目失败", zap.Any("err", err))
		response.FailWithError(err, c)
		return
	}
	// 保存实体
	if err, entity := service.AddProject(r); err != nil {
		global.WM_LOG.Error("新增项目失败", zap.Any("err", err))
		response.FailWithError(err, c)
	} else {
		global.WM_LOG.Info("新增项目成功", zap.Any("entity", entity))
		response.SuccessWithData(entity, c)
	}
}

func GetProject(c *gin.Context) {
	var err error
	var r validation.GetProject
	err = c.ShouldBindQuery(&r)
	if err != nil {
		global.WM_LOG.Error("查询项目列表失败", zap.Any("err", err))
		response.FailWithError(err, c)
		return
	}
	err, data := service.GetProject(r)
	if err != nil {
		global.WM_LOG.Error("查询项目列表失败", zap.Any("err", err))
		response.FailWithError(err, c)
	} else {
		response.SuccessWithData(data, c)
	}
}
