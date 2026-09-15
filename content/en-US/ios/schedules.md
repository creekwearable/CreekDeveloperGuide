---
docId: ios-schedules
locale: en-US
title: iOS Schedules
description: Read and configure schedules on the device.
platform: iOS
slug: ios/schedules
order: 132
status: published
version: v2.0
---

# iOS Schedules

## Overview

Read and configure schedules on the device.

## Swift example

```swift
// Get schedules.
CreekInterFace.instance.getCalendar { model in
            // Handle result.
         } failure: { code, message in
            // Handle error.
 }
 // Set schedules.
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
item.content = "Attend meeting".data(using: .utf8)!
item.repeatTime = .repeatTime10Minutes
item.repeatDate = .repeatEveryDay
operate.calendarItem.append(item)
         
CreekInterFace.instance.setCalendar(model: operate) {
            // Handle success.
 } failure: { code, message in
```

## Capability-table fields

Check these fields after reading `protocol_function_table`:

```protobuf
message function_table {
    bool is_support = 1;//Whether the capability is supported.
    uint32 cmd_id = 2;//Capability command identifier.
}

message protocol_function_table {
    function_table calendar = 51;//Calendar capability.
}
```

## Protobuf data model

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
    uint32 id = 1;// Schedule identifier
    uint32 start_year = 2;// Start year
    uint32 start_month = 3;// Start month
    uint32 start_day = 4;// Start day
    uint32 start_hour = 5;// Start hour
    uint32 start_minute = 6;// Start minute
    uint32 end_year = 7;// End year
    uint32 end_month = 8;// End month
    uint32 end_day = 9;// End day
    uint32 end_hour = 10;// End hour
    uint32 end_minute = 11;// End minute
    bool all_day = 12;// Whether this is an all-day schedule
    repeat_calendar_date repeat_date = 13; // Recurrence: none, daily, weekly, monthly, or yearly
    repeat_calendar_time repeat_time = 14;// Reminder lead time from 5 minutes to 1 day
    bytes content = 15;// Schedule text, up to 50 bytes
};

message protocol_calendar_operate
{
    operate_type operate = 1; // Operation: 0 invalid, 1 query, 2 set
    repeated calendar_item calendar_item = 2;
}

message protocol_calendar_inquire_reply
{
    operate_type operate = 1; // Operation: 0 invalid, 1 query, 2 set
    uint32 func_table = 2;// Schedule capability bit field
    uint32 calendar_support_max = 3; // Maximum supported schedule entries; 1 byte
    repeated calendar_item calendar_item = 4;
}
```
