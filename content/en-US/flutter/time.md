---
docId: flutter-time
locale: en-US
title: "Flutter Time"
description: "Synchronize phone time and read device time."
platform: Flutter
slug: flutter/time
order: 102
status: published
version: v2.0
---

# Flutter Time

Synchronize phone time and read device time.

## SDK Usage

```dart
/// Synchronize the phone time to the watch. This method can be called without the need for manual invocation. The internal synchronization of time will occur automatically during the synchronization of health data.
sdkManager.syncTime(callBack: () {

},errCallBack: (msg){

});

/// Get the watch time
sdkManager.getTime(callBack: (e) {

}, errCallBack: (e) {

});
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum operate_type {
    INVALID = 0; // Invalid or unspecified value.
    INQUIRE = 1; // Query
    SET = 2; // Set
}

message protocol_time {
    uint32 year = 1; // Year (2 bytes)
    uint32 month = 2; // Month (1 byte)
    uint32 day = 3; // Day (1 byte)
    uint32 hour = 4; // Hour (1 byte)
    uint32 minute = 5; // Minute (1 byte)
    uint32 second = 6; // Second (1 byte)
    uint32 week = 7; // Week (1 byte, 0~6, Monday to Sunday)
    uint32 utc_time = 8; // UTC time (4 bytes)
    uint32 time_zone = 9; // Time zone (4 bytes, in minutes; uses a 24-hour format, where 0-12 is east, 13-24 is west; for example, UTC+8 is 8*60)
}

message protocol_device_time_operate {
    operate_type operate = 1; // Operation type (0: Invalid, 1: Query, 2: Set)
    protocol_time time = 2; // Timestamp components.
}

message protocol_device_time_inquire_reply {
    operate_type operate = 1; // Operation type (0: Invalid, 1: Query, 2: Set)
    protocol_time time = 2; // Timestamp components.
}
```

### Field Reference

#### `protocol_time`

| Field | Type | Description |
| --- | --- | --- |
| `year` | `uint32` | Year (2 bytes) |
| `month` | `uint32` | Month (1 byte) |
| `day` | `uint32` | Day (1 byte) |
| `hour` | `uint32` | Hour (1 byte) |
| `minute` | `uint32` | Minute (1 byte) |
| `second` | `uint32` | Second (1 byte) |
| `week` | `uint32` | Week (1 byte, 0~6, Monday to Sunday) |
| `utc_time` | `uint32` | UTC time (4 bytes) |
| `time_zone` | `uint32` | Time zone (4 bytes, in minutes; uses a 24-hour format, where 0-12 is east, 13-24 is west; for example, UTC+8 is 8*60) |

#### `protocol_device_time_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | Operation type (0: Invalid, 1: Query, 2: Set) |
| `time` | `protocol_time` | Timestamp components. |

#### `protocol_device_time_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | Operation type (0: Invalid, 1: Query, 2: Set) |
| `time` | `protocol_time` | Timestamp components. |

### Enum Values

#### `operate_type`

| Value | Number | Description |
| --- | --- | --- |
| `INVALID` | `0` | Invalid or unspecified value. |
| `INQUIRE` | `1` | Query |
| `SET` | `2` | Set |
