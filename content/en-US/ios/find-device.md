---
docId: ios-find-device
locale: en-US
title: iOS Find Device
description: Start or stop finding the device.
platform: iOS
slug: ios/find-device
order: 129
status: published
version: v2.0
---

# iOS Find Device

## Overview

Start or stop finding the device.

## Swift example

```swift
// Start finding the device.
           var operate = protocol_find_phone_watch_operate()
           operate.findWatchSwitch = true
           operate.findWatchFlag = true
           CreekInterFace.instance.setFindPhoneWatch(model: operate) {
              
           } failure: { code, message in
              
           }
           
           // Stop finding the device.
           var operate = protocol_find_phone_watch_operate()
           operate.findWatchSwitch = true
           operate.findWatchFlag = false
           CreekInterFace.instance.setFindPhoneWatch(model: operate) {
              
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
    function_table find_watch = 21;//Find-device capability.
}
```

## Protobuf data model

```protobuf
syntax = "proto3";

message protocol_find_phone_watch_operate
{
    operate_type operate = 1; // Operation: 0 invalid, 1 query, 2 set
    bool find_watch_switch = 2;// Find-watch switch: true enables, false disables
    bool find_watch_flag = 3;// Find-watch state: 0 stopped, 1 started
    bool find_phone_close_flag = 4;// Set to 1 to stop finding the phone
}

message protocol_find_phone_watch_inquire_reply
{
    operate_type operate = 1; // Operation: 0 invalid, 1 query, 2 set
    uint32 func_table = 2;// Find-device capability bit field
    bool find_watch_switch = 3;// Find-watch switch: true enables, false disables
    bool find_watch_support = 4;// Whether find-watch is supported
}
```
