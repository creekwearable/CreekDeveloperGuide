---
docId: ios-system-schedule
locale: en-US
title: iOS System and Device Schedules
description: Read system events and write schedules to the device.
platform: iOS
slug: ios/system-schedule
order: 11
status: published
version: v2.0
---

# iOS System and Device Schedules

## Overview

Read system events and write schedules to the device.

## Swift example

```swift
// Add the calendar permission description to Info.plist.
<key>NSCalendarsUsageDescription</key>
<string>Access most functions for calendar viewing and editing.</string>

 
 // timerMinute is the synchronization interval; systemCalendarName is the calendar name.
 // Set isSupport according to the device capability table.
 CreekInterFace.instance.calendarConfig(timerMinute: 10, systemCalendarName: "CREEK", isSupport: true) { str in
   // The callback returns status information.
    print(str)
 }
         
 // Request calendar permission.
   CreekInterFace.instance.requestCalendarPermission { isBool in
            print(isBool ? "Authorization succeeded" : "Authorization failed")
   }
   // Check calendar permission.
   CreekInterFace.instance.checkCalendarPermission { isBool in
            print(isBool ? "Authorized" : "Not authorized")
         }
  
  // Synchronize the calendar after permission has been granted.
    CreekInterFace.instance.syncCalendar()
```

## Capability-table fields

Check these fields after reading `protocol_function_table`:

```protobuf
message function_table {
    bool is_support = 1;//Whether the capability is supported.
    uint32 cmd_id = 2;//Capability command identifier.
}

message protocol_function_table {
    function_table schedule_remind = 9;//Schedule-reminder capability.
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
