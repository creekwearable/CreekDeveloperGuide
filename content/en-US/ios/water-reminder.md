---
docId: ios-water-reminder
locale: en-US
title: iOS Water Reminder
description: Read and configure water reminders.
platform: iOS
slug: ios/water-reminder
order: 124
status: published
version: v2.0
---

# iOS Water Reminder

## Overview

Read and configure water reminders.

## Swift example

```swift
// get
CreekInterFace.instance.getWater { model in
                self.view.hideRemark()
                let json = try? model.jsonString()
                if let str = json{
                    dispatch_main_sync_safe {
                        self.textView.text = str
                    }
                }
            } failure: { code, message in
                self.view.hideRemark()
                self.textView.text = message
            }
// set
var  operate =  protocol_drink_water_operate()
            // Set a five-minute reminder interval.
            operate.switchFlag = true
            operate.startHour = 8
            operate.startMinute = 0
            operate.endHour = 18
            operate.endMinute = 0
            CreekInterFace.instance.setWater(model: operate) {
                self.view.hideRemark()
                self.textView.text = "success"
            } failure: { code, message in
                self.view.hideRemark()
                self.textView.text = message
            }
```

## Capability-table fields

Check these fields after reading `protocol_function_table`:

```protobuf
message function_table {
    bool is_support = 1;// Whether the capability is supported.
    uint32 cmd_id = 2;// Capability command identifier.
}

message protocol_function_table {
    function_table water_remind = 2;// Water-reminder capability.
}
```

## Protobuf data model

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;// query
    SET = 2;// set
}

message protocol_drink_water_operate
{
    operate_type operate = 1; // Operation: 0 invalid, 1 query, 2 set
    bool switch_flag = 2; // Water-reminder switch: true enables, false disables
    notify_type notify_flag = 3;// Notification type; 1 byte
    uint32 start_hour = 4; // Start hour
    uint32 start_minute = 5;
    uint32 end_hour = 6;   // End hour
    uint32 end_minute = 7;
    repeated bool repeat = 8; // Repeat flags from Monday through Sunday
    uint32 interval = 9;  // Reminder interval in minutes; 2 bytes
}

message protocol_drink_water_inquire_reply
{
    uint32 func_table = 1;// Water-reminder capability bit field
    operate_type operate = 2; // Operation: 0 invalid, 1 query, 2 set
    bool switch_flag = 3; // Water-reminder switch: true enables, false disables
    notify_type notify_flag = 4;// Notification type; 1 byte
    uint32 start_hour = 5; // Start hour
    uint32 start_minute = 6;
    uint32 end_hour = 7;   // End hour
    uint32 end_minute = 8;
    repeated bool repeat = 9; // Repeat flags from Monday through Sunday
    uint32 interval = 10;  // Reminder interval in minutes; 2 bytes
}
```
