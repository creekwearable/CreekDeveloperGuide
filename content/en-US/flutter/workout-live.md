---
docId: flutter-workout-live
locale: en-US
title: "Flutter Device-started Workouts and Live Data"
description: "Handle workout control, live workout data, and GPS requests."
platform: Flutter
slug: flutter/workout-live
order: 128
status: published
version: v2.0
---

# Flutter Device-started Workouts and Live Data

Handle workout control, live workout data, and GPS requests.

## SDK Usage

The ring and band do not have a GPS chip, so when a workout is started, the app needs to continuously send real-time location information to the firmware.

```dart
/// liveSportDataListen、liveSportControlListen、sportGpsListen
///It needs to be listened for at the global level.
 ///workout status monitoring
sdkManager.sportControlListen((e){
  if (Get.isRegistered<SportControlPageController>()) {
    final page = Get.find<SportControlPageController>();
    page.operate = e;
    page.update();
  }
});

 ///workout data monitoring
sdkManager.sportLiveListen ((e){
  if (Get.isRegistered<SportControlPageController>()) {
    final page = Get.find<SportControlPageController>();
    page.liveData = e.toString();
    page.update();
  }
});

///Get supported sport types
sdkManager.getSupportSportType(callBack: (e){
  sportTypeList = e.supportType.map((e) => e.value).toList();
  if(sportTypeList.isNotEmpty){
    selectSportType(sportTypeList.first);
  }
}, errCallBack: (e){

});

 ///Devices without a GPS chip need to be monitored, while those with a GPS chip do not.
sdkManager.sportGPSListen((e) async{
  CreekLog.info("*****************${e.gpsOperate.toString()}");
  if (e.gpsOperate == gps_operate_type.GPS_INFO_INQUIRE) {
    GPSModel model = GPSModel();
    model.longitude =  (114.027986 * 1000000).toInt();
    model.latitude =  (22.543060 * 1000000).toInt();
    model.gpsPermission = true;
    return model;
  }
  return null;
});

///Start workout (the watch does not support starting a workout actively, but the ring does).
sdkManager.setSportControl(operate: protocol_exercise_control_operate()..controlType = exercise_control_type.CONTROL_START..sportType=sport_type.ORUN)

 ///Pause workout
 sdkManager.setSportControl(operate: protocol_exercise_control_operate()..controlType = exercise_control_type.CONTROL_PAUSE)
 ///Resume workout
 sdkManager.setSportControl(operate: protocol_exercise_control_operate()..controlType = exercise_control_type.CONTROL_RESUME)
 ///End workout
 sdkManager.setSportControl(operate: protocol_exercise_control_operate()..controlType = exercise_control_type.CONTROL_END)

foundationCommand.setSportControl(
    operate: protocol_exercise_control_operate()
      ..controlType = type
      ..sportType = sportType ?? sport_type.ORUN
      ..actionType = actionType ?? selectedControlActionType
      ..swimTripTotalDistance = swimTripTotalDistance!.value,
    callBack:  (){

    },errCallBack: (e){

});
```

## Protobuf Data Model

