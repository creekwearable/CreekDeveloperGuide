---
docId: ios-hydration-assistant
locale: en-US
title: iOS Hydration Assistant
description: Read and configure hydration-assistant data.
platform: iOS
slug: ios/hydration-assistant
order: 125
status: published
version: v2.0
---

# iOS Hydration Assistant

## Overview

Read and configure hydration-assistant data.

## Swift example

```swift
// Continue only when the hydration-assistant capability is supported.
// protocol_function_table().waterAssistant.isSupport

// Read hydration records stored on the device.
 CreekInterFace.instance.getWaterAssistant{ model in
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
```

## Capability-table fields

Check these fields after reading `protocol_function_table`:

```protobuf
message function_table {
    bool is_support = 1;// Whether the capability is supported.
    uint32 cmd_id = 2;// Capability command identifier.
}

message protocol_function_table {
    function_table water_assistant = 34;// Hydration-assistant capability.
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

message water_assistant_time
{
    uint32 year = 1;
    uint32 month = 2;
    uint32 day = 3;
    uint32 hour = 4;
    uint32 minute = 5;
    uint32 second = 6;
};

message water_assistant_time_section
{
    uint32 start_hour = 1;     // Start hour
    uint32 start_minute = 2;   // Start minute
    uint32 end_hour = 3;       // End hour
    uint32 end_minute = 4;     // End minute
}

message water_assistant_setting
{
    uint32 user_target = 1;          // Daily hydration target; 2 bytes
    uint32 interval = 2;             // Reminder interval in minutes; 2 bytes
    bool   switch_flag = 3;          // Reminder switch
    repeated water_assistant_time_section time_section = 4;// Reminder periods; maximum 8
}

message water_assistant_daily_status
{
    uint32 year = 1;
    uint32 month = 2;
    uint32 day = 3;
    bool  status = 4;// Whether the daily record is valid
    uint32 drink_value = 5;// Water consumed for the day
    uint32 user_target = 6; // Daily hydration target
}

message protocol_water_assistant_operate
{
    operate_type operate = 1; // Operation: 0 invalid, 1 query, 2 set
    water_assistant_time last_drink_time = 2;// Time of the most recent drink
    repeated water_assistant_daily_status daily_data = 3;// Up to seven daily hydration records
    water_assistant_setting setting = 4;// Hydration-assistant settings
    uint32 set_utc_time = 5;// UTC timestamp when the settings were saved
}

message protocol_water_assistant_inquire_reply
{
    uint32 func_table = 1;// Hydration-assistant capability bit field
    operate_type operate = 2; // Operation: 0 invalid, 1 query, 2 set
    water_assistant_time last_drink_time = 3;// Time of the most recent drink
    repeated water_assistant_daily_status daily_data = 4;// Up to seven daily hydration records
    water_assistant_setting setting = 5;// Hydration-assistant settings
    uint32 set_utc_time = 6;// UTC timestamp when the settings were saved
}
```
