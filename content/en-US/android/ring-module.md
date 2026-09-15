---
docId: android-ring-module
locale: en-US
title: Android Ring Module
description: Use ring health measurement, reminders, workout recognition, and atrial-fibrillation measurement.
platform: Android
slug: android/ring-module
order: 143
status: published
version: v2.0
---

# Android Ring Module

Use ring health measurement, reminders, workout recognition, and atrial-fibrillation measurement.

### Health Measurement

  Error code

```kotlin
// /StartMeasurement

CreekManager.sInstance.startMeasure(
    type = selectedType,
    measureDuration = 20,
    timeout = 60,
    model =  { model: Ring.protocol_ring_click_measure_operate ->
        resultText = "Result: ${model.value}"
    },
    success = {
        statusText = "Status: Measurement succeeded ✅"
    },
    failure =  { error: CommonErrorOuterClass.CommonError ->
        statusText = "Error: ${error.message}"
    }, abnormal = {
      println("Movement detected")
   }, wearingNoStandard = {
    println("Incorrect wearing position")
}
)
  // /EndMeasurement
CreekManager.sInstance.stopMeasure(selectedType)
```

### Ring Reminder Switches

```kotlin
// /Get
 CreekManager.sInstance.getWatchReminderWitch( model = {
        model ->
    responseText.value = model.toString()
},failure = { _, m ->
    responseText.value = m
})

// /Set
val  operate =  Ring.protocol_remind_mark_switch_operate()
operate.goalAchievedSwitch = Enums.switch_type.SWITCH_ON
operate.lowPowerSwitch = Enums.switch_type.SWITCH_ON
operate.chargerFullSwitch = Enums.switch_type.SWITCH_ON
operate.findRingLedSwitch = Enums.switch_type.SWITCH_ON
operate.ntctemperatureHighSwitch = Enums.switch_type.SWITCH_ON
operate.heartRateHighSwitch = Enums.switch_type.SWITCH_ON
operate.heartRateLowSwitch = Enums.switch_type.SWITCH_ON
operate.sedentaryRemindSwitch = Enums.switch_type.SWITCH_ON
operate.highStressSwitch = Enums.switch_type.SWITCH_ON
operate.lowSpo2Switch = Enums.switch_type.SWITCH_ON
CreekManager.sInstance.setWatchReminderWitch(model = operate, success = {
    responseText.value = "success"
}, failure = {_, m ->
    responseText.value = m
})
```

### Reminder Notifications

```kotlin
CreekManager.sInstance.ringReminderListen { model ->
    
}
```

### Alarm Notifications

```kotlin
CreekManager.sInstance.ringAlarmVibrateListen { model ->
    
}
```

### Automatic Workout Recognition

```kotlin
CreekManager.sInstance.motionRecognitionListen { model ->
    
}
```

### Atrial-Fibrillation Measurement

