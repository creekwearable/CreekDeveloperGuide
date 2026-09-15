---
docId: flutter-user-information
locale: en-US
title: "Flutter User Information"
description: "Read and update user profile and preference fields."
platform: Flutter
slug: flutter/user-information
order: 103
status: published
version: v2.0
---

# Flutter User Information

Read and update user profile and preference fields.

## SDK Usage

```dart
/// Before setting user information each time, it is necessary to retrieve the existing information and then modify the values that need to be changed.
sdkManager.getUserInfo(callBack: (e) {
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
}, errCallBack: (e) {
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});

protocol_user_info_operate operate = protocol_user_info_operate();
operate.personalInfo.year = 2024;
operate.perferences.airTempUnit = 1;
sdkManager.setUserInfo(operate,callBack: (){

},errCallBack: (e){

});
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0; // Invalid or unspecified value.
    INQUIRE = 1;// Query
    SET = 2;// Set
}

enum gender_type
{
    GENDER_MALE = 0;// Male
    GENDER_FEMALE = 1;// Female
    GENDER_OTHER = 2;// Other
}

enum notify_type
{
    ALLOW = 0;// Allow notification
    SILENT = 1;// Silent notification
    CLOSE = 2;// Close notification
}

message protocol_personal_info
{
    uint32 height = 1;     // 1byte Height
    uint32 weight = 2;    // 2bytes Weight in kg with decimal, set as the actual weight multiplied by 100
    gender_type gender = 3;    // 1byte Gender 0: Male 1: Female
    uint32 year = 4;      // 2bytes Birth year
    uint32 month = 5;     // 1byte Month
    uint32 day = 6;       // 1byte Day
}

message protocol_perferences
{
    uint32 dist_unit = 1;// 1byte Distance unit 0x00: Invalid, 0x01: km, 0x02: mi
    uint32 weight_unit = 2; // 1byte Weight unit: 0x00: Invalid, 0x01: kg, 0x02: lb, 0x03: stone
    uint32 air_temp_unit = 3;  // 1byte Air temperature unit 0x00: Invalid, 0x01: ℃, 0x02: ℉
    uint32 skin_temp_unit = 4;  // 1byte Skin temperature unit 0x00: Invalid, 0x01: ℃, 0x02: ℉
    uint32 is_12hour_format = 5;// 1byte Time format (0x00: Invalid, 0x01: 24-hour format, 0x02: 12-hour format)
    uint32 week_start_day = 6; // 1byte Start day of the week 0x00: Monday, 0x01: Sunday, 0x02: Saturday
    uint32 calorie_unit = 7;// 1byte Calorie unit 0: Invalid, 1: Default kcal, 2: kcal (large), 3: kJ
    uint32 swim_pool_unit = 8;// 1byte Pool unit 0: Invalid, 1: Default meter, 2: Yard
    uint32 cycling_unit = 9;// 1byte Cycling unit (km/mi) 0: Invalid, 1: km, 2: mi
    uint32 walking_running_unit = 10; // 1byte Walking or running unit (km/mi) 0: Invalid, 1: km, 2: mi
    uint32 stride_unit = 11; // 1byte Stride unit
    uint32 height_unit = 12;// 1byte Height unit 0x00: Invalid, 0x01: cm, 0x02: ft
    uint32 altitude_unit = 13;// 1byte Altitude unit 0x00: Invalid, 0x01: m, 0x02: ft
    uint32 wind_speed_unit = 14;// 1byte Wind speed unit 0x00: Invalid, 0x01: m/s, 0x02: km/h
    uint32 visibility_unit = 15;// 1byte Visibility unit 0x00: Invalid, 0x01: m, 0x02: km, 0x03: mi
}

message protocol_goal_setting
{
    uint32 exercise_min = 1;// 1byte Exercise duration goal
    uint32 standing_hour = 2;// 1byte Standing hour goal
    uint32 kcal = 3;// 2bytes Calorie goal
    uint32 steps = 4;// 4bytes Step goal
    uint32 distance = 5;// 4bytes Distance goal (in meters)
    uint32 workout_day = 6;// 1byte Workout day goal
    bool notify_switch_flag = 7;// 1byte Goal reminder switch true: On, false: Off
    notify_type notify_flag = 8;// 1byte Notification type
}

message protocol_user_info_operate
{
    operate_type operate = 1; // Operation type 0: Invalid operation, 1: Query, 2: Set
    protocol_personal_info personal_info  = 2 ;// Personal info
    protocol_perferences perferences = 3;// Unit settings
    protocol_goal_setting goal_setting = 4;// Goal settings
}

message protocol_user_info_inquire_reply
{
    uint32 func_table = 1;// 1byte Function table
    operate_type operate = 2; // Operation type 0: Invalid operation, 1: Query, 2: Set
    protocol_personal_info personal_info  = 3 ; // Personal information.
    protocol_perferences perferences = 4; // Device preferences.
    protocol_goal_setting goal_setting = 5; // Health-goal settings.
}
```

### Field Reference

#### `protocol_personal_info`

