---
docId: flutter-ring-band-module
locale: en-US
title: "Flutter Ring and Band Module"
description: "Use health measurement, reminder, workout-detection, and calibration features for rings and bands."
platform: Flutter
slug: flutter/ring-band-module
order: 130
status: published
version: v2.0
---

# Flutter Ring and Band Module

Use health measurement, reminder, workout-detection, and calibration features for rings and bands.

## Health Measurement
```dart
///Start measurement
sdkManager.startMeasure(selectedType: ring_health_type.values[options.indexOf(selectedOption.value)],timeout: const Duration(seconds: 60),measureDuration:  const Duration(seconds: 30), onResult: (e){
  debugData.value = e.toString();
  measuredValue.value = e.value;
},success: (){
  state.value = "Measurement complete ✅";
}, failure: (e){

  state.value = e.message;
});
  ///End measurement
sdkManager.stopMeasure(ring_health_type.values[options.indexOf(selectedOption.value)]);
```

## **Ring & Band Reminder Switches**
```dart
///get
sdkManager.getWatchReminderWitch(callBack: (reply){
  try {
    // Handle a reply object that uses the same protocol body
    goalAchievedOn.value = reply.goalAchievedSwitch == switch_type.SWITCH_ON;
    lowPowerOn.value = reply.lowPowerSwitch == switch_type.SWITCH_ON;
    chargerFullOn.value = reply.chargerFullSwitch == switch_type.SWITCH_ON;
    findRingLedOn.value = reply.findRingLedSwitch == switch_type.SWITCH_ON;
    ntcTemperatureHighOn.value = reply.ntctemperatureHighSwitch == switch_type.SWITCH_ON;
    heartRateHighOn.value = reply.heartRateHighSwitch == switch_type.SWITCH_ON;
    heartRateLowOn.value = reply.heartRateLowSwitch == switch_type.SWITCH_ON;
    sedentaryRemindOn.value = reply.sedentaryRemindSwitch == switch_type.SWITCH_ON;
    highStressOn.value = reply.highStressSwitch == switch_type.SWITCH_ON;
    lowSpo2On.value = reply.lowSpo2Switch == switch_type.SWITCH_ON;
    afAbnormalOn.value = reply.afAbnormalSwitch == switch_type.SWITCH_ON;
    edaHighStressOn.value = reply.edaHighStressSwitch == switch_type.SWITCH_ON;
    update();
  } catch (e) {
    CreekLog.error("Failed to parse reminder switches $e");
  }
},errCallBack: (e){

});

  ///set
protocol_remind_mark_switch_operate operate = protocol_remind_mark_switch_operate();
operate.operate = operate_type.SET;
operate.goalAchievedSwitch = goalAchievedOn.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF; // goal-achievement reminder switch
operate.lowPowerSwitch = lowPowerOn.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF; // low-battery reminder switch
operate.chargerFullSwitch = chargerFullOn.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF; // full-charge reminder switch
operate.findRingLedSwitch = findRingLedOn.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF; // find-ring LED switch
operate.ntctemperatureHighSwitch = ntcTemperatureHighOn.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF; //high-NTC-temperature reminder switch
operate.heartRateHighSwitch = heartRateHighOn.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF; // high-heart-rate reminder switch
operate.heartRateLowSwitch = heartRateLowOn.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF; // low-heart-rate reminder switch
operate.sedentaryRemindSwitch = sedentaryRemindOn.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
operate.highStressSwitch = highStressOn.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
operate.lowSpo2Switch = lowSpo2On.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
operate.afAbnormalSwitch = afAbnormalOn.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
operate.edaHighStressSwitch = edaHighStressOn.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
//Device-triggered reminder switches
sdkManager.setWatchReminderWitch(operate: operate, callBack: (){
  CreekLog.info("Switches updated successfully");
}, errCallBack: (e){
  CreekLog.error("Failed to update switches $e");
});
```

## Reminder Notifications
```dart
sdkManager.ringReminderListen ((e){

});
```

## Alarm Notifications
```dart
sdkManager.ringAlarmVibrateListen ((e){

});
```

