---
docId: android-training-load
locale: en-US
title: Android Training Load
description: Read training-load data from the device.
platform: Android
slug: android/training-load
order: 146
status: published
version: v2.0
---

# Android Training Load

Read training-load data from the device.

```kotlin
CreekManager.sInstance.getTrainingLoad(model = {
        model ->
    responseText.value = model.toString()
},failure = { _, m ->
    responseText.value = m
})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";
enum operate_training_load_type
{
    INVALID = 0;
    INQUIRE = 1; // Query
}

enum readiness_level
{
    LOW = 0;// LOW.
    MEDIUM = 1;// MEDIUM.
    HIGH = 2;// Height
}

enum readiness_status
{
    NULL = 0;// NULL.
    RECOVER = 1;// ResumeMode
    GEARED_UP = 2;// GEARED UP.
    MAX_EFFORT = 3;// MAX EFFORT.
    CAUTION = 4;// CAUTION.
    MAINTAIN = 5;// MAINTAIN.
    OPTIMIZE = 6;// OPTIMIZE.
    CRITICAL = 7;// CRITICAL.
    BURNOUT_RIST = 8;// BURNOUT RIST.
    PRO_ZONE = 9;// PRO ZONE.
}
 
message protocol_training_load_item
{
    uint32 year = 1;
    uint32 month = 2;
    uint32 day = 3;
    uint32 load_value = 4;// Load Value.
    uint32 load_suggest_max = 5;// Maximum load suggest max.
    uint32 load_suggest_min = 6;// Load Suggest Min.
    uint32 load_critical_max = 7;// Load Critical Max.
    uint32 readiness_value = 8;// Readiness Value.
    readiness_level readiness_level = 9; // Readiness Level.
    readiness_status readiness_status = 10;// Readiness Status.
};
 
message protocol_training_load_operate
{
    operate_training_load_type operate = 1; // 1bytes Operation type
}
 
message protocol_training_load_inquire_reply
{
    operate_training_load_type operate = 1;     // 1bytesOperation type
    uint32 func_table = 2;        // 1bytes Function table
    uint32 snap_record_support_max = 3; // Number of snap record support max. 1bytes.
    repeated protocol_training_load_item load_items = 4;// Load Items.
}
```
