---
docId: android-blood-pressure
locale: en-US
title: Android Blood Pressure
description: Read blood-pressure data from the device.
platform: Android
slug: android/blood-pressure
order: 139
status: published
version: v2.0
---

# Android Blood Pressure

Read blood-pressure data from the device.

```kotlin
CreekManager.sInstance.getBloodPressure(model = {model ->
    println(model.toString())
}, failure = { c,d ->
    println("errCode: $c, errDesc: $d")
})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";
 
enum operate_blood_pressure_type
{
    INVALID = 0;
    INQUIRE = 1; // Query
}
 
message protocol_blood_pressure_item
{
    uint32 year = 1;
    uint32 month = 2;
    uint32 day = 3;
    uint32 hour = 4;
    uint32 minute = 5;
    uint32 second = 6;
    uint32 pluse = 7;// Pulse
    uint32 spb = 8;// Systolic blood pressure
    uint32 dbp = 9;// Diastolic blood pressure
};
 
message protocol_blood_pressure_operate
{
    operate_blood_pressure_type operate = 1; // 1bytes Operation type
    uint32 page_index = 2;// Current page index for paged transfer.
    uint32 page_num = 3;// Number of records in the current transfer page.
}
 
message protocol_blood_pressure_inquire_reply
{
    operate_blood_pressure_type operate = 1;     // 1bytesOperation type
    uint32 func_table = 2;        // 1bytes Function table
    uint32 blood_pressure_record_support_max = 3; // 1bytes Maximum number of blood-pressure records
    uint32 page_index = 4;// Current page index for paged transfer.
    uint32 page_num = 5;// Number of records in the current transfer page.
    repeated protocol_blood_pressure_item bp_items = 6;
}
```