## Auto Workout Detection
```dart
sdkManager.motionRecognitionListen ((e){

});
```

## Ir Calibration Button
```dart
protocol_ir_calibration_button_operate operate = protocol_ir_calibration_button_operate();
operate.operate = operate_type.SET;
operate.irCalibrationSwitch = value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
sdkManager.setIrCalibrationButton(
      operate: operate,
      callBack: () {

      },
      errCallBack: (e) {

      }
  );
}

protocol_ir_calibration_button_operate operate = protocol_ir_calibration_button_operate();
operate.operate = operate_type.INQUIRE;
sdkManager.getIrCalibrationButton(
    operate: operate,
    callBack: (reply) {

    },
    errCallBack: (e) {

    }
);
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum tran_direction_type {
    WATCH_TRAN = 0; // Operation originated from the watch.
    APP_TRAN = 1; // Operation originated from the application.
}

enum ring_health_type {
    HEART_RATE = 0;         // Heart rate
    STRESS = 1;             // Stress
    SPO2 = 2;               // Blood oxygen (SpO2)
    HRV = 3;                // HRV
    RESPIRATORY_RATE = 4;   // Respiratory rate
    AF = 5;                 // AFib (atrial fibrillation) algorithm
}

enum health_measure_type {
    HEALTH_MEASURE_START = 0;   // Start measurement
    HEALTH_MEASURE_PAUSE = 1;   // Pause measurement
    HEALTH_MEASURE_STOP = 2;    // Stop measurement
    HEALTH_MEASURE_INQUIRE = 3; // Query measurement status
}

enum health_measure_status {
    HEALTH_STATUS_MEASURING = 0; // Measuring
    HEALTH_STATUS_NO_WEAR = 1;   // Not worn
    HEALTH_STATUS_RESULT = 2;    // Measurement result available
    HEALTH_STATUS_FAIL = 3;      // Measurement failed
}

message protocol_ring_click_measure_operate {
    tran_direction_type tran_type = 1; // Origin of this operation.
    ring_health_type health_type = 2;       // Type of health measurement
    health_measure_type measure_type = 3;   // Measurement operation
    uint32 value = 4;                       // Measured value
    uint32 measure_time = 5;                // Measurement duration
    health_measure_status measure_status = 6; // Measurement status
    bytes data_list = 7;                    // Data set (includes AFib data)
    uint32 pulse_rate_value = 8;            // Pulse rate value
}
```

```protobuf
syntax = "proto3";

enum CommonErrorCode {
  COMMON_UNKNOWN = 0;             // Unknown error
  COMMON_IN_PROGRESS = 1;         // Operation in progress
  COMMON_CANCELED = 2;            // Operation canceled
  COMMON_TIMEOUT = 3;             // Timeout
  COMMON_NOT_WORN = 4;            // Not worn
  COMMON_FAILED = 5;              // Operation failed
  COMMON_INTERNAL_ERROR = 6;      // Internal error
}

message CommonError {
  CommonErrorCode code = 1; // Error code.
  string message = 2; // Human-readable error message.
}
```

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

message protocol_remind_mark_switch_operate
{
    operate_type operate = 1; // 1bytes operation type 0: invalid operation 1: query 2: set.
    switch_type goal_achieved_switch = 2;// goal-achievement reminder switch.
    switch_type low_power_switch = 3;           // low-battery reminder switch.
    switch_type charger_full_switch = 4;// full-charge reminder switch.
    switch_type find_ring_led_switch =5;// find-ring LED switch.
    switch_type ntctemperature_high_switch = 6;// NTChigh-temperature reminder switch.
    switch_type heart_rate_high_switch = 7;// high-heart-rate reminder switch.
    switch_type heart_rate_low_switch = 8;// low-heart-rate reminder switch.
    switch_type sedentary_remind_switch = 9;  // sedentary reminder switch.
    switch_type high_stress_switch = 10;   // high-stress reminder switch.
    switch_type low_spo2_switch = 11;   // low-blood-oxygen reminder switch.
    switch_type af_abnormal_switch = 12;   // atrial-fibrillation reminder switch.
}

