---
docId: ios-schedules
locale: zh-CN
title: iOS 日程
description: 读取和设置设备日程。
platform: iOS
slug: ios/schedules
order: 132
status: published
version: v2.0
---

# iOS 日程

## 功能说明

读取和设置设备日程。

## Swift 示例

```swift
///日程获取
CreekInterFace.instance.getCalendar { model in
            // 处理返回结果。
         } failure: { code, message in
            // 处理错误。
 }
 ///日程设置
var operate =  protocol_calendar_operate()
var item = calendar_item();
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
item.content = "去开会".data(using: .utf8)!
item.repeatTime = .repeatTime10Minutes
item.repeatDate = .repeatEveryDay
operate.calendarItem.append(item)
         
CreekInterFace.instance.setCalendar(model: operate) {
            // 处理成功。
 } failure: { code, message in
```

## 功能表字段

读取 `protocol_function_table` 后检查以下字段：

```protobuf
message function_table {
    bool is_support = 1;//是否支持该能力。
    uint32 cmd_id = 2;//能力对应的指令标识。
}

message protocol_function_table {
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
