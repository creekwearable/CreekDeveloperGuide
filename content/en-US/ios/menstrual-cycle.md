---
docId: ios-menstrual-cycle
locale: en-US
title: iOS Menstrual Cycle
description: Read and configure menstrual-cycle settings.
platform: iOS
slug: ios/menstrual-cycle
order: 105
status: published
version: v2.0
---

# iOS Menstrual Cycle

## Overview

Read and configure menstrual-cycle settings.

## Swift example

```swift
// get
         CreekInterFace.instance.getMenstrual { model in
            // Handle result.
         } failure: { code, message in
            // Handle error.
         }
         // set
         var operate =  protocol_menstruation_operate()
         var period = protocol_menstrual_period_set()
         period.switchFlag = true
         period.periodLength = 28
         period.cycleLength = 5;
         period.lastYear = 2025
         period.lastMonth = 10
         period.lastDay = 10
         operate.periodSet = period
         CreekInterFace.instance.setMenstrual(model: operate) {
            
         } failure: { code, message in
            
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
    function_table female_health = 4;// Female-health capability.
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

enum period_log
{
    PERIOD_LOG_NULL = 0;// record
    PERIOD_LOG_NOT_FLOW = 1;// PERIOD LOG NOT FLOW
    PERIOD_LOG_AS_USUAL = 2;// PERIOD LOG AS USUAL
    PERIOD_LOG_LIGHT_FLOW = 3;// PERIOD LOG LIGHT FLOW
    PERIOD_LOG_MENDIUM_FLOW = 4;// PERIOD LOG MENDIUM FLOW
    PERIOD_LOG_HEAVY_FLOW = 5;// PERIOD LOG HEAVY FLOW
}

message protocol_menstrual_period_set
{
    bool switch_flag = 1; // switch flag; 1bytes female healthswitch true enable,false disable
    uint32 period_length = 2;  // period length; 1bytes
    uint32 cycle_length = 3;    // cycle length; 1bytes
    uint32 last_year = 4; // last year; 2bytes starttime
    uint32 last_month = 5;
    uint32 last_day = 6;
}

message protocol_menstrual_record
{
    uint32 year = 1; // year; 2bytes day
    uint32 month = 2;
    uint32 day = 3;
    period_log log = 4;
    uint32 operate_utc_time = 5;// UTC timestamp of the operation record
}

message protocol_menstruation_operate
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    protocol_menstrual_period_set period_set = 2;// set
    repeated protocol_menstrual_record record = 3;// record time
    uint32 set_utc_time = 4;// Timestamp for the settings record.
    bool reminder_switch = 5; // Reminder switch; 1 byte
}

message protocol_menstruation_inquire_reply
{
    uint32 func_table = 1;// func table; 1bytes capability table
    operate_type operate = 2; // operate; 1bytes operation type 0 invalid 1 query 2 set
    protocol_menstrual_period_set menstrual_period_set = 3;// set
    repeated protocol_menstrual_record record= 4;// record time
    uint32 set_utc_time = 5;// Timestamp for the settings record.
    bool reminder_switch = 6; // Reminder switch; 1 byte
}
```
