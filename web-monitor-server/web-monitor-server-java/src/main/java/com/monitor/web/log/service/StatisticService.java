package com.monitor.web.log.service;

import com.monitor.web.log.vo.StatisticRecordVO;
import com.monitor.web.project.entity.ProjectEntity;
import com.monitor.web.user.service.UserService;
import com.monitor.web.utils.DataConvertUtils;
import com.monitor.web.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Service
public class StatisticService {

    @Autowired
    UserService userService;
    @Autowired
    JsErrorLogService jsErrorLogService;
    @Autowired
    HttpErrorLogService httpErrorLogService;
    @Autowired
    ResourceLoadErrorLogService resourceLoadErrorLogService;
    @Autowired
    CustomErrorLogService customErrorLogService;

    /**
     * 获取总览统计信息
     *
     * @param request request
     * @return Object
     */
    public Object getOverallByTimeRangeByRequest(HttpServletRequest request) throws Exception {

        // 获取查询参数
        String projectIdentifier = request.getParameter("projectIdentifier");
        Date startTime = DateUtils.strToDate(request.getParameter("startTime"), "yyyy-MM-dd HH:mm:ss");
        Date endTime = DateUtils.strToDate(request.getParameter("endTime"), "yyyy-MM-dd HH:mm:ss");

        // 校验参数
        if (StringUtils.isEmpty(projectIdentifier)) throw new Exception("projectIdentifier错误");
        if (startTime == null || endTime == null) throw new Exception("startTime或endTime不能为空");

        return this.getOverallByTimeRange(projectIdentifier, startTime, endTime);
    }

    /**
     * 按小时间隔，获取各小时内的日志数量
     *
     * @param request request
     * @return Object
     */
    public Object getLogCountByHours(HttpServletRequest request) throws Exception {
        // 获取查询参数
        Date startTime = DateUtils.strToDate(request.getParameter("startTime"), "yyyy-MM-dd HH:mm:ss");
        Date endTime = DateUtils.strToDate(request.getParameter("endTime"), "yyyy-MM-dd HH:mm:ss");
        String logType = request.getParameter("logType");
        String projectIdentifier = request.getParameter("projectIdentifier");

        // 校验参数
        if (startTime == null || endTime == null) throw new Exception("startTime或endTime不能为空");
        if (StringUtils.isEmpty(logType)) throw new Exception("logType错误");
        if (StringUtils.isEmpty(projectIdentifier)) throw new Exception("projectIdentifier错误");

        Map<String, Map<String, Object>> resultMap = new HashMap<>();
        long hoursGap = DateUtils.getHoursBetweenDateRange(startTime, endTime);
        Map<String, Object> nowMap = new LinkedHashMap<>(); // 现在的数据
        Map<String, Object> agoMap = new LinkedHashMap<>(); // 七天前的数据

        for (long i = 0; i < hoursGap; i++) {
            Date nowtStartDate = DateUtils.strToDate(request.getParameter("startTime"), "yyyy-MM-dd HH:mm:ss");
            Date agoStartDate = DateUtils.strToDate(request.getParameter("startTime"), "yyyy-MM-dd HH:mm:ss");
            nowtStartDate.setTime(nowtStartDate.getTime() + (i + 1) * 3600 * 1000);
            agoStartDate.setTime(agoStartDate.getTime() + (i + 1) * 3600 * 1000 - 7 * 24 * 3600 * 1000);
            nowMap.put(DateUtils.dateToStr(nowtStartDate, "yyyy-MM-dd HH"), 0);
            agoMap.put(DateUtils.dateToStr(agoStartDate, "yyyy-MM-dd HH"), 0);
        }

        List<Map<String, Object>> nowSearchList = null;
        List<Map<String, Object>> agoSearchList = null;
        Date agoStartTime = DateUtils.getDateBeforeOrAfterByDays(startTime, -7);
        Date agoEndTime = DateUtils.getDateBeforeOrAfterByDays(endTime, -7);

        switch (logType) {
            case "jsErrorLog":
                nowSearchList = jsErrorLogService.getLogCountByHours(startTime, endTime, projectIdentifier);
                agoSearchList = jsErrorLogService.getLogCountByHours(agoStartTime, agoEndTime, projectIdentifier);
                break;
            case "httpErrorLog":
                nowSearchList = httpErrorLogService.getLogCountByHours(startTime, endTime, projectIdentifier);
                agoSearchList = httpErrorLogService.getLogCountByHours(agoStartTime, agoEndTime, projectIdentifier);
                break;
            case "resourceLoadErrorLog":
                nowSearchList = resourceLoadErrorLogService.getLogCountByHours(startTime, endTime, projectIdentifier);
                agoSearchList = resourceLoadErrorLogService.getLogCountByHours(agoStartTime, agoEndTime, projectIdentifier);
                break;
            case "customErrorLog":
                nowSearchList = customErrorLogService.getLogCountByHours(startTime, endTime, projectIdentifier);
                agoSearchList = customErrorLogService.getLogCountByHours(agoStartTime, agoEndTime, projectIdentifier);
                break;
            default:
                break;
        }
        if (nowSearchList != null && agoSearchList != null) {
            for (Map<String, Object> map : nowSearchList) {
                nowMap.put((String) map.get("hour"), map.get("count"));
            }
            for (Map<String, Object> map : agoSearchList) {
                agoMap.put((String) map.get("hour"), map.get("count"));
            }
        }

        resultMap.put("now", nowMap);
        resultMap.put("ago", agoMap);

        return resultMap;
    }

