---
docId: android-prayer
locale: en-US
title: Android Prayer
description: Read and configure prayer times and reminders.
platform: Android
slug: android/prayer
order: 148
status: published
version: v2.0
---

# Android Prayer

Read and configure prayer times and reminders.

```kotlin
CreekManager.sInstance.getPrayer(model = {
        model ->
    responseText.value = model.toString()
},failure = { _, m ->
    responseText.value = m
})

val operate = Prayer.protocol_prayer_operate()
CreekManager.sInstance.setPrayer(model = operate, success = {
    responseText.value = "success"
}, failure = {_, m ->
    responseText.value = m
})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;// Query
    SET = 2;// Set
}

message prayer_time
{
    uint32 hour                    = 1; // 1bytes
    uint32 minute                  = 2; // 1bytes
};

message prayer_data
{
    prayer_time fajr_time           = 1; // Fajr Time.
    prayer_time sunrise_time        = 2; // SunriseTime
    prayer_time dhuhr_time          = 3; // Dhuhr Time.
    prayer_time asr_time            = 4; // Asr Time.
    prayer_time maghrib_time        = 5; // Maghrib Time.
    prayer_time isha_time           = 6; // Isha Time.
    uint32 date                     = 7; // Date. 4bytes.
};

message protocol_prayer
{
    repeated prayer_data data        = 1; // Data. max:3.
    bytes city_name                  = 2; // City Name. max:64.
    uint32 room_angle                = 3; // Room Angle. 2bytes.
    uint32 updated_time              = 4; // Updated Time. 4bytes.
};

message protocol_prayer_operate
{
    operate_type operate                  = 1; // Operation type 0: Invalid operation 1: Query 2: Set
    protocol_prayer prayer                = 2;
}

message protocol_prayer_inquire_reply
{
    operate_type operate                  = 1; // Operation type 0: Invalid operation 1: Query 2: Set
    protocol_prayer prayer                = 2;
}
```
