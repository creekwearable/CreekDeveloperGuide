---
docId: ios-stand-reminder
locale: en-US
title: iOS Stand Reminder
description: Read and configure stand-reminder windows and repeat rules.
platform: iOS
slug: ios/stand-reminder
order: 123
status: published
version: v2.0
---

# iOS Stand Reminder

## Overview

Read and configure stand-reminder windows and repeat rules.

## Swift example

```swift
// get
CreekInterFace.instance.getStanding { model in
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
var  operate =  protocol_standing_remind_operate()
             var standing =  protocol_standing_remind_set()
            // Enable or disable the reminder.
            standing.switchFlag = true
            CreekInterFace.instance.setStanding(model: operate) {
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
    function_table standing_remind = 3;// Stand-reminder capability.
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

enum notify_type
{
    ALLOW = 0;// ALLOW
    SILENT = 1;// SILENT
    CLOSE = 2;// disable
}

message protocol_standing_remind_set
{
    bool switch_flag = 1; // Stand-reminder switch: true enables, false disables
    notify_type notify_flag = 2;// Notification type; 1 byte
    uint32 start_hour = 3; // Start hour
    uint32 start_minute = 4;
    uint32 end_hour = 5;   // End hour
    uint32 end_minute = 6;
    repeated bool repeat = 7; // Repeat flags from Monday through Sunday
}

message protocol_standing_remind_operate
{
    operate_type operate = 1; // Operation: 0 invalid, 1 query, 2 set
    protocol_standing_remind_set standing_remind = 2;
}

message protocol_standing_remind_inquire_reply
{
    uint32 func_table = 1;// Stand-reminder capability bit field
    operate_type operate = 2; // Operation: 0 invalid, 1 query, 2 set
    protocol_standing_remind_set standing_remind = 3;
}
```