| Field | Type | Description |
| --- | --- | --- |
| `height` | `uint32` | 1byte Height |
| `weight` | `uint32` | 2bytes Weight in kg with decimal, set as the actual weight multiplied by 100 |
| `gender` | `gender_type` | 1byte Gender 0: Male 1: Female |
| `year` | `uint32` | 2bytes Birth year |
| `month` | `uint32` | 1byte Month |
| `day` | `uint32` | 1byte Day |

#### `protocol_perferences`

| Field | Type | Description |
| --- | --- | --- |
| `dist_unit` | `uint32` | 1byte Distance unit 0x00: Invalid, 0x01: km, 0x02: mi |
| `weight_unit` | `uint32` | 1byte Weight unit: 0x00: Invalid, 0x01: kg, 0x02: lb, 0x03: stone |
| `air_temp_unit` | `uint32` | 1byte Air temperature unit 0x00: Invalid, 0x01: ℃, 0x02: ℉ |
| `skin_temp_unit` | `uint32` | 1byte Skin temperature unit 0x00: Invalid, 0x01: ℃, 0x02: ℉ |
| `is_12hour_format` | `uint32` | 1byte Time format (0x00: Invalid, 0x01: 24-hour format, 0x02: 12-hour format) |
| `week_start_day` | `uint32` | 1byte Start day of the week 0x00: Monday, 0x01: Sunday, 0x02: Saturday |
| `calorie_unit` | `uint32` | 1byte Calorie unit 0: Invalid, 1: Default kcal, 2: kcal (large), 3: kJ |
| `swim_pool_unit` | `uint32` | 1byte Pool unit 0: Invalid, 1: Default meter, 2: Yard |
| `cycling_unit` | `uint32` | 1byte Cycling unit (km/mi) 0: Invalid, 1: km, 2: mi |
| `walking_running_unit` | `uint32` | 1byte Walking or running unit (km/mi) 0: Invalid, 1: km, 2: mi |
| `stride_unit` | `uint32` | 1byte Stride unit |
| `height_unit` | `uint32` | 1byte Height unit 0x00: Invalid, 0x01: cm, 0x02: ft |
| `altitude_unit` | `uint32` | 1byte Altitude unit 0x00: Invalid, 0x01: m, 0x02: ft |
| `wind_speed_unit` | `uint32` | 1byte Wind speed unit 0x00: Invalid, 0x01: m/s, 0x02: km/h |
| `visibility_unit` | `uint32` | 1byte Visibility unit 0x00: Invalid, 0x01: m, 0x02: km, 0x03: mi |

#### `protocol_goal_setting`

| Field | Type | Description |
| --- | --- | --- |
| `exercise_min` | `uint32` | 1byte Exercise duration goal |
| `standing_hour` | `uint32` | 1byte Standing hour goal |
| `kcal` | `uint32` | 2bytes Calorie goal |
| `steps` | `uint32` | 4bytes Step goal |
| `distance` | `uint32` | 4bytes Distance goal (in meters) |
| `workout_day` | `uint32` | 1byte Workout day goal |
| `notify_switch_flag` | `bool` | 1byte Goal reminder switch true: On, false: Off |
| `notify_flag` | `notify_type` | 1byte Notification type |

#### `protocol_user_info_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | Operation type 0: Invalid operation, 1: Query, 2: Set |
| `personal_info` | `protocol_personal_info` | Personal info |
| `perferences` | `protocol_perferences` | Unit settings |
| `goal_setting` | `protocol_goal_setting` | Goal settings |

#### `protocol_user_info_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `func_table` | `uint32` | 1byte Function table |
| `operate` | `operate_type` | Operation type 0: Invalid operation, 1: Query, 2: Set |
| `personal_info` | `protocol_personal_info` | Personal information. |
| `perferences` | `protocol_perferences` | Device preferences. |
| `goal_setting` | `protocol_goal_setting` | Health-goal settings. |

### Enum Values

#### `operate_type`

| Value | Number | Description |
| --- | --- | --- |
| `INVALID` | `0` | Invalid or unspecified value. |
| `INQUIRE` | `1` | Query |
| `SET` | `2` | Set |

#### `gender_type`

| Value | Number | Description |
| --- | --- | --- |
| `GENDER_MALE` | `0` | Male |
| `GENDER_FEMALE` | `1` | Female |
| `GENDER_OTHER` | `2` | Other |

#### `notify_type`

| Value | Number | Description |
| --- | --- | --- |
| `ALLOW` | `0` | Allow notification |
| `SILENT` | `1` | Silent notification |
| `CLOSE` | `2` | Close notification |

### `func_table` Capability Bits

| Bit | Description |
| - | - |
| 0 | Supports the wind-speed unit field `wind_speed_unit`. |
| 1 | Supports the visibility unit field `visibility_unit`. |
| 2 | The altitude unit field `altitude_unit` is unavailable when this bit is set. |
| 3 | Supports user-avatar dimensions through `user_icon_width` and `user_icon_height`. |
| 4 | The blood-pressure unit field `blood_pressure_unit` is unavailable when this bit is set. |
