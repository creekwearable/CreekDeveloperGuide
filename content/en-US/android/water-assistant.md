---
docId: android-water-assistant
locale: en-US
title: Android Water Assistant
description: Read and configure Water Assistant data.
platform: Android
slug: android/water-assistant
order: 125
status: published
version: v2.0
---

# Android Water Assistant

Read and configure Water Assistant data.

```kotlin
CreekManager.sInstance.getWatchSensor({ model ->
    responseText.value = model.toString()
}, failure = { _, m ->
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

message water_assistant_time
{
    uint32 year = 1;
    uint32 month = 2;
    uint32 day = 3;
    uint32 hour = 4;
    uint32 minute = 5;
    uint32 second = 6;
};

message water_assistant_time_section
{
    uint32 start_hour = 1;     // 1bytes StartTime
    uint32 start_minute = 2;   // 1bytes
    uint32 end_hour = 3;       // 1bytes EndTime
    uint32 end_minute = 4;     // 1bytes
}

message water_assistant_setting
{
    uint32 user_target = 1;          // User Target. 2bytes.
    uint32 interval = 2;             // Interval. 2bytes.
    bool   switch_flag = 3;          // ReminderSwitch
    repeated water_assistant_time_section time_section = 4;// Time Section. max:8.
}

message water_assistant_daily_status
{
    uint32 year = 1;
    uint32 month = 2;
    uint32 day = 3;
    bool  status = 4;// Status.
    uint32 drink_value = 5;// Drink Value.
    uint32 user_target = 6; // User Target.
}

message protocol_water_assistant_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    water_assistant_time last_drink_time = 2;// Last Drink Time.
    repeated water_assistant_daily_status daily_data = 3;// Daily Data.
    water_assistant_setting setting = 4;// Set
    uint32 set_utc_time = 5;// Set Utc Time.
}

message protocol_water_assistant_inquire_reply
{
    uint32 func_table = 1;// 1bytes Function table
    operate_type operate = 2; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    water_assistant_time last_drink_time = 3;// Last Drink Time.
    repeated water_assistant_daily_status daily_data = 4;// Daily Data.
    water_assistant_setting setting = 5;// Set
    uint32 set_utc_time = 6;// Set Utc Time.
}
```