```protobuf
syntax = "proto3";
enum tran_direction_type
{
    WATCH_TRAN = 0; // Operation originated from the watch.
    APP_TRAN = 1; // Operation originated from the application.
}
enum Segments_type
{
   HYROX_RUN = 0; // HYROX running segment.
   HYROX_WORKOUT =1; // HYROX workout-station segment.
   HYROX_RESET = 2; // HYROX reset segment.
   HYROX_SWIM = 3; // HYROX swimming segment.
   HYROX_BIKE = 4; // HYROX cycling segment.
   HYROX_TRANSITION = 5; // HYROX transition segment.
}

message segments_data
{
    Segments_type type = 1;// segment type.
    sport_type sporttype = 2; // Workout type.
    uint32  group_id = 3; // Group identifier.
    uint32  avg_hr = 4; // Average heart rate.
    uint32  order = 5; // Display or processing order.
    uint32  calories = 6; // Calories burned.
    uint32  duration = 7; // Duration.
}

enum StepType{
    STEP_TYPE_WARM_UP = 0;// warm-up.
    STEP_TYPE_TRAIN = 1;// training.
    STEP_TYPE_RECOVERY = 2;// resume.
    STEP_TYPE_REST = 3;// rest.
    STEP_TYPE_COOL_DOWN = 4;// cool-down.
    STEP_TYPE_OTHER = 5; // Other workout step type.
}

enum continuing_target
{
    CONTINUING_TARGET_MANUALLY_LAP = 0;// continuous target - manual lap.
    CONTINUING_TARGET_TIME = 1;// continuous target - time.
    CONTINUING_TARGET_DISTANCE = 2;// continuous target - distance.
    CONTINUING_TARGET_CALORIES = 3;// continuous target - calories.
}

enum strength_target
{
    STRENGTH_TARGET2_OPEN = 0;// intensity target - open.
    STRENGTH_TARGET2_PACE = 1;// intensity target - pace.
    STRENGTH_TARGET2_CADENCE = 2;// intensity target - cadence.
    STRENGTH_TARGET2_HEART_RATE_ZONE = 3;// intensity target heart rate - heart-rate zone.
    STRENGTH_TARGET2_CUSTOM_RATE_ZONE = 4;// heart rate - custom heart rate.
    STRENGTH_TARGET2_POWER_ZONES = 5;// intensity target - power zone.
    STRENGTH_TARGET2_RATE_ZONE_RESERVE = 6;// heart rate - heart-rate reserve.
    STRENGTH_TARGET2_RATE_ZONE_MAX = 7;// heart rate - maximum heart rate.
}

message workout_course
{
    uint32 action_id = 1;       // movement identifier.
    uint32 durations = 2;// stage duration.
    sport_type type = 3; // workout type.
    bytes name = 4;// name.
    continuing_target ct_type = 5; // continuous-target type.
    strength_target st_type = 6;   // intensity-target type.
    uint32 ct_value = 7;// continuous-target value.
    uint32 st_max = 8;// maximum intensity target.
    uint32 st_min = 9;// minimum intensity target.
    uint32 avg_st_value = 10;// average intensity value, derived from the intensity-target type.
    uint32 extre_value_max = 11;// extreme intensity maximum value.
    uint32 extre_value_min = 12;// extreme intensity maximum value.
    uint32 complete_rate = 13;// retain two decimal places, actual value multiplied by 100.
    StepType steptype = 14;// step type.
}

message gomore_realtime_data {
  uint32 rest_calories = 1;      // resting calories during the workout, in kcal; scale: ×10,000.
  uint32 MET = 2;                // real-time metabolic equivalent (MET); scale: ×10,000.
  uint32 METs_0 = 3;             // sedentary MET; scale: ×10,000.
  uint32 METs_1 = 4;             // light-activity MET; scale: ×10,000.
  uint32 METs_2 = 5;             // moderate-activity MET; scale: ×10,000.
  uint32 METs_3 = 6;            // vigorous-activity MET; scale: ×10,000.
  uint32 METs_4 = 7;            // high-intensity-exercise MET; scale: ×10,000.
  uint32 fatPerc = 8;            // fat-derived energy expenditure, in kcal; scale: ×10,000.
  uint32 carbPerc = 9;           // carbohydrate-derived energy expenditure, in kcal; scale: ×10,000.
}

message protocol_exercise_sync_realtime_info
{
    tran_direction_type tran_type = 1; // Origin of this operation.
    sport_type sport_type = 2;// workout type.
    uint32 total_durations = 3;// workout duration; unit: s.
    uint32 km_pace = 4;// kilometer pace.
    uint32 avg_km_pace = 5;// average kilometer pace.
    uint32 mi_pace = 6;// mile pace.
    uint32 avg_mi_pace = 7;// average mile pace.
    uint32 km_speed = 8;// speed in kilometers per hour; scale: ×100.
    uint32 avg_km_speed = 9;// average speed in kilometers per hour; scale: ×100.
    uint32 mi_speed = 10;// speed in miles per hour; scale: ×100.
    uint32 avg_mi_speed = 11;// average speed in miles per hour; scale: ×100.
    uint32 total_distance = 12;// distance; unit: m.
    int32 latitude = 13;// latitude; negative values indicate south and positive values north; scale: ×1,000,000.
    int32 longitude = 14;// longitude; negative values indicate west and positive values east; scale: ×1,000,000.
    int32 elevation = 15;// elevation, in meters.
    uint32 step_stride = 16;// stride length.
    uint32 step_frequency = 17;// cadence, in steps per minute.
    uint32 total_climb_height = 18;// cumulative ascent, in meters.
    uint32 hr_value = 19;// heart-rate value.
    uint32 max_hr_value = 20;// maximum heart-rate value.
    uint32 min_hr_value = 21;// minimum heart-rate value.
    uint32 total_calories = 22;// total calories.
    uint32 lap_count = 23;// lap count.
    uint32 lap_duration = 24;// lap duration.
    uint32 lap_distance = 25;// lap distance.
    uint32 lap_km_pace_speed = 26;// average kilometer pace or speed; cycling uses speed and other workout types use pace.
    uint32 lap_mi_pace_speed = 27;// average mile pace or speed; cycling uses speed and other workout types use pace.
    uint32 avg_hr_value = 28;// average heart-rate value.
    uint32 hr_zone1_sec = 29;// accumulated seconds in heart-rate zone 1.
    uint32 hr_zone2_sec = 30;// accumulated seconds in heart-rate zone 2.
    uint32 hr_zone3_sec = 31;// accumulated seconds in heart-rate zone 3.
    uint32 hr_zone4_sec = 32;// accumulated seconds in heart-rate zone 4.
    uint32 hr_zone5_sec = 33;// accumulated seconds in heart-rate zone 5.
    bool elevation_support = 34;// whether elevation and ascent data are supported.
    bool lap_support = 35;// whether lap data are supported.
    uint32 gps_rssi = 36;// GPS signal level: 0 = none, 1 = red, 2 = orange, 3 = green.
    bool gps_rssi_support = 37;// whether GPS signal strength is supported.
    bool step_support = 38;  // whether step display is supported.
    uint32 total_step = 39;  // steps.
    bool vertical_jump_support = 40; // whether vertical-jump data is supported.
    uint32 rep_id = 41; // repetition identifier; range: 0–9,999.
    uint32 rep_timestamp_start = 42; // automatically detected repetition start timestamp.
    uint32 rep_timestamp_end = 43; // automatically detected repetition end timestamp.
    uint32 jump_timestamp_start = 44; // feet-off-ground timestamp.
    uint32 jump_timestamp_end = 45; // ground-contact timestamp.
    uint32 rep_durations = 46; // single-repetition duration; range: 0–2,000 ms.
    uint32 jump_durations = 47; // single-jump airborne duration; range: 0–2,000 ms.
    uint32 jump_height = 48; // vertical-jump height; range: 0–200 cm.
    uint32 peak_speed = 49; // peak vertical-jump speed; scale: ×10; range: 0–5 m/s.
    uint32 rep_count = 50; // repetition count; range: 0–9,999.
    bool skip_rope_support = 51;  // whether jump-rope count display is supported.
    uint32 total_jumps = 52;  // total jump count.
    uint32 jumps_per_min = 53; // jump-rope cadence, in jumps per minute.
    bool racket_data_support = 54;// whether racket data is supported.
    uint32 max_racket_speed = 55;                 // maximum swing speed 0–999 km/h.
    uint32 longest_rally = 56;                    // longest rally; range: 0–2,000 strokes.
    uint32 forehands_stroke = 57;                 // forehand strokes; range: 0–2,000.
    uint32 backhands_stroke = 58;                 // backhand strokes; range: 0–2,000.
    uint32 overhands_stroke = 59;                 // overhand strokes; range: 0–2,000.
    uint32 underhands_stroke = 60;                // underhand strokes; range: 0–2,000.
    uint32 other_stroke = 61;                     // other strokes; range: 0–2,000.
    uint32 num_racket_total = 62;                 // total swing count; range: 0–2,000.
    uint32 cur_racket_speed = 63;                 // current swing speed 0–999 km/h.
    exercise_control_type control_type = 64;      // workout status.
    bool hyrox_data_support = 65;                // whether HYROX data are supported.
    uint32 hyrox_eventtype = 66;                // event type.
    segments_data hyrox_items = 67;             // HYROX segment data.
    bool effort_support = 68;                    // supports training load.
    uint32 effort = 69;                          // training-load increase during this workout; range: 0.0–25.0; scale: ×10.
    uint32 aerobic_effect = 70;                   // aerobic effect; range: 0.0–5.0; scale: ×10.
    uint32 anaerobic_effect = 71;                 // anaerobic effect; range: 0.0–5.0; scale: ×10.
    bool workout_course_support = 72;              // whether workout-course fields 73–76 are supported.
    workout_course course = 73;                    // course data.
    bool gomore_support = 74; // whether Gomore data are supported.
    gomore_realtime_data  realtime_data = 75; // Gomore real-time energy-expenditure data for this workout, updated every second.
}
```

