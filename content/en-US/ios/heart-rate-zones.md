---
docId: ios-heart-rate-zones
locale: en-US
title: iOS Heart-Rate Zones
description: Configure heart-rate zones used during workouts.
platform: iOS
slug: ios/heart-rate-zones
order: 119
status: published
version: v2.0
---

# iOS Heart-Rate Zones

## Overview

Configure heart-rate zones used during workouts.

## Swift example

```swift
var data =  protocol_exercise_heart_rate_zone()
            data.zone1 = 133
            data.zone2 = 144
            data.zone3 = 155
            data.zone4 = 166
            data.zone5 = 177
            data.zone6 = 190
            CreekInterFace.instance.setSportHeartRate(model: data) {
                self.view.hideRemark()
                self.textView.text = "success"
            } failure: { code, message in
                self.view.hideRemark()
                self.textView.text = message
            }
```

## Protobuf data model

```protobuf
syntax = "proto3";
enum heart_rate_zone_mode
{
    HR_MAX_MODE = 0;// maximum mode
    RESERVE_HR_MODE = 1;// mode
}
message protocol_exercise_heart_rate_zone
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    // app maximum
    uint32 zone1 = 2;// zone1; 1bytes 1
    uint32 zone2 = 3;// zone2; 1bytes 2
    uint32 zone3 = 4;// zone3; 1bytes 3
    uint32 zone4 = 5;// zone4; 1bytes 4
    uint32 zone5 = 6;// zone5; 1bytes 5
    uint32 zone6 = 7;// zone6; 1bytes 6
    heart_rate_zone_mode hr_mode = 8;// mode
    uint32 reserve_hr = 9;// value
    // 1 zone1~zone2
    // 2 zone2~zone3
    // 3 zone3~zone4
    // 4 zone4~zone5
    // 5 zone5~zone6
}
message protocol_exercise_heart_rate_zone_inquire_reply
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    // query
    uint32 zone1 = 2;// zone1; 1bytes 1
    uint32 zone2 = 3;// zone2; 1bytes 2
    uint32 zone3 = 4;// zone3; 1bytes 3
    uint32 zone4 = 5;// zone4; 1bytes 4
    uint32 zone5 = 6;// zone5; 1bytes 5
    uint32 zone6 = 7;// zone6; 1bytes 6
    heart_rate_zone_mode hr_mode = 8;// mode
    uint32 func_table = 9;// capability table
    // 1 zone1~zone2
    // 2 zone2~zone3
    // 3 zone3~zone4
    // 4 zone4~zone5
    // 5 zone5~zone6
}
```
