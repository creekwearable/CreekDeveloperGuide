---
docId: ios-user-information
locale: en-US
title: iOS User Information and Preferences
description: Retrieve and update user information, goals, and unit preferences.
platform: iOS
slug: ios/user-information
order: 103
status: published
version: v2.0
---

# iOS User Information and Preferences

Before updating user information, retrieve the current model, change only the required fields, and submit the complete model.

## Retrieve and Update User Information

```swift
/// Before setting user information, first retrieve the existing information, then change only the values that need to be updated.

/// Get
CreekInterFace.instance.getUserInfo { model in

} failure: { code, message in

}
/// Set
CreekInterFace.instance.getUserInfo { model in
    var data = model
    data.personalInfo.year = 2024
    data.personalInfo.month = 11
    data.goalSetting.workoutDay = 7
    data.goalSetting.steps = 100
    data.preferences.distUnit = 1
    data.goalSetting.notifyFlag = .close
    // Blood pressure unit: 0x00: invalid, 0x01: millimeters of mercury (mmHg), 0x02: kilopascals (kPa)
    data.goalSetting.bloodPressureUnit = 0x01;
    CreekInterFace.instance.setUserInfo(model: data) {

    } failure: { code, message in

    }

} failure: { code, message in

}
```

---

## User Information Data Model

### Protobuf

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;//Query
    SET = 2;//Set
}

enum gender_type
{
    GENDER_MALE = 0;//Male
    GENDER_FEMALE = 1;//Female
    GENDER_OTHER = 2;//Other
}

enum notify_type
{
    ALLOW = 0;//Allow notifications
    SILENT = 1;//Silent notifications
    CLOSE = 2;//Disable notifications
}

message protocol_personal_info
{
    uint32 height = 1;     //1bytes Height
    uint32 weight = 2;    //2bytes Weight. kg can have decimal places; the set value is the actual weight multiplied by one hundred
    gender_type gender = 3;    //1bytes Gender 0: male 1:female
    uint32 year = 4;      //2bytes //Birth year
    uint32 month = 5;     //1bytes
    uint32 day = 6;       //1bytes
}

message protocol_perferences
{
    uint32 dist_unit = 1;//1bytes  Distance unit 0x00: invalid 0x01: km, 0x02:mi
    uint32 weight_unit = 2; //1bytes  Weight unit: 0x00: invalid, 0x01: kg, 0x02:lb, 0x03:stone
    uint32 air_temp_unit = 3;  //1bytes  Weather temperature unit 0x00: invalid 0x01:℃, 0x02:℉
    uint32 skin_temp_unit = 4;  //1bytes Body temperature unit 0x00: invalid 0x01:℃, 0x02:℉
    uint32 is_12hour_format = 5;//1bytes Time format (0x00: invalid<br>0x01: 24-hour format, 0x02: 12-hour format)
    uint32 week_start_day = 6; //1bytes Week start day 0x00 weekday 1,0x01 Sunday,,0x02 weekday 6
    uint32 calorie_unit = 7;//1bytes Calorie unit setting 0 invalid, 1: default kcal; 2: kcal; 3: kJ
    uint32 swim_pool_unit = 8;//1bytes Pool unit setting 0 invalid, 1: default meter; 2: yard
    uint32 cycling_unit = 9;//1bytes Cycling unit (kilometer/mile) 0 invalid; 1: km kilometer; 2: mile;
    uint32 walking_running_unit = 10; //1bytes Walking or running unit (kilometer/mile) setting 0 invalid; 1: km kilometer; 2: mile;
    uint32 stride_unit = 11; //1bytes Stride unit
    uint32 height_unit = 12;//1bytes Height unit 0x00: invalid 0x01, centimeter cm 0x02, inch ft
    uint32 altitude_unit = 13;//1bytes Altitude unit 0x00: invalid 0x01, meter m 0x02, foot ft
    uint32 wind_speed_unit = 14;//1bytes Wind speed unit 0x00: invalid 0x01, meters/second (m/s) 0x02, kilometers/hour (km/h)
    uint32 visibility_unit = 15;//1bytes Visibility unit 0x00: invalid 0x01, meter (m) 0x02, kilometer (km) 0x03, mile (mi)
    uint32 blood_pressure_unit = 16;//1bytes Blood pressure unit 0x00: invalid 0x01, millimeters of mercury (mmhg) 0x02, kilopascals (kpa)
}

message protocol_goal_setting
{
    uint32 exercise_min = 1;//1bytes Exercise duration goal
    uint32 standing_hour = 2;//1bytes Standing hours goal
    uint32 kcal = 3;//2bytes Calorie goal
    uint32 steps = 4;//4bytes Step goal
    uint32 distance = 5;//4bytes Distance goal, unit: meter
    uint32 workout_day = 6;//1bytes Workout days goal
    bool notify_switch_flag = 7;//1bytes Goal reminder switch true enabled,false disabled
    notify_type notify_flag = 8;//1bytes Notification type
}

message protocol_user_info_operate
{
    operate_type operate = 1; //Operation type 0: invalid operation 1: query 2: set
    protocol_personal_info personal_info  = 2 ;//Personal information
    protocol_perferences perferences = 3;//Unit settings
    protocol_goal_setting goal_setting = 4;//Goal settings
}

message protocol_user_info_inquire_reply
{
    uint32 func_table = 1;//1bytes Function table
    operate_type operate = 2; //Operation type 0: invalid operation 1: query 2: set
    protocol_personal_info personal_info  = 3 ;//Personal information
    protocol_perferences perferences = 4;//Unit settings
    protocol_goal_setting goal_setting = 5;//Goal settings
    uint32 user_icon_width = 6;//User image width
    uint32 user_icon_height = 7;//User image height
}
```

### `func_table` Description

| Bit | Description |
| --- | --- |
| 0 | Whether the wind speed unit `wind_speed_unit` is supported |
| 1 | Whether the visibility unit `visibility_unit` is supported |
| 2 | Whether the altitude unit `altitude_unit` is not supported |
| 3 | Whether the user image fields `user_icon_width` and `user_icon_height` are supported |
| 4 | Whether the blood pressure unit `blood_pressure_unit` is not supported |
