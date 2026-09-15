---
docId: flutter-shortcut-keys
locale: en-US
title: "Flutter Shortcut Keys"
description: "Read and configure button and crown shortcuts."
platform: Flutter
slug: flutter/shortcut-keys
order: 110
status: published
version: v2.0
---

# Flutter Shortcut Keys

Read and configure button and crown shortcuts.

## SDK Usage

```dart
/// Get shortcut keys
sdkManager.getHotKey(callBack: (e) {
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
}, errCallBack: (e) {
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});

/// Set shortcut keys
 protocol_button_crown_operate operate = protocol_button_crown_operate();
 operate.pauseWorkout = true;
 operate.longType = long_2s_press_type.PRESS_TYPE_SOS;
sdkManager.setHotKey(operate: operate,callBack: (){

},errCallBack: (e){

});
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum long_2s_press_type
{
    PRESS_TYPE_NULL = 0; // No press type specified.
    PRESS_TYPE_SOS = 1; // SOS
    PRESS_TYPE_WORKOUT = 2; // Workout
    PRESS_TYPE_ALEXA = 3; // Alexa
    PRESS_TYPE_RESTART = 4; // Restart (Shutdown and restart)
}

message protocol_button_crown_operate
{
    operate_type operate = 1; // 1byte Operation type: 0: Invalid operation, 1: Query, 2: Set
    long_2s_press_type long_type = 2; // 1byte Type of long press (2s entry)
    bool pause_workout = 3; // 1byte Set whether a button pause is required during workout
}

message protocol_button_crown_inquire_reply
{
    operate_type operate = 1; // 1byte Operation type: 0: Invalid operation, 1: Query, 2: Set
    long_2s_press_type long_type = 2; // 1byte Type of long press (2s entry)
    bool pause_workout = 3; // 1byte Set whether a button pause is required during workout
    uint32 func_table = 4; // 1byte Function table
}
```

### Field Reference

#### `protocol_button_crown_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1byte Operation type: 0: Invalid operation, 1: Query, 2: Set |
| `long_type` | `long_2s_press_type` | 1byte Type of long press (2s entry) |
| `pause_workout` | `bool` | 1byte Set whether a button pause is required during workout |

#### `protocol_button_crown_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1byte Operation type: 0: Invalid operation, 1: Query, 2: Set |
| `long_type` | `long_2s_press_type` | 1byte Type of long press (2s entry) |
| `pause_workout` | `bool` | 1byte Set whether a button pause is required during workout |
| `func_table` | `uint32` | 1byte Function table |

### Enum Values

#### `long_2s_press_type`

| Value | Number | Description |
| --- | --- | --- |
| `PRESS_TYPE_NULL` | `0` | No press type specified. |
| `PRESS_TYPE_SOS` | `1` | SOS |
| `PRESS_TYPE_WORKOUT` | `2` | Workout |
| `PRESS_TYPE_ALEXA` | `3` | Alexa |
| `PRESS_TYPE_RESTART` | `4` | Restart (Shutdown and restart) |

### `func_table` Capability Bits

| Bit | Description |
| - | - |
| 0 | Supports opening Alexa with a two-second long press through `PRESS_TYPE_ALEXA`. |
| 1 | Supports restart/shutdown with a two-second long press through `PRESS_TYPE_RESTART`. |
| 2 | The SOS long-press option is unavailable when this bit is set (`PRESS_TYPE_SOS`). |
| 3 | The workout pause-button option is unavailable when this bit is set (`pause_workout`). |
