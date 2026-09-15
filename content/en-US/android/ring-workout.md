---
docId: android-ring-workout
locale: en-US
title: Android Ring Workout
description: Start, control, and monitor workouts with a ring.
platform: Android
slug: android/ring-workout
order: 138
status: published
version: v2.0
---

# Android Ring Workout

Start, control, and monitor workouts with a ring.

```kotlin
// / liveSportDataListen、liveSportControlListen、sportGpsListen
// /Register these listeners globally
CreekManager.sInstance.liveSportDataListen { model ->
    liveSportDataListenCallback?.invoke(model)
}
CreekManager.sInstance.liveSportControlListen { model ->
    liveSportControlListenCallback?.invoke(model)
}
CreekManager.sInstance.sportGpsListen { model ->
    sportGpsListenCallback?.invoke(model)
}

// /Get supported workout types
CreekManager.sInstance.getSportType({ model ->
     model.supportTypeList
}, { _, message -> println("getSportType failure: $message") })

 fun startSport() = sendControl(Enums.exercise_control_type.CONTROL_START)
 // /Pause a workout
fun pauseSport() = sendControl(Enums.exercise_control_type.CONTROL_PAUSE)
 // /Resume a workout
fun resumeSport() = sendControl(Enums.exercise_control_type.CONTROL_RESUME)
 // /End a workout
fun endSport() = sendControl(Enums.exercise_control_type.CONTROL_END)

private fun sendControl(type: Enums.exercise_control_type) {
    _state.value = "loading..."
    CreekManager.sInstance.setSportControl(type, _currentType.value, {
        _state.value = "state：${type.name.uppercase()}"
    }, { _, message ->
        _state.value = "error：$message"
    })
}
 // /Listen for workout data
GlobalListenManager.liveSportDataListenCallback = { model ->
    val json = model.toString()
    _jsonText.value = json
}
 // /Listen for workout state
GlobalListenManager.liveSportControlListenCallback = { model ->
    _state.value = "state：${model.controlType.name.uppercase()}"
}

GlobalListenManager.sportGpsListenCallback = { model ->
    when (model.gpsOperate) {
        Enums.gps_operate_type.GPS_INFO_INQUIRE -> {
            val gpsModel = GPSModel().apply { gpsPermission = 0 }
            CreekManager.sInstance.setSportGps(gpsModel, {}, { _, _ -> })
        }

        Enums.gps_operate_type.GPS_INFO_REQUEST -> {
            val gpsModel = GPSModel().apply {
                latitude = (22.312653 * 1_000_000).toInt()
                longitude = (114.027986 * 1_000_000).toInt()
                accuracy = (8.00 * 100).toInt()
                gpsPermission = 1
            }
            CreekManager.sInstance.setSportGps(gpsModel, {}, { _, _ -> })
        }

        Enums.gps_operate_type.GPS_INFO_END -> {
            // End GPS tracking
        }

        else -> {}
    }
}
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

message protocol_exercise_sync_realtime_info
{
    tran_direction_type tran_type = 1;
    sport_type sport_type = 2;// WorkoutType
    uint32 total_durations = 3;// Total Durations.
    uint32 km_pace = 4;// Km Pace.
    uint32 avg_km_pace = 5;// Avg Km Pace.
    uint32 mi_pace = 6;// Mi Pace.
    uint32 avg_mi_pace = 7;// Avg Mi Pace.
    uint32 km_speed = 8;// Km Speed.
    uint32 avg_km_speed = 9;// Avg Km Speed.
    uint32 mi_speed = 10;// Mi Speed.
    uint32 avg_mi_speed = 11;// Avg Mi Speed.
    uint32 total_distance = 12;// Total Distance.
    int32 latitude = 13;// Latitude.
    int32 longitude = 14;// Longitude.
    int32 elevation = 15;// Elevation.
    uint32 step_stride = 16;// Step Stride.
    uint32 step_frequency = 17;// Step Frequency.
    uint32 total_climb_height = 18;// Total Climb Height.
    uint32 hr_value = 19;// Hr Value.
    uint32 max_hr_value = 20;// Maximum max hr value.
    uint32 min_hr_value = 21;// Min Hr Value.
    uint32 total_calories = 22;// Total Calories.
    uint32 lap_count = 23;// Lap Count.
    uint32 lap_duration = 24;// Lap Duration.
    uint32 lap_distance = 25;// Lap Distance.
    uint32 lap_km_pace_speed = 26;// Lap Km Pace Speed.
    uint32 lap_mi_pace_speed = 27;// Lap Mi Pace Speed.
    uint32 avg_hr_value = 28;// Avg Hr Value.
    uint32 hr_zone1_sec = 29;// Hr Zone1 Sec.
    uint32 hr_zone2_sec = 30;// Hr Zone2 Sec.
    uint32 hr_zone3_sec = 31;// Hr Zone3 Sec.
    uint32 hr_zone4_sec = 32;// Hr Zone4 Sec.
    uint32 hr_zone5_sec = 33;// Hr Zone5 Sec.
    bool elevation_support = 34;// Whether elevation support is supported.
    bool lap_support = 35;// Whether lap support is supported.
    uint32 gps_rssi = 36;// Gps Rssi.
    bool gps_rssi_support = 37;// Whether gps rssi support is supported.
    bool step_support = 38;  // StepsShownWhether supported
    uint32 total_step = 39;  // Steps
    bool vertical_jump_support = 40; // Whether vertical jump support is supported.
    uint32 rep_id = 41; // Rep Id.
    uint32 rep_timestamp_start = 42; // Rep Timestamp Start.
    uint32 rep_timestamp_end = 43; // Rep Timestamp End.
    uint32 jump_timestamp_start = 44; // Jump Timestamp Start.
    uint32 jump_timestamp_end = 45; // Jump Timestamp End.
    uint32 rep_durations = 46; // Rep Durations.
    uint32 jump_durations = 47; // Jump Durations.
    uint32 jump_height = 48; // Jump Height.
    uint32 peak_speed = 49; // Peak Speed.
    uint32 rep_count = 50; // Rep Count.
    bool skip_rope_support = 51;  // Whether skip rope support is supported.
    uint32 total_jumps = 52;  // Total Jumps.
    uint32 jumps_per_min = 53; // Jumps Per Min.
    bool racket_data_support = 54;// Racket Data Support.
    uint32 max_racket_speed = 55;                 // Maximum max racket speed.
    uint32 longest_rally = 56;                    // Longest Rally.
    uint32 forehands_stroke = 57;                 // Forehands Stroke.
    uint32 backhands_stroke = 58;                 // Backhands Stroke.
    uint32 overhands_stroke = 59;                 // Overhands Stroke.
    uint32 underhands_stroke = 60;                // Underhands Stroke.
    uint32 other_stroke = 61;                     // Other Stroke.
    uint32 num_racket_total = 62;                 // Num Racket Total.
    uint32 cur_racket_speed = 63;                 // Cur Racket Speed.
    exercise_control_type control_type = 64;      // WorkoutState
}

syntax = "proto3";
enum tran_direction_type
{
    WATCH_TRAN = 0;// WATCH TRAN.
    APP_TRAN = 1;// APP TRAN.
}

enum exercise_control_type
{
    CONTROL_NULL = 0;
    CONTROL_START = 1;// Start a workout
    CONTROL_END = 2;// End a workout
    CONTROL_PAUSE = 3;// Pause a workout
    CONTROL_RESUME = 4;// Resume a workout
}

message protocol_exercise_control_operate
{
    tran_direction_type tran_type = 1;
    sport_type sport_type = 2;// WorkoutType
    exercise_control_type control_type = 3;// Control Type.
}
```