```protobuf
syntax = "proto3";

enum exercise_control_type
{
    CONTROL_NULL = 0; // No workout control action.
    CONTROL_START = 1;// start workout.
    CONTROL_END = 2;// end workout.
    CONTROL_PAUSE = 3;// pause workout.
    CONTROL_RESUME = 4;// resume workout.
}

enum action_type
{
    ACTION_NULL = 0; // No workout action specified.
    ACTION_LEFT_HAND  = 1;         // left hand.
    ACTION_RIGHT_HAND   = 2;        // right hand.
}

message protocol_exercise_control_operate
{
    tran_direction_type tran_type = 1; // Origin of this operation.
    sport_type sport_type = 2;// workout type.
    exercise_control_type control_type = 3;// workout-control type.
    action_type action_type = 4;    // action type.
    uint32 swim_trip_total_distance = 5;       // total pool length unit: meters.
}
```

### Field Reference

#### `segments_data`

| Field | Type | Description |
| --- | --- | --- |
| `type` | `Segments_type` | segment type. |
| `sporttype` | `sport_type` | Workout type. |
| `group_id` | `uint32` | Group identifier. |
| `avg_hr` | `uint32` | Average heart rate. |
| `order` | `uint32` | Display or processing order. |
| `calories` | `uint32` | Calories burned. |
| `duration` | `uint32` | Duration. |

