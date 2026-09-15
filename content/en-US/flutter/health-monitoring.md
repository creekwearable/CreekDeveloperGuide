---
docId: flutter-health-monitoring
locale: en-US
title: "Flutter Health Monitoring"
description: "Read and configure health-monitoring modes, intervals, and alerts."
platform: Flutter
slug: flutter/health-monitoring
order: 116
status: published
version: v2.0
---

# Flutter Health Monitoring

Read and configure health-monitoring modes, intervals, and alerts.

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

protocol_health_monitor_operate operate =  protocol_health_monitor_operate();
operate.healthType = health_type.HEART_RATE;
protocol_health_monitor_auto_adjust adjust =  protocol_health_monitor_auto_adjust();
adjust.switchFlag = true;
operate.modeAutoAdjust = adjust;
sdkManager.setMonitor(operate: operate,callBack: (){

},errCallBack: (e){

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

enum notify_type {
    ALLOW = 0; // Allow notifications
    SILENT = 1; // Silent notifications
    CLOSE = 2; // Close notifications
}

enum health_monitor_mode {
    MANUAL = 0; // Manual mode
    AUTO = 1; // Auto mode
    CONTINUOUS = 2; // Continuous monitoring
    INTELLIGENT = 3; // Intelligent monitoring
}

enum health_type {
    HEART_RATE = 0; // Heart rate
    STRESS = 1; // Stress
    SPO2 = 2; // Blood oxygen
    NOISE = 3; // Noise
    BODY_ENERGY = 4; // Body energy
    RESPIRATORY_RATE = 5; // Respiratory rate
    SKIN_TEMPERATURE = 6; // Skin temperature
}

message protocol_health_monitor_auto_adjust {
    bool switch_flag = 1; // Mode auto-adjustment switch: true - On, false - Off
    health_monitor_mode adjust_mode = 2; // Monitoring mode
    uint32 start_hour = 3; // Start hour
    uint32 start_minute = 4; // Start minute
    uint32 end_hour = 5; // End hour
    uint32 end_minute = 6; // End minute
}

message protocol_heart_monitor_notify {
    notify_type notify_flag = 1; // Notification type
    bool high_remind_switch = 2; // true: Enable high reminder, false: Disable
    bool low_remind_switch = 3; // true: Enable low reminder, false: Disable
    uint32 high_threshold_value = 4; // High reminder threshold value
    uint32 low_threshold_value = 5; // Low reminder threshold value
    uint32 interval = 6; // Reminder interval, in minutes
    repeated bool repeat = 7; // Repeat cycle: Monday to Sunday
    uint32 start_hour = 8; // Start hour
    uint32 start_minute = 9; // Start minute
    uint32 end_hour = 10; // End hour
    uint32 end_minute = 11; // End minute
}

message protocol_health_monitor_operate {
    operate_type operate = 1; // Operation type: 0 - Invalid, 1 - Query, 2 - Set
    health_type health_type = 2; // Health monitoring type
    health_monitor_mode default_mode = 3; // Default monitoring mode
    uint32 measurement_interval = 4; // Measurement interval, in seconds
    protocol_health_monitor_auto_adjust mode_auto_adjust = 5; // Mode auto-adjustment sub-item data
    protocol_heart_monitor_notify notify_setting = 6; // Notification setting
}

message protocol_health_monitor_inquire_reply {
    uint32 func_table = 1; // Function table
    operate_type operate = 2; // Operation type: 0 - Invalid, 1 - Query, 2 - Set
    health_type health_type = 3; // Health monitoring type
    health_monitor_mode default_mode = 4; // Default mode
    uint32 measurement_interval = 5; // Measurement interval, in seconds
    protocol_health_monitor_auto_adjust mode_auto_adjust = 6; // Mode auto-adjustment sub-item data
    protocol_heart_monitor_notify notify_setting = 7; // Notification setting
}
```

### Field Reference

#### `protocol_health_monitor_auto_adjust`

| Field | Type | Description |
| --- | --- | --- |
| `switch_flag` | `bool` | Mode auto-adjustment switch: true - On, false - Off |
| `adjust_mode` | `health_monitor_mode` | Monitoring mode |
| `start_hour` | `uint32` | Start hour |
| `start_minute` | `uint32` | Start minute |
| `end_hour` | `uint32` | End hour |
| `end_minute` | `uint32` | End minute |

#### `protocol_heart_monitor_notify`

| Field | Type | Description |
| --- | --- | --- |
| `notify_flag` | `notify_type` | Notification type |
| `high_remind_switch` | `bool` | true: Enable high reminder, false: Disable |
| `low_remind_switch` | `bool` | true: Enable low reminder, false: Disable |
| `high_threshold_value` | `uint32` | High reminder threshold value |
| `low_threshold_value` | `uint32` | Low reminder threshold value |
| `interval` | `uint32` | Reminder interval, in minutes |
| `repeat` | `repeated bool` | Repeat cycle: Monday to Sunday |
| `start_hour` | `uint32` | Start hour |
| `start_minute` | `uint32` | Start minute |
| `end_hour` | `uint32` | End hour |
| `end_minute` | `uint32` | End minute |

#### `protocol_health_monitor_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | Operation type: 0 - Invalid, 1 - Query, 2 - Set |
| `health_type` | `health_type` | Health monitoring type |
| `default_mode` | `health_monitor_mode` | Default monitoring mode |
| `measurement_interval` | `uint32` | Measurement interval, in seconds |
| `mode_auto_adjust` | `protocol_health_monitor_auto_adjust` | Mode auto-adjustment sub-item data |
| `notify_setting` | `protocol_heart_monitor_notify` | Notification setting |

#### `protocol_health_monitor_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `func_table` | `uint32` | Function table |
| `operate` | `operate_type` | Operation type: 0 - Invalid, 1 - Query, 2 - Set |
| `health_type` | `health_type` | Health monitoring type |
| `default_mode` | `health_monitor_mode` | Default mode |
| `measurement_interval` | `uint32` | Measurement interval, in seconds |
| `mode_auto_adjust` | `protocol_health_monitor_auto_adjust` | Mode auto-adjustment sub-item data |
| `notify_setting` | `protocol_heart_monitor_notify` | Notification setting |

### Enum Values

#### `operate_type`

| Value | Number | Description |
| --- | --- | --- |
| `INVALID` | `0` | Invalid or unspecified value. |
| `INQUIRE` | `1` | Query |
| `SET` | `2` | Set |

#### `notify_type`

| Value | Number | Description |
| --- | --- | --- |
| `ALLOW` | `0` | Allow notifications |
| `SILENT` | `1` | Silent notifications |
| `CLOSE` | `2` | Close notifications |

#### `health_monitor_mode`

| Value | Number | Description |
| --- | --- | --- |
| `MANUAL` | `0` | Manual mode |
| `AUTO` | `1` | Auto mode |
| `CONTINUOUS` | `2` | Continuous monitoring |
| `INTELLIGENT` | `3` | Intelligent monitoring |

#### `health_type`

| Value | Number | Description |
| --- | --- | --- |
| `HEART_RATE` | `0` | Heart rate |
| `STRESS` | `1` | Stress |
| `SPO2` | `2` | Blood oxygen |
| `NOISE` | `3` | Noise |
| `BODY_ENERGY` | `4` | Body energy |
| `RESPIRATORY_RATE` | `5` | Respiratory rate |
| `SKIN_TEMPERATURE` | `6` | Skin temperature |

### `func_table` Capability Bits

| Bit | Description |
| - | - |
| 0 | Supports changing the heart-rate measurement interval. |
| 1 | Supports continuous heart-rate monitoring. |
| 2 | Supports intelligent heart-rate monitoring. |
| 3 | Supports high/low heart-rate alerts through `protocol_heart_monitor_notify`; scheduled time ranges are not included. |
| 4 | Automatic heart-rate measurement is unavailable when this bit is set. |
| 5 | Automatic blood-oxygen measurement is unavailable when this bit is set. |
| 6 | Supports second-level blood-oxygen measurement during sleep (OSA). |
