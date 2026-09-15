---
docId: ios-function-table
locale: en-US
title: iOS Capability Table
description: Read the firmware capability table before exposing or invoking optional features.
platform: iOS
slug: ios/function-table
order: 100
status: published
version: v2.0
---

# iOS Capability Table

## Overview

Read the firmware capability table before exposing or invoking optional features.

## Swift example

```swift
CreekInterFace.instance.getTable { model in
      // Weather is supported when this field is true.
       model.weather = true
                
 } failure: { code, message in
                
 }
```

## Protobuf data model

```protobuf
syntax = "proto3";

message function_table{
    bool is_support = 1;
    uint32 cmd_id = 2; // cmd ID; 2bytes
}

message protocol_function_table
{
    function_table disturb = 1;// do not disturb
    function_table water_remind = 2;// hydrationreminder
    function_table standing_remind = 3;// standreminder
    function_table female_health = 4;// female health
    function_table weather = 5;// weather
    function_table message_data = 6;// messagereminder
    function_table bt_call = 7;// bt
    function_table ble_call = 8;// ble
    function_table schedule_remind = 9;// day reminder
    function_table voice_assistant = 10;// voice assistant
    function_table quick_card = 11;// quick card
    function_table world_time = 12;// world clock
    function_table frequent_contacts = 13;// frequent contacts
    function_table gps = 14;// gps
    function_table online_gnss = 15;// online gnss
    function_table offline_gnss = 16;// offline gnss
    function_table emergency_contacts = 17;// emergency contacts(SOS)
    function_table hrv = 18;// hrv
    function_table button_crown = 19;// button
    function_table focus_mode = 20;// focus mode
    function_table find_watch = 21;// watch
    function_table alexa = 22;// alexa
    function_table app_list = 23;// app list
    function_table event_tracking = 24;// Event-tracking capability
    function_table strava_app = 25;// Strava integration and third-party data upload
    function_table sport_prescription = 26;// sport prescription
    function_table sport_recognition = 27;// workout recognition
    function_table msg_reply = 28;// msg reply
    function_table msg_appid_download = 29;// Dynamic message-app metadata download (icon and app name)
    function_table alipay = 30;// alipay
    function_table app_func = 31;// App-side capability table
    function_table good_morning = 32;// good-morning greeting
    function_table psp_sleep = 33;// Philips sleep data
    function_table water_assistant = 34;// hydration
    function_table ble_call_coming = 35;// Incoming-call reminder
    function_table psp_sleep_score = 36;// Philips sleep-score data
    function_table psp_sleep_nap = 37;// Philips nap data
    function_table spo2_nonsuport = 38;// unsupported flag
    function_table phonebook_nonsuport = 39;// Phonebook unsupported flag; supported by default
    function_table watch_sensors = 40;// Sensor-switch capability
    function_table psp_creek_sleep = 41;// psp creek sleep
    function_table music_file = 42;// Offline-music file capability
    function_table watch_direction = 43;// Device-orientation capability
    function_table spp_transfer = 44;// SPP transfer capability
    function_table creek_algo_sleep = 45;// creek algo sleep
    function_table good_morning_content = 46;// Custom good-morning content
    function_table alarm_nonsuport = 47;// unsupported flag
    function_table screen_brightness_nonsuport = 48;// Display-setting unsupported flag
    function_table music_control_nonsuport = 49;// unsupported flag
    function_table dial_plate_nonsuport = 50;// unsupported flag
    function_table calendar = 51;// Calendar capability
    function_table health_snap = 52;// health snapshot
    function_table gesture = 53;// gesture
    function_table ring_click_measure = 54;// Ring tap-to-measure capability
    function_table app_start_sport = 55;// Whether the app can start a workout
    function_table geobin = 56; // Whether the app can provide route-track data
}
```
