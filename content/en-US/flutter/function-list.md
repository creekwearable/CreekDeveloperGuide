---
docId: flutter-function-list
locale: en-US
title: "Flutter Function List"
description: "Query the capabilities supported by the current device."
platform: Flutter
slug: flutter/function-list
order: 100
status: published
version: v2.0
---

# Flutter Function List

Query the capabilities supported by the current device.

## SDK Usage

```dart
sdkManager.getTable(callBack: (e){

},errCallBack: (e){

});
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

message function_table {
    bool is_support = 1; // Whether the feature is supported.
    uint32 cmd_id = 2; // 2 bytes
}

message protocol_function_table {
    function_table disturb = 1; // Do Not Disturb
    function_table water_remind = 2; // Drink water reminder
    function_table standing_remind = 3; // Stand-up reminder
    function_table female_health = 4; // Female health
    function_table weather = 5; // Weather
    function_table message_data = 6; // Message notifications
    function_table bt_call = 7; // BT protocol call
    function_table ble_call = 8; // BLE protocol call
    function_table schedule_remind = 9; // Schedule reminder
    function_table voice_assistant = 10; // Voice assistant
    function_table quick_card = 11; // Quick card
    function_table world_time = 12; // World clock
    function_table frequent_contacts = 13; // Frequent contacts
    function_table gps = 14; // GPS feature
    function_table online_gnss = 15; // Online ephemeris
    function_table offline_gnss = 16; // Offline ephemeris
    function_table emergency_contacts = 17; // Emergency contacts (SOS)
    function_table hrv = 18; // HRV
    function_table button_crown = 19; // Button shortcut operation
    function_table focus_mode = 20; // Focus mode
    function_table find_watch = 21; // Find watch
    function_table alexa = 22; // Alexa
    function_table app_list = 23; // App list
    function_table event_tracking = 24; // Event tracking (data analytics)
    function_table strava_app = 25; // Strava support (upload to third-party platform)
    function_table sport_prescription = 26; // Sport prescription
    function_table sport_recognition = 27; // Sport recognition
    function_table msg_reply = 28; // Quick reply
    function_table msg_appid_download = 29; // Message dynamic download (icon + app name)
    function_table alipay = 30; // Alipay
    function_table app_func = 31; // App function table
    function_table good_morning = 32; // Good morning greeting
    function_table psp_sleep = 33; // Philips sleep data
    function_table water_assistant = 34; // Hydration assistant
    function_table ble_call_coming = 35; // Incoming call reminder
    function_table psp_sleep_score = 36; // Philips sleep score data
    function_table psp_sleep_nap = 37; // Philips nap sleep data
    function_table spo2_nonsuport = 38; // Whether SpO2 is unsupported
    function_table phonebook_nonsuport = 39; // Whether phonebook is unsupported (default: supported)
    function_table watch_sensors = 40; // Sensor settings
    function_table psp_creek_sleep = 41; // Combined Creek Sleep and Philips Sleep
    function_table music_file = 42; // Music file support
    function_table watch_direction = 43; // Watch orientation
    function_table spp_transfer = 44; // SPP transfer
    function_table creek_algo_sleep = 45; // Combined Creek Sleep and Creek Algorithm
    function_table good_morning_content = 46; // Custom good morning message
    function_table alarm_nonsuport = 47; // Whether alarm is unsupported
    function_table screen_brightness_nonsuport = 48; // Whether screen brightness is unsupported
    function_table music_control_nonsuport = 49; // Whether music control is unsupported
    function_table dial_plate_nonsuport = 50; // Whether watch face is unsupported
    function_table calendar = 51; // Calendar
    function_table health_snap = 52; // Health snapshot
    function_table gesture = 53; // Gesture
    function_table ring_click_measure = 54; // Ring click measurement
    function_table app_start_sport = 55; // App can start workout
    function_table geobin = 56; // Geobin route data support
    function_table workout_course = 57; // Workout course
    function_table user_icon = 58; // User avatar download
    function_table body_temperature = 59; // Body temperature
    function_table remind_switch = 60; // Reminder switch table
    function_table batt_case_info = 61; // Charging case support
    function_table ble_hid_pair = 62; // BLE HID pairing support
    function_table map_route = 63; // Route map support
    function_table map_ofline = 64; // Offline map support
    function_table super_msg = 65; // Super notification support
    function_table blood_pressure = 66; // Blood pressure support
    function_table medicine_remind = 67; // Medicine reminder support
    function_table cardio_fitness = 68; // Cardio fitness support
    function_table training_load = 69; // Training load support
    function_table volume_adjust = 70; // Volume adjustment support
    function_table action_guide = 71; // Action guidance support
    function_table training_readiness = 72; // Training readiness support
    function_table total_mileage = 73; // Total mileage support
    function_table disturb_switch = 74; // Use scheduled Do Not Disturb switch settings
}
```

