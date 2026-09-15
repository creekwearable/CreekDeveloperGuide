---
docId: ios-workout-courses
locale: en-US
title: iOS Workout Courses
description: Upload, list, and delete workout courses on the device.
platform: iOS
slug: ios/workout-courses
order: 135
status: published
version: v2.0
---

# iOS Workout Courses

## Overview

Upload, list, and delete workout courses on the device.

## Swift example

```swift
let model = CourseModel()
          model.type = .json
          model.fileSize = fileData.count
          model.fileData = fileData
          model.name = fileURL.lastPathComponent
          CreekInterFace.instance.uploadSportCourse(courseModels: [model]) { progress in
             self.infoLabel.text = "progress : \(progress)"
          } uploadSuccess: {
             self.infoLabel.text = "Success"
          } uploadFailure: { code, message in
             self.infoLabel.text = "Failure"
          }
```

```swift
CreekInterFace.instance.getCourse { model in
            // Handle result.
         } failure: { code, message in
            // Handle error.
         }
```

```swift
var operate = protocol_exercise_course_list_operate()
          // Build the course item from the returned list entry.
         var item = course_list_item()
         operate.listItems.append(item)
         
         CreekInterFace.instance.delCourse(model: operate) {
            // Handle success.
         } failure: { code, message in
            // Handle error.
         }
```

## Protobuf data model

```protobuf
syntax = "proto3";

enum operate_course_list_type
{
    INVALID = 0;
    INQUIRE = 1; // query
    DELETE = 2;  // delete
}

enum course_target_support_type
{
    CONTINUING_TARGET_MANUALLY_LAP = 0;// CONTINUING TARGET MANUALLY LAP
    CONTINUING_TARGET_TIME = 1;// - time
    CONTINUING_TARGET_DISTANCE = 2;// CONTINUING TARGET DISTANCE
    CONTINUING_TARGET_CALORIES = 3;// CONTINUING TARGET CALORIES
    CONTINUING_TARGET_HEART_RATE = 4;// CONTINUING TARGET HEART RATE
    STRENGTH_TARGET_OPEN = 5;// STRENGTH TARGET OPEN
    STRENGTH_TARGET_PACE = 6;// STRENGTH TARGET PACE
    STRENGTH_TARGET_CADENCE = 7;// STRENGTH TARGET CADENCE
    STRENGTH_TARGET_HEART_RATE_ZONE = 8;// STRENGTH TARGET HEART RATE ZONE
    STRENGTH_TARGET_CUSTOM_RATE_ZONE = 9;// - - custom
    STRENGTH_TARGET_POWER_ZONES = 10;// STRENGTH TARGET POWER ZONES
    STRENGTH_TARGET_RATE_ZONE_RESERVE = 11;// STRENGTH TARGET RATE ZONE RESERVE
    STRENGTH_TARGET_RATE_ZONE_MAX = 12;// - - maximum
    STRENGTH_TARGET_POWER = 13;// STRENGTH TARGET POWER
}
 
// One workout-course list item.
message course_list_item
{
    uint32 id = 1;// ID
    uint32 Branch_id = 2;// Branch ID
    uint32 Creator_id = 3;// ID
};
 
message protocol_exercise_course_list_operate
{
    operate_course_list_type operate = 1; // operate; 1bytes operation type
    repeated course_list_item list_items = 2;
}
 
message protocol_exercise_course_list_inquire_reply
{
    operate_course_list_type operate = 1;     // operate; 1bytesoperation type
    uint32 func_table = 2;        // func table; 1bytes capability table
    repeated course_list_item list_items = 3;// list items; max: 50
    repeated course_target_support_type target_support = 4;// supportedlist
}
```
