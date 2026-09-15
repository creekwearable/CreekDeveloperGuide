---
docId: android-user-information
locale: en-US
title: Android User Information and Preferences
description: Read and update the user profile, goals, and unit preferences.
platform: Android
slug: android/user-information
order: 103
status: published
version: v2.0
---

# Android User Information and Preferences

Read and update the user profile, goals, and unit preferences.

```kotlin
CreekManager.sInstance.getUserInfo({ model: Userinfo.protocol_user_info_operate ->
    textView.text = model.toString()
}, failure = { _, m ->
    textView.text = m
})

CreekManager.sInstance.getUserInfo({ model: Userinfo.protocol_user_info_operate ->
    model.personalInfo.year = 2024
    model.personalInfo.month = 11
    model.goalSetting.workoutDay = 7
    model.goalSetting.steps = 100
    model.goalSetting.notifyFlag = Enums.notify_type.CLOSE
    CreekManager.sInstance.setUserInfo(model = model, {
        textView.text = "success"
    }, failure = { c, m ->
        textView.text = m

    })

}, failure = { _, m ->
    textView.text = m
})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;// Query
    SET = 2;// Set
}

enum gender_type
{
    GENDER_MALE = 0;// GENDER MALE.
    GENDER_FEMALE = 1;// GENDER FEMALE.
    GENDER_OTHER = 2;// GENDER OTHER.
}

enum notify_type
{
    ALLOW = 0;// Allow notifications
    SILENT = 1;// Silent notifications
    CLOSE = 2;// Disable notifications
}

message protocol_personal_info
{
    uint32 height = 1;     // Height. 1bytes.
    uint32 weight = 2;    // Weight. 2bytes.
    gender_type gender = 3;    // Gender. 1bytes.
    uint32 year = 4;      // Year. 2bytes.
    uint32 month = 5;     // 1bytes
    uint32 day = 6;       // 1bytes
}

message protocol_perferences
{
    uint32 dist_unit = 1;// Dist Unit. 1bytes, 0x00, 0x01, 0x02.
    uint32 weight_unit = 2; // Weight Unit. 1bytes, 0x00, 0x01, 0x02, 0x03.
    uint32 air_temp_unit = 3;  // Air Temp Unit. 1bytes, 0x00, 0x01, 0x02.
    uint32 skin_temp_unit = 4;  // Skin Temp Unit. 1bytes, 0x00, 0x01, 0x02.
    uint32 is_12hour_format = 5;// Is 12hour Format. 1bytes, 0x00, 0x01, 0x02.
    uint32 week_start_day = 6; // Week Start Day. 1bytes, 0x00, 0x01, 0x02.
    uint32 calorie_unit = 7;// Calorie Unit. 1bytes.
    uint32 swim_pool_unit = 8;// Swim Pool Unit. 1bytes.
    uint32 cycling_unit = 9;// Cycling Unit. 1bytes.
    uint32 walking_running_unit = 10; // Walking Running Unit. 1bytes.
    uint32 stride_unit = 11; // Stride Unit. 1bytes.
    uint32 height_unit = 12;// Height Unit. 1bytes, 0x00, 0x01, 0x02.
    uint32 altitude_unit = 13;// Altitude Unit. 1bytes, 0x00, 0x01, 0x02.
    uint32 wind_speed_unit = 14;// Wind Speed Unit. 1bytes, 0x00, 0x01, 0x02.
    uint32 visibility_unit = 15;// Visibility Unit. 1bytes, 0x00, 0x01, 0x02, 0x03.
    uint32 blood_pressure_unit = 16;// Blood Pressure Unit. 1bytes, 0x00, 0x01, 0x02.
}

message protocol_goal_setting
{
    uint32 exercise_min = 1;// Exercise Min. 1bytes.
    uint32 standing_hour = 2;// Standing Hour. 1bytes.
    uint32 kcal = 3;// Kcal. 2bytes.
    uint32 steps = 4;// Steps. 4bytes.
    uint32 distance = 5;// Distance. 4bytes.
    uint32 workout_day = 6;// Workout Day. 1bytes.
    bool notify_switch_flag = 7;// Notify Switch Flag switch. 1bytes.
    notify_type notify_flag = 8;// 1bytes NotificationType
}

message protocol_user_info_operate
{
    operate_type operate = 1; // Operation type 0: Invalid operation 1: Query 2: Set
    protocol_personal_info personal_info  = 2 ;// Personal Info.
    protocol_perferences perferences = 3;// Perferences.
    protocol_goal_setting goal_setting = 4;// Goal Setting.
}

message protocol_user_info_inquire_reply
{
    uint32 func_table = 1;// 1bytes Function table
    operate_type operate = 2; // Operation type 0: Invalid operation 1: Query 2: Set
    protocol_personal_info personal_info  = 3 ;// Personal Info.
    protocol_perferences perferences = 4;// Perferences.
    protocol_goal_setting goal_setting = 5;// Goal Setting.
    uint32 user_icon_width = 6;// User Icon Width.
    uint32 user_icon_height = 7;// User Icon Height.
}
```

### `func_table` Bit Definitions

| Bit | Description |
| - | - |
| 0 | Whether the wind-speed unit is supported wind_speed_unit |
| 1 | Whether the visibility unit is supported visibility_unit |
| 2 | Whether the altitude unit is unsupported altitude_unit |
| 3 | Whether the user avatar is supported user_icon_width, user_icon_height |
| 4 | Whether the blood-pressure unit is unsupported blood_pressure_unit |
