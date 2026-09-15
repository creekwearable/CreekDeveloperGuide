---
docId: android-health-monitoring
locale: en-US
title: Android Health Monitoring
description: Read and configure health-monitoring modes, intervals, and alert thresholds.
platform: Android
slug: android/health-monitoring
order: 120
status: published
version: v2.0
---

# Android Health Monitoring

Read and configure health-monitoring modes, intervals, and alert thresholds.

```kotlin
// /Get
var model = Monitor.protocol_health_monitor_operate()
model.healthType = Enums.health_type.HEART_RATE

CreekManager.sInstance.getMonitor(
    operate = model,
    { model: Monitor.protocol_health_monitor_inquire_reply ->
     },
    failure = { _, m ->
       
    })
// /Set

var model = Monitor.protocol_health_monitor_operate()
model.healthType = Enums.health_type.HEART_RATE
CreekManager.sInstance.setMonitor(model = model, {
    textView.text = "success"
}, failure = { _, m ->
    textView.text = m
})
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

enum notify_type
{
    ALLOW = 0;// Allow notifications
    SILENT = 1;// Silent notifications
    CLOSE = 2;// Disable notifications
}

enum health_monitor_mode
{
    MANUAL = 0;// Manual
    AUTO = 1;// Automatic
    CONTINUOUS = 2;// Continuous monitoring
    INTELLIHENT = 3;// Smart monitoring
}

enum health_type
{
    HEART_RATE = 0;// Heart rate
    STRESS = 1;// Stress
    SPO2 = 2;// Blood oxygen
    NOISE = 3;// Noise
    BODY_ENERGY = 4;// Body energy
    RESPIRATORY_RATE = 5;// Respiratory rate
    SKIN_TEMPERATURE = 6;// Skin temperature
    ATRIAL_FIBRILLATION = 7;// Atrial fibrillation
    OSA = 8;// OSA.
}

message protocol_health_monitor_auto_adjust
{
    bool switch_flag = 1; // Switch Flag switch. 1bytes.
    health_monitor_mode adjust_mode = 2; // Adjust Mode. 1bytes.
    // StartTime
    uint32 start_hour = 3;
    uint32 start_minute = 4;
    // EndTime
    uint32 end_hour = 5;
    uint32 end_minute = 6;
}

message protocol_heart_monitor_notify
{
    notify_type notify_flag = 1; // 1bytes NotificationType
    bool high_remind_switch = 2;  // 1bytes true:OnHigh-threshold alertSwitch,  false:Off
    bool low_remind_switch = 3;  // 1bytes true:OnLow-threshold alertSwitch,  false:Off
    uint32 high_threshold_value = 4;  // 1bytes High-threshold alertThreshold
    uint32 low_threshold_value = 5;  // 1bytes Low-threshold alertThreshold
    uint32 interval = 6;  // Interval. 1bytes.
    repeated bool repeat = 7;   // Repeat. 1bytes.
    // StartTime
    uint32 start_hour = 8;
    uint32 start_minute = 9;
    // EndTime
    uint32 end_hour = 10;
    uint32 end_minute = 11;
}

message protocol_health_monitor_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    health_type health_type = 2;// Health monitoringType
    health_monitor_mode default_mode = 3;   // Default Mode. 1bytes.
    uint32 measurement_interval = 4;   // Measurement Interval. 2bytes.
    protocol_health_monitor_auto_adjust mode_auto_adjust = 5; // Mode Auto Adjust.
    protocol_heart_monitor_notify notify_setting = 6;// Notify Setting.
}

message protocol_health_monitor_inquire_reply
{
    uint32 func_table = 1;// 1bytes Function table
    operate_type operate = 2; // 1bytesOperation type 0: Invalid operation 1: Query 2: Set
    health_type health_type = 3;// Health monitoringType
    health_monitor_mode default_mode = 4;   // 1bytes  DefaultModeType
    uint32 measurement_interval = 5;   // Measurement Interval. 2bytes.
    protocol_health_monitor_auto_adjust mode_auto_adjust = 6; // Mode Auto Adjust.
    protocol_heart_monitor_notify notify_setting = 7;// Notify Setting.
    
}
```

### `func_table` Bit Definitions

| Bit | Description |
| - | - |
| 1 | Whether supportedHeart rateMeasurementContinuous monitoringMode |
| 2 | Whether supportedHeart rateMeasurementSmart monitoringMode |
