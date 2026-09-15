---
docId: ios-app-list
locale: en-US
title: iOS App List
description: Read and update the device app list.
platform: iOS
slug: ios/app-list
order: 127
status: published
version: v2.0
---

# iOS App List

## Overview

Read and update the device app list.

## Swift example

```swift
// Get the app list.
CreekInterFace.instance.getAppList { model in
                var operate = protocol_app_list_operate()
                operate.list = model.list
                
                // Set the app list.
                CreekInterFace.instance.setAppList(model: operate) {
                    self.view.hideRemark()
                    self.textView.text = "success"
                } failure: { code, message in
                    self.view.hideRemark()
                    self.textView.text = message
                }
            } failure: { code, message in
                self.view.hideRemark()
                self.textView.text = message
            }
```

## Capability-table fields

Check these fields after reading `protocol_function_table`:

```protobuf
message function_table {
    bool is_support = 1;//Whether the capability is supported.
    uint32 cmd_id = 2;//Capability command identifier.
}

message protocol_function_table {
    function_table app_list = 23;//App-list capability.
}
```

## Protobuf data model

```protobuf
syntax = "proto3";

enum app_list
{
    APP_LIST_ACTIVITY   = 0;// APP LIST ACTIVITY
    APP_LIST_WORKOUT    = 1;// APP LIST WORKOUT
    APP_LIST_STEPS      = 2;// APP LIST STEPS
    APP_LIST_HEARTRATE  = 3;// APP LIST HEARTRATE
    APP_LIST_SLEEP      = 4;// APP LIST SLEEP
    APP_LIST_STRESS     = 5;// APP LIST STRESS
    APP_LIST_MENSTRUATION = 6;// female health
    APP_LIST_BREATHE    = 7;// APP LIST BREATHE
    APP_LIST_ALARMS     = 8;// APP LIST ALARMS
    APP_LIST_PHONE      = 9;// APP LIST PHONE
    APP_LIST_TIMERS     = 10;// APP LIST TIMERS
    APP_LIST_STOPWATCH  = 11;// second
    APP_LIST_SPO2       = 12;// APP LIST SpO2
    APP_LIST_WEATHER    = 13;// weather
    APP_LIST_CAMERA_REMOTE = 14;// APP LIST CAMERA REMOTE
    APP_LIST_MUSIC      = 15;// APP LIST MUSIC
    APP_LIST_FIND_PHONE = 16;// APP LIST FIND PHONE
    APP_LIST_WORLD_CLOCK = 17;// world clock
    APP_LIST_SETTINGS = 18;// set
}

message protocol_app_list_operate
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    repeated app_list list = 2;
}

message protocol_app_list_inquire_reply
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    uint32 func_table = 2;
    uint32 support_show_num = 3; // support show num; 1bytes app list count
    repeated app_list list  = 4;
    bool app_list_activity_support = 5;
    bool app_list_workout_support = 6;
    bool app_list_steps_support = 7;
    bool app_list_heartrate_support  = 8;// app list heartrate support
    bool app_list_sleep_support      = 9;// app list sleep support
    bool app_list_stress_support     = 10;// app list stress support
    bool app_list_menstruation_support = 11;// female health
    bool app_list_breathe_support    = 12;// app list breathe support
    bool app_list_alarms_support     = 13;// app list alarms support
    bool app_list_phone_support      = 14;// app list phone support
    bool app_list_timers_support     = 15;// app list timers support
    bool app_list_stopwatch_support  = 16;// second
    bool app_list_spo2_support       = 17;// app list SpO2 support
    bool app_list_weather_support    = 18;// weather
    bool app_list_camera_remote_support = 19;// app list camera remote support
    bool app_list_music_support      = 20;// app list music support
    bool app_list_find_phone_support = 21;// app list find phone support
    bool app_list_world_clock_support = 22;// world clock
    bool app_list_settings_support = 23;// set
}
```
