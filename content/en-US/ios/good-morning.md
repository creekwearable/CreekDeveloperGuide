---
docId: ios-good-morning
locale: en-US
title: iOS Good-Morning Greeting
description: Read and configure the device good-morning greeting.
platform: iOS
slug: ios/good-morning
order: 134
status: published
version: v2.0
---

# iOS Good-Morning Greeting

## Overview

Read and configure the device good-morning greeting.

## Swift example

```swift
// Get the good-morning greeting.
 CreekInterFace.instance.getMorning { model in
            // Handle result.
         } failure: { code, message in
            // Handle error.
 }
 // Set the good-morning greeting.
         var operate = protocol_good_morning_operate()
         operate.switchFlag = true
         operate.startHour = 8
         operate.startMinute = 0
         operate.endHour = 9
         operate.endMinute = 0
         operate.repeat = [true,true,true,true,true,true,true]
         operate.content.append("Good morning".data(using: .utf8)!)
         CreekInterFace.instance.setMorning(model: operate) {
            // Handle success.
         } failure: { code, message in
            // Handle error.
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
    function_table good_morning = 32;// Good-morning capability.
    function_table good_morning_content = 46;// Custom good-morning content capability.
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

message protocol_good_morning_operate
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    bool switch_flag = 2; // Greeting switch: true enables, false disables
    uint32 start_hour = 3; // Start hour
    uint32 start_minute = 4;
    uint32 end_hour = 5;   // End hour
    uint32 end_minute = 6;
    repeated bool repeat = 7; // Repeat flags from Monday through Sunday
    repeated bytes content = 8;// Greeting content
}

message protocol_good_morning_inquire_reply
{
    uint32 func_table = 1;// func table; 1bytes capability table
    operate_type operate = 2; // operate; 1bytes operation type 0 invalid 1 query 2 set
    bool switch_flag = 3; // Greeting switch: true enables, false disables
    uint32 start_hour = 4; // Start hour
    uint32 start_minute = 5;
    uint32 end_hour = 6;   // End hour
    uint32 end_minute = 7;
    repeated bool repeat = 8; // Repeat flags from Monday through Sunday
    repeated bytes content = 9;// Greeting content
}
```
