/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2020/11/13 17:16:36                          */
/*==============================================================*/


drop table if exists ams_alarm;

drop table if exists ams_alarm_record;

drop table if exists ams_subscriber;

drop table if exists lms_client_user;

drop table if exists lms_custom_error_log;

drop table if exists lms_http_error_log;

drop table if exists lms_js_error_log;

drop table if exists lms_resource_load_error_log;

drop table if exists pms_project;

drop table if exists ums_user;

drop table if exists ums_user_project_relation;

drop table if exists ums_user_register_record;

/*==============================================================*/
/* Table: ams_alarm                                             */
/*==============================================================*/
create table ams_alarm
(
   id                   bigint not null auto_increment comment 'ID',
   name                 varchar(100) not null default "" comment '预警名称',
   level                tinyint(1) not null default 0 comment '报警等级，-1-P4低，0-P3中，1-P2高，2-P1紧急',
   category             tinyint(1) not null default 0 comment '过滤条件。0-全部，1-JS_ERROR，2-HTTP_ERROR，3-RESOURCE_LOAD，4-CUSTOM_ERROR',
   rule                 varchar(255) not null default "" comment '预警规则，存放JSON格式',
   start_time           char(8) not null default "" comment '报警时段-开始时间，例如00:00:00',
   end_time             char(8) not null default "" comment '报警时段-结束时间，例如23:59:59',
   silent_period        tinyint(1) not null default 0 comment '静默期，0-不静默，1-5分钟，2-10分钟，3-15分钟，4-30分钟，5-1小时，6-3小时，7-12小时，8-24小时，9-当天',
   is_active            tinyint(1) not null default 0 comment '是否启用，0-否，1-是',
   create_time          datetime not null default CURRENT_TIMESTAMP comment '创建时间，格式yyyy-MM-dd HH:mm:ss',
   update_time          datetime not null default CURRENT_TIMESTAMP comment '更新时间，格式yyyy-MM-dd HH:mm:ss',
   create_by            bigint not null comment '创建人ID',
   project_identifier   varchar(200) not null default "" comment '项目标识',
   is_deleted           tinyint(1) not null default 0 comment '是否已被删除，0-否，1-是',
   primary key (id)
);

alter table ams_alarm comment '预警规则表';

/*==============================================================*/
/* Table: ams_alarm_record                                      */
/*==============================================================*/
create table ams_alarm_record
(
   id                   bigint not null auto_increment comment '唯一自增主键',
   alarm_id             bigint not null default 0 comment '预警规则id',
   alarm_data           text not null default NULL comment '报警内容，格式为JSON字符串',
   create_time          datetime not null default CURRENT_TIMESTAMP comment '创建时间，格式为yyyy-MM-dd HH:mm:ss',
   notice_time          datetime default NULL comment '通知时间，格式为yyyy-MM-dd HH:mm:ss',
   state                tinyint(1) not null default 0 comment '预警状态，1-已创建未通知，2-已通知',
   primary key (id)
);

alter table ams_alarm_record comment '报警记录表';

/*==============================================================*/
/* Table: ams_subscriber                                        */
/*==============================================================*/
create table ams_subscriber
(
   id                   bigint not null auto_increment comment '唯一自增主键',
   alarm_id             bigint not null comment '预警规则id',
   subscriber           text default NULL comment '报警订阅方，内容为JSON格式，例如"[]"。
            1、若订阅方式为钉钉，则内容为钉钉的机器人Webhook的access_token
            2、若为邮件定于，则内容为邮件地址',
   is_active            tinyint(1) not null default 0 comment '是否启用，0-否，1-是',
   category             tinyint(1) not null default 1 comment '订阅类型，1-钉钉机器人，2-邮箱',
   primary key (id)
);

alter table ams_subscriber comment '预警订阅通知表';

/*==============================================================*/
/* Table: lms_client_user                                       */
/*==============================================================*/
create table lms_client_user
(
   id                   bigint not null auto_increment comment 'ID',
   c_uuid               char(36) not null default "" comment '客户端唯一识别码，全称client uuid',
   b_uid                bigint not null default 0 comment '业务用户ID',
   b_uname              varchar(64) not null default "" comment '业务用户名',
   create_time          datetime not null default CURRENT_TIMESTAMP comment '创建时间',
   update_time          datetime not null default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment '更新时间',
   primary key (id)
);

