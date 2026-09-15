---
docId: flutter-screen
locale: en-US
title: "Flutter Screen"
description: "Read and configure screen and brightness settings."
platform: Flutter
slug: flutter/screen
order: 124
status: published
version: v2.0
---

# Flutter Screen

Read and configure screen and brightness settings.

## SDK Usage

```dart
///get
sdkManager.getScreen(callBack: (e){
  CreekLog.info("getScreenInfo:${e.toString()}");
});

sdkManager.setScreen(operate: operate);
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum operate_type {
    INVALID = 0; // Invalid or unspecified value.
    INQUIRE = 1; // Query
    SET = 2; // Set
}

enum aod_mode {
    INTELLIGENT_MODE = 0; // Intelligent always-on-display mode.
    TIMER_MDOE = 1; // Scheduled always-on-display mode.
}

message protocol_screen_night_auto_adjust {
    bool switch_flag = 1; // Night auto brightness adjustment switch: true - On, false - Off
    uint32 start_hour = 2; // Start hour
    uint32 start_minute = 3; // Start minute
    uint32 end_hour = 4; // End hour
    uint32 end_minute = 5; // End minute
    uint32 night_level = 6; // Night brightness level (0-100)
}

message protocol_screen_aod_time_setting {
    aod_mode mode = 1; // Selected always-on-display mode.
    uint32 start_hour = 2; // Start hour (for timer mode)
    uint32 start_minute = 3; // Start minute (for timer mode)
    uint32 end_hour = 4; // End hour
    uint32 end_minute = 5; // End minute
}

message protocol_screen_brightness_operate {
    operate_type operate = 1; // Operation type: 0 - Invalid, 1 - Query, 2 - Set
    uint32 level = 2; // Brightness level (0-100)
    uint32 show_interval = 3; // Screen display interval, e.g., 5 seconds
    protocol_screen_night_auto_adjust night_auto_adjust = 4; // Night auto brightness adjustment sub-item data
    bool aod_switch_flag = 5; // Always-on display switch: true - On, false - Off
    bool raise_wrist_switch_flag = 6; // Raise wrist to wake screen switch: true - On, false - Off
    protocol_screen_aod_time_setting aod_time_setting = 7; // Always-on display mode selection
    bool level_flag = 8; // Whether brightness setting is effective
}

message protocol_screen_brightness_inquire_reply {
    uint32 func_table = 1; // Function table
    operate_type operate = 2; // Operation type: 0 - Invalid, 1 - Query, 2 - Set
    uint32 level = 3; // Brightness level (0-100)
    uint32 show_interval = 4; // Screen display interval, unit: seconds
    protocol_screen_night_auto_adjust night_auto_adjust = 5; // Night auto brightness adjustment sub-item data
    bool aod_switch_flag = 6; // Always-on display switch: true - On, false - Off
    bool raise_wrist_switch_flag = 7; // Raise wrist to wake screen switch: true - On, false - Off
    protocol_screen_aod_time_setting aod_time_setting = 8; // Always-on display mode selection
    repeated uint32 show_interval_options = 9; // Display options for the duration of the screen on. Unit: seconds
}
```

### Field Reference

#### `protocol_screen_night_auto_adjust`

| Field | Type | Description |
| --- | --- | --- |
| `switch_flag` | `bool` | Night auto brightness adjustment switch: true - On, false - Off |
| `start_hour` | `uint32` | Start hour |
| `start_minute` | `uint32` | Start minute |
| `end_hour` | `uint32` | End hour |
| `end_minute` | `uint32` | End minute |
| `night_level` | `uint32` | Night brightness level (0-100) |

#### `protocol_screen_aod_time_setting`

| Field | Type | Description |
| --- | --- | --- |
| `mode` | `aod_mode` | Selected always-on-display mode. |
| `start_hour` | `uint32` | Start hour (for timer mode) |
| `start_minute` | `uint32` | Start minute (for timer mode) |
| `end_hour` | `uint32` | End hour |
| `end_minute` | `uint32` | End minute |

#### `protocol_screen_brightness_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | Operation type: 0 - Invalid, 1 - Query, 2 - Set |
| `level` | `uint32` | Brightness level (0-100) |
| `show_interval` | `uint32` | Screen display interval, e.g., 5 seconds |
| `night_auto_adjust` | `protocol_screen_night_auto_adjust` | Night auto brightness adjustment sub-item data |
| `aod_switch_flag` | `bool` | Always-on display switch: true - On, false - Off |
| `raise_wrist_switch_flag` | `bool` | Raise wrist to wake screen switch: true - On, false - Off |
| `aod_time_setting` | `protocol_screen_aod_time_setting` | Always-on display mode selection |
| `level_flag` | `bool` | Whether brightness setting is effective |

#### `protocol_screen_brightness_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `func_table` | `uint32` | Function table |
| `operate` | `operate_type` | Operation type: 0 - Invalid, 1 - Query, 2 - Set |
| `level` | `uint32` | Brightness level (0-100) |
| `show_interval` | `uint32` | Screen display interval, unit: seconds |
| `night_auto_adjust` | `protocol_screen_night_auto_adjust` | Night auto brightness adjustment sub-item data |
| `aod_switch_flag` | `bool` | Always-on display switch: true - On, false - Off |
| `raise_wrist_switch_flag` | `bool` | Raise wrist to wake screen switch: true - On, false - Off |
| `aod_time_setting` | `protocol_screen_aod_time_setting` | Always-on display mode selection |
| `show_interval_options` | `repeated uint32` | Display options for the duration of the screen on. Unit: seconds |

### Enum Values

#### `operate_type`

| Value | Number | Description |
| --- | --- | --- |
| `INVALID` | `0` | Invalid or unspecified value. |
| `INQUIRE` | `1` | Query |
| `SET` | `2` | Set |

#### `aod_mode`

| Value | Number | Description |
| --- | --- | --- |
| `INTELLIGENT_MODE` | `0` | Intelligent always-on-display mode. |
| `TIMER_MDOE` | `1` | Scheduled always-on-display mode. |

### `func_table` Capability Bits

| Bit | Description |
| - | - |
| 0 | Supports automatic nighttime brightness adjustment. |
| 1 | Supports selecting Always-On Display modes; use `aod_time_setting` when available, otherwise use `aod_switch_flag`. |
| 2 | Supports screen-on duration options. |
