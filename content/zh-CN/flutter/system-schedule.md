---
docId: flutter-system-schedule
locale: zh-CN
title: "Flutter 系统与手表日程"
description: "在手机系统日程与手表日程之间进行同步。"
platform: Flutter
slug: flutter/system-schedule
order: 11
status: published
version: v2.0
---

# Flutter 系统与手表日程

在手机系统日程与手表日程之间进行同步。

推荐比较当前日期前 30 天、后 60 天的系统日程与手表日程，补充双方缺少的记录，并按业务设置检查间隔。

## 接口示例

Logic: 

1. Compare the system schedules of the 30 天 before and the 60 天 after the current day, and write    them to the watch if they are not available on the watch  
2. 获取手表日程并与系统日程比较；系统中不存在的日程需写入系统。
3. Customize the number of 分钟 to check once

```dart
///Modify Info.plist to add the following key/value pairs
<key>NSCalendarsUsageDescription</key>
<string>Access most functions for calendar viewing and editing.</string>

///Configure the polling time and write the schedule name to the system.
///isSupport is used for testing. If the watch function table is correct, no setting is required. If it needs to be set, please communicate with me.

 sdkManager.calendarConfig(10, "CREEK", (e){
  ///This only prints some operation information.
  CreekLog.info(e);
 });

///Calendar permission request
  bool isBool = await sdkManager.requestCalendarPermission();

  ///Check calendar permissions
  bool isBool =  await sdkManager.checkCalendarPermission();

///Actively synchronize the calendar
///During development, you need to quickly verify whether the calendar is synchronized normally. You can use this method to actively trigger
 sdkManager.syncCalendar();
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum repeat_calendar_date
{
    REPEAT_NULL = 0; // 不重复。
    REPEAT_EVERY_DAY = 1; // 每天重复。
    REPEAT_EVERY_WEEK = 2; // 每周重复。
    REPEAT_EVERY_MONTH = 3; // 每月重复。
    REPEAT_EVERY_YEAR = 4; // 每年重复。
}

enum repeat_calendar_time
{
    REPEAT_TIME_NULL = 0; // 不提前提醒。
    REPEAT_TIME_5MINUTES = 1; // 提前 5 分钟提醒。
    REPEAT_TIME_10MINUTES = 2; // 提前 10 分钟提醒。
    REPEAT_TIME_15MINUTES = 3; // 提前 15 分钟提醒。
    REPEAT_TIME_30MINUTES = 4; // 提前 30 分钟提醒。
    REPEAT_TIME_1HOUR = 5; // 提前 1 小时提醒。
    REPEAT_TIME_2HOUR = 6; // 提前 2 小时提醒。
    REPEAT_TIME_1DAY = 7; // 提前 1 天提醒。
}

message calendar_item
{
    uint32 id = 1; // Schedule ID
    uint32 start_year = 2; // 2 bytes: Start year
    uint32 start_month = 3; // 1 byte: Start month
    uint32 start_day = 4; // 1 byte: Start day
    uint32 start_hour = 5; // 1 byte: 开始小时
    uint32 start_minute = 6; // 1 byte: 开始分钟
    uint32 end_year = 7; // 2 bytes: End year
    uint32 end_month = 8; // 1 byte: End month
    uint32 end_day = 9; // 1 byte: End day
    uint32 end_hour = 10; // 1 byte: 结束小时
    uint32 end_minute = 11; // 1 byte: 结束分钟
    bool all_day = 12; // Whether the event is all day
    repeat_calendar_date repeat_date = 13; // 1 byte: Supports none, daily, weekly, monthly, yearly repeats
    repeat_calendar_time repeat_time = 14; // Supports no reminder, 5 分钟, 10 分钟, 15 分钟, 30 分钟, 1 hour, 2 小时, 1 day
    bytes content = 15; // max: 50 characters: Event content
};

message protocol_calendar_operate
{
    operate_type operate = 1; // 1 byte: 操作类型 (0: invalid, 1: query, 2: set)
    repeated calendar_item calendar_item = 2; // Calendar items
}

message protocol_calendar_inquire_reply
{
    operate_type operate = 1; // 1 byte: 操作类型 (0: invalid, 1: query, 2: set)
    uint32 func_table = 2; // 1 byte: 功能表
    uint32 calendar_support_max = 3; // 1 byte: Maximum number of schedules supported
    repeated calendar_item calendar_item = 4; // Calendar items
}
```

### 字段说明

#### `calendar_item`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | `uint32` | Schedule ID |
| `start_year` | `uint32` | 2 bytes: Start year |
| `start_month` | `uint32` | 1 byte: Start month |
| `start_day` | `uint32` | 1 byte: Start day |
| `start_hour` | `uint32` | 1 byte: 开始小时 |
| `start_minute` | `uint32` | 1 byte: 开始分钟 |
| `end_year` | `uint32` | 2 bytes: End year |
| `end_month` | `uint32` | 1 byte: End month |
| `end_day` | `uint32` | 1 byte: End day |
| `end_hour` | `uint32` | 1 byte: 结束小时 |
| `end_minute` | `uint32` | 1 byte: 结束分钟 |
| `all_day` | `bool` | Whether the event is all day |
| `repeat_date` | `repeat_calendar_date` | 1 byte: Supports none, daily, weekly, monthly, yearly repeats |
| `repeat_time` | `repeat_calendar_time` | Supports no reminder, 5 分钟, 10 分钟, 15 分钟, 30 分钟, 1 hour, 2 小时, 1 day |
| `content` | `bytes` | max: 50 characters: Event content |

#### `protocol_calendar_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1 byte: 操作类型 (0: invalid, 1: query, 2: set) |
| `calendar_item` | `repeated calendar_item` | Calendar items |

#### `protocol_calendar_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1 byte: 操作类型 (0: invalid, 1: query, 2: set) |
| `func_table` | `uint32` | 1 byte: 功能表 |
| `calendar_support_max` | `uint32` | 1 byte: Maximum number of schedules supported |
| `calendar_item` | `repeated calendar_item` | Calendar items |

### 枚举值

#### `repeat_calendar_date`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `REPEAT_NULL` | `0` | 不重复。 |
| `REPEAT_EVERY_DAY` | `1` | 每天重复。 |
| `REPEAT_EVERY_WEEK` | `2` | 每周重复。 |
| `REPEAT_EVERY_MONTH` | `3` | 每月重复。 |
| `REPEAT_EVERY_YEAR` | `4` | 每年重复。 |

#### `repeat_calendar_time`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `REPEAT_TIME_NULL` | `0` | 不提前提醒。 |
| `REPEAT_TIME_5MINUTES` | `1` | 提前 5 分钟提醒。 |
| `REPEAT_TIME_10MINUTES` | `2` | 提前 10 分钟提醒。 |
| `REPEAT_TIME_15MINUTES` | `3` | 提前 15 分钟提醒。 |
| `REPEAT_TIME_30MINUTES` | `4` | 提前 30 分钟提醒。 |
| `REPEAT_TIME_1HOUR` | `5` | 提前 1 小时提醒。 |
| `REPEAT_TIME_2HOUR` | `6` | 提前 2 小时提醒。 |
| `REPEAT_TIME_1DAY` | `7` | 提前 1 天提醒。 |