alter table lms_client_user comment '日志客户端用户表';

/*==============================================================*/
/* Table: lms_custom_error_log                                  */
/*==============================================================*/
create table lms_custom_error_log
(
   id                   bigint not null comment 'ID',
   log_type             varchar(50) not null comment '日志类型',
   project_identifier   varchar(200) not null comment '关联的项目标识',
   create_time          datetime not null comment '创建时间',
   c_uuid               char(36) not null default "" comment '客户端唯一识别码，全称client uuid',
   b_uid                bigint comment '业务用户ID',
   b_uname              varchar(64) default "" comment '业务用户名',
   page_url             text comment '页面URL',
   page_key             varchar(50) default "" comment '页面关键字',
   device_name          varchar(100) default "" comment '设备名',
   os                   varchar(20) default "" comment '操作系统',
   os_version           varchar(20) comment '操作系统版本',
   browser_name         varchar(20) default "" comment '浏览器名',
   browser_version      varchar(20) comment '浏览器版本',
   ip_address           varchar(50) default "" comment 'IP地址',
   address              varchar(100) comment '地址',
   net_type             varchar(10) comment '网络类型',
   error_type           varchar(30) default "" comment '错误类型',
   error_message        text not null comment '错误信息',
   error_stack          text comment '错误堆栈信息',
   primary key (id)
);

alter table lms_custom_error_log comment '自定义异常日志表';

/*==============================================================*/
/* Table: lms_http_error_log                                    */
/*==============================================================*/
create table lms_http_error_log
(
   id                   bigint not null comment 'ID',
   log_type             varchar(50) not null comment '日志类型',
   project_identifier   varchar(200) not null comment '关联的项目标识',
   create_time          datetime not null comment '创建时间',
   c_uuid               char(36) not null default "" comment '客户端唯一识别码，全称client uuid',
   b_uid                bigint comment '业务用户ID',
   b_uname              varchar(64) default "" comment '业务用户名',
   page_url             text comment '页面URL',
   page_key             varchar(50) default "" comment '页面关键字',
   device_name          varchar(100) default "" comment '设备名',
   os                   varchar(20) default "" comment '操作系统',
   os_version           varchar(20) comment '操作系统版本',
   browser_name         varchar(20) default "" comment '浏览器名',
   browser_version      varchar(20) comment '浏览器版本',
   ip_address           varchar(50) default "" comment 'IP地址',
   address              varchar(100) comment '地址',
   net_type             varchar(10) comment '网络类型',
   http_type            varchar(20) default "" comment 'http请求类型，如"request"、"response"',
   http_url_complete    text not null comment '完整的http请求地址',
   http_url_short       text comment '缩写的http请求地址',
   status               varchar(20) not null comment '请求状态',
   status_text          varchar(50) default "" comment '请求状态文字描述',
   res_time             varchar(13) default "" comment '响应时间',
   primary key (id)
);

alter table lms_http_error_log comment 'HTTP异常日志表';

/*==============================================================*/
/* Table: lms_js_error_log                                      */
/*==============================================================*/
create table lms_js_error_log
(
   id                   bigint not null comment 'ID',
   log_type             varchar(50) not null comment '日志类型',
   project_identifier   varchar(200) not null comment '关联的项目标识',
   create_time          datetime not null comment '创建时间',
   c_uuid               char(36) not null default "" comment '客户端唯一识别码，全称client uuid',
   b_uid                bigint comment '业务用户ID',
   b_uname              varchar(64) default "" comment '业务用户名',
   page_url             text comment '页面URL',
   page_key             varchar(50) default "" comment '页面关键字',
   device_name          varchar(100) default "" comment '设备名',
   os                   varchar(20) default "" comment '操作系统',
   os_version           varchar(20) comment '操作系统版本',
   browser_name         varchar(20) default "" comment '浏览器名',
   browser_version      varchar(20) comment '浏览器版本',
   ip_address           varchar(50) default "" comment 'IP地址',
   address              varchar(100) comment '地址',
   net_type             varchar(10) comment '网络类型',
   error_type           varchar(30) default "" comment '错误类型',
   error_message        text not null comment '错误信息',
   error_stack          text comment '错误堆栈信息',
   primary key (id)
);

