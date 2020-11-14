package com.monitor.web.project.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "pms_project")
@Data
public class ProjectEntity {
    /**
     * 主键
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    /**
     * 项目名
     */
    @NotEmpty(message = "projectName不能为空")
    private String projectName;

    /**
     * 项目标识
     */
    @NotEmpty(message = "projectIdentifier不能为空")
    private String projectIdentifier;

    /**
     * 项目描述
     */
    private String description;

    /**
     * 接入方式
     */
    @NotEmpty(message = "accessType不能为空")
    private String accessType;

    /**
     * 开启功能
     */
    private String activeFuncs;

    /**
     * 是否自动上报
     */
    @NotNull(message = "isAutoUpload不能为空")
    private Integer isAutoUpload;

    /**
     * 预警模块中的钉钉机器人access_token，用于预警模块中发送报警推送，多个用英文逗号隔开
     */
    private String notifyDtToken;

    /**
     * 预警模块中的邮件推送地址，多个用英文逗号隔开
     */
    private String notifyEmail;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;
}