### Field Reference

#### `function_table`

| Field | Type | Description |
| --- | --- | --- |
| `is_support` | `bool` | Whether the feature is supported. |
| `cmd_id` | `uint32` | 2 bytes |

#### `protocol_function_table`

| Field | Type | Description |
| --- | --- | --- |
| `disturb` | `function_table` | Do Not Disturb |
| `water_remind` | `function_table` | Drink water reminder |
| `standing_remind` | `function_table` | Stand-up reminder |
| `female_health` | `function_table` | Female health |
| `weather` | `function_table` | Weather |
| `message_data` | `function_table` | Message notifications |
| `bt_call` | `function_table` | BT protocol call |
| `ble_call` | `function_table` | BLE protocol call |
| `schedule_remind` | `function_table` | Schedule reminder |
| `voice_assistant` | `function_table` | Voice assistant |
| `quick_card` | `function_table` | Quick card |
| `world_time` | `function_table` | World clock |
| `frequent_contacts` | `function_table` | Frequent contacts |
| `gps` | `function_table` | GPS feature |
| `online_gnss` | `function_table` | Online ephemeris |
| `offline_gnss` | `function_table` | Offline ephemeris |
| `emergency_contacts` | `function_table` | Emergency contacts (SOS) |
| `hrv` | `function_table` | HRV |
| `button_crown` | `function_table` | Button shortcut operation |
| `focus_mode` | `function_table` | Focus mode |
| `find_watch` | `function_table` | Find watch |
| `alexa` | `function_table` | Alexa |
| `app_list` | `function_table` | App list |
| `event_tracking` | `function_table` | Event tracking (data analytics) |
| `strava_app` | `function_table` | Strava support (upload to third-party platform) |
| `sport_prescription` | `function_table` | Sport prescription |
| `sport_recognition` | `function_table` | Sport recognition |
| `msg_reply` | `function_table` | Quick reply |
| `msg_appid_download` | `function_table` | Message dynamic download (icon + app name) |
| `alipay` | `function_table` | Alipay |
| `app_func` | `function_table` | App function table |
| `good_morning` | `function_table` | Good morning greeting |
| `psp_sleep` | `function_table` | Philips sleep data |
| `water_assistant` | `function_table` | Hydration assistant |
| `ble_call_coming` | `function_table` | Incoming call reminder |
| `psp_sleep_score` | `function_table` | Philips sleep score data |
| `psp_sleep_nap` | `function_table` | Philips nap sleep data |
| `spo2_nonsuport` | `function_table` | Whether SpO2 is unsupported |
| `phonebook_nonsuport` | `function_table` | Whether phonebook is unsupported (default: supported) |
| `watch_sensors` | `function_table` | Sensor settings |
| `psp_creek_sleep` | `function_table` | Combined Creek Sleep and Philips Sleep |
| `music_file` | `function_table` | Music file support |
| `watch_direction` | `function_table` | Watch orientation |
| `spp_transfer` | `function_table` | SPP transfer |
| `creek_algo_sleep` | `function_table` | Combined Creek Sleep and Creek Algorithm |
| `good_morning_content` | `function_table` | Custom good morning message |
| `alarm_nonsuport` | `function_table` | Whether alarm is unsupported |
| `screen_brightness_nonsuport` | `function_table` | Whether screen brightness is unsupported |
| `music_control_nonsuport` | `function_table` | Whether music control is unsupported |
| `dial_plate_nonsuport` | `function_table` | Whether watch face is unsupported |
| `calendar` | `function_table` | Calendar |
| `health_snap` | `function_table` | Health snapshot |
| `gesture` | `function_table` | Gesture |
| `ring_click_measure` | `function_table` | Ring click measurement |
| `app_start_sport` | `function_table` | App can start workout |
| `geobin` | `function_table` | Geobin route data support |
| `workout_course` | `function_table` | Workout course |
| `user_icon` | `function_table` | User avatar download |
| `body_temperature` | `function_table` | Body temperature |
| `remind_switch` | `function_table` | Reminder switch table |
| `batt_case_info` | `function_table` | Charging case support |
| `ble_hid_pair` | `function_table` | BLE HID pairing support |
| `map_route` | `function_table` | Route map support |
| `map_ofline` | `function_table` | Offline map support |
| `super_msg` | `function_table` | Super notification support |
| `blood_pressure` | `function_table` | Blood pressure support |
| `medicine_remind` | `function_table` | Medicine reminder support |
| `cardio_fitness` | `function_table` | Cardio fitness support |
| `training_load` | `function_table` | Training load support |
| `volume_adjust` | `function_table` | Volume adjustment support |
| `action_guide` | `function_table` | Action guidance support |
| `training_readiness` | `function_table` | Training readiness support |
| `total_mileage` | `function_table` | Total mileage support |
| `disturb_switch` | `function_table` | Use scheduled Do Not Disturb switch settings |
