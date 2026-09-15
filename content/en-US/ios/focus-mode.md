---
docId: ios-focus-mode
locale: en-US
title: iOS Focus Mode
description: Read and configure focus mode.
platform: iOS
slug: ios/focus-mode
order: 126
status: published
version: v2.0
---

# iOS Focus Mode

## Overview

Read and configure focus mode.

## Swift example

```swift
// Get focus-mode settings.
CreekInterFace.instance.getFocusSleep { model in
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
// Set focus-mode settings.
var  operate =  protocol_focus_mode_operate()
             var mode = protocol_focus_sleep_mode()
            mode.switchFlag = true
            mode.startHour = 22
            mode.endHour = 8
            mode.startMinute = 0
            mode.endMinute = 0
            operate.sleepMode = mode
            CreekInterFace.instance.setFocusSleep(model: operate) {
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
    bool is_support = 1;//Whether the capability is supported.
    uint32 cmd_id = 2;//Capability command identifier.
}

message protocol_function_table {
    function_table focus_mode = 20;//Focus-mode capability.
}
```

## Protobuf data model

```protobuf
syntax = "proto3";

enum switch_type
{
    SWITCH_NULL = 0;// NULL
    SWITCH_ON = 1;// enable
    SWITCH_OFF = 2;// disable
}

message protocol_focus_sleep_mode
{
    bool switch_flag = 1;
    // starttime
    uint32 start_hour = 2; 
    uint32 start_minute = 3;
    // endtime
    uint32 end_hour = 4;
    uint32 end_minute = 5;
}

message protocol_focus_mode_operate
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    protocol_focus_sleep_mode sleep_mode = 2; // mode
    switch_type sleep_mode_switch = 3;  // sleep mode switch; 1bytes mode switch true enable,false disable
}

message protocol_focus_mode_inquire_reply
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    uint32 func_table = 2;// func table; 1bytes capability table
    protocol_focus_sleep_mode sleep_mode = 3; // mode
    switch_type sleep_mode_switch = 4;  // sleep mode switch; 1bytes mode switch true enable,false disable
}
```
