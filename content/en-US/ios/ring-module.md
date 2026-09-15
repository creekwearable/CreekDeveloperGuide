---
docId: ios-ring-module
locale: en-US
title: iOS Ring Module
description: Integrate ring health measurement, reminder switches, reminder events, alarm events, and workout recognition.
platform: iOS
slug: ios/ring-module
order: 143
status: published
version: v2.0
---

# iOS Ring Module

## Overview

Integrate ring health measurement, reminder switches, reminder events, alarm events, and workout recognition.

## Swift example

```swift
// start
 CreekInterFace.instance.startMeasure(type: selectedType,measureDuration: 30,timeout: 60) { [weak self] model in
          self?.resultLabel.text = "Result: \(model.value)"
       } success: {[weak self] in
          self?.statusLabel.text = "Status: Measurement completed ✅"
       } failure: {[weak self] model in
          self?.statusLabel.text = model.message
       } abnormal: {
          print("Movement detected")
       } wearingNoStandard: {
          print("Incorrect wearing position")
       }
  // end
  CreekInterFace.instance.stopMeasure(type: selectedType)
```

```swift
// get
     CreekInterFace.instance.getWatchReminderWitch { model in

         } failure: { code, message in
    
     }
     // set
         var  operate =  protocol_remind_mark_switch_operate()
         operate.goalAchievedSwitch = switch_type.switchOn
         operate.lowPowerSwitch = switch_type.switchOn
         operate.chargerFullSwitch = switch_type.switchOn
         operate.findRingLedSwitch = switch_type.switchOn
         operate.ntctemperatureHighSwitch = switch_type.switchOn
         operate.heartRateHighSwitch = switch_type.switchOn
         operate.heartRateLowSwitch = switch_type.switchOn
         operate.sedentaryRemindSwitch = switch_type.switchOn
         operate.highStressSwitch = switch_type.switchOn
         operate.lowSpo2Switch = switch_type.switchOn
         CreekInterFace.instance.setWatchReminderWitch(model: operate) {
             self.textView.text = "success"
         } failure: { code, message in
            self.textView.text = message
         }
```

```swift
CreekInterFace.instance.ringReminderListen { model in
            let json = try? model.jsonString()
            print(json ?? "")
 }
```

```swift
CreekInterFace.instance.ringAlarmVibrateListen { model in
            let json = try? model.jsonString()
            print(json ?? "")
   }
```

```swift
CreekInterFace.instance.motionRecognitionListen { model in
            let json = try? model.jsonString()
            print(json ?? "")
 }
```

```swift
   CreekInterFace.instance.startAFMeasure { [weak self]  model in
         self?.resultLabel.text = "Result: \(model.value), pulse rate: \(model.pulseRateValue)"
      } success: {
         self.statusLabel.text = "Status: Measurement completed ✅"
      } failure: { model in
         self.statusLabel.text = model.message
      } abnormal: {
         print("Movement detected")
      } wearingNoStandard: {
         print("Incorrect wearing position")
      } processResult: { model in
         if model.pulseRateValue > 0{
           
         }
      } onCountDown: { type, remainSeconds in
         if type == .pulseRate {
            print("pulseRate:\(remainSeconds)")
         }else if type == .afMeasure {
            print("afMeasure:\(remainSeconds)")
         }
      }
      
   CreekInterFace.instance.stopAFMeasure()
```

## Capability-table fields

Check these fields after reading `protocol_function_table`:

```protobuf
message function_table {
    bool is_support = 1;// Whether the capability is supported.
    uint32 cmd_id = 2;// Capability command identifier.
}

message protocol_function_table {
    function_table ring_click_measure = 54;// Ring tap-to-measure capability.
    function_table sport_recognition = 27;// Workout-recognition capability.
}
```

## Protobuf data model

```protobuf
syntax = "proto3";
enum tran_direction_type
{
    WATCH_TRAN = 0;// watch
    APP_TRAN = 1;// app
}

enum ring_health_type
{
    HEART_RATE = 0;// HEART RATE
    STRESS = 1;// STRESS
    SPO2 = 2;// SpO2
    HRV = 3;// HRV
    RESPIRATORY_RATE = 4;// RESPIRATORY RATE
    AF = 5;// AF
}

enum health_measure_type
{
    HEALTH_MEASURE_START = 0;// start
    HEALTH_MEASURE_PAUSE = 1;// HEALTH MEASURE PAUSE
    HEALTH_MEASURE_STOP = 2;// HEALTH MEASURE STOP
    HEALTH_MEASURE_INQUIRE = 3;// Query measurement status
}

enum health_measure_status
{
    HEALTH_STATUS_MEASURING = 0;// HEALTH STATUS MEASURING
    HEALTH_STATUS_NO_WEAR = 1;// HEALTH STATUS NO WEAR
    HEALTH_STATUS_RESULT = 2;// HEALTH STATUS RESULT
    HEALTH_STATUS_FAIL = 3;// failed
}

enum health_abnormal_status// status
{  
    HEALTH_ABNORMAL_NONE = 0;// HEALTH ABNORMAL NONE
    HEALTH_ABNORMAL_EXIST = 1;// HEALTH ABNORMAL EXIST
} 

message protocol_ring_click_measure_operate
{
    tran_direction_type tran_type = 1;// tran type
    ring_health_type health_type = 2;// type
    health_measure_type measure_type = 3;// measure type
    uint32 value = 4;// value
    uint32 measure_time = 5;// time
    health_measure_status measure_status = 6;// status
    bytes data_list = 7;// data
    uint32 pulse_rate_value = 8;// value
    health_abnormal_status abnormal_status = 9;// status
}
```

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;// query
    SET = 2;// set
}

