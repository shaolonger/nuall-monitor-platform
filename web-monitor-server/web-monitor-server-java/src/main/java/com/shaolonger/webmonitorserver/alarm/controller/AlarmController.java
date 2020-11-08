package com.shaolonger.webmonitorserver.alarm.controller;

import com.shaolonger.webmonitorserver.alarm.entity.AlarmEntity;
import com.shaolonger.webmonitorserver.alarm.service.AlarmService;
import com.shaolonger.webmonitorserver.common.api.ResponseResultBase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.ValidationException;

@RestController
public class AlarmController {

    @Autowired
    AlarmService alarmService;

    @RequestMapping(value = "/alarm/add", method = RequestMethod.PUT)
    public Object add(HttpServletRequest request, @Valid AlarmEntity alarmEntity, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder stringBuilder = new StringBuilder();
            for (ObjectError objectError : bindingResult.getAllErrors()) {
                stringBuilder.append(objectError.getDefaultMessage()).append(",");
            }
            throw new ValidationException(stringBuilder.deleteCharAt(stringBuilder.length() - 1).toString());
        } else {
            return ResponseResultBase.getResponseResultBase(alarmService.add(request, alarmEntity));
        }
    }
}