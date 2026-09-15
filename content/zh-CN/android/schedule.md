---
docId: android-schedule
locale: zh-CN
title: Android 日程
description: 读取并设置设备日程。
platform: Android
slug: android/schedule
order: 132
status: published
version: v2.0
---

# Android 日程

读取并设置设备日程。

```kotlin
CreekManager.sInstance.getCalendar(model = {

  },failure = {
      code, message ->
  })

var operate =  Calendar.protocol_calendar_operate()
  var item = Calendar.calendar_item()
  item.startYear = 2025
  item.startMonth = 4
  item.startDay = 16
  item.startHour = 10
  item.startMinute = 0
  item.endYear = 2025
  item.endMonth = 4
  item.endDay = 16
  item.endHour = 11
  item.endMinute = 0
  item.content = ByteString.copyFrom("去开会".toByteArray())
  item.repeatTime = Enums.repeat_calendar_time.REPEAT_TIME_10MINUTES
  item.repeatDate = Enums.repeat_calendar_date.REPEAT_EVERY_DAY
  operate.calendarItemList.add(item)
  CreekManager.sInstance.setCalendar(operate, success = {
      
  }, failure = {
      code, message ->
  })
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