enum switch_type
{
    SWITCH_NULL = 0;// NULL
    SWITCH_ON = 1;// enable
    SWITCH_OFF = 2;// disable
}

message protocol_remind_mark_switch_operate
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    switch_type goal_achieved_switch = 2;// Goal-achieved reminder
    switch_type low_power_switch = 3;// Low-battery reminder
    switch_type charger_full_switch = 4;// Charging-complete reminder
    switch_type find_ring_led_switch =5;// Find-ring LED
    switch_type ntctemperature_high_switch = 6;// High-temperature reminder
    switch_type heart_rate_high_switch = 7;// High-heart-rate reminder
    switch_type heart_rate_low_switch = 8;// Low-heart-rate reminder
    switch_type sedentary_remind_switch = 9;// Sedentary reminder
    switch_type high_stress_switch = 10;// High-stress reminder
    switch_type low_spo2_switch = 11;// Low-SpO2 reminder
    switch_type af_abnormal_switch = 12;// Abnormal-AF reminder
}

message protocol_remind_switch_inquire_reply
{
    uint32 func_table = 1;// Ring-reminder capability bit field
    operate_type operate = 2; // Operation: 0 invalid, 1 query, 2 set
    switch_type goal_achieved_switch = 3;// Goal-achieved reminder
    switch_type low_power_switch = 4;// Low-battery reminder
    switch_type charger_full_switch = 5;// Charging-complete reminder
    switch_type find_ring_led_switch = 6;// Find-ring LED
    switch_type ntctemperature_high_switch = 7;// High-temperature reminder
    switch_type heart_rate_high_switch = 8;// High-heart-rate reminder
    switch_type heart_rate_low_switch = 9;// Low-heart-rate reminder
    switch_type sedentary_remind_switch = 10;// Sedentary reminder
    switch_type high_stress_switch = 11;// High-stress reminder
    switch_type low_spo2_switch = 12;// Low-SpO2 reminder
    switch_type af_abnormal_switch = 13;// Abnormal-AF reminder
}
```

```protobuf
syntax = "proto3";
enum tran_direction_type
{
    WATCH_TRAN = 0;// watch
    APP_TRAN = 1;// app
}

enum ring_goal_status 
{
    GOAL_NOT_ACHIEVED  = 0;// GOAL NOT ACHIEVED
    GOAL_ACHIEVED = 1;// GOAL ACHIEVED
    EVENT_INVAlID  = 2;// invalid
}

message ring_remind_event_time
{
    uint32 year = 1;    // time
    uint32 month = 2;
    uint32 day = 3;
    uint32 hour = 4;
    uint32 minute = 5;
    uint32 second = 6;   
    uint32 duration = 7;// Event duration
}

enum ring_remind_event_type
{
    INVALID_EVENT = 0;
    STEP_GOAL = 1;   // status
    KCAL_GOAL = 2;   // status
    ACTIVE_TIME = 3; // status
    STAND_TIME = 4;  // stand status
    DIS_TIME = 5;    // status
    EXERCISE_TIME = 6;  // status
    HIGH_HEART_RATE = 7;    // height reminder
    LOW_HEART_RATE = 8;      // reminder
    LOW_POWER = 9;           // Low-battery reminder
    NTC_HIGH_TEMPERATURE = 10;// High-temperature reminder
    NTC_LOW_TEMPERATURE = 11;// Low-temperature reminder
    HRV_MEASURE_FAILED = 12;  // HRV measurement failed
    STRESS_MEASURE_FAILED = 13;// Stress measurement failed
    RESPIRATORY_MEASURE_FAILED = 14;// Respiratory-rate measurement failed
    CHARGE_FULL = 15;// CHARGE FULL
    SYS_POWEROFF = 16;// reminder
    IS_AF = 17;// reminder
    SEDENTARY_REMIND = 18;     // reminder
    HIGH_STRESS = 19;    // High-stress reminder
    LOW_SPO2 = 20;    // Low-SpO2 reminder
}
message protocol_ring_remind_mark_operate
{
    tran_direction_type tran_type = 1;// tran type
    uint32 func_table = 2;// Reminder-event capability bit field
    ring_remind_event_type event_id = 3; // Reminder-event category
    ring_goal_status event_value = 4;// Goal state carried by the event
    ring_remind_event_time event_time = 5; // Time associated with the event
    ring_remind_type remind_type = 6;   // Reminder presentation type
    int32 current_value = 7; // Current value multiplied by 100
    uint32 event_value_min = 8; // Minimum threshold value
    uint32 event_value_max = 9; // Maximum threshold value
}
```

```protobuf
syntax = "proto3";
enum tran_direction_type
{
    WATCH_TRAN = 0;// watch
    APP_TRAN = 1;// app
}

enum ring_alarm_vibrate_status
{
    VIBRATION_STOP = 0;
    VIBRATION_START = 1;
}

message protocol_ring_alarm_vibrate_notify_operate
{
    tran_direction_type tran_type = 1;// tran type
    uint32 func_table = 2;// Alarm-event capability bit field
    uint32 alarm_id = 3;  // Alarm identifier, starting at 0
    uint32 hour = 4;// Alarm hour
    uint32 minute = 5;// Alarm minute
    bytes alarm_name = 6;    // Alarm name, up to 30 bytes
    ring_alarm_vibrate_status status = 7;// Vibration state
}
```

```protobuf
syntax = "proto3";
enum tran_direction_type
{
    WATCH_TRAN = 0;// watch
    APP_TRAN = 1;// app
}
 
message protocol_ring_motion_recognition_operate
{
    tran_direction_type tran_type = 1;// tran type
    uint32 func_table = 2;// Workout-recognition capability bit field
    sport_type sport_type = 2;// Recognized workout type
}
```
