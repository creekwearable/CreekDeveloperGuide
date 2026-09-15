---
docId: android-time
locale: en-US
title: Android Time
description: Synchronize phone time and read the current device time.
platform: Android
slug: android/time
order: 102
status: published
version: v2.0
---

# Android Time

Synchronize phone time and read the current device time.

```kotlin
CreekManager.sInstance.syncTime(success = {
    textView.text = "success"
}, failure = { _, m ->
    textView.text = m
})

CreekManager.sInstance.getTime({ model: Time.protocol_device_time_inquire_reply ->
   
}, failure = { _, m ->
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;// Query
    SET = 2;// Set
}

message protocol_time
{
    uint32 year = 1; // 2bytes
    uint32 month = 2;// 1bytes
    uint32 day = 3;// 1bytes
    uint32 hour = 4;// 1bytes
    uint32 minute = 5;// 1bytes
    uint32 second = 6;// 1bytes
    uint32 week = 7;// 1bytes 0~6 Monday through Sunday
    uint32 utc_time = 8;// 4bytes
    uint32 time_zone = 9; // Time Zone. 4bytes.
};

message protocol_device_time_operate
{
    operate_type operate = 1; // Operation type 0: Invalid operation 1: Query 2: Set
    protocol_time time = 2;
}

message protocol_device_time_inquire_reply
{
    operate_type operate = 1; // Operation type 0: Invalid operation 1: Query 2: Set
    protocol_time time = 2;
}
```
