---
docId: ios-display
locale: en-US
title: iOS Display
description: Read and configure display brightness, timeout, and related settings.
platform: iOS
slug: ios/display
order: 128
status: published
version: v2.0
---

# iOS Display

## Overview

Read and configure display brightness, timeout, and related settings.

## Swift example

```swift
// Get display settings.
CreekInterFace.instance.getScreen{ model in
                var operate =  protocol_screen_brightness_operate()
                var screenTable = model.fromTable()
                if  screenTable.steady{
                   var aod = protocol_screen_aod_time_setting()
                   aod.mode = .intelligentMode
                   aod.startHour = 8
                   aod.startMinute = 0
                   aod.endHour = 10
                   aod.endMinute = 0
                   operate.aodTimeSetting = aod
                }else{
                    operate.aodSwitchFlag = true
                }
                operate.level = 100
                operate.showInterval = 5
                operate.levelFlag = true
                
                // Set display settings.
                CreekInterFace.instance.setScreen(model: operate) {
                    self.view.hideRemark()
                    self.textView.text = "success"
                } failure: { code, message in
                    self.view.hideRemark()
                    self.textView.text = message
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
    bool is_support = 1;//Whether the capability is supported.
    uint32 cmd_id = 2;//Capability command identifier.
}

message protocol_function_table {
    function_table screen_brightness_nonsuport = 48;//Display-setting unsupported flag.
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

enum aod_mode
{
    INTELLIGENT_MODE = 0;
    TIMER_MDOE = 1;
}

message protocol_screen_night_auto_adjust
{
    bool switch_flag = 1;// switch flag; 1bytes true enable,false disable
    // starttime
    uint32 start_hour = 2; 
    uint32 start_minute = 3;
    // endtime
    uint32 end_hour = 4;
    uint32 end_minute = 5;
    uint32 night_level = 6; // night level; 1bytes (0-100)
}

message protocol_screen_aod_time_setting
{
    aod_mode mode = 1;
    // starttime mode
    uint32 start_hour = 2; 
    uint32 start_minute = 3;
    // endtime
    uint32 end_hour = 4;
    uint32 end_minute = 5;

}

message protocol_screen_brightness_operate
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    uint32 level = 2;  // level; 1bytes (0-100)
    uint32 show_interval = 3; // show interval; 1bytes display 5second
    protocol_screen_night_auto_adjust night_auto_adjust = 4; // data
    bool aod_switch_flag = 5;// aod switch flag; 1bytes switch true enable,false disable
    bool raise_wrist_switch_flag = 6;// raise wrist switch flag; 1bytes switch true enable,false disable
    protocol_screen_aod_time_setting aod_time_setting = 7;// mode
    bool level_flag = 8;// set
}

message protocol_screen_brightness_inquire_reply
{
    uint32 func_table = 1;// func table; 1bytes capability table
    operate_type operate = 2; // operate; 1bytesoperation type 0 invalid 1 query 2 set
    uint32 level = 3;  // level; 1bytes (0-100)
    uint32 show_interval = 4; // show interval; 1bytes display unit:second
    protocol_screen_night_auto_adjust night_auto_adjust = 5;// data
    bool aod_switch_flag = 6;// aod switch flag; 1bytes switch true enable,false disable
    bool raise_wrist_switch_flag = 7;// raise wrist switch flag; 1bytes switch true enable,false disable
    protocol_screen_aod_time_setting aod_time_setting = 8;// mode
    repeated uint32 show_interval_options = 9;// unit:second
}
```