message protocol_remind_switch_inquire_reply
{
    uint32 func_table = 1;// 1bytes capability table.
    operate_type operate = 2; // 1bytes operation type 0: invalid operation 1: query 2: set.
    switch_type goal_achieved_switch = 3;// goal-achievement reminder switch.
    switch_type low_power_switch = 4;           // low-battery reminder switch.
    switch_type charger_full_switch = 5;// full-charge reminder switch.
    switch_type find_ring_led_switch = 6;// find-ring LED switch.
    switch_type ntctemperature_high_switch = 7;// NTChigh-temperature reminder switch.
    switch_type heart_rate_high_switch = 8;// high-heart-rate reminder switch.
    switch_type heart_rate_low_switch = 9; // Low-heart-rate reminder switch state.
    switch_type sedentary_remind_switch = 10;  // sedentary reminder switch.
    switch_type high_stress_switch = 11;   // high-stress reminder switch.
    switch_type low_spo2_switch = 12;   // low-blood-oxygen reminder switch.
    switch_type af_abnormal_switch = 13;   // atrial-fibrillation reminder switch.
}
```

```protobuf
syntax = "proto3";

enum ring_goal_status 
{
    GOAL_NOT_ACHIEVED  = 0;// not achieved.
    GOAL_ACHIEVED = 1;// achieved.
    EVENT_INVAlID  = 2;// invalid event.
}

message ring_remind_event_time
{
    uint32 year = 1;    // event start time.
    uint32 month = 2; // Month.
    uint32 day = 3; // Day.
    uint32 hour = 4; // Hour.
    uint32 minute = 5; // Minute.
    uint32 second = 6; // Second.
    uint32 duration = 7;// event duration, units.
}

enum ring_remind_type
{
    RING_REMIND_TYPE_ALERT  = 0;     // pop-up notification.
    RING_REMIND_TYPE_SILENT = 1; // silent execution.
}

enum ring_remind_event_type
{
    INVALID_EVENT = 0; // Invalid or unspecified event.
    STEP_GOAL = 1;   // step-goal status.
    KCAL_GOAL = 2;   // calorie-goal status.
    ACTIVE_TIME = 3; // active-time goal status.
    STAND_TIME = 4;  // standing-time goal status.
    DIS_TIME = 5;    // distance-goal status.
    EXERCISE_TIME = 6;  // exercise-time goal status.
    HIGH_HEART_RATE = 7;    // high-heart-rate reminder.
    LOW_HEART_RATE = 8;      // low-heart-rate reminder.
    LOW_POWER = 9;           // low-battery reminder.
    NTC_HIGH_TEMPERATURE = 10;// NTCtemperature too high.
    NTC_LOW_TEMPERATURE = 11;// NTCtemperature too low.
    HRV_MEASURE_FAILED = 12;  // hrvmeasurement failed.
    STRESS_MEASURE_FAILED = 13;// stress measurement failed.
    RESPIRATORY_MEASURE_FAILED = 14;// respiratory-rate measurement failed.
    CHARGE_FULL = 15;// fully charged.
    SYS_POWEROFF = 16;// power-off reminder.
    IS_AF = 17;// suspected atrial-fibrillation reminder.
    SEDENTARY_REMIND = 18;     // sedentary reminder.
    HIGH_STRESS = 19;    // high-stress reminder.
    LOW_SPO2 = 20;    // low-blood-oxygen reminder.
    CORE_HIGH_TEMPERATURE = 21;// core temperature too high.
    CORE_LOW_TEMPERATURE = 22;// core temperature too low.
    EDA_HIGH_STRESS = 23; // EDAhigh-stress reminder.

    WEAR_REMIND = 24;    // first not-worn reminder(15minutes)
    WEAR_REMIND_SEC = 25;   // second not-worn reminder(40minutes)
}