    /**
     * 按天间隔，获取各天内的日志数量
     *
     * @param request request
     * @return Object
     */
    public Object getLogCountByDays(HttpServletRequest request) throws Exception {

        // 获取查询参数
        Date startTime = DateUtils.strToDate(request.getParameter("startTime"), "yyyy-MM-dd");
        Date endTime = DateUtils.strToDate(request.getParameter("endTime"), "yyyy-MM-dd");
        String logType = request.getParameter("logType");
        String projectIdentifier = request.getParameter("projectIdentifier");

        // 校验参数
        if (startTime == null || endTime == null) throw new Exception("startTime或endTime不能为空");
        if (StringUtils.isEmpty(logType)) throw new Exception("logType错误");
        if (StringUtils.isEmpty(projectIdentifier)) throw new Exception("projectIdentifier错误");

        long daysGap = DateUtils.getDaysBetweenDateRange(startTime, endTime);
        Map<String, Object> resultMap = new LinkedHashMap<>();

        for (long i = 0; i < daysGap + 1; i++) {
            Date nowtStartDate = DateUtils.strToDate(request.getParameter("startTime"), "yyyy-MM-dd");
            nowtStartDate.setTime(nowtStartDate.getTime() + i * 24 * 3600 * 1000);
            resultMap.put(DateUtils.dateToStr(nowtStartDate, "yyyy-MM-dd"), 0);
        }

        List<Map<String, Object>> searchList = null;

        switch (logType) {
            case "jsErrorLog":
                searchList = jsErrorLogService.getLogCountByDays(startTime, endTime, projectIdentifier);
                break;
            case "httpErrorLog":
                searchList = httpErrorLogService.getLogCountByDays(startTime, endTime, projectIdentifier);
                break;
            case "resourceLoadErrorLog":
                searchList = resourceLoadErrorLogService.getLogCountByDays(startTime, endTime, projectIdentifier);
                break;
            case "customErrorLog":
                searchList = customErrorLogService.getLogCountByDays(startTime, endTime, projectIdentifier);
                break;
            default:
                break;
        }
        if (searchList != null) {
            for (Map<String, Object> map : searchList) {
                resultMap.put((String) map.get("day"), map.get("count"));
            }
        }

        return resultMap;
    }