```kotlin
// /Measurement
CreekManager.sInstance.startAFMeasure(
    measureDuration = 45,
    timeout = 60,
    pulseDuration = 15,
    model =  { model: Ring.protocol_ring_click_measure_operate ->
        resultText = "Result: ${model.value}"
        println("spo:${model.value}  pulseRateValue:${model.pulseRateValue}")
    },
    success = {
        statusText = "Status: Measurement succeeded ✅"
    },
    failure =  { error: CommonErrorOuterClass.CommonError ->
        statusText = "Error: ${error.message}"
    }, abnormal = {
        println("Movement detected")
    }, wearingNoStandard = {
        println("Incorrect wearing position")
    }, processResult = {model: Ring.protocol_ring_click_measure_operate ->
        if (model.pulseRateValue > 0) {
            resultText = "Result: ${model.pulseRateValue}"
        }
    }, onCountDown = { type, countDown ->
        if (type == HealthMeasureCountDownType.pulseRate){
            statusText = "Pulse-rate countdown: ${countDown}"
        }else if (type == HealthMeasureCountDownType.afMeasure){
            statusText = "AF measurement countdown: ${countDown}"
        }
    }
)

CreekManager.sInstance.stopAFMeasure()
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";
enum tran_direction_type
{
    WATCH_TRAN = 0;// WATCH TRAN.
    APP_TRAN = 1;// APP TRAN.
}

enum ring_health_type
{
    HEART_RATE = 0;// Heart rate
    STRESS = 1;// Stress
    SPO2 = 2;// Blood oxygen
    HRV = 3;// HRV
    RESPIRATORY_RATE = 4;// Respiratory rate
    AF = 5;// AF.
}

enum health_measure_type
{
    HEALTH_MEASURE_START = 0;// StartMeasurement
    HEALTH_MEASURE_PAUSE = 1;// PauseMeasurement
    HEALTH_MEASURE_STOP = 2;// HEALTH MEASURE STOP.
    HEALTH_MEASURE_INQUIRE = 3;// QueryState
}

enum health_measure_status
{
    HEALTH_STATUS_MEASURING = 0;// HEALTH STATUS MEASURING.
    HEALTH_STATUS_NO_WEAR = 1;// HEALTH STATUS NO WEAR.
    HEALTH_STATUS_RESULT = 2;// MeasurementResult
    HEALTH_STATUS_FAIL = 3;// MeasurementFailure
}

enum health_abnormal_status// Health Abnormal Status.
{  
    HEALTH_ABNORMAL_NONE = 0;// HEALTH ABNORMAL NONE.
    HEALTH_ABNORMAL_EXIST = 1;// HEALTH ABNORMAL EXIST.
} 

message protocol_ring_click_measure_operate
{
    tran_direction_type tran_type = 1;// Tran Type.
    ring_health_type health_type = 2;// MeasurementType
    health_measure_type measure_type = 3;// Measure Type.
    uint32 value = 4;// Value.
    uint32 measure_time = 5;// MeasurementTime
    health_measure_status measure_status = 6;// MeasurementState
    bytes data_list = 7;// Data List.
    uint32 pulse_rate_value = 8;// Pulse Rate Value.
    health_abnormal_status abnormal_status = 9;// Abnormal Status.
}

syntax = "proto3";
enum tran_direction_type
{
    WATCH_TRAN = 0;// WATCH TRAN.
    APP_TRAN = 1;// APP TRAN.
}

enum ring_goal_status 
{
    GOAL_NOT_ACHIEVED  = 0;// GOAL NOT ACHIEVED.
    GOAL_ACHIEVED = 1;// GOAL ACHIEVED.
    EVENT_INVAlID  = 2;// EVENT INVAlID.
}

message ring_remind_event_time
{
    uint32 year = 1;    // Year.
    uint32 month = 2;
    uint32 day = 3;
    uint32 hour = 4;
    uint32 minute = 5;
    uint32 second = 6;   
    uint32 duration = 7;// Duration.
}

enum ring_remind_event_type
{
    INVALID_EVENT = 0;
    STEP_GOAL = 1;   // STEP GOAL.
    KCAL_GOAL = 2;   // KCAL GOAL.
    ACTIVE_TIME = 3; // ACTIVE TIME.
    STAND_TIME = 4;  // STAND TIME.
    DIS_TIME = 5;    // DIS TIME.
    EXERCISE_TIME = 6;  // EXERCISE TIME.
    HIGH_HEART_RATE = 7;    // HeightHeart rateReminder
    LOW_HEART_RATE = 8;      // LOW HEART RATE.
    LOW_POWER = 9;           // Low batteryReminder
    NTC_HIGH_TEMPERATURE = 10;// NTC HIGH TEMPERATURE.
    NTC_LOW_TEMPERATURE = 11;// NTC LOW TEMPERATURE.
    HRV_MEASURE_FAILED = 12;  // hrvMeasurementFailure
    STRESS_MEASURE_FAILED = 13;// StressMeasurementFailure
    RESPIRATORY_MEASURE_FAILED = 14;// Respiratory rateMeasurementFailure
    CHARGE_FULL = 15;// CHARGE FULL.
    SYS_POWEROFF = 16;// SYS POWEROFF.
    IS_AF = 17;// IS AF.
    SEDENTARY_REMIND = 18;     // SEDENTARY REMIND.
    HIGH_STRESS = 19;    // StressHigh-threshold alert
    LOW_SPO2 = 20;    // Blood oxygenLow-threshold alert
}
message protocol_ring_remind_mark_operate
{
    tran_direction_type tran_type = 1;// Tran Type.
    uint32 func_table = 2;// 1bytes Function table
    ring_remind_event_type event_id = 3; // Event Id. 1bytes.
    ring_goal_status event_value = 4;// Event Value.
    ring_remind_event_time event_time = 5; // Event Time.
    ring_remind_type remind_type = 6;   // Remind Type.
    int32 current_value = 7; // Current Value.
    uint32 event_value_min = 8; // Event Value Min.
    uint32 event_value_max = 9; // Maximum event value max.
}

syntax = "proto3";
enum tran_direction_type
{
    WATCH_TRAN = 0;// WATCH TRAN.
    APP_TRAN = 1;// APP TRAN.
}
 
message protocol_ring_motion_recognition_operate
{
    tran_direction_type tran_type = 1;// Tran Type.
    uint32 func_table = 2;// 1bytes Function table
    sport_type sport_type = 2;// Sport Type.
}

syntax = "proto3";
enum tran_direction_type
{
    WATCH_TRAN = 0;// WATCH TRAN.
    APP_TRAN = 1;// APP TRAN.
}

enum ring_alarm_vibrate_status
{
    VIBRATION_STOP = 0;
    VIBRATION_START = 1;
}

message protocol_ring_alarm_vibrate_notify_operate
{
    tran_direction_type tran_type = 1;// Tran Type.
    uint32 func_table = 2;// 1bytes Function table
    uint32 alarm_id = 3;  // Alarm Id.
    uint32 hour = 4;// 1bytes
    uint32 minute = 5;// 1bytes
    bytes alarm_name = 6;    // max:30 AlarmName
    ring_alarm_vibrate_status status = 7;// Status.
}

syntax = "proto3";

enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;// Query
    SET = 2;// Set
}

enum switch_type
{
    SWITCH_NULL = 0;// NULL
    SWITCH_ON = 1;// On
    SWITCH_OFF = 2;// Off
}

message protocol_remind_mark_switch_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    switch_type goal_achieved_switch = 2;// Goal Achieved Switch switch.
    switch_type low_power_switch = 3;           // Low batteryReminderSwitch
    switch_type charger_full_switch = 4;// Charger Full Switch switch.
    switch_type find_ring_led_switch =5;// Find Ring Led Switch switch.
    switch_type ntctemperature_high_switch = 6;// NTCTemperatureHigh-threshold alertSwitch
    switch_type heart_rate_high_switch = 7;// Heart rateHigh-threshold alertSwitch
    switch_type heart_rate_low_switch = 8;// Heart rateLow-threshold alertSwitch
    switch_type sedentary_remind_switch = 9;  // Sedentary Remind Switch switch.
    switch_type high_stress_switch = 10;   // StressHigh-threshold alertSwitch
    switch_type low_spo2_switch = 11;   // Low Spo2 Switch switch.
    switch_type af_abnormal_switch = 12;   // Af Abnormal Switch switch.
}

message protocol_remind_switch_inquire_reply
{
    uint32 func_table = 1;// 1bytes Function table
    operate_type operate = 2; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    switch_type goal_achieved_switch = 3;// Goal Achieved Switch switch.
    switch_type low_power_switch = 4;           // Low batteryReminderSwitch
    switch_type charger_full_switch = 5;// Charger Full Switch switch.
    switch_type find_ring_led_switch = 6;// Find Ring Led Switch switch.
    switch_type ntctemperature_high_switch = 7;// NTCTemperatureHigh-threshold alertSwitch
    switch_type heart_rate_high_switch = 8;// Heart rateHigh-threshold alertSwitch
    switch_type heart_rate_low_switch = 9;
    switch_type sedentary_remind_switch = 10;  // Sedentary Remind Switch switch.
    switch_type high_stress_switch = 11;   // StressHigh-threshold alertSwitch
    switch_type low_spo2_switch = 12;   // Low Spo2 Switch switch.
    switch_type af_abnormal_switch = 13;   // Af Abnormal Switch switch.
}
```

### `func_table` Bit Definitions

| Bit | Description |
| - | - |
| 0 | Whether the goal-achievement reminder switch is supported, Affects goal_achieved_switch |
