---
docId: android-system-device-schedules
locale: zh-CN
title: Android 系统与设备日程
description: 将系统日程或应用日程写入设备。
platform: Android
slug: android/system-device-schedules
order: 11
status: published
version: v2.0
---

# Android 系统与设备日程

将系统日程或应用日程写入设备。

逻辑：1、当天之前30天和后60天的系统日程，对比手表，手表没有就写入

            2、获取手表日程对比系统日程，系统没有，写到系统

            3、自定义多少分钟进行检查一次

```xml
<uses-permission android:name="android.permission.READ_CALENDAR"/>
<uses-permission android:name="android.permission.WRITE_CALENDAR"/>
```

```kotlin
///配置轮询时间，写到系统的日程名称。 
 ///isSupport是用来做测试的， 手表功能表如果是正确的，不需要设置。需要设置的情况下，需要和我这边沟通
CreekManager.sInstance.calendarConfig(timerMinute = 10, systemCalendarName = "CREEK", isSupport = true, model = {
    msg ->
    Log.w("calendarConfig", msg)
})

  ///主动去同步日历
CreekManager.sInstance.syncCalendar()
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";

enum repeat_calendar_date
{
    REPEAT_NULL = 0;
    REPEAT_EVERY_DAY = 1;
    REPEAT_EVERY_WEEK = 2;
    REPEAT_EVERY_MONTH = 3;
    REPEAT_EVERY_YEAR = 4;
}

enum repeat_calendar_time
{
    REPEAT_TIME_NULL = 0;
    REPEAT_TIME_5MINUTES = 1;
    REPEAT_TIME_10MINUTES = 2;
    REPEAT_TIME_15MINUTES = 3;
    REPEAT_TIME_30MINUTES = 4;
    REPEAT_TIME_1HOUR = 5;
    REPEAT_TIME_2HOUR = 6;
    REPEAT_TIME_1DAY = 7;
}

message calendar_item
{
    uint32 id = 1;//日程id
    uint32 start_year = 2;//2bytes开始日期
    uint32 start_month = 3;//1bytes 
    uint32 start_day = 4;//1bytes 
    uint32 start_hour = 5;//1bytes 
    uint32 start_minute = 6;//1bytes 
    uint32 end_year = 7;//2bytes结束年
    uint32 end_month = 8;//1bytes 
    uint32 end_day = 9;//1bytes 
    uint32 end_hour = 10;//1bytes 
    uint32 end_minute = 11;//1bytes 
    bool all_day = 12;
    repeat_calendar_date repeat_date = 13; //1bytes 支持无、每天、每周、每月、每年
    repeat_calendar_time repeat_time = 14;//支持不提醒，5分钟、10分钟、15分钟、30分钟、1小时、2小时，1天
    bytes content = 15;//max:50 内容
};

message protocol_calendar_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    repeated calendar_item calendar_item = 2;
}

message protocol_calendar_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 func_table = 2;//1bytes 功能表
    uint32 calendar_support_max = 3; //1bytes 日程支持最大数量
    repeated calendar_item calendar_item = 4;
}
```

### `func_table` 位说明

| bit位 | 说明 |
|-|-|
| 0 | 是否支持日程设置全天提醒重复类型 all_day_type |
| 1 | 是否支持日程自定义设置重复类型功能 repeat_custom & custom_type |
