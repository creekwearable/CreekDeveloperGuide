---
docId: android-database-operations
locale: en-US
title: Android Database Queries and Operations
description: Set the database user, query health records, and update upload state.
platform: Android
slug: android/database-operations
order: 14
status: published
version: v2.0
---

# Android Database Queries and Operations

Set the database user, query health records, and update upload state.

## Table Schemas

### Heart rate HEART_RATE_DATA_HEAD

> userID      : Userid
> 

> 

> 

> 

> 

> 

> 

> 

> 

> 
> ~~hr_interval~~:  [{"/threshold"/:12,"/minute"/:60}]  thresholdThreshold  minuteMinute    
> 

> 
>

### Stress STRESS_DATA_HEAD

> userID      : Userid
> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

>

### Blood oxygen SPO_DATA_HEAD

> userID      : Userid
> 

> 

> 

> 

> 

> 

> 

> 

> 
>

> userID      : Userid
> 

> 

> 

> 

> 
> get_up_time : Wake upTime
> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 
>

> userID      : Userid
> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 
> [{
> 
>      "/step_count"/:1,     //Steps
> 

> 

> 

> 

> 

> 

> 
> }]
> 
>

### ~~Noise NOISE_DATA_HEAD~~

### hrv HRV_DATA_HEAD

> userID      : Userid
> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 
>

### Workout. SPORT_DATA_HEAD

> userID      : Userid
> 

> 

> 
> startTime: StartTime
> 
> endTime: EndTime
> 

> 

> 

> 

> 

> 
>

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 
> totalStep:Steps
> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 
> uploadStatus:
> 

> 

> 

> 

> 

> 

> 

> 

> 

> 
>

> 

> 

> 

> 

> 

> 

> 
> workoutCourseSupport: *Whether supportedWorkoutCourse*
> 

> 

> 

> 
> courseId: *Courseid*
> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 
> - enum training_effect_type{  

>     TRAINING_EFFECT_OTHER = 6,  
> }
> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 
> enum Events_type{  

> }
> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 

> 
>

> 

> 

> 
>

```kotlin
> public class RunPostureModel: Codable {
>
>     public var balanceR: Int?
>
>     public var groundTime: Int?
>
>     public var airTime: Int?
>
>     public var verticalOscillation: Int?
>
>     public var verticalStepPercent: Int?
> 
> }
>
```

> 

> 
>

```kotlin
> public class VerticalJumpModel: Codable {
> 
>
>     public var repId: Int?
>
>     public var repTimestampStart: Int?
>
>     public var repTimestampEnd: Int?
>
>     public var jumpTimestampStart: Int?
>
>     public var jumpTimestampEnd: Int?
>
>     public var repDurations: Int?
>
>     public var jumpDurations: Int?
>
>     public var jumpHeight: Int?
>
>     public var peakSpeed: Int?
>
>     public var repCount: Int?
> 
> }
>
```

sportsEventItem

>

```kotlin
> public class sportsEventModel: Codable {
>    
>     public var segmentsType: Int?
>     public var sportType: Int?
>     public var groupId: Int?
>     public var avgHr: Int?
>     public var order: Int?
>     public var calories: Int?
>     public var duration: Int?
> 
> }
>
```

### Respiratory rate RESPIRATORY_DATA_HEAD

> userID      : Userid
> 

> 

> 

> 

> 

> 

> 

> 
>

### SecondBlood oxygen SPO_SECOND_DATA_HEAD

> userID      : Userid
> 

> 

> 

> 

> 

> 

> 

> 

> 
>

### Atrial fibrillation AF_DATA_HEAD

> userID      : Userid
> 

> 

> 

> 

> 

> userID      : Userid
> 

> 

> 

> 

> 

### Temperature TEMPERATURE_DATA_HEAD

> userID      : Userid
> 

> 

> 

> 

> 

> 

> 

> 

> 
> [{
> 
>      "/offset"/:1,     //Steps
> 

> 

> 

> 
> }]

> userID      : Userid
> 

> 

> 

> 

> 

> 
> [{
> 

> 

> 
> }]

## Set the Database User ID

## Queries

### Heart rate

### Stress

### Noise

### Blood oxygen

### hrv

### Respiratory rate

```kotlin
CreekManager.sInstance.getRespiratoryNewTimeData(startTime = "2023-10-01", endTime = "2024-11-23", model = {
        model: BaseModel<List<RespiratoryModel>> ->
    responseText.value = model.data?.toList().toString()
})
```

```kotlin
CreekManager.sInstance.getActivityLevelNewTimeData(
    startTime = "2026-07-01",
    endTime = "2026-07-30"
) { model: BaseModel<List<ActivityLevelModel>> ->
    responseText.value = model.data?.toList().toString()

}
```

### Workout

#### DeleteWorkout

#### DeleteWorkout

## Query Pending Upload Data

### Heart rate

### Stress

### Blood oxygen

### Noise

### Workout

### hrv

### Respiratory rate

## Mark Data as Uploaded
