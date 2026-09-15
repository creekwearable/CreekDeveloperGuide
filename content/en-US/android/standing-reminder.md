---
docId: android-standing-reminder
locale: en-US
title: Android Standing Reminder
description: Read and configure standing-reminder timing and recurrence.
platform: Android
slug: android/standing-reminder
order: 123
status: published
version: v2.0
---

# Android Standing Reminder

Read and configure standing-reminder timing and recurrence.

```kotlin
// /Get
CreekManager.sInstance.getStanding({model: Standing.protocol_standing_remind_inquire_reply ->
    responseText.value = model.toString()
}, failure = {_, m ->
    responseText.value = m
})

// /Set
var  operate =  Standing.protocol_standing_remind_operate()
var standing =  Standing.protocol_standing_remind_set()
// /Just set the switch  other attributes do not need to be set
standing.switchFlag = true
operate.standingRemind = standing
CreekManager.sInstance.setStanding(model = operate, success = {
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

enum notify_type
{
    ALLOW = 0;// Allow notifications
    SILENT = 1;// Silent notifications
    CLOSE = 2;// Disable notifications
}

message protocol_standing_remind_set
{
    bool switch_flag = 1; // 1bytes Standing reminderSwitch true On,false Off
    notify_type notify_flag = 2;// 1bytes NotificationType
    uint32 start_hour = 3; // ReminderStartTime
    uint32 start_minute = 4;
    uint32 end_hour = 5;   // ReminderEndTime
    uint32 end_minute = 6;
    repeated bool repeat = 7; // Repeat. 1bytes.
}

message protocol_standing_remind_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    protocol_standing_remind_set standing_remind = 2;
}

message protocol_standing_remind_inquire_reply
{
    uint32 func_table = 1;// 1bytes Function table
    operate_type operate = 2; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    protocol_standing_remind_set standing_remind = 3;
}
```
