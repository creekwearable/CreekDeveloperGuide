---
docId: flutter-gesture-control
locale: en-US
title: "Flutter Gesture Control"
description: "Read and configure gesture actions."
platform: Flutter
slug: flutter/gesture-control
order: 131
status: published
version: v2.0
---

# Flutter Gesture Control

Read and configure gesture actions.

## SDK Usage

```dart
protocol_gesture_control_operate operate = protocol_gesture_control_operate();
gesture_switch gestureSwitch = gesture_switch();
gestureSwitch.gestureType = gesture_type.GESTURE_TYPE_DOUBLECLICK;
gestureSwitch.controlSwitchType = hidControlType.value;
gestureSwitch.controlCloseAlarm = controlCloseAlarm.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
gestureSwitch.controlCall = controlCall.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
gestureSwitch.switchFlag = gestureSwitchFlag.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
gestureSwitch.controlSport = controlSport.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
gestureSwitch.controlAlarmLaterRemind = controlAlarmLaterRemind.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;

operate.operate = operate_type.SET;
operate.gestureSwitch.add(gestureSwitch);

sdkManager.setGesture(
  operate: operate,
  callBack: () {
    SmartDialog.dismiss();
  },
  errCallBack: (e) {
    SmartDialog.dismiss();
  },
);

sdkManager.getGesture(
  callBack: (e) {
    SmartDialog.dismiss();
  },
  errCallBack: (e) {
    SmartDialog.dismiss();
  },
);
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum switch_type
{
    SWITCH_NULL = 0;// NULL
    SWITCH_ON = 1;// on.
    SWITCH_OFF = 2;// off.
}

enum gesture_type{
    GESTURE_TYPE_DOUBLECLICK = 0; // double tap.
}

enum gesture_switch_hid_type
{
    SWITCH_NULL = 0;     // NULL off.
    SWITCH_TURNPAGE = 1; // Switch turnpage.
    SWITCH_BUTTON = 2;   // Switch button.
}

message gesture_switch{
    gesture_type gesture_type = 1; // Gesture type.
    gesture_switch_hid_type control_switch_type = 2;// //1simulate page turning 2simulate camera shutter.
    switch_type control_close_alarm = 3;// dismiss-alarm control.
    switch_type control_call = 4;// answer-call control.
    switch_type switch_flag = 5;// master gesture switch.
    switch_type control_sport = 6;// workout control（pause/resume）.
    switch_type control_alarm_later_remind = 7;// alarm snooze control.
}

message protocol_gesture_control_operate
{
    operate_type operate = 1; // 1bytes operation type 0: invalid operation 1: query 2: set.
    repeated gesture_switch gesture_switch = 2; // Gesture-switch entries.
}

message protocol_gesture_control_inquire_reply
{
    operate_type operate = 1; // 1bytes operation type 0: invalid operation 1: query 2: set.
    uint32 func_table = 2;// 1bytes capability table.
    repeated gesture_switch gesture_switch = 3; // Gesture-switch entries.
}
```

### Field Reference

#### `gesture_switch`

| Field | Type | Description |
| --- | --- | --- |
| `gesture_type` | `gesture_type` | Gesture type. |
| `control_switch_type` | `gesture_switch_hid_type` | //1simulate page turning 2simulate camera shutter. |
| `control_close_alarm` | `switch_type` | dismiss-alarm control. |
| `control_call` | `switch_type` | answer-call control. |
| `switch_flag` | `switch_type` | master gesture switch. |
| `control_sport` | `switch_type` | workout control（pause/resume）. |
| `control_alarm_later_remind` | `switch_type` | alarm snooze control. |

#### `protocol_gesture_control_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes operation type 0: invalid operation 1: query 2: set. |
| `gesture_switch` | `repeated gesture_switch` | Gesture-switch entries. |

#### `protocol_gesture_control_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes operation type 0: invalid operation 1: query 2: set. |
| `func_table` | `uint32` | 1bytes capability table. |
| `gesture_switch` | `repeated gesture_switch` | Gesture-switch entries. |

### Enum Values

#### `switch_type`

| Value | Number | Description |
| --- | --- | --- |
| `SWITCH_NULL` | `0` | NULL |
| `SWITCH_ON` | `1` | on. |
| `SWITCH_OFF` | `2` | off. |

#### `gesture_type`

| Value | Number | Description |
| --- | --- | --- |
| `GESTURE_TYPE_DOUBLECLICK` | `0` | double tap. |

#### `gesture_switch_hid_type`

| Value | Number | Description |
| --- | --- | --- |
| `SWITCH_NULL` | `0` | NULL off. |
| `SWITCH_TURNPAGE` | `1` | Switch turnpage. |
| `SWITCH_BUTTON` | `2` | Switch button. |

### `func_table` Capability Bits

| Bit | Description |
| - | - |
| 0 | Supports the short-video control switch. |
| 1 | Supports dismissing an alarm. |
| 2 | Supports answering a call. |
| 3 | Supports camera shutter control. |
| 4 | Supports pausing and resuming a workout. |
| 5 | Supports alarm snooze control. |
