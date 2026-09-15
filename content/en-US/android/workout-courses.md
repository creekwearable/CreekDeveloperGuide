---
docId: android-workout-courses
locale: en-US
title: Android Workout Courses
description: Upload, query, and delete workout courses on the device.
platform: Android
slug: android/workout-courses
order: 135
status: published
version: v2.0
---

# Android Workout Courses

Upload, query, and delete workout courses on the device.

### Upload a Course

```kotlin
var model = CourseModel()

model.fileSize = fileData.size
model.fileData = fileData
model.name = "Outdoor running"

CreekManager.sInstance.uploadSportCourse(courseModels = listOf(model), uploadProgress = {
    
}, uploadSuccess = {
    
}, uploadFailure = {
    code, message ->
})
```

### Get Courses

```kotlin
CreekManager.sInstance.getCourse(model = {
    
}, failure = {
    code, message ->
})
```

### Delete Courses

```kotlin
var operate = Sport.protocol_exercise_course_list_operate()

var item = Sport.course_list_item()
operate.listItemsList.add(item)
CreekManager.sInstance.delCourse(model = operate, success = {
    
}, failure = {
    code, message ->
})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

enum operate_course_list_type
{
    INVALID = 0;
    INQUIRE = 1; // Query
    DELETE = 2;  // Delete
}

enum course_target_support_type
{
    CONTINUING_TARGET_MANUALLY_LAP = 0;// CONTINUING TARGET MANUALLY LAP.
    CONTINUING_TARGET_TIME = 1;// CONTINUING TARGET TIME.
    CONTINUING_TARGET_DISTANCE = 2;// CONTINUING TARGET DISTANCE.
    CONTINUING_TARGET_CALORIES = 3;// CONTINUING TARGET CALORIES.
    CONTINUING_TARGET_HEART_RATE = 4;// CONTINUING TARGET HEART RATE.
    STRENGTH_TARGET_OPEN = 5;// STRENGTH TARGET OPEN.
    STRENGTH_TARGET_PACE = 6;// STRENGTH TARGET PACE.
    STRENGTH_TARGET_CADENCE = 7;// STRENGTH TARGET CADENCE.
    STRENGTH_TARGET_HEART_RATE_ZONE = 8;// STRENGTH TARGET HEART RATE ZONE.
    STRENGTH_TARGET_CUSTOM_RATE_ZONE = 9;// STRENGTH TARGET CUSTOM RATE ZONE.
    STRENGTH_TARGET_POWER_ZONES = 10;// STRENGTH TARGET POWER ZONES.
    STRENGTH_TARGET_RATE_ZONE_RESERVE = 11;// STRENGTH TARGET RATE ZONE RESERVE.
    STRENGTH_TARGET_RATE_ZONE_MAX = 12;// Maximum strength target rate zone max.
    STRENGTH_TARGET_POWER = 13;// STRENGTH TARGET POWER.
}
 

message course_list_item
{
    uint32 id = 1;// Id.
    uint32 Branch_id = 2;// Branch Id.
    uint32 Creator_id = 3;// Creator Id.
};
 
message protocol_exercise_course_list_operate
{
    operate_course_list_type operate = 1; // 1bytes Operation type
    repeated course_list_item list_items = 2;
}
 
message protocol_exercise_course_list_inquire_reply
{
    operate_course_list_type operate = 1;     // 1bytesOperation type
    uint32 func_table = 2;        // 1bytes Function table
    repeated course_list_item list_items = 3;// List Items.
    repeated course_target_support_type target_support = 4;// Target Support.
}
```