#### `workout_course`

| Field | Type | Description |
| --- | --- | --- |
| `action_id` | `uint32` | movement identifier. |
| `durations` | `uint32` | stage duration. |
| `type` | `sport_type` | workout type. |
| `name` | `bytes` | name. |
| `ct_type` | `continuing_target` | continuous-target type. |
| `st_type` | `strength_target` | intensity-target type. |
| `ct_value` | `uint32` | continuous-target value. |
| `st_max` | `uint32` | maximum intensity target. |
| `st_min` | `uint32` | minimum intensity target. |
| `avg_st_value` | `uint32` | average intensity value, derived from the intensity-target type. |
| `extre_value_max` | `uint32` | extreme intensity maximum value. |
| `extre_value_min` | `uint32` | extreme intensity maximum value. |
| `complete_rate` | `uint32` | retain two decimal places, actual value multiplied by 100. |
| `steptype` | `StepType` | step type. |

#### `gomore_realtime_data`

| Field | Type | Description |
| --- | --- | --- |
| `rest_calories` | `uint32` | resting calories during the workout, in kcal; scale: ×10,000. |
| `MET` | `uint32` | real-time metabolic equivalent (MET); scale: ×10,000. |
| `METs_0` | `uint32` | sedentary MET; scale: ×10,000. |
| `METs_1` | `uint32` | light-activity MET; scale: ×10,000. |
| `METs_2` | `uint32` | moderate-activity MET; scale: ×10,000. |
| `METs_3` | `uint32` | vigorous-activity MET; scale: ×10,000. |
| `METs_4` | `uint32` | high-intensity-exercise MET; scale: ×10,000. |
| `fatPerc` | `uint32` | fat-derived energy expenditure, in kcal; scale: ×10,000. |
| `carbPerc` | `uint32` | carbohydrate-derived energy expenditure, in kcal; scale: ×10,000. |

#### `protocol_exercise_sync_realtime_info`

