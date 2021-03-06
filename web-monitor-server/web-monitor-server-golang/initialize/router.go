package initialize

import (
	"github.com/gin-gonic/gin"
	"web.monitor.com/global"
	"web.monitor.com/middleware"
	"web.monitor.com/router"
)

func Router() *gin.Engine {
	var Router = gin.Default()

	// 允许跨域 TODO
	// swagger TODO

	// 添加路由组前缀，方便为了多服务器上线使用
	// PublicGroup，即免权限校验的公开API
	PublicGroup := Router.Group("")
	{
		router.InitUserRouterPublic(PublicGroup)
		router.InitProjectRouterPublic(PublicGroup)
	}
	// PrivateGroup，即需要权限校验的私有API
	PrivateGroup := Router.Group("")
	PrivateGroup.Use(middleware.TokenAuth())
	{
		router.InitUserRouterPrivate(PrivateGroup)
		router.InitProjectRouterPrivate(PrivateGroup)
	}
	global.WM_LOG.Info("路由注册成功")
	return Router
}