    /**
     * 获取两个日期之间的对比数据
     *
     * @param request request
     * @return Object
     */
    public Object getLogCountBetweenDiffDate(HttpServletRequest request) throws Exception {

        // 获取查询参数
        String projectIdentifier = request.getParameter("projectIdentifier");
        Date startTime = DateUtils.strToDate(request.getParameter("startTime"), "yyyy-MM-dd HH:mm:ss");
        Date endTime = DateUtils.strToDate(request.getParameter("endTime"), "yyyy-MM-dd HH:mm:ss");
        String logTypeList = request.getParameter("logTypeList");
        String indicatorList = request.getParameter("indicatorList");
        int timeInterval = DataConvertUtils.strToInt(request.getParameter("timeInterval"));

        // 校验参数
        if (StringUtils.isEmpty(projectIdentifier)) throw new Exception("projectIdentifier错误");
        if (startTime == null || endTime == null) throw new Exception("startTime或endTime不能为空");
        if (StringUtils.isEmpty(logTypeList)) throw new Exception("logTypeList不能为空");
        if (StringUtils.isEmpty(indicatorList)) throw new Exception("indicatorList不能为空");
        if (timeInterval < 60) throw new Exception("timeInterval不能为空或不能小于60");

        String[] logTypeLists = logTypeList.split(",");
        if (logTypeLists.length == 0) throw new Exception("logTypeList格式错误，要以,隔开");
        String[] indicatorLists = indicatorList.split(",");
        if (indicatorLists.length == 0) throw new Exception("indicatorList格式错误，要以,隔开");

        Map<String, Object> resultMap = new HashMap<>();
        for (String logType : logTypeLists) {

            List<Map<String, Object>> originResultList = new ArrayList<>();
            switch (logType) {
                case "jsErrorLog":
                    originResultList = jsErrorLogService.getLogListByCreateTimeAndProjectIdentifier(projectIdentifier, startTime, endTime);
                    break;
                case "httpErrorLog":
                    originResultList = httpErrorLogService.getLogListByCreateTimeAndProjectIdentifier(projectIdentifier, startTime, endTime);
                    break;
                case "resourceLoadErrorLog":
                    originResultList = resourceLoadErrorLogService.getLogListByCreateTimeAndProjectIdentifier(projectIdentifier, startTime, endTime);
                    break;
                case "customErrorLog":
                    originResultList = customErrorLogService.getLogListByCreateTimeAndProjectIdentifier(projectIdentifier, startTime, endTime);
                    break;
                default:
                    break;
            }
            long countGap = DateUtils.getCountBetweenDateRange(startTime, endTime, timeInterval);
            int i = 0;
            Date startDate = null;
            Date endDate = null;
            LinkedHashMap<String, List<Map<String, Object>>> tempMap = new LinkedHashMap<>();
            while (i < countGap) {
                if (startDate == null) {
                    startDate = DateUtils.strToDate(request.getParameter("startTime"), "yyyy-MM-dd HH:mm:ss");
                } else {
                    startDate.setTime(startDate.getTime() + timeInterval * 1000);
                }
                if (endDate == null) {
                    endDate = new Date(startDate.getTime() + (i + 1) * timeInterval * 1000);
                } else {
                    endDate.setTime(endDate.getTime() + timeInterval * 1000);
                }
                String startDateStr = DateUtils.dateToStr(startDate, "yyyy-MM-dd HH:mm:ss");
                List<Map<String, Object>> tempList = tempMap.get(startDateStr);
                if (tempList == null) {
                    tempList = new LinkedList<>();
                }
                Iterator<Map<String, Object>> iterator = originResultList.iterator();
                while (iterator.hasNext()) {
                    Map<String, Object> item = iterator.next();
                    Date createTime = (Date) item.get("create_time");
                    if (createTime.after(startDate) && createTime.before(endDate)) {
                        tempList.add(item);
                        iterator.remove();
                    }
                }
                tempMap.put(startDateStr, tempList);
                i++;
            }

            List<HashMap<String, Object>> logTypeResultList = new LinkedList<>();
            List<String> indicatorListArr = Arrays.asList(indicatorLists);
            tempMap.keySet().forEach(key -> {
                List<Map<String, Object>> list = tempMap.get(key);
                HashMap<String, Object> dataMap = new HashMap<>();
                dataMap.put("key", key);

                // 计算count，日志数量
                if (indicatorListArr.contains("count")) {
                    int count = list.size();
                    dataMap.put("count", count);
                }

                // 计算uv，影响的用户数
                if (indicatorListArr.contains("uv")) {
                    HashSet<String> tempSet = new HashSet<>();
                    list.forEach(item -> {
                        String cUuid = (String) item.get("c_uuid");
                        tempSet.add(cUuid);
                    });
                    int uv = tempSet.size();
                    dataMap.put("uv", uv);
                }

                logTypeResultList.add(dataMap);
            });
            resultMap.put(logType, logTypeResultList);
        }
        return resultMap;
    }

