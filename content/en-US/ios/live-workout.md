---
docId: ios-live-workout
locale: en-US
title: iOS Live Workout
description: Synchronize live workout data and listen for workout state.
platform: iOS
slug: ios/live-workout
order: 137
status: published
version: v2.0
---

# iOS Live Workout

## Overview

Synchronize live workout data and listen for workout state.

## Swift example

```swift
// Listen for live workout data.
  CreekSDK.instance.liveSportDataListen { model in
            let json = try? model.jsonString()
            print(json)
         }

// Listen for pause, resume, start, and stop events.
 CreekSDK.instance.liveSportControlListen { model in
            let json = try? model.jsonString()
             print(json)
         }

// Resume a workout. Use this only when the device supports workout control.
 CreekSDK.instance.setSportControl(controlType: .controlResume) {
            print("success")
         } failure: { code, message in
            print("fail")
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

message protocol_exercise_sync_realtime_info
{
    tran_direction_type tran_type = 1;
    sport_type sport_type = 2;// type
    uint32 total_durations = 3;// unit s
    uint32 km_pace = 4;// km pace
    uint32 avg_km_pace = 5;// avg km pace
    uint32 mi_pace = 6;// mi pace
    uint32 avg_mi_pace = 7;// avg mi pace
    uint32 km_speed = 8;// km/h 100
    uint32 avg_km_speed = 9;// km/h 100
    uint32 mi_speed = 10;// mi/h 100
    uint32 avg_mi_speed = 11;// mi/h 100
    uint32 total_distance = 12;// unit m
    int32 latitude = 13;// :S N 1000000
    int32 longitude = 14;// :W E 1000000
    int32 elevation = 15;// data unit
    uint32 step_stride = 16;// step stride
    uint32 step_frequency = 17;// unit /minute
    uint32 total_climb_height = 18;// height unit
    uint32 hr_value = 19;// value
    uint32 max_hr_value = 20;// maximum value
    uint32 min_hr_value = 21;// minimum value
    uint32 total_calories = 22;// total calories
    uint32 lap_count = 23;// lap count
    uint32 lap_duration = 24;// lap duration
    uint32 lap_distance = 25;// lap distance
    uint32 lap_km_pace_speed = 26;// lap km pace speed
    uint32 lap_mi_pace_speed = 27;// lap mi pace speed
    uint32 avg_hr_value = 28;// Average heart rate
    uint32 hr_zone1_sec = 29;// Seconds spent in heart-rate zone 1
    uint32 hr_zone2_sec = 30;// Seconds spent in heart-rate zone 2
    uint32 hr_zone3_sec = 31;// Seconds spent in heart-rate zone 3
    uint32 hr_zone4_sec = 32;// Seconds spent in heart-rate zone 4
    uint32 hr_zone5_sec = 33;// Seconds spent in heart-rate zone 5
    bool elevation_support = 34;// Whether elevation data is supported
    bool lap_support = 35;// Whether lap data is supported
    uint32 gps_rssi = 36;// GPS signal level: 0–3
    bool gps_rssi_support = 37;// Whether GPS signal level is supported
    bool step_support = 38;  // Whether step data is supported
    uint32 total_step = 39;  // Total steps
    bool vertical_jump_support = 40; // Whether vertical-jump data is supported
    uint32 rep_id = 41; // Reps 0-9999
    uint32 rep_timestamp_start = 42; // Repetition start timestamp
    uint32 rep_timestamp_end = 43; // Repetition end timestamp
    uint32 jump_timestamp_start = 44; // Jump start timestamp
    uint32 jump_timestamp_end = 45; // Jump end timestamp
    uint32 rep_durations = 46; // Repetition duration, 0–2000 ms
    uint32 jump_durations = 47; // Jump duration, 0–2000 ms
    uint32 jump_height = 48; // Jump height, 0–200 cm
    uint32 peak_speed = 49; // Peak speed multiplied by 10, range 0–5 m/s
    uint32 rep_count = 50; // Reps 0-9999
    bool skip_rope_support = 51;  // Whether jump-rope data is supported
    uint32 total_jumps = 52;  // total jumps
    uint32 jumps_per_min = 53; // Jumps per minute
    bool racket_data_support = 54;// Whether racket-sport data is supported
    uint32 max_racket_speed = 55;                 // maximum 0–999 km/h
    uint32 longest_rally = 56;                    // longest rally
    uint32 forehands_stroke = 57;                 // forehands stroke
    uint32 backhands_stroke = 58;                 // backhands stroke
    uint32 overhands_stroke = 59;                 // overhands stroke
    uint32 underhands_stroke = 60;                // underhands stroke
    uint32 other_stroke = 61;                     // other stroke
    uint32 num_racket_total = 62;                 // num racket total
    uint32 cur_racket_speed = 63;                 // cur racket speed; 0–999 km/h
    exercise_control_type control_type = 64;      // workout state
}
```
