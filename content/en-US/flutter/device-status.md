---
docId: flutter-device-status
locale: en-US
title: "Flutter Device Status"
description: "Read battery, charging, wear, and other device status fields."
platform: Flutter
slug: flutter/device-status
order: 132
status: published
version: v2.0
---

# Flutter Device Status

Read battery, charging, wear, and other device status fields.

## SDK Usage

```dart
sdkManager.getDeviceStatus(callBack: (e) {
  SmartDialog.dismiss();
}, errCallBack: (e) {
  SmartDialog.dismiss();
});
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum device_status_type
{
    sport_status = 0;// workout status.
}

message protocol_device_status_operate
{
    operate_type operate = 1; // 1bytes operation type 0: invalid operation 1: query 2: set.
    device_status_type status_type = 2;// device-status type.
}

message protocol_device_status_inquire_reply
{
    operate_type operate = 1; // 1bytes operation type 0: invalid operation 1: query 2: set.
    device_status_type status_type = 2;// device-status type.
    uint32 value = 3;    // 0 not started.1in progress.
}
```

### Field Reference

#### `protocol_device_status_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes operation type 0: invalid operation 1: query 2: set. |
| `status_type` | `device_status_type` | device-status type. |

#### `protocol_device_status_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes operation type 0: invalid operation 1: query 2: set. |
| `status_type` | `device_status_type` | device-status type. |
| `value` | `uint32` | 0 not started.1in progress. |

### Enum Values

#### `device_status_type`

| Value | Number | Description |
| --- | --- | --- |
| `sport_status` | `0` | workout status. |