    /**
     * 获取两个日期之间的设备、操作系统、浏览器、网络类型的统计数据
     *
     * @param request request
     * @return Object
     */
    public Object getLogDistributionBetweenDiffDate(HttpServletRequest request) throws Exception {

        // 获取查询参数
        String projectIdentifier = request.getParameter("projectIdentifier");
        Date startTime = DateUtils.strToDate(request.getParameter("startTime"), "yyyy-MM-dd HH:mm:ss");
        Date endTime = DateUtils.strToDate(request.getParameter("endTime"), "yyyy-MM-dd HH:mm:ss");
        String logType = request.getParameter("logType");
        String indicator = request.getParameter("indicator");

        // 校验参数
        if (StringUtils.isEmpty(projectIdentifier)) throw new Exception("projectIdentifier错误");
        if (startTime == null || endTime == null) throw new Exception("startTime或endTime不能为空");
        if (StringUtils.isEmpty(logType)) throw new Exception("logType不能为空");
        if (StringUtils.isEmpty(indicator)) throw new Exception("indicator不能为空");
        ArrayList<String> indicatorLegalList = new ArrayList<String>() {{
            add("net_type"); // 网络类型
            add("device_name"); // 设备类型
            add("os"); // 操作系统
            add("browser_name"); // 浏览器
            add("status"); // 状态码
            add("resource_type"); // 资源类型
        }};
        if (!indicatorLegalList.contains(indicator)) throw new Exception("indicator不合法");

        List<Map<String, Object>> rawResultList = new ArrayList<>();
        ArrayList<HashMap<String, Object>> resultList = new ArrayList<>();

        switch (logType) {
            case "jsErrorLog":
                rawResultList = jsErrorLogService.getAllLogsBetweenStartTimeAndEndTime(projectIdentifier, startTime, endTime);
                break;
            case "httpErrorLog":
                rawResultList = httpErrorLogService.getAllLogsBetweenStartTimeAndEndTime(projectIdentifier, startTime, endTime);
                break;
            case "resourceLoadErrorLog":
                rawResultList = resourceLoadErrorLogService.getAllLogsBetweenStartTimeAndEndTime(projectIdentifier, startTime, endTime);
                break;
            case "customErrorLog":
                rawResultList = customErrorLogService.getAllLogsBetweenStartTimeAndEndTime(projectIdentifier, startTime, endTime);
                break;
            default:
                break;
        }

        if (rawResultList.size() > 0) {
            rawResultList.forEach(item -> {
                String tempKey = (String) item.get(indicator);
                String key = tempKey == null ? "null" : tempKey;
                HashMap<String, Object> map = resultList.stream().filter(resultItem -> key.equals(resultItem.get("key"))).findFirst().orElse(null);
                if (map != null) {
                    Integer value = (Integer) map.get("count");
                    map.put("count", value + 1);
                } else {
                    map = new HashMap<>();
                    map.put("key", key);
                    map.put("count", 1);
                    resultList.add(map);
                }
            });
        }

        return resultList;
    }

