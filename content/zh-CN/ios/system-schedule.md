---
docId: ios-system-schedule
locale: zh-CN
title: iOS 系统日程与手表日程
description: 读取系统日程并写入手表日程。
platform: iOS
slug: ios/system-schedule
order: 11
status: published
version: v2.0
---

# iOS 系统日程与手表日程

## 功能说明

读取系统日程并写入手表日程。

### 使用要点

逻辑：1、当天之前30天和后60天的系统日程，对比手表，手表没有就写入

2、获取手表日程对比系统日程，系统没有，写到系统

3、自定义多少分钟进行检查一次

## Swift 示例

```swift
///修改 Info.plist 以添加以下键/值对
<key>NSCalendarsUsageDescription</key>
<string>Access most functions for calendar viewing and editing.</string>

 
 ///配置轮询时间，写到系统的日程名称。
 ///isSupport是用来做测试的， 手表功能表如果是正确的，不需要设置。需要设置的情况下，需要和我这边沟通
 CreekInterFace.instance.calendarConfig(timerMinute: 10, systemCalendarName: "CREEK", isSupport: true) { str in
   ///这个里面打印的只是一些操作信息。
    print(str)
 }
         
 ///日历权限请求
   CreekInterFace.instance.requestCalendarPermission { isBool in
            print(isBool ? "授权成功" : "授权失败")
   }
   ///检查日历权限
   CreekInterFace.instance.checkCalendarPermission { isBool in
            print(isBool ? "已授权" : "未授权")
         }
  
  ///主动去同步日历
  ///在开发期间，需要快速去验证日历是否正常同步，可以用这个方法来主动去触发
    CreekInterFace.instance.syncCalendar()
```

## 功能表字段

读取 `protocol_function_table` 后检查以下字段：

```protobuf
message function_table {
    bool is_support = 1;//是否支持该能力。
    uint32 cmd_id = 2;//能力对应的指令标识。
}

message protocol_function_table {
    function_table schedule_remind = 9;//日程提醒能力。
    function_table calendar = 51;//日程能力。
}
```

## Protobuf 数据模型

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
