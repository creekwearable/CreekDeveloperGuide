---
docId: ios-device-status
locale: en-US
title: iOS Device Status
description: Read the current device status for a selected status type.
platform: iOS
slug: ios/device-status
order: 144
status: published
version: v2.0
---

# iOS Device Status

## Overview

Read the current device status for a selected status type.

## Swift example

```swift
CreekInterFace.instance.getDeviceStatus(type: .sportStatus){ model in
            if model.value == 1 {
               print("Workout in progress")
            }else{
               print("No workout in progress")
            }
 
         } failure: { code, message in
     
         }
```

## Protobuf data model

```protobuf
syntax = "proto3";

enum device_status_type
{
    sport_status = 0;// workout state
}

message protocol_device_status_operate
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    device_status_type status_type = 2;// Device status category
}
 
message protocol_device_status_inquire_reply
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    device_status_type status_type = 2;// Device status category
    uint32 value = 3;// Status value; for sport_status, 1 means active and 0 means inactive
}
```
