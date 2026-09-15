---
docId: flutter-system-schedule
locale: en-US
title: "Flutter System and Watch Schedules"
description: "Synchronize schedules between the phone and watch."
platform: Flutter
slug: flutter/system-schedule
order: 11
status: published
version: v2.0
---

# Flutter System and Watch Schedules

Synchronize schedules between the phone and watch.

## SDK Usage

Logic: 

1. Compare the system schedules of the 30 days before and the 60 days after the current day, and write    them to the watch if they are not available on the watch  
2. Get the watch schedule and compare it with the system schedule, and write it to the system if the system is not available  
3. Customize the number of minutes to check once

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

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum repeat_calendar_date
{
    REPEAT_NULL = 0; // Does not repeat.
    REPEAT_EVERY_DAY = 1; // Repeats every day.
    REPEAT_EVERY_WEEK = 2; // Repeats every week.
    REPEAT_EVERY_MONTH = 3; // Repeats every month.
    REPEAT_EVERY_YEAR = 4; // Repeats every year.
}

enum repeat_calendar_time
{
    REPEAT_TIME_NULL = 0; // No advance reminder.
    REPEAT_TIME_5MINUTES = 1; // Remind 5 minutes in advance.
    REPEAT_TIME_10MINUTES = 2; // Remind 10 minutes in advance.
    REPEAT_TIME_15MINUTES = 3; // Remind 15 minutes in advance.
    REPEAT_TIME_30MINUTES = 4; // Remind 30 minutes in advance.
    REPEAT_TIME_1HOUR = 5; // Remind 1 hour in advance.
    REPEAT_TIME_2HOUR = 6; // Remind 2 hours in advance.
    REPEAT_TIME_1DAY = 7; // Remind 1 day in advance.
}

message calendar_item
{
    uint32 id = 1; // Schedule ID
    uint32 start_year = 2; // 2 bytes: Start year
    uint32 start_month = 3; // 1 byte: Start month
    uint32 start_day = 4; // 1 byte: Start day
    uint32 start_hour = 5; // 1 byte: Start hour
    uint32 start_minute = 6; // 1 byte: Start minute
    uint32 end_year = 7; // 2 bytes: End year
    uint32 end_month = 8; // 1 byte: End month
    uint32 end_day = 9; // 1 byte: End day
    uint32 end_hour = 10; // 1 byte: End hour
    uint32 end_minute = 11; // 1 byte: End minute
    bool all_day = 12; // Whether the event is all day
    repeat_calendar_date repeat_date = 13; // 1 byte: Supports none, daily, weekly, monthly, yearly repeats
    repeat_calendar_time repeat_time = 14; // Supports no reminder, 5 minutes, 10 minutes, 15 minutes, 30 minutes, 1 hour, 2 hours, 1 day
    bytes content = 15; // max: 50 characters: Event content
};

message protocol_calendar_operate
{
    operate_type operate = 1; // 1 byte: Operation type (0: invalid, 1: query, 2: set)
    repeated calendar_item calendar_item = 2; // Calendar items
}

message protocol_calendar_inquire_reply
{
    operate_type operate = 1; // 1 byte: Operation type (0: invalid, 1: query, 2: set)
    uint32 func_table = 2; // 1 byte: Function table
    uint32 calendar_support_max = 3; // 1 byte: Maximum number of schedules supported
    repeated calendar_item calendar_item = 4; // Calendar items
}
```

### Field Reference

#### `calendar_item`

| Field | Type | Description |
| --- | --- | --- |
| `id` | `uint32` | Schedule ID |
| `start_year` | `uint32` | 2 bytes: Start year |
| `start_month` | `uint32` | 1 byte: Start month |
| `start_day` | `uint32` | 1 byte: Start day |
| `start_hour` | `uint32` | 1 byte: Start hour |
| `start_minute` | `uint32` | 1 byte: Start minute |
| `end_year` | `uint32` | 2 bytes: End year |
| `end_month` | `uint32` | 1 byte: End month |
| `end_day` | `uint32` | 1 byte: End day |
| `end_hour` | `uint32` | 1 byte: End hour |
| `end_minute` | `uint32` | 1 byte: End minute |
| `all_day` | `bool` | Whether the event is all day |
| `repeat_date` | `repeat_calendar_date` | 1 byte: Supports none, daily, weekly, monthly, yearly repeats |
| `repeat_time` | `repeat_calendar_time` | Supports no reminder, 5 minutes, 10 minutes, 15 minutes, 30 minutes, 1 hour, 2 hours, 1 day |
| `content` | `bytes` | max: 50 characters: Event content |

#### `protocol_calendar_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1 byte: Operation type (0: invalid, 1: query, 2: set) |
| `calendar_item` | `repeated calendar_item` | Calendar items |

#### `protocol_calendar_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1 byte: Operation type (0: invalid, 1: query, 2: set) |
| `func_table` | `uint32` | 1 byte: Function table |
| `calendar_support_max` | `uint32` | 1 byte: Maximum number of schedules supported |
| `calendar_item` | `repeated calendar_item` | Calendar items |

### Enum Values

#### `repeat_calendar_date`

| Value | Number | Description |
| --- | --- | --- |
| `REPEAT_NULL` | `0` | Does not repeat. |
| `REPEAT_EVERY_DAY` | `1` | Repeats every day. |
| `REPEAT_EVERY_WEEK` | `2` | Repeats every week. |
| `REPEAT_EVERY_MONTH` | `3` | Repeats every month. |
| `REPEAT_EVERY_YEAR` | `4` | Repeats every year. |

#### `repeat_calendar_time`

| Value | Number | Description |
| --- | --- | --- |
| `REPEAT_TIME_NULL` | `0` | No advance reminder. |
| `REPEAT_TIME_5MINUTES` | `1` | Remind 5 minutes in advance. |
| `REPEAT_TIME_10MINUTES` | `2` | Remind 10 minutes in advance. |
| `REPEAT_TIME_15MINUTES` | `3` | Remind 15 minutes in advance. |
| `REPEAT_TIME_30MINUTES` | `4` | Remind 30 minutes in advance. |
| `REPEAT_TIME_1HOUR` | `5` | Remind 1 hour in advance. |
| `REPEAT_TIME_2HOUR` | `6` | Remind 2 hours in advance. |
| `REPEAT_TIME_1DAY` | `7` | Remind 1 day in advance. |
