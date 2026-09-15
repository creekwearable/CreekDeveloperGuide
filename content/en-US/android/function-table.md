---
docId: android-function-table
locale: en-US
title: Android Function Table
description: Query the device capability table and feature switches.
platform: Android
slug: android/function-table
order: 100
status: published
version: v2.0
---

# Android Function Table

Query the device capability table and feature switches.

```kotlin
CreekManager.sInstance.getTable(model = {
    
}, failure = {_,_ ->
    
})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

message function_table{
    bool is_support = 1;
    uint32 cmd_id = 2; // 2bytes
}

message protocol_function_table
{
    function_table disturb = 1;// Do Not Disturb
    function_table water_remind = 2;// Water reminder
    function_table standing_remind = 3;// Standing reminder
    function_table female_health = 4;// Women health
    function_table weather = 5;// Weather
    function_table message_data = 6;// Message notification
    function_table bt_call = 7;// Bt Call.
    function_table ble_call = 8;// Ble Call.
    function_table schedule_remind = 9;// Schedule reminder
    function_table voice_assistant = 10;// Voice assistant
    function_table quick_card = 11;// Quick card
    function_table world_time = 12;// World clock
    function_table frequent_contacts = 13;// Frequent contacts
    function_table gps = 14;// Gps.
    function_table online_gnss = 15;// Online Gnss.
    function_table offline_gnss = 16;// Offline Gnss.
    function_table emergency_contacts = 17;// Emergency contact(SOS)
    function_table hrv = 18;// hrv
    function_table button_crown = 19;// Button Crown.
    function_table focus_mode = 20;// Focus Mode.
    function_table find_watch = 21;// Find watch
    function_table alexa = 22;// alexa
    function_table app_list = 23;// App list
    function_table event_tracking = 24;// Event Tracking.
    function_table strava_app = 25;// Strava App.
    function_table sport_prescription = 26;// Sport Prescription.
    function_table sport_recognition = 27;// Sport Recognition.
    function_table msg_reply = 28;// Quick reply
    function_table msg_appid_download = 29;// Msg Appid Download.
    function_table alipay = 30;// Alipay.
    function_table app_func = 31;// appFunction table
    function_table good_morning = 32;// Good Morning.
    function_table psp_sleep = 33;// Psp Sleep.
    function_table water_assistant = 34;// Water Assistant.
    function_table ble_call_coming = 35;// Incoming-call reminder
    function_table psp_sleep_score = 36;// Psp Sleep Score.
    function_table psp_sleep_nap = 37;// Psp Sleep Nap.
    function_table spo2_nonsuport = 38;// Spo2 Nonsuport.
    function_table phonebook_nonsuport = 39;// Phonebook Nonsuport.
    function_table watch_sensors = 40;// SensorSwitch
    function_table psp_creek_sleep = 41;// Psp Creek Sleep.
    function_table music_file = 42;// Music File.
    function_table watch_direction = 43;// Watch Direction.
    function_table spp_transfer = 44;// Spp Transfer.
    function_table creek_algo_sleep = 45;// Creek Algo Sleep.
    function_table good_morning_content = 46;// Good Morning Content.
    function_table alarm_nonsuport = 47;// Alarm Nonsuport.
    function_table screen_brightness_nonsuport = 48;// Screen Brightness Nonsuport.
    function_table music_control_nonsuport = 49;// Music Control Nonsuport.
    function_table dial_plate_nonsuport = 50;// Dial Plate Nonsuport.
    function_table calendar = 51;// Calendar.
    function_table health_snap = 52;// Health snapshot
    function_table gesture = 53;// Gesture.
    function_table ring_click_measure = 54;// Ring Click Measure.
    function_table app_start_sport = 55;// App Start Sport.
    function_table geobin = 56; // Geobin.
}
```

### `func_table` Bit Definitions

| - | - |
| 0 | FirmwareFunction table |
| 1 | appFunction table |