message protocol_ring_remind_mark_operate
{
    tran_direction_type tran_type = 1; // Origin of this operation.
    uint32 func_table = 2;// 1bytes capability table.
    ring_remind_event_type event_id = 3; // Event identifier; 1bytes id.
    ring_goal_status event_value = 4;// event value.
    ring_remind_event_time event_time = 5; // event time.
    ring_remind_type remind_type = 6;   // reminder mode.
    int32 current_value = 7; // current event value（core temperature*100）.
    uint32 event_value_min = 8; // minimum event value.
    uint32 event_value_max = 9; // maximum event value.
}
```

```protobuf
syntax = "proto3";

enum ring_alarm_vibrate_status {
    VIBRATION_STOP = 0;  // Vibration stopped
    VIBRATION_START = 1; // Vibration started
}

message protocol_ring_alarm_vibrate_notify_operate {
    tran_direction_type tran_type = 1; // Origin of this operation.
    uint32 func_table = 2;             // 1-byte function table
    uint32 alarm_id = 3;               // Alarm ID (starting from 0)
    uint32 hour = 4;                   // Hour (1 byte)
    uint32 minute = 5;                 // Minute (1 byte)
    bytes alarm_name = 6;              // Alarm name (max: 30 bytes)
    ring_alarm_vibrate_status status = 7; // Alarm vibration status
}
```

```protobuf
syntax = "proto3";

message protocol_ring_motion_recognition_operate {
    tran_direction_type tran_type = 1; // Origin of this operation.
    uint32 func_table = 2;            // 1-byte function table
    sport_type sport_type = 3;        // Detected sport type (motion recognition)
}
```

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

message protocol_ir_calibration_button_operate
{
    operate_type operate = 1; // 1bytesoperation type 0: invalid operation 1: query 2: set.
    switch_type ir_calibration_switch = 2;  // 1bytes infrared calibration button true on,false off.
}

message protocol_ir_calibration_button_inquire_reply
{
    operate_type operate = 1; // 1bytesoperation type 0: invalid operation 1: query 2: set.
    switch_type ir_calibration_switch = 2;  // 1bytes infrared calibration button true on,false off.
}
```

### Field Reference

#### `protocol_ring_click_measure_operate`

| Field | Type | Description |
| --- | --- | --- |
| `tran_type` | `tran_direction_type` | Origin of this operation. |
| `health_type` | `ring_health_type` | Type of health measurement |
| `measure_type` | `health_measure_type` | Measurement operation |
| `value` | `uint32` | Measured value |
| `measure_time` | `uint32` | Measurement duration |
| `measure_status` | `health_measure_status` | Measurement status |
| `data_list` | `bytes` | Data set (includes AFib data) |
| `pulse_rate_value` | `uint32` | Pulse rate value |

#### `CommonError`

| Field | Type | Description |
| --- | --- | --- |
| `code` | `CommonErrorCode` | Error code. |
| `message` | `string` | Human-readable error message. |

#### `protocol_remind_mark_switch_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes operation type 0: invalid operation 1: query 2: set. |
| `goal_achieved_switch` | `switch_type` | goal-achievement reminder switch. |
| `low_power_switch` | `switch_type` | low-battery reminder switch. |
| `charger_full_switch` | `switch_type` | full-charge reminder switch. |
| `find_ring_led_switch` | `switch_type` | find-ring LED switch. |
| `ntctemperature_high_switch` | `switch_type` | NTChigh-temperature reminder switch. |
| `heart_rate_high_switch` | `switch_type` | high-heart-rate reminder switch. |
| `heart_rate_low_switch` | `switch_type` | low-heart-rate reminder switch. |
| `sedentary_remind_switch` | `switch_type` | sedentary reminder switch. |
| `high_stress_switch` | `switch_type` | high-stress reminder switch. |
| `low_spo2_switch` | `switch_type` | low-blood-oxygen reminder switch. |
| `af_abnormal_switch` | `switch_type` | atrial-fibrillation reminder switch. |