| Field | Type | Description |
| --- | --- | --- |
| `tran_type` | `tran_direction_type` | Origin of this operation. |
| `sport_type` | `sport_type` | workout type. |
| `total_durations` | `uint32` | workout duration; unit: s. |
| `km_pace` | `uint32` | kilometer pace. |
| `avg_km_pace` | `uint32` | average kilometer pace. |
| `mi_pace` | `uint32` | mile pace. |
| `avg_mi_pace` | `uint32` | average mile pace. |
| `km_speed` | `uint32` | speed in kilometers per hour; scale: ×100. |
| `avg_km_speed` | `uint32` | average speed in kilometers per hour; scale: ×100. |
| `mi_speed` | `uint32` | speed in miles per hour; scale: ×100. |
| `avg_mi_speed` | `uint32` | average speed in miles per hour; scale: ×100. |
| `total_distance` | `uint32` | distance; unit: m. |
| `latitude` | `int32` | latitude; negative values indicate south and positive values north; scale: ×1,000,000. |
| `longitude` | `int32` | longitude; negative values indicate west and positive values east; scale: ×1,000,000. |
| `elevation` | `int32` | elevation, in meters. |
| `step_stride` | `uint32` | stride length. |
| `step_frequency` | `uint32` | cadence, in steps per minute. |
| `total_climb_height` | `uint32` | cumulative ascent, in meters. |
| `hr_value` | `uint32` | heart-rate value. |
| `max_hr_value` | `uint32` | maximum heart-rate value. |
| `min_hr_value` | `uint32` | minimum heart-rate value. |
| `total_calories` | `uint32` | total calories. |
| `lap_count` | `uint32` | lap count. |
| `lap_duration` | `uint32` | lap duration. |
| `lap_distance` | `uint32` | lap distance. |
| `lap_km_pace_speed` | `uint32` | average kilometer pace or speed; cycling uses speed and other workout types use pace. |
| `lap_mi_pace_speed` | `uint32` | average mile pace or speed; cycling uses speed and other workout types use pace. |
| `avg_hr_value` | `uint32` | average heart-rate value. |
| `hr_zone1_sec` | `uint32` | accumulated seconds in heart-rate zone 1. |
| `hr_zone2_sec` | `uint32` | accumulated seconds in heart-rate zone 2. |
| `hr_zone3_sec` | `uint32` | accumulated seconds in heart-rate zone 3. |
| `hr_zone4_sec` | `uint32` | accumulated seconds in heart-rate zone 4. |
| `hr_zone5_sec` | `uint32` | accumulated seconds in heart-rate zone 5. |
| `elevation_support` | `bool` | whether elevation and ascent data are supported. |
| `lap_support` | `bool` | whether lap data are supported. |
| `gps_rssi` | `uint32` | GPS signal level: 0 = none, 1 = red, 2 = orange, 3 = green. |
| `gps_rssi_support` | `bool` | whether GPS signal strength is supported. |
| `step_support` | `bool` | whether step display is supported. |
| `total_step` | `uint32` | steps. |
| `vertical_jump_support` | `bool` | whether vertical-jump data is supported. |
| `rep_id` | `uint32` | repetition identifier; range: 0–9,999. |
| `rep_timestamp_start` | `uint32` | automatically detected repetition start timestamp. |
| `rep_timestamp_end` | `uint32` | automatically detected repetition end timestamp. |
| `jump_timestamp_start` | `uint32` | feet-off-ground timestamp. |
| `jump_timestamp_end` | `uint32` | ground-contact timestamp. |
| `rep_durations` | `uint32` | single-repetition duration; range: 0–2,000 ms. |
| `jump_durations` | `uint32` | single-jump airborne duration; range: 0–2,000 ms. |
| `jump_height` | `uint32` | vertical-jump height; range: 0–200 cm. |
| `peak_speed` | `uint32` | peak vertical-jump speed; scale: ×10; range: 0–5 m/s. |
| `rep_count` | `uint32` | repetition count; range: 0–9,999. |
| `skip_rope_support` | `bool` | whether jump-rope count display is supported. |
| `total_jumps` | `uint32` | total jump count. |
| `jumps_per_min` | `uint32` | jump-rope cadence, in jumps per minute. |
| `racket_data_support` | `bool` | whether racket data is supported. |
| `max_racket_speed` | `uint32` | maximum swing speed 0–999 km/h. |
| `longest_rally` | `uint32` | longest rally; range: 0–2,000 strokes. |
| `forehands_stroke` | `uint32` | forehand strokes; range: 0–2,000. |
| `backhands_stroke` | `uint32` | backhand strokes; range: 0–2,000. |
| `overhands_stroke` | `uint32` | overhand strokes; range: 0–2,000. |
| `underhands_stroke` | `uint32` | underhand strokes; range: 0–2,000. |
| `other_stroke` | `uint32` | other strokes; range: 0–2,000. |
| `num_racket_total` | `uint32` | total swing count; range: 0–2,000. |
| `cur_racket_speed` | `uint32` | current swing speed 0–999 km/h. |
| `control_type` | `exercise_control_type` | workout status. |
| `hyrox_data_support` | `bool` | whether HYROX data are supported. |
| `hyrox_eventtype` | `uint32` | event type. |
| `hyrox_items` | `segments_data` | HYROX segment data. |
| `effort_support` | `bool` | supports training load. |
| `effort` | `uint32` | training-load increase during this workout; range: 0.0–25.0; scale: ×10. |
| `aerobic_effect` | `uint32` | aerobic effect; range: 0.0–5.0; scale: ×10. |
| `anaerobic_effect` | `uint32` | anaerobic effect; range: 0.0–5.0; scale: ×10. |
| `workout_course_support` | `bool` | whether workout-course fields 73–76 are supported. |
| `course` | `workout_course` | course data. |
| `gomore_support` | `bool` | whether Gomore data are supported. |
| `realtime_data` | `gomore_realtime_data` | Gomore real-time energy-expenditure data for this workout, updated every second. |

