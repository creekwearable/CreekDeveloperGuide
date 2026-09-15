---
docId: flutter-app-list
locale: en-US
title: "Flutter App List"
description: "Read and configure the device application list."
platform: Flutter
slug: flutter/app-list
order: 123
status: published
version: v2.0
---

# Flutter App List

Read and configure the device application list.

## SDK Usage

```dart
///get
sdkManager.getAppList(callBack: (e){
  protocol_app_list_operate operate = protocol_app_list_operate();
  operate.list.addAll(e.list);
  sdkManager.setAppList(operate: operate);
},errCallBack: (e){

});
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum app_list
{
     APP_LIST_ACTIVITY = 0;// Activity
     APP_LIST_WORKOUT = 1;// Sports
     APP_LIST_STEPS = 2; // Step counting
     APP_LIST_HEARTRATE = 3; // Heart rate
     APP_LIST_SLEEP = 4;// Sleep
     APP_LIST_STRESS = 5;// Pressure
     APP_LIST_MENSTRUATION = 6;// Women’s Health
     APP_LIST_BREATHE = 7;// breathing training
     APP_LIST_ALARMS = 8; // Alarm clock
     APP_LIST_PHONE = 9; // Phone
     APP_LIST_TIMERS = 10;// Countdown
     APP_LIST_STOPWATCH = 11;// Stopwatch
     APP_LIST_SPO2 = 12;// blood oxygen
     APP_LIST_WEATHER = 13;// Weather
     APP_LIST_CAMERA_REMOTE = 14; // Camera control
     APP_LIST_MUSIC = 15; // Music control
     APP_LIST_FIND_PHONE = 16;// Find mobile phone
     APP_LIST_WORLD_CLOCK = 17;// World clock
     APP_LIST_SETTINGS = 18;// Settings
}

message protocol_app_list_operate
{
     operate_type operate = 1; // 1bytes operation type 0: invalid operation 1: query 2: setting
     repeated app_list list = 2; // Application entries.
}

message protocol_app_list_inquire_reply
{
     operate_type operate = 1; // 1bytes operation type 0: invalid operation 1: query 2: setting
     uint32 func_table = 2; // Capability bitmask.
     uint32 support_show_num = 3; // 1bytes application list display number
     repeated app_list list = 4; // Application entries.
     bool app_list_activity_support = 5; // Whether application-list entries support activity data.
     bool app_list_workout_support = 6; // Whether application-list entries support workout data.
     bool app_list_steps_support = 7; // Whether application-list entries support steps data.
     bool app_list_heartrate_support = 8; // Heart rate
     bool app_list_sleep_support = 9;// sleep
     bool app_list_stress_support = 10;// Stress
     bool app_list_menstruation_support = 11;// Women’s Health
     bool app_list_breathe_support = 12;// breathing training
     bool app_list_alarms_support = 13;// alarm clock
     bool app_list_phone_support = 14;// Phone
     bool app_list_timers_support = 15;// Countdown
     bool app_list_stopwatch_support = 16;// Stopwatch
     bool app_list_spo2_support = 17;// blood oxygen
     bool app_list_weather_support = 18;// Weather
     bool app_list_camera_remote_support = 19; // Camera control
     bool app_list_music_support = 20;// Music control
     bool app_list_find_phone_support = 21;// Find mobile phone
     bool app_list_world_clock_support = 22;// World clock
     bool app_list_settings_support = 23;// Settings
}
```

### Field Reference

#### `protocol_app_list_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes operation type 0: invalid operation 1: query 2: setting |
| `list` | `repeated app_list` | Application entries. |

#### `protocol_app_list_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes operation type 0: invalid operation 1: query 2: setting |
| `func_table` | `uint32` | Capability bitmask. |
| `support_show_num` | `uint32` | 1bytes application list display number |
| `list` | `repeated app_list` | Application entries. |
| `app_list_activity_support` | `bool` | Whether application-list entries support activity data. |
| `app_list_workout_support` | `bool` | Whether application-list entries support workout data. |
| `app_list_steps_support` | `bool` | Whether application-list entries support steps data. |
| `app_list_heartrate_support` | `bool` | Heart rate |
| `app_list_sleep_support` | `bool` | sleep |
| `app_list_stress_support` | `bool` | Stress |
| `app_list_menstruation_support` | `bool` | Women’s Health |
| `app_list_breathe_support` | `bool` | breathing training |
| `app_list_alarms_support` | `bool` | alarm clock |
| `app_list_phone_support` | `bool` | Phone |
| `app_list_timers_support` | `bool` | Countdown |
| `app_list_stopwatch_support` | `bool` | Stopwatch |
| `app_list_spo2_support` | `bool` | blood oxygen |
| `app_list_weather_support` | `bool` | Weather |
| `app_list_camera_remote_support` | `bool` | Camera control |
| `app_list_music_support` | `bool` | Music control |
| `app_list_find_phone_support` | `bool` | Find mobile phone |
| `app_list_world_clock_support` | `bool` | World clock |
| `app_list_settings_support` | `bool` | Settings |

### Enum Values

#### `app_list`

| Value | Number | Description |
| --- | --- | --- |
| `APP_LIST_ACTIVITY` | `0` | Activity |
| `APP_LIST_WORKOUT` | `1` | Sports |
| `APP_LIST_STEPS` | `2` | Step counting |
| `APP_LIST_HEARTRATE` | `3` | Heart rate |
| `APP_LIST_SLEEP` | `4` | Sleep |
| `APP_LIST_STRESS` | `5` | Pressure |
| `APP_LIST_MENSTRUATION` | `6` | Women’s Health |
| `APP_LIST_BREATHE` | `7` | breathing training |
| `APP_LIST_ALARMS` | `8` | Alarm clock |
| `APP_LIST_PHONE` | `9` | Phone |
| `APP_LIST_TIMERS` | `10` | Countdown |
| `APP_LIST_STOPWATCH` | `11` | Stopwatch |
| `APP_LIST_SPO2` | `12` | blood oxygen |
| `APP_LIST_WEATHER` | `13` | Weather |
| `APP_LIST_CAMERA_REMOTE` | `14` | Camera control |
| `APP_LIST_MUSIC` | `15` | Music control |
| `APP_LIST_FIND_PHONE` | `16` | Find mobile phone |
| `APP_LIST_WORLD_CLOCK` | `17` | World clock |
| `APP_LIST_SETTINGS` | `18` | Settings |
