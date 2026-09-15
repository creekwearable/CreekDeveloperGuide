---
docId: flutter-bluetooth-broadcast-switch
locale: en-US
title: "Flutter Bluetooth Broadcast Switch"
description: "Query and configure Bluetooth broadcast behavior."
platform: Flutter
slug: flutter/bluetooth-broadcast-switch
order: 20
status: published
version: v2.0
---

# Flutter Bluetooth Broadcast Switch

Query and configure Bluetooth broadcast behavior.

## SDK Usage

```dart
final bool isOn = switchFlag.value;
protocol_broadcast_switch_operate operate = protocol_broadcast_switch_operate();
operate.broadcastSwitch = isOn ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
if (isOn) {
  if (heartRateStatus.value) {
    operate.selectedTypes.add(broadcast_type.BROADCAST_HEART_RATE);
  }
  if (coreTemperatureStatus.value) {
    operate.selectedTypes.add(broadcast_type.BROADCAST_CORE_TEMPERATURE);
  }
  if (heatWarningStatus.value) {
    operate.selectedTypes.add(broadcast_type.BROADCAST_HEAT_WARNING);
  }
}
sdkManager.setBroadcastSwitch(
    operate: operate,
    callBack: (protocol_broadcast_switch_inquire_reply reply) {

    },
    errCallBack: (e) {

    }
);

sdkManager.getBroadcastSwitch(
    callBack: (protocol_broadcast_switch_inquire_reply reply) {

    },
    errCallBack: (e) {

    }
);
```

## Protobuf Data Model

```protobuf
syntax = "proto3";
enum operate_type 
{ 
   INVALID = 0; // Invalid or unspecified value.
   INQUIRE = 1;// query.
   SET = 2;// set.
} 

enum switch_type 
{ 
  SWITCH_NULL = 0;// NULL
  SWITCH_ON = 1;// on.
  SWITCH_OFF = 2;// off.
}

// broadcast data type
enum broadcast_type {
  BROADCAST_HEART_RATE       = 0;  // heart rate.
  BROADCAST_CORE_TEMPERATURE = 1;  // core temperature.
  BROADCAST_HEAT_WARNING = 2;  // thermal-stress Bluetooth broadcast.
}

message protocol_broadcast_switch_operate 
{ 
  operate_type operate = 1; // 1bytes operation type 0: invalid operation 1: query 2: set.
  switch_type broadcast_switch = 2;   // switch state.
  repeated broadcast_type selected_types = 3; // currently selected data types.
}

message protocol_broadcast_switch_inquire_reply 
{ 
  uint32 func_table = 1;        // 1bytes capability table.
  operate_type operate = 2;     // 1bytes operation type 0: invalid operation 1: query 2: set.
  switch_type broadcast_switch = 3;   // switch state.
  repeated broadcast_type selected_types = 4; // currently selected data types.
}
```

### Field Reference

#### `protocol_broadcast_switch_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes operation type 0: invalid operation 1: query 2: set. |
| `broadcast_switch` | `switch_type` | switch state. |
| `selected_types` | `repeated broadcast_type` | currently selected data types. |

#### `protocol_broadcast_switch_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `func_table` | `uint32` | 1bytes capability table. |
| `operate` | `operate_type` | 1bytes operation type 0: invalid operation 1: query 2: set. |
| `broadcast_switch` | `switch_type` | switch state. |
| `selected_types` | `repeated broadcast_type` | currently selected data types. |

### Enum Values

#### `operate_type`

| Value | Number | Description |
| --- | --- | --- |
| `INVALID` | `0` | Invalid or unspecified value. |
| `INQUIRE` | `1` | query. |
| `SET` | `2` | set. |

#### `switch_type`

| Value | Number | Description |
| --- | --- | --- |
| `SWITCH_NULL` | `0` | NULL |
| `SWITCH_ON` | `1` | on. |
| `SWITCH_OFF` | `2` | off. |

#### `broadcast_type`

| Value | Number | Description |
| --- | --- | --- |
| `BROADCAST_HEART_RATE` | `0` | heart rate. |
| `BROADCAST_CORE_TEMPERATURE` | `1` | core temperature. |
| `BROADCAST_HEAT_WARNING` | `2` | thermal-stress Bluetooth broadcast. |
