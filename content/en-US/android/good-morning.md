---
docId: android-good-morning
locale: en-US
title: Android Good Morning Greeting
description: Read and configure the device good-morning greeting.
platform: Android
slug: android/good-morning
order: 134
status: published
version: v2.0
---

# Android Good Morning Greeting

Read and configure the device good-morning greeting.

```kotlin
CreekManager.sInstance.getMorning(model = {

}, failure = {
    code, message ->
})

var operate = Morning.protocol_good_morning_operate()
operate.switchFlag = true
operate.startHour = 8
operate.startMinute = 0
operate.endHour = 9
operate.endMinute = 0

operate.repeatList.addAll(listOf(true,true,true,true,true,true,true))
operate.contentList.add(ByteString.copyFrom("Good morning".toByteArray()))
CreekManager.sInstance.setMorning(model = operate, success = {
    
}, failure = {
    code, message ->
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

message protocol_good_morning_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    bool switch_flag = 2; // 1bytes ReminderSwitch true On,false Off
    uint32 start_hour = 3; // ReminderStartTime
    uint32 start_minute = 4;
    uint32 end_hour = 5;   // ReminderEndTime
    uint32 end_minute = 6;
    repeated bool repeat = 7; // Repeat. 7bytes.
    repeated bytes content = 8;// Content.
}

message protocol_good_morning_inquire_reply
{
    uint32 func_table = 1;// 1bytes Function table
    operate_type operate = 2; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    bool switch_flag = 3; // 1bytes ReminderSwitch true On,false Off
    uint32 start_hour = 4; // ReminderStartTime
    uint32 start_minute = 5;
    uint32 end_hour = 6;   // ReminderEndTime
    uint32 end_minute = 7;
    repeated bool repeat = 8; // Repeat. 7bytes.
    repeated bytes content = 9;// Content.
}
```

### `func_table` Bit Definitions

| Bit | Description |
| - | - |
| 0 | Whether repeat dates are supported, Field repeat |
| 1 | Whether greeting text can be edited, Related field content |
