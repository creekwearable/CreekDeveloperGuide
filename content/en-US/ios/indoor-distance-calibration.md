---
docId: ios-indoor-distance-calibration
locale: en-US
title: iOS Indoor Workout Distance Calibration
description: Submit actual and recorded distances to calibrate indoor workouts.
platform: iOS
slug: ios/indoor-distance-calibration
order: 150
status: published
version: v2.0
---

# iOS Indoor Workout Distance Calibration

## Overview

Submit actual and recorded distances to calibrate indoor workouts.

## Swift example

```swift
var operate  =  protocol_distance_adjust_operate()
    operate.realityDistance = 100
    operate.adjustDistance = 200
    CreekInterFace.instance.setDistanceAdjust(model: protocol_distance_adjust_operate) {
            
    } failure: { code, message in
            
    }
```

## Protobuf data model

```protobuf
syntax = "proto3";

message protocol_distance_adjust_operate
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    uint32 reality_distance = 2;// reality distance
    uint32 adjust_distance = 3;  // adjust distance
}
```
