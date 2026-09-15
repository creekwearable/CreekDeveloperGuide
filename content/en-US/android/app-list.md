---
docId: android-app-list
locale: en-US
title: Android App List
description: Read and configure the device app list.
platform: Android
slug: android/app-list
order: 127
status: published
version: v2.0
---

# Android App List

Read and configure the device app list.

```kotlin
// /Get
CreekManager.sInstance.getAppList({model: AppList.protocol_app_list_inquire_reply ->
    responseText.value = model.toString()
}, failure = {_, m ->
    responseText.value = m
})

// /Set
CreekManager.sInstance.setAppList(model = operate, success = {
    responseText.value = "success"
}, failure = {_, m ->
    responseText.value = m
})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

enum app_list
{
    APP_LIST_ACTIVITY   = 0;// APP LIST ACTIVITY.
    APP_LIST_WORKOUT    = 1;// Workout
    APP_LIST_STEPS      = 2;// APP LIST STEPS.
    APP_LIST_HEARTRATE  = 3;// Heart rate
    APP_LIST_SLEEP      = 4;// APP LIST SLEEP.
    APP_LIST_STRESS     = 5;// Stress
    APP_LIST_MENSTRUATION = 6;// Women health
    APP_LIST_BREATHE    = 7;// APP LIST BREATHE.
    APP_LIST_ALARMS     = 8;// Alarm
    APP_LIST_PHONE      = 9;// APP LIST PHONE.
    APP_LIST_TIMERS     = 10;// APP LIST TIMERS.
    APP_LIST_STOPWATCH  = 11;// APP LIST STOPWATCH.
    APP_LIST_SPO2       = 12;// Blood oxygen
    APP_LIST_WEATHER    = 13;// Weather
    APP_LIST_CAMERA_REMOTE = 14;// APP LIST CAMERA REMOTE.
    APP_LIST_MUSIC      = 15;// Music control
    APP_LIST_FIND_PHONE = 16;// APP LIST FIND PHONE.
    APP_LIST_WORLD_CLOCK = 17;// World clock
    APP_LIST_SETTINGS = 18;// Set
}

message protocol_app_list_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    repeated app_list list = 2;
}

message protocol_app_list_inquire_reply
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    uint32 func_table = 2;
    uint32 support_show_num = 3; // 1bytes App listShownCount
    repeated app_list list  = 4;
    bool app_list_activity_support = 5;
    bool app_list_workout_support = 6;
    bool app_list_steps_support = 7;
    bool app_list_heartrate_support  = 8;// Heart rate
    bool app_list_sleep_support      = 9;// App List Sleep Support.
    bool app_list_stress_support     = 10;// Stress
    bool app_list_menstruation_support = 11;// Women health
    bool app_list_breathe_support    = 12;// App List Breathe Support.
    bool app_list_alarms_support     = 13;// Alarm
    bool app_list_phone_support      = 14;// App List Phone Support.
    bool app_list_timers_support     = 15;// App List Timers Support.
    bool app_list_stopwatch_support  = 16;// App List Stopwatch Support.
    bool app_list_spo2_support       = 17;// Blood oxygen
    bool app_list_weather_support    = 18;// Weather
    bool app_list_camera_remote_support = 19;// App List Camera Remote Support.
    bool app_list_music_support      = 20;// Music control
    bool app_list_find_phone_support = 21;// App List Find Phone Support.
    bool app_list_world_clock_support = 22;// World clock
    bool app_list_settings_support = 23;// Set
}
```
