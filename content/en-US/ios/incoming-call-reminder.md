---
docId: ios-incoming-call-reminder
locale: en-US
title: iOS Incoming-Call Reminder Settings
description: Configure the incoming-call reminder switch and related options.
platform: iOS
slug: ios/incoming-call-reminder
order: 117
status: published
version: v2.0
---

# iOS Incoming-Call Reminder Settings

## Overview

Configure the incoming-call reminder switch and related options.

## Swift example

```swift
// get reminder
CreekInterFace.instance.getCall { model in
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
// set reminder
            var data =  protocol_call_switch()
            data.callSwitch = true
            data.callDelay = 2
            CreekInterFace.instance.setCall(model: data) {
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
    function_table ble_call_coming = 35;// Incoming-call reminder capability.
}
```

## Protobuf data model

```protobuf
syntax = "proto3";

enum call_status
{
    RECEIVED_CALL = 0;// RECEIVED CALL
    REJECT_CALL = 1;// REJECT CALL
}

enum tran_direction_type
{
    WATCH_TRAN = 0;// watch
    APP_TRAN = 1;// app
}

message protocol_call_switch
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    bool call_switch = 2; // call switch; 1bytes switch true enable false disable
    uint32 call_delay = 3;// call delay; 1bytes unitsecond
}

message protocol_call_switch_inquire_reply
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    bool call_switch = 2; // call switch; 1bytes switch true enable false disable
    uint32 call_delay = 3;// call delay; 1bytes unitsecond
}

// reminder
message protocol_call_remind
{
    bytes contact_name = 1; // contact name; max:64
    bytes phone_number = 2; // phone number; max:32
}

// status
message protocol_call_remind_status
{
    tran_direction_type tran_type = 1;// tran type
    call_status status = 2;// status; 1bytes status
}
```
