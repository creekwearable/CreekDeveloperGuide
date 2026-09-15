---
docId: ios-training-load
locale: en-US
title: iOS Training Load
description: Read training-load data from the device.
platform: iOS
slug: ios/training-load
order: 146
status: published
version: v2.0
---

# iOS Training Load

## Overview

Read training-load data from the device.

## Swift example

```swift
CreekInterFace.instance.getTrainingLoad{ model in
            self.view.hideRemark()
            let json = try? model.jsonString()
            if let str = json{
               dispatch_main_sync_safe {
                  self.textView.text = str
               }
            }
         } failure: { code, message in
            self.view.hideRemark()
            self.textView.text = message
        }
```

## Protobuf data model

```protobuf
syntax = "proto3";
enum operate_training_load_type
{
    INVALID = 0;
    INQUIRE = 1; // query
}

enum readiness_level
{
    LOW = 0;// LOW
    MEDIUM = 1;// MEDIUM
    HIGH = 2;// height
}

enum readiness_status
{
    NULL = 0;// data
    RECOVER = 1;// mode
    GEARED_UP = 2;// GEARED UP
    MAX_EFFORT = 3;// MAX EFFORT
    CAUTION = 4;// CAUTION
    MAINTAIN = 5;// MAINTAIN
    OPTIMIZE = 6;// OPTIMIZE
    CRITICAL = 7;// CRITICAL
    BURNOUT_RIST = 8;// BURNOUT RIST
    PRO_ZONE = 9;// PRO ZONE
}
 
message protocol_training_load_item
{
    uint32 year = 1;
    uint32 month = 2;
    uint32 day = 3;
    uint32 load_value = 4;// Current training-load value
    uint32 load_suggest_max = 5;// Recommended maximum load
    uint32 load_suggest_min = 6;// Recommended minimum load
    uint32 load_critical_max = 7;// Critical maximum load
    uint32 readiness_value = 8;// Readiness score
    readiness_level readiness_level = 9; // readiness level
    readiness_status readiness_status = 10;// status
};
 
message protocol_training_load_operate
{
    operate_training_load_type operate = 1; // operate; 1bytes operation type
}
 
message protocol_training_load_inquire_reply
{
    operate_training_load_type operate = 1;     // operate; 1bytesoperation type
    uint32 func_table = 2;        // func table; 1bytes capability table
    uint32 snap_record_support_max = 3; // Maximum supported training-load records; 1 byte
    repeated protocol_training_load_item load_items = 4;// Training-load records
}
```