#### `protocol_remind_switch_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `func_table` | `uint32` | 1bytes capability table. |
| `operate` | `operate_type` | 1bytes operation type 0: invalid operation 1: query 2: set. |
| `goal_achieved_switch` | `switch_type` | goal-achievement reminder switch. |
| `low_power_switch` | `switch_type` | low-battery reminder switch. |
| `charger_full_switch` | `switch_type` | full-charge reminder switch. |
| `find_ring_led_switch` | `switch_type` | find-ring LED switch. |
| `ntctemperature_high_switch` | `switch_type` | NTChigh-temperature reminder switch. |
| `heart_rate_high_switch` | `switch_type` | high-heart-rate reminder switch. |
| `heart_rate_low_switch` | `switch_type` | Low-heart-rate reminder switch state. |
| `sedentary_remind_switch` | `switch_type` | sedentary reminder switch. |
| `high_stress_switch` | `switch_type` | high-stress reminder switch. |
| `low_spo2_switch` | `switch_type` | low-blood-oxygen reminder switch. |
| `af_abnormal_switch` | `switch_type` | atrial-fibrillation reminder switch. |

#### `ring_remind_event_time`

| Field | Type | Description |
| --- | --- | --- |
| `year` | `uint32` | event start time. |
| `month` | `uint32` | Month. |
| `day` | `uint32` | Day. |
| `hour` | `uint32` | Hour. |
| `minute` | `uint32` | Minute. |
| `second` | `uint32` | Second. |
| `duration` | `uint32` | event duration, units. |

#### `protocol_ring_remind_mark_operate`

| Field | Type | Description |
| --- | --- | --- |
| `tran_type` | `tran_direction_type` | Origin of this operation. |
| `func_table` | `uint32` | 1bytes capability table. |
| `event_id` | `ring_remind_event_type` | Event identifier; 1bytes id. |
| `event_value` | `ring_goal_status` | event value. |
| `event_time` | `ring_remind_event_time` | event time. |
| `remind_type` | `ring_remind_type` | reminder mode. |
| `current_value` | `int32` | current event value（core temperature*100）. |
| `event_value_min` | `uint32` | minimum event value. |
| `event_value_max` | `uint32` | maximum event value. |

#### `protocol_ring_alarm_vibrate_notify_operate`

| Field | Type | Description |
| --- | --- | --- |
| `tran_type` | `tran_direction_type` | Origin of this operation. |
| `func_table` | `uint32` | 1-byte function table |
| `alarm_id` | `uint32` | Alarm ID (starting from 0) |
| `hour` | `uint32` | Hour (1 byte) |
| `minute` | `uint32` | Minute (1 byte) |
| `alarm_name` | `bytes` | Alarm name (max: 30 bytes) |
| `status` | `ring_alarm_vibrate_status` | Alarm vibration status |

#### `protocol_ring_motion_recognition_operate`

| Field | Type | Description |
| --- | --- | --- |
| `tran_type` | `tran_direction_type` | Origin of this operation. |
| `func_table` | `uint32` | 1-byte function table |
| `sport_type` | `sport_type` | Detected sport type (motion recognition) |

#### `protocol_ir_calibration_button_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytesoperation type 0: invalid operation 1: query 2: set. |
| `ir_calibration_switch` | `switch_type` | 1bytes infrared calibration button true on,false off. |

#### `protocol_ir_calibration_button_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytesoperation type 0: invalid operation 1: query 2: set. |
| `ir_calibration_switch` | `switch_type` | 1bytes infrared calibration button true on,false off. |

### Enum Values

#### `tran_direction_type`

| Value | Number | Description |
| --- | --- | --- |
| `WATCH_TRAN` | `0` | Operation originated from the watch. |
| `APP_TRAN` | `1` | Operation originated from the application. |

#### `ring_health_type`

| Value | Number | Description |
| --- | --- | --- |
| `HEART_RATE` | `0` | Heart rate |
| `STRESS` | `1` | Stress |
| `SPO2` | `2` | Blood oxygen (SpO2) |
| `HRV` | `3` | HRV |
| `RESPIRATORY_RATE` | `4` | Respiratory rate |
| `AF` | `5` | AFib (atrial fibrillation) algorithm |

#### `health_measure_type`

| Value | Number | Description |
| --- | --- | --- |
| `HEALTH_MEASURE_START` | `0` | Start measurement |
| `HEALTH_MEASURE_PAUSE` | `1` | Pause measurement |
| `HEALTH_MEASURE_STOP` | `2` | Stop measurement |
| `HEALTH_MEASURE_INQUIRE` | `3` | Query measurement status |

