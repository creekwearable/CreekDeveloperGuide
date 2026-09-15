---
docId: android-medicine-reminder
locale: en-US
title: Android Medicine Reminder
description: Read and configure medicine reminders.
platform: Android
slug: android/medicine-reminder
order: 140
status: published
version: v2.0
---

# Android Medicine Reminder

Read and configure medicine reminders.

```kotlin
CreekManager.sInstance.getMedicineRemind(model = {model ->
    println(model.toString())
}, failure = {c,d->
    println("errCode: $c, errDesc: $d")
})
```

```kotlin
/*

// interval: ReminderTimeInterval
* */
val medicineOperate = Medicine.protocol_medicine_remind_operate()
medicineOperate.startHour = 11
medicineOperate.startMinute = 32

medicineOperate.endHour = 23
medicineOperate.endMinute = 58

val repeatArr : List<Boolean> = listOf(true, false, true, false,true, false, true)
medicineOperate.repeatList.addAll(repeatArr)
medicineOperate.interval = 5
CreekManager.sInstance.setMedicineReMind(model = medicineOperate, success = {
    println("setMedicineRemind success")
}, failure = {c,d ->
    println("errCode: $c, errDesc: $d")
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

message protocol_medicine_remind_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    bool switch_flag = 2; // 1bytes ReminderSwitch true On,false Off
    notify_type notify_flag = 3;// 1bytes NotificationType
    uint32 start_hour = 4; // ReminderStartTime
    uint32 start_minute = 5;
    uint32 end_hour = 6;   // ReminderEndTime
    uint32 end_minute = 7;
    repeated bool repeat = 8; // Repeat. 1bytes.
    uint32 interval = 9;  // Interval. 2bytes.
}

message protocol_medicine_remind_inquire_reply
{
    uint32 func_table = 1;// 1bytes Function table
    operate_type operate = 2; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    bool switch_flag = 3; // 1bytes ReminderSwitch true On,false Off
    notify_type notify_flag = 4;// 1bytes NotificationType
    uint32 start_hour = 5; // ReminderStartTime
    uint32 start_minute = 6;
    uint32 end_hour = 7;   // ReminderEndTime
    uint32 end_minute = 8;
    repeated bool repeat = 9; // Repeat. 1bytes.
    uint32 interval = 10;  // Interval. 2bytes.
}
```
