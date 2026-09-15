---
docId: flutter-sports-courses
locale: en-US
title: "Flutter Sports Courses"
description: "Upload, list, and delete workout courses."
platform: Flutter
slug: flutter/sports-courses
order: 136
status: published
version: v2.0
---

# Flutter Sports Courses

Upload, list, and delete workout courses.

## Upload courses
## Get courses
```dart
sdkManager.getCourse(callBack: (e){

},errCallBack: (e){

})
```

## Del courses
```dart
var operate = protocol_exercise_course_list_operate();
var item = course_list_item();
operate.listItems.add(item);
sdkManager.delCourse(operate: operate,callBack: (){

},errCallBack: (e){

});
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum operate_course_list_type
{
    INVALID = 0; // Invalid or unspecified value.
    INQUIRE = 1; // inquire
    DELETE = 2;  // delete
}

enum course_target_support_type
{
    CONTINUING_TARGET_MANUALLY_LAP = 0; // continuous target - manual lap
    CONTINUING_TARGET_TIME = 1; // continuous target - time
    CONTINUING_TARGET_DISTANCE = 2; // continuous target - distance
    CONTINUING_TARGET_CALORIES = 3; // continuous target - calories
    CONTINUING_TARGET_HEART_RATE = 4; // continuous target - heart rate
    STRENGTH_TARGET_OPEN = 5; // intensity target - open
    STRENGTH_TARGET_PACE = 6; // intensity target - pace
    STRENGTH_TARGET_CADENCE = 7; // intensity target - cadence
    STRENGTH_TARGET_HEART_RATE_ZONE = 8; // intensity target - heart rate zone
    STRENGTH_TARGET_CUSTOM_RATE_ZONE = 9; // intensity target - custom heart rate
    STRENGTH_TARGET_POWER_ZONES = 10; // intensity target - power zone
    STRENGTH_TARGET_RATE_ZONE_RESERVE = 11; // intensity target - heart rate reserve
    STRENGTH_TARGET_RATE_ZONE_MAX = 12; // intensity target - max heart rate
    STRENGTH_TARGET_POWER = 13; // intensity target - power
}

// Course list item data
message course_list_item
{
    uint32 id = 1; // course unique ID
    uint32 Branch_id = 2; // branch ID
    uint32 Creator_id = 3; // creator ID
};

message protocol_exercise_course_list_operate
{
    operate_course_list_type operate = 1; // 1 byte operation type
    repeated course_list_item list_items = 2; // Course entries.
}

message protocol_exercise_course_list_inquire_reply
{
    operate_course_list_type operate = 1;     // 1 byte operation type
    uint32 func_table = 2;        // 1 byte function table
    repeated course_list_item list_items = 3; // max: tentative 50
    repeated course_target_support_type target_support = 4; // list of supported course target types
}
```

### Field Reference

#### `course_list_item`

| Field | Type | Description |
| --- | --- | --- |
| `id` | `uint32` | course unique ID |
| `Branch_id` | `uint32` | branch ID |
| `Creator_id` | `uint32` | creator ID |

#### `protocol_exercise_course_list_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_course_list_type` | 1 byte operation type |
| `list_items` | `repeated course_list_item` | Course entries. |

#### `protocol_exercise_course_list_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_course_list_type` | 1 byte operation type |
| `func_table` | `uint32` | 1 byte function table |
| `list_items` | `repeated course_list_item` | max: tentative 50 |
| `target_support` | `repeated course_target_support_type` | list of supported course target types |

### Enum Values

#### `operate_course_list_type`

| Value | Number | Description |
| --- | --- | --- |
| `INVALID` | `0` | Invalid or unspecified value. |
| `INQUIRE` | `1` | inquire |
| `DELETE` | `2` | delete |

#### `course_target_support_type`

| Value | Number | Description |
| --- | --- | --- |
| `CONTINUING_TARGET_MANUALLY_LAP` | `0` | continuous target - manual lap |
| `CONTINUING_TARGET_TIME` | `1` | continuous target - time |
| `CONTINUING_TARGET_DISTANCE` | `2` | continuous target - distance |
| `CONTINUING_TARGET_CALORIES` | `3` | continuous target - calories |
| `CONTINUING_TARGET_HEART_RATE` | `4` | continuous target - heart rate |
| `STRENGTH_TARGET_OPEN` | `5` | intensity target - open |
| `STRENGTH_TARGET_PACE` | `6` | intensity target - pace |
| `STRENGTH_TARGET_CADENCE` | `7` | intensity target - cadence |
| `STRENGTH_TARGET_HEART_RATE_ZONE` | `8` | intensity target - heart rate zone |
| `STRENGTH_TARGET_CUSTOM_RATE_ZONE` | `9` | intensity target - custom heart rate |
| `STRENGTH_TARGET_POWER_ZONES` | `10` | intensity target - power zone |
| `STRENGTH_TARGET_RATE_ZONE_RESERVE` | `11` | intensity target - heart rate reserve |
| `STRENGTH_TARGET_RATE_ZONE_MAX` | `12` | intensity target - max heart rate |
| `STRENGTH_TARGET_POWER` | `13` | intensity target - power |
