package v1

import (
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"web.monitor.com/global"
	"web.monitor.com/model/response"
	"web.monitor.com/model/validation"
	"web.monitor.com/service"
	"web.monitor.com/utils"
)

func AddUserRegisterRecord(c *gin.Context) {
	var r validation.AddUserRegisterRecord
	_ = c.Bind(&r)
	if err := utils.ValidateStruct(r); err != nil {
		global.WM_LOG.Error("注册失败", zap.Any("err", err))
		response.FailWithError(err, c)
	} else {
		// 保存实体
		if err, entity := service.AddUserRegisterRecord(r); err != nil {
			global.WM_LOG.Error("注册失败", zap.Any("err", err))
			response.FailWithError(err, c)
		} else {
			global.WM_LOG.Info("注册成功", zap.Any("entity", entity))
			response.SuccessWithData(entity, c)
		}
	}
}

func GetUserRegisterRecord(c *gin.Context) {
	var r validation.GetUserRegisterRecord
	_ = c.Bind(&r)
	if err := utils.ValidateStruct(r); err != nil {
		global.WM_LOG.Error("查询注册记录失败", zap.Any("err", err))
		response.FailWithError(err, c)
	} else {
		if err, data := service.GetUserRegisterRecord(r); err != nil {
			global.WM_LOG.Error("查询注册记录失败", zap.Any("err", err))
			response.FailWithError(err, c)
		} else {
			response.SuccessWithData(data, c)
		}
	}
}

func AuditUserRegisterRecord(c *gin.Context) {

}
