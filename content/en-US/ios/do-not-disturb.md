---
docId: ios-do-not-disturb
locale: en-US
title: iOS Do Not Disturb
description: Read and configure the device DND switch and schedule.
platform: iOS
slug: ios/do-not-disturb
order: 107
status: published
version: v2.0
---

# iOS Do Not Disturb

## Overview

Read and configure the device DND switch and schedule.

## Swift example

```swift
// Get DND settings.
CreekInterFace.instance.getDisturb{ model in
               
} failure: { code, message in
               
}

// Set DND settings.
var model = protocol_disturb_operate()
model.disturbOnOff = true
CreekInterFace.instance.setDisturb(model: model) {
               
} failure: { code, message in
              
}
```

## Capability-table fields

Check these fields after reading `protocol_function_table`:

```protobuf
message function_table {
    bool is_support = 1;//Whether the capability is supported.
    uint32 cmd_id = 2;//Capability command identifier.
}

message protocol_function_table {
    function_table disturb = 1;//Do-not-disturb capability.
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

enum switch_type
{
    SWITCH_NULL = 0;// NULL
    SWITCH_ON = 1;// enable
    SWITCH_OFF = 2;// disable
}

// One scheduled DND period.
message protocol_set_disturb_item
{
    uint32 disturb_id = 1;// Schedule identifier, starting at 0
    uint32 start_hour = 2; // Start hour
    uint32 start_minute = 3;// Start minute
    uint32 end_hour = 4;// End hour
    uint32 end_minute = 5; // End minute
    repeated bool repeat = 6; // Seven repeat flags, Monday through Sunday
    bool switch_flag = 7;// Whether this schedule is enabled
};

message protocol_disturb_operate
{
    operate_type operate = 1; // Operation: 0 invalid, 1 query, 2 set
    uint32 num = 2;  // Number of DND periods
    bool disturb_on_off = 3;  // Master DND switch: true enables, false disables
    repeated protocol_set_disturb_item disturb_item = 4;// Scheduled DND periods; maximum 5
    switch_type disturb_switch = 5;  // DND mode switch; 1 byte
}

message protocol_disturb_inquire_reply
{
    uint32 func_table = 1;// DND capability bit field
    uint32 disturb_max = 2; // Maximum supported DND periods; 1 byte
    operate_type operate = 3; // Operation: 0 invalid, 1 query, 2 set
    uint32 num = 4;  // Number of DND periods returned
    bool disturb_on_off = 5;  // Master DND switch: true enables, false disables
    repeated protocol_set_disturb_item disturb_item = 6;// Scheduled DND periods; maximum 5
    switch_type disturb_switch = 7;  // DND mode switch; 1 byte
}
```
