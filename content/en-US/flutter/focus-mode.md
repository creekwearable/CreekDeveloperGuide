---
docId: flutter-focus-mode
locale: en-US
title: "Flutter Focus Mode"
description: "Read and configure focus-mode schedules."
platform: Flutter
slug: flutter/focus-mode
order: 122
status: published
version: v2.0
---

# Flutter Focus Mode

Read and configure focus-mode schedules.

## SDK Usage

```dart
///get
sdkManager.getFocusSleep(callBack: (e) {
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
}, errCallBack: (e) {
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});
///set
protocol_focus_mode_operate operate =  protocol_focus_mode_operate();
protocol_focus_sleep_mode mode = protocol_focus_sleep_mode();
mode.switchFlag = true;
mode.startHour = 8;
mode.startMinute = 0;
mode.endHour = 18;
mode.endMinute = 0;
operate.sleepMode = mode;
sdkManager.setFocusSleep(operate: operate,callBack: (){

},errCallBack: (e){

});
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum switch_type
{
    SWITCH_NULL = 0; // NULL
    SWITCH_ON = 1; // On
    SWITCH_OFF = 2; // Off
}

message protocol_focus_sleep_mode
{
    bool switch_flag = 1; // Enable/Disable sleep mode
    uint32 start_hour = 2; // Start hour
    uint32 start_minute = 3; // Start minute
    uint32 end_hour = 4; // End hour
    uint32 end_minute = 5; // End minute
}

message protocol_focus_mode_operate
{
    operate_type operate = 1; // 1byte Operation type: 0: Invalid operation, 1: Query, 2: Set
    protocol_focus_sleep_mode sleep_mode = 2; // Sleep mode
    switch_type sleep_mode_switch = 3; // 1byte Sleep mode switch: true to enable, false to disable
}

message protocol_focus_mode_inquire_reply
{
    operate_type operate = 1; // 1byte Operation type: 0: Invalid operation, 1: Query, 2: Set
    uint32 func_table = 2; // 1byte Function table
    protocol_focus_sleep_mode sleep_mode = 3; // Sleep mode
    switch_type sleep_mode_switch = 4; // 1byte Sleep mode switch: true to enable, false to disable
}
```

### Field Reference

#### `protocol_focus_sleep_mode`

| Field | Type | Description |
| --- | --- | --- |
| `switch_flag` | `bool` | Enable/Disable sleep mode |
| `start_hour` | `uint32` | Start hour |
| `start_minute` | `uint32` | Start minute |
| `end_hour` | `uint32` | End hour |
| `end_minute` | `uint32` | End minute |

#### `protocol_focus_mode_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1byte Operation type: 0: Invalid operation, 1: Query, 2: Set |
| `sleep_mode` | `protocol_focus_sleep_mode` | Sleep mode |
| `sleep_mode_switch` | `switch_type` | 1byte Sleep mode switch: true to enable, false to disable |

#### `protocol_focus_mode_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1byte Operation type: 0: Invalid operation, 1: Query, 2: Set |
| `func_table` | `uint32` | 1byte Function table |
| `sleep_mode` | `protocol_focus_sleep_mode` | Sleep mode |
| `sleep_mode_switch` | `switch_type` | 1byte Sleep mode switch: true to enable, false to disable |

### Enum Values

#### `switch_type`

| Value | Number | Description |
| --- | --- | --- |
| `SWITCH_NULL` | `0` | NULL |
| `SWITCH_ON` | `1` | On |
| `SWITCH_OFF` | `2` | Off |
