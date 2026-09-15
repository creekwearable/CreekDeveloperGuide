---
docId: flutter-health-realtime
locale: en-US
title: "Flutter Real-time Health Monitoring"
description: "Start, stop, query, and listen for real-time health measurements."
platform: Flutter
slug: flutter/health-realtime
order: 140
status: published
version: v2.0
---

# Flutter Real-time Health Monitoring

Start, stop, query, and listen for real-time health measurements.

## SDK Usage

```dart
//listen health data
sdkManager.healthRealtimeListen((e){
  currentHeartRate = e.hrValue;
  update();
});

//open
sdkManager.setHealthRealtime(operate: protocol_health_realtime_monitor_operate()..operate = health_realtime_operate_type.HEALTH_START,callBack: (){
  SmartDialog.dismiss();
  Common.toast(label:   S.of(Get.context!).successful);
},errCallBack: (e){
  SmartDialog.dismiss();
  Common.toast(label:   e);
});

//close
sdkManager.setHealthRealtime(operate: protocol_health_realtime_monitor_operate()..operate = health_realtime_operate_type.HEALTH_END,callBack: (){
  SmartDialog.dismiss();
  Common.toast(label:   S.of(Get.context!).successful);
},errCallBack: (e){
  SmartDialog.dismiss();
  Common.toast(label:   e);
});
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum health_realtime_operate_type
{
    HEALTH_START = 0; // Health start.
    HEALTH_END = 1; // Health end.
}

// real-time health data type
enum health_realtime_data_type {
  HEART_RATE              = 0;  // heart rate.
  CORE_TEMPERATURE        = 1;  // core temperature.
  EDA_STRESS_LEVEL        = 2;   // real-time EDA stress.
}

message protocol_health_realtime_monitor_operate
{
    uint32 func_table = 1;// 1bytes capability table.
    health_realtime_operate_type operate = 2;// monitoring operation.
    repeated health_realtime_data_type data_types = 3; // Data types.
}
```

```protobuf
syntax = "proto3";
enum tran_direction_type
{
    WATCH_TRAN = 0; // Operation originated from the watch.
    APP_TRAN = 1; // Operation originated from the application.
}

// real-time health data event
message protocol_health_realtime_data_operate{
    tran_direction_type tran_type = 1; // Origin of this operation.
    uint32 hr_value = 2;                // heart-rate value.
    uint32 core_temp_value = 3;         // core-temperature value; scale: ×100.
    repeated health_realtime_data_type data_types = 4; // Data types.
    uint32 eda_stress_value = 5;         // real-time EDA stress index; range: 0–100; scale: ×100.
}
```

```protobuf
syntax = "proto3";

message protocol_health_realtime_operate
{
    operate_type operate = 1; // 1bytes operation type 0: invalid operation 1: query 2: set.
}

message protocol_health_realtime_inquire_reply
{
    operate_type operate = 1; // 1bytes operation type 0: invalid operation 1: query 2: set.
    uint32 total_step = 2;// total steps.
    uint32 totol_exercise_min = 3;// total exercise duration, in minutes.
    uint32 totol_activity_calories = 4;// active calories.
    uint32 totol_distance = 5;// distance, in meters.
    uint32 spo2_value = 6;// Blood oxygen value.
    uint32 hrv_value = 7;// heart rate.
    uint32 stress_value = 8; // Stress value.

}
```

### Field Reference

#### `protocol_health_realtime_monitor_operate`

| Field | Type | Description |
| --- | --- | --- |
| `func_table` | `uint32` | 1bytes capability table. |
| `operate` | `health_realtime_operate_type` | monitoring operation. |
| `data_types` | `repeated health_realtime_data_type` | Data types. |

#### `protocol_health_realtime_data_operate`

| Field | Type | Description |
| --- | --- | --- |
| `tran_type` | `tran_direction_type` | Origin of this operation. |
| `hr_value` | `uint32` | heart-rate value. |
| `core_temp_value` | `uint32` | core-temperature value; scale: ×100. |
| `data_types` | `repeated health_realtime_data_type` | Data types. |
| `eda_stress_value` | `uint32` | real-time EDA stress index; range: 0–100; scale: ×100. |

#### `protocol_health_realtime_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes operation type 0: invalid operation 1: query 2: set. |

#### `protocol_health_realtime_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes operation type 0: invalid operation 1: query 2: set. |
| `total_step` | `uint32` | total steps. |
| `totol_exercise_min` | `uint32` | total exercise duration, in minutes. |
| `totol_activity_calories` | `uint32` | active calories. |
| `totol_distance` | `uint32` | distance, in meters. |
| `spo2_value` | `uint32` | Blood oxygen value. |
| `hrv_value` | `uint32` | heart rate. |
| `stress_value` | `uint32` | Stress value. |

### Enum Values

#### `health_realtime_operate_type`

| Value | Number | Description |
| --- | --- | --- |
| `HEALTH_START` | `0` | Health start. |
| `HEALTH_END` | `1` | Health end. |

#### `health_realtime_data_type`

| Value | Number | Description |
| --- | --- | --- |
| `HEART_RATE` | `0` | heart rate. |
| `CORE_TEMPERATURE` | `1` | core temperature. |
| `EDA_STRESS_LEVEL` | `2` | real-time EDA stress. |

#### `tran_direction_type`

| Value | Number | Description |
| --- | --- | --- |
| `WATCH_TRAN` | `0` | Operation originated from the watch. |
| `APP_TRAN` | `1` | Operation originated from the application. |