alter table lms_js_error_log comment 'JS异常日志表';

/*==============================================================*/
/* Table: lms_resource_load_error_log                           */
/*==============================================================*/
create table lms_resource_load_error_log
(
   id                   bigint not null comment 'ID',
   log_type             varchar(50) not null comment '日志类型',
   project_identifier   varchar(200) not null comment '关联的项目标识',
   create_time          datetime not null comment '创建时间',
   c_uuid               char(36) not null default "" comment '客户端唯一识别码，全称client uuid',
   b_uid                bigint comment '业务用户ID',
   b_uname              varchar(64) default "" comment '业务用户名',
   page_url             text comment '页面URL',
   page_key             varchar(50) default "" comment '页面关键字',
   device_name          varchar(100) default "" comment '设备名',
   os                   varchar(20) default "" comment '操作系统',
   os_version           varchar(20) comment '操作系统版本',
   browser_name         varchar(20) default "" comment '浏览器名',
   browser_version      varchar(20) comment '浏览器版本',
   ip_address           varchar(50) default "" comment 'IP地址',
   address              varchar(100) comment '地址',
   net_type             varchar(10) comment '网络类型',
   resource_url         text not null comment '资源URL',
   resource_type        varchar(20) not null comment '资源类型',
   status               varchar(1) not null comment '加载状态',
   primary key (id)
);

alter table lms_resource_load_error_log comment '资源加载异常日志表';

/*==============================================================*/
/* Table: pms_project                                           */
/*==============================================================*/
create table pms_project
(
   id                   bigint not null auto_increment comment 'ID',
   project_name         varchar(100) not null comment '项目名',
   project_identifier   varchar(200) not null comment '项目标识符',
   description          varchar(200) default "" comment '项目描述',
   access_type          varchar(20) not null comment '接入类型，script、npm',
   active_funcs         varchar(100) comment '开启功能，JS异常、HTTP异常、静态资源异常、自定义异常',
   is_auto_upload       tinyint(1) not null default 1 comment '是否自动上报，0-否，1-是',
   create_time          datetime not null comment '创建时间',
   update_time          datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment '更新时间',
   primary key (id),
   unique key AK_Key_2 (project_identifier)
);

alter table pms_project comment '项目表';

/*==============================================================*/
/* Table: ums_user                                              */
/*==============================================================*/
create table ums_user
(
   id                   bigint not null auto_increment comment 'ID',
   username             varchar(64) not null comment '用户名',
   password             varchar(64) not null comment '密码',
   phone                varchar(64) default "" comment '电话',
   icon                 varchar(500) default "" comment '头像',
   gender               tinyint(1) default 0 comment '性别，0-未知，1-男，2-女',
   email                varchar(100) not null comment '邮箱',
   is_admin             tinyint(1) not null default 0 comment '是否超级管理员，0-否，1-是',
   create_time          datetime not null comment '创建时间',
   update_time          datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment '更新时间',
   primary key (id)
);

alter table ums_user comment '用户表';

/*==============================================================*/
/* Table: ums_user_project_relation                             */
/*==============================================================*/
create table ums_user_project_relation
(
   id                   bigint not null auto_increment comment 'ID',
   user_id              bigint not null comment '关联的用户ID',
   project_id           bigint not null comment '关联的项目ID',
   primary key (id)
);

alter table ums_user_project_relation comment '用户与项目的关系表';

/*==============================================================*/
/* Table: ums_user_register_record                              */
/*==============================================================*/
create table ums_user_register_record
(
   id                   bigint not null auto_increment comment 'ID',
   username             varchar(64) not null comment '用户名',
   password             varchar(64) not null comment '密码',
   email                varchar(100) not null comment '邮箱',
   phone                varchar(64) default "" comment '电话',
   icon                 varchar(500) default "" comment '头像',
   gender               tinyint(1) default 0 comment '性别，0-未知，1-男，2-女',
   create_time          datetime not null comment '创建时间',
   update_time          datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment '更新时间',
   audit_user           bigint default 0 comment '审批人',
   audit_result         tinyint(1) default -1 comment '审批结果，-1-未审核，0-不通过，1-通过',
   primary key (id)
);

alter table ums_user_register_record comment '用户表注册记录表';

