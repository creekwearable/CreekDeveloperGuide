---
docId: android-system-device-schedules
locale: en-US
title: Android System and Device Schedules
description: Write system-calendar or app-managed schedules to the device.
platform: Android
slug: android/system-device-schedules
order: 11
status: published
version: v2.0
---

# Android System and Device Schedules

Write system-calendar or app-managed schedules to the device.

```xml
<uses-permission android:name="android.permission.READ_CALENDAR"/>
<uses-permission android:name="android.permission.WRITE_CALENDAR"/>
```

```kotlin
CreekManager.sInstance.calendarConfig(timerMinute = 10, systemCalendarName = "CREEK", isSupport = true, model = {
    msg ->
    Log.w("calendarConfig", msg)
})

CreekManager.sInstance.syncCalendar()
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

enum repeat_calendar_date
{
    REPEAT_NULL = 0;
    REPEAT_EVERY_DAY = 1;
    REPEAT_EVERY_WEEK = 2;
    REPEAT_EVERY_MONTH = 3;
    REPEAT_EVERY_YEAR = 4;
}

enum repeat_calendar_time
{
    REPEAT_TIME_NULL = 0;
    REPEAT_TIME_5MINUTES = 1;
    REPEAT_TIME_10MINUTES = 2;
    REPEAT_TIME_15MINUTES = 3;
    REPEAT_TIME_30MINUTES = 4;
    REPEAT_TIME_1HOUR = 5;
    REPEAT_TIME_2HOUR = 6;
    REPEAT_TIME_1DAY = 7;
}

message calendar_item
{
    uint32 id = 1;// Id.
    uint32 start_year = 2;// Start Year. 2bytes.
    uint32 start_month = 3;// 1bytes
    uint32 start_day = 4;// 1bytes
    uint32 start_hour = 5;// 1bytes
    uint32 start_minute = 6;// 1bytes
    uint32 end_year = 7;// 2bytesEndYear
    uint32 end_month = 8;// 1bytes
    uint32 end_day = 9;// 1bytes
    uint32 end_hour = 10;// 1bytes
    uint32 end_minute = 11;// 1bytes
    bool all_day = 12;
    repeat_calendar_date repeat_date = 13; // Repeat Date. 1bytes.
    repeat_calendar_time repeat_time = 14;// Repeat Time. 5Minute, 10Minute, 15Minute, 30Minute.
    bytes content = 15;// max:50 Content
};

message protocol_calendar_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    repeated calendar_item calendar_item = 2;
}

message protocol_calendar_inquire_reply
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    uint32 func_table = 2;// 1bytes Function table
    uint32 calendar_support_max = 3; // Number of calendar support max. 1bytes.
    repeated calendar_item calendar_item = 4;
}
```

### `func_table` Bit Definitions

| Bit | Description |
| - | - |
| 0 | Whether all-day schedule repeat settings are supported all_day_type |
| 1 | Whether custom schedule repeat types are supported repeat_custom & custom_type |
