---
docId: android-menstrual-cycle
locale: en-US
title: Android Menstrual Cycle
description: Read and configure menstrual-cycle parameters.
platform: Android
slug: android/menstrual-cycle
order: 105
status: published
version: v2.0
---

# Android Menstrual Cycle

Read and configure menstrual-cycle parameters.

```kotlin
CreekManager.sInstance.getMenstrual(model = {
        model ->
    responseText.value = model.toString()
},failure = { _, m ->
    responseText.value = m
})

val operate =  Menstrual.protocol_menstruation_operate()
val period = Menstrual.protocol_menstrual_period_set()
period.switchFlag = true
period.periodLength = 28
period.cycleLength = 5;
period.lastYear = 2025
period.lastMonth = 10
period.lastDay = 10
operate.periodSet = period

CreekManager.sInstance.setMenstrual(model = operate, success = {
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

enum period_log
{
    PERIOD_LOG_NULL = 0;// PERIOD LOG NULL.
    PERIOD_LOG_NOT_FLOW = 1;// PERIOD LOG NOT FLOW.
    PERIOD_LOG_AS_USUAL = 2;// PERIOD LOG AS USUAL.
    PERIOD_LOG_LIGHT_FLOW = 3;// PERIOD LOG LIGHT FLOW.
    PERIOD_LOG_MENDIUM_FLOW = 4;// PERIOD LOG MENDIUM FLOW.
    PERIOD_LOG_HEAVY_FLOW = 5;// PERIOD LOG HEAVY FLOW.
}

message protocol_menstrual_period_set
{
    bool switch_flag = 1; // 1bytes Women healthSwitch true On,false Off
    uint32 period_length = 2;  // Period Length. 1bytes.
    uint32 cycle_length = 3;    // Cycle Length. 1bytes.
    uint32 last_year = 4; // Last Year. 2bytes.
    uint32 last_month = 5;
    uint32 last_day = 6;
}

message protocol_menstrual_record
{
    uint32 year = 1; // Year. 2bytes.
    uint32 month = 2;
    uint32 day = 3;
    period_log log = 4;
    uint32 operate_utc_time = 5;// Operate Utc Time.
}

message protocol_menstruation_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    protocol_menstrual_period_set period_set = 2;// Period Set.
    repeated protocol_menstrual_record record = 3;// Record.
    uint32 set_utc_time = 4;// Set Utc Time.
    bool reminder_switch = 5; // Reminder Switch switch. 1bytes.
}

message protocol_menstruation_inquire_reply
{
    uint32 func_table = 1;// 1bytes Function table
    operate_type operate = 2; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    protocol_menstrual_period_set menstrual_period_set = 3;// Menstrual Period Set.
    repeated protocol_menstrual_record record= 4;// Record.
    uint32 set_utc_time = 5;// Set Utc Time.
    bool reminder_switch = 6; // Reminder Switch switch. 1bytes.
}
```

### `func_table` Bit Definitions

| Bit | Description |
| - | - |
| 0 | Whether supportedMenstrual cycleReminderSwitchreminder_switch |