    /**
     * 获取用户关联的所有项目的统计情况列表
     *
     * @param request request
     * @return Object
     */
    public Object getAllProjectOverviewListBetweenDiffDate(HttpServletRequest request) throws Exception {

        // 获取查询参数
        Date startTime = DateUtils.strToDate(request.getParameter("startTime"), "yyyy-MM-dd HH:mm:ss");
        Date endTime = DateUtils.strToDate(request.getParameter("endTime"), "yyyy-MM-dd HH:mm:ss");

        // 校验参数
        if (startTime == null || endTime == null) throw new Exception("startTime或endTime不能为空");

        ArrayList<HashMap<String, Object>> resultList = new ArrayList<>();

        // 根据用户获取关联的项目
        List<ProjectEntity> projectEntityList = userService.getRelatedProjectListByRequest(request);
        if (projectEntityList.size() > 0) {
            projectEntityList.forEach(projectEntity -> {
                String projectIdentifier = projectEntity.getProjectIdentifier();
                HashMap<String, Object> resultMap = new HashMap<>();
                HashMap<String, Integer> overviewMap = this.getOverallByTimeRange(projectIdentifier, startTime, endTime);
                resultMap.put("projectId", projectEntity.getId());
                resultMap.put("projectName", projectEntity.getProjectName());
                resultMap.put("projectIdentifier", projectEntity.getProjectIdentifier());
                resultMap.put("data", overviewMap);
                resultList.add(resultMap);
            });
        }
        return resultList;
    }

    /**
     * 获取总览统计信息
     *
     * @param projectIdentifier 项目标识
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @return HashMap
     * @throws Exception
     */
    public HashMap<String, Integer> getOverallByTimeRange(String projectIdentifier, Date startTime, Date endTime) {

        int customErrorLogCount = customErrorLogService.getCountByIdBetweenStartTimeAndEndTime(projectIdentifier, startTime, endTime);
        int httpErrorLogCount = httpErrorLogService.getCountByIdBetweenStartTimeAndEndTime(projectIdentifier, startTime, endTime);
        int jsErrorLogCount = jsErrorLogService.getCountByIdBetweenStartTimeAndEndTime(projectIdentifier, startTime, endTime);
        int resourceLoadErrorLogCount = resourceLoadErrorLogService.getCountByIdBetweenStartTimeAndEndTime(projectIdentifier, startTime, endTime);

        HashMap<String, Integer> resultMap = new HashMap<>();
        resultMap.put("customErrorLogCount", customErrorLogCount);
        resultMap.put("httpErrorLogCount", httpErrorLogCount);
        resultMap.put("jsErrorLogCount", jsErrorLogCount);
        resultMap.put("resourceLoadErrorLogCount", resourceLoadErrorLogCount);

        return resultMap;
    }

    /**
     * entity转vo
     *
     * @param list 列表
     * @return List
     */
    public List<StatisticRecordVO> getStatisticListVO(List list) {
        ArrayList<StatisticRecordVO> returnList = new ArrayList<>();
        for (Object listItem : list) {
            StatisticRecordVO recordVO = new StatisticRecordVO();
            Object[] item = (Object[]) listItem;
            // count
            recordVO.setCount(Integer.parseInt(item[0].toString()));
            // latestRecordTime
            recordVO.setLatestRecordTime((Date) item[1]);
            // affectUserCount
            recordVO.setAffectUserCount(Integer.parseInt(item[2].toString()));
            // errorMessage
            recordVO.setErrorMessage((String) item[3]);
            returnList.add(recordVO);
        }
        return returnList;
    }
}
