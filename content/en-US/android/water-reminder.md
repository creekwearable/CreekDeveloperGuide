---
docId: android-water-reminder
locale: en-US
title: Android Water Reminder
description: Read and configure water reminders.
platform: Android
slug: android/water-reminder
order: 124
status: published
version: v2.0
---

# Android Water Reminder

Read and configure water reminders.

```kotlin
// /Get
CreekManager.sInstance.getWater({model: WaterMonitor.protocol_drink_water_inquire_reply ->
    responseText.value = model.toString()
}, failure = {_, m ->
    responseText.value = m
})

// /Set
var  operate =  WaterMonitor.protocol_drink_water_operate()
operate.switchFlag = true
operate.startHour = 8
operate.startMinute = 0
operate.endHour = 18
operate.endMinute = 0
CreekManager.sInstance.setWater(model = operate, success = {
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

message protocol_drink_water_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    bool switch_flag = 2; // 1bytes Water reminderSwitch true On,false Off
    notify_type notify_flag = 3;// 1bytes NotificationType
    uint32 start_hour = 4; // ReminderStartTime
    uint32 start_minute = 5;
    uint32 end_hour = 6;   // ReminderEndTime
    uint32 end_minute = 7;
    repeated bool repeat = 8; // Repeat. 1bytes.
    uint32 interval = 9;  // Interval. 2bytes.
}

message protocol_drink_water_inquire_reply
{
    uint32 func_table = 1;// 1bytes Function table
    operate_type operate = 2; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    bool switch_flag = 3; // 1bytes Water reminderSwitch true On,false Off
    notify_type notify_flag = 4;// 1bytes NotificationType
    uint32 start_hour = 5; // ReminderStartTime
    uint32 start_minute = 6;
    uint32 end_hour = 7;   // ReminderEndTime
    uint32 end_minute = 8;
    repeated bool repeat = 9; // Repeat. 1bytes.
    uint32 interval = 10;  // Interval. 2bytes.
}
```

### `func_table` Bit Definitions

| Bit | Description |
| - | - |
| 0 | Whether the protocol supports only the water-reminder switch |
