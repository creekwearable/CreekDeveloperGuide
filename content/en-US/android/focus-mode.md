---
docId: android-focus-mode
locale: en-US
title: Android Focus Mode
description: Read and configure Focus Mode schedules.
platform: Android
slug: android/focus-mode
order: 126
status: published
version: v2.0
---

# Android Focus Mode

Read and configure Focus Mode schedules.

```kotlin
// /Get
CreekManager.sInstance.getFocusSleep({model: Focus.protocol_focus_mode_inquire_reply ->
    responseText.value = model.toString()
}, failure = {_, m ->
    responseText.value = m
})

// /Set
var  operate =  Focus.protocol_focus_mode_operate()
var mode = Focus.protocol_focus_sleep_mode()
mode.switchFlag = true
mode.startHour = 22
mode.endHour = 8
mode.startMinute = 0
mode.endMinute = 0
operate.sleepMode = mode
CreekManager.sInstance.setFocusSleep(model = operate, success = {
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

enum switch_type
{
    SWITCH_NULL = 0;// NULL
    SWITCH_ON = 1;// On
    SWITCH_OFF = 2;// Off
}

message protocol_focus_sleep_mode
{
    bool switch_flag = 1;
    // StartTime
    uint32 start_hour = 2; 
    uint32 start_minute = 3;
    // EndTime
    uint32 end_hour = 4;
    uint32 end_minute = 5;
}

message protocol_focus_mode_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    protocol_focus_sleep_mode sleep_mode = 2; // Sleep Mode.
    switch_type sleep_mode_switch = 3;  // Sleep Mode Switch switch. 1bytes.
}

message protocol_focus_mode_inquire_reply
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    uint32 func_table = 2;// 1bytes Function table
    protocol_focus_sleep_mode sleep_mode = 3; // Sleep Mode.
    switch_type sleep_mode_switch = 4;  // Sleep Mode Switch switch. 1bytes.
}
```
