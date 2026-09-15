---
docId: flutter-world-clock
locale: en-US
title: "Flutter World Clock"
description: "Read and configure world-clock entries."
platform: Flutter
slug: flutter/world-clock
order: 118
status: published
version: v2.0
---

# Flutter World Clock

Read and configure world-clock entries.

## SDK Usage

```dart
sdkManager.getMonitor(healthType: health_type.HEART_RATE,callBack: (e) {
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
}, errCallBack: (e) {
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});

 protocol_world_time_operate operate =  protocol_world_time_operate();
 protocol_world_time_item  item = protocol_world_time_item();
 item.cityName = utf8.encode('shenzheng');
 item.offestMin = 180;
sdkManager.setWorldTime(operate: operate,callBack: (){

},errCallBack: (e){

});
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

message protocol_world_time_item {
    int32 offset_min = 1; // 4bytes Offset in minutes
    bytes city_name = 2; // max:32 City name
}

message protocol_world_time_operate {
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    repeated protocol_world_time_item world_time_item = 2; // World time
}

message protocol_world_time_inquire_reply {
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    uint32 world_time_support_max = 2; // 1bytes Maximum number of supported world time displays
    repeated protocol_world_time_item world_time_item = 3; // World time
}
```

### Field Reference

#### `protocol_world_time_item`

| Field | Type | Description |
| --- | --- | --- |
| `offset_min` | `int32` | 4bytes Offset in minutes |
| `city_name` | `bytes` | max:32 City name |

#### `protocol_world_time_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes Operation type 0: Invalid operation 1: Query 2: Set |
| `world_time_item` | `repeated protocol_world_time_item` | World time |

#### `protocol_world_time_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes Operation type 0: Invalid operation 1: Query 2: Set |
| `world_time_support_max` | `uint32` | 1bytes Maximum number of supported world time displays |
| `world_time_item` | `repeated protocol_world_time_item` | World time |

### `func_table` Capability Bits

| Bit | Description |
| - | - |
| 0 | Supports a custom time-zone offset in minutes for display. |