#### `protocol_exercise_control_operate`

| Field | Type | Description |
| --- | --- | --- |
| `tran_type` | `tran_direction_type` | Origin of this operation. |
| `sport_type` | `sport_type` | workout type. |
| `control_type` | `exercise_control_type` | workout-control type. |
| `action_type` | `action_type` | action type. |
| `swim_trip_total_distance` | `uint32` | total pool length unit: meters. |

### Enum Values

#### `tran_direction_type`

| Value | Number | Description |
| --- | --- | --- |
| `WATCH_TRAN` | `0` | Operation originated from the watch. |
| `APP_TRAN` | `1` | Operation originated from the application. |

#### `Segments_type`

| Value | Number | Description |
| --- | --- | --- |
| `HYROX_RUN` | `0` | HYROX running segment. |
| `HYROX_WORKOUT` | `1` | HYROX workout-station segment. |
| `HYROX_RESET` | `2` | HYROX reset segment. |
| `HYROX_SWIM` | `3` | HYROX swimming segment. |
| `HYROX_BIKE` | `4` | HYROX cycling segment. |
| `HYROX_TRANSITION` | `5` | HYROX transition segment. |

#### `StepType`

| Value | Number | Description |
| --- | --- | --- |
| `STEP_TYPE_WARM_UP` | `0` | warm-up. |
| `STEP_TYPE_TRAIN` | `1` | training. |
| `STEP_TYPE_RECOVERY` | `2` | resume. |
| `STEP_TYPE_REST` | `3` | rest. |
| `STEP_TYPE_COOL_DOWN` | `4` | cool-down. |
| `STEP_TYPE_OTHER` | `5` | Other workout step type. |

#### `continuing_target`

| Value | Number | Description |
| --- | --- | --- |
| `CONTINUING_TARGET_MANUALLY_LAP` | `0` | continuous target - manual lap. |
| `CONTINUING_TARGET_TIME` | `1` | continuous target - time. |
| `CONTINUING_TARGET_DISTANCE` | `2` | continuous target - distance. |
| `CONTINUING_TARGET_CALORIES` | `3` | continuous target - calories. |

#### `strength_target`

| Value | Number | Description |
| --- | --- | --- |
| `STRENGTH_TARGET2_OPEN` | `0` | intensity target - open. |
| `STRENGTH_TARGET2_PACE` | `1` | intensity target - pace. |
| `STRENGTH_TARGET2_CADENCE` | `2` | intensity target - cadence. |
| `STRENGTH_TARGET2_HEART_RATE_ZONE` | `3` | intensity target heart rate - heart-rate zone. |
| `STRENGTH_TARGET2_CUSTOM_RATE_ZONE` | `4` | heart rate - custom heart rate. |
| `STRENGTH_TARGET2_POWER_ZONES` | `5` | intensity target - power zone. |
| `STRENGTH_TARGET2_RATE_ZONE_RESERVE` | `6` | heart rate - heart-rate reserve. |
| `STRENGTH_TARGET2_RATE_ZONE_MAX` | `7` | heart rate - maximum heart rate. |

#### `exercise_control_type`

| Value | Number | Description |
| --- | --- | --- |
| `CONTROL_NULL` | `0` | No workout control action. |
| `CONTROL_START` | `1` | start workout. |
| `CONTROL_END` | `2` | end workout. |
| `CONTROL_PAUSE` | `3` | pause workout. |
| `CONTROL_RESUME` | `4` | resume workout. |

#### `action_type`

| Value | Number | Description |
| --- | --- | --- |
| `ACTION_NULL` | `0` | No workout action specified. |
| `ACTION_LEFT_HAND` | `1` | left hand. |
| `ACTION_RIGHT_HAND` | `2` | right hand. |
