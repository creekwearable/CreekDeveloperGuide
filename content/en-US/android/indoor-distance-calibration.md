---
docId: android-indoor-distance-calibration
locale: en-US
title: Android Indoor Workout Distance Calibration
description: Calibrate actual and device-recorded distance for indoor workouts.
platform: Android
slug: android/indoor-distance-calibration
order: 150
status: published
version: v2.0
---

# Android Indoor Workout Distance Calibration

Calibrate actual and device-recorded distance for indoor workouts.

```kotlin
CreekManager.sInstance.androidPair()
 val operate =  DistanceAdjust.protocol_distance_adjust_operate()
operate.realityDistance = 100
operate.adjustDistance = 200
CreekManager.sInstance.setDistanceAdjust(model = operate, success = {
    responseText.value = "success"
}, failure = { _,m ->
    responseText.value = m
})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

message protocol_distance_adjust_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    uint32 reality_distance = 2;// Reality Distance.
    uint32 adjust_distance = 3;  // Adjust Distance.
}
```