#### `health_measure_status`

| Value | Number | Description |
| --- | --- | --- |
| `HEALTH_STATUS_MEASURING` | `0` | Measuring |
| `HEALTH_STATUS_NO_WEAR` | `1` | Not worn |
| `HEALTH_STATUS_RESULT` | `2` | Measurement result available |
| `HEALTH_STATUS_FAIL` | `3` | Measurement failed |

#### `CommonErrorCode`

| Value | Number | Description |
| --- | --- | --- |
| `COMMON_UNKNOWN` | `0` | Unknown error |
| `COMMON_IN_PROGRESS` | `1` | Operation in progress |
| `COMMON_CANCELED` | `2` | Operation canceled |
| `COMMON_TIMEOUT` | `3` | Timeout |
| `COMMON_NOT_WORN` | `4` | Not worn |
| `COMMON_FAILED` | `5` | Operation failed |
| `COMMON_INTERNAL_ERROR` | `6` | Internal error |

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

#### `ring_goal_status`

| Value | Number | Description |
| --- | --- | --- |
| `GOAL_NOT_ACHIEVED` | `0` | not achieved. |
| `GOAL_ACHIEVED` | `1` | achieved. |
| `EVENT_INVAlID` | `2` | invalid event. |

#### `ring_remind_type`

| Value | Number | Description |
| --- | --- | --- |
| `RING_REMIND_TYPE_ALERT` | `0` | pop-up notification. |
| `RING_REMIND_TYPE_SILENT` | `1` | silent execution. |

#### `ring_remind_event_type`

| Value | Number | Description |
| --- | --- | --- |
| `INVALID_EVENT` | `0` | Invalid or unspecified event. |
| `STEP_GOAL` | `1` | step-goal status. |
| `KCAL_GOAL` | `2` | calorie-goal status. |
| `ACTIVE_TIME` | `3` | active-time goal status. |
| `STAND_TIME` | `4` | standing-time goal status. |
| `DIS_TIME` | `5` | distance-goal status. |
| `EXERCISE_TIME` | `6` | exercise-time goal status. |
| `HIGH_HEART_RATE` | `7` | high-heart-rate reminder. |
| `LOW_HEART_RATE` | `8` | low-heart-rate reminder. |
| `LOW_POWER` | `9` | low-battery reminder. |
| `NTC_HIGH_TEMPERATURE` | `10` | NTCtemperature too high. |
| `NTC_LOW_TEMPERATURE` | `11` | NTCtemperature too low. |
| `HRV_MEASURE_FAILED` | `12` | hrvmeasurement failed. |
| `STRESS_MEASURE_FAILED` | `13` | stress measurement failed. |
| `RESPIRATORY_MEASURE_FAILED` | `14` | respiratory-rate measurement failed. |
| `CHARGE_FULL` | `15` | fully charged. |
| `SYS_POWEROFF` | `16` | power-off reminder. |
| `IS_AF` | `17` | suspected atrial-fibrillation reminder. |
| `SEDENTARY_REMIND` | `18` | sedentary reminder. |
| `HIGH_STRESS` | `19` | high-stress reminder. |
| `LOW_SPO2` | `20` | low-blood-oxygen reminder. |
| `CORE_HIGH_TEMPERATURE` | `21` | core temperature too high. |
| `CORE_LOW_TEMPERATURE` | `22` | core temperature too low. |
| `EDA_HIGH_STRESS` | `23` | EDAhigh-stress reminder. |
| `WEAR_REMIND` | `24` | first not-worn reminder(15minutes) |
| `WEAR_REMIND_SEC` | `25` | second not-worn reminder(40minutes) |

#### `ring_alarm_vibrate_status`

| Value | Number | Description |
| --- | --- | --- |
| `VIBRATION_STOP` | `0` | Vibration stopped |
| `VIBRATION_START` | `1` | Vibration started |

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

### `func_table` Capability Bits

| Bit | Description |
| - | - |
| 0 | Supports the goal-achievement reminder switch `goal_achieved_switch`. |
