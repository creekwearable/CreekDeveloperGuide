---
docId: ios-time
locale: en-US
title: iOS Time
description: Synchronize phone time to the device or read the current device time.
platform: iOS
slug: ios/time
order: 102
status: published
version: v2.0
---

# iOS Time

## Overview

Synchronize phone time to the device or read the current device time.

## Swift example

```swift
// Synchronize the phone's current time to the device.
        CreekInterFace.instance.syncTime {
               
            } failure: { code, message in
               
            }
            
        // Get the device time.
        CreekInterFace.instance.getTime { model in
    
            } failure: { code, message in
               
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

message protocol_time
{
    uint32 year = 1; // year; 2bytes
    uint32 month = 2;// month; 1bytes
    uint32 day = 3;// day; 1bytes
    uint32 hour = 4;// hour; 1bytes
    uint32 minute = 5;// minute; 1bytes
    uint32 second = 6;// second; 1bytes
    uint32 week = 7;// week; 1bytes 0~6 ~ day
    uint32 utc_time = 8;// utc time; 4bytes
    uint32 time_zone = 9; // time zone; 4bytes 24 get 0-12 13-24 unitminute 8*60
};

message protocol_device_time_operate
{
    operate_type operate = 1; // operation type 0 invalid 1 query 2 set
    protocol_time time = 2;
}

message protocol_device_time_inquire_reply
{
    operate_type operate = 1; // operation type 0 invalid 1 query 2 set
    protocol_time time = 2;
}
```
