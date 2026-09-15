---
docId: flutter-menstrual-cycle
locale: en-US
title: "Flutter Menstrual Cycle"
description: "Read and configure menstrual-cycle settings."
platform: Flutter
slug: flutter/menstrual-cycle
order: 106
status: published
version: v2.0
---

# Flutter Menstrual Cycle

Read and configure menstrual-cycle settings.

## SDK Usage

```dart
//get
sdkManager.getMenstrual(callBack: (e){

},errCallBack: (e){

});

//set
protocol_menstruation_operate perate = protocol_menstruation_operate();
protocol_menstrual_period_set periodSet = protocol_menstrual_period_set();
periodSet.switchFlag = true;
periodSet.cycleLength = 14;
periodSet.periodLength = 7;
periodSet.lastYear = 2025;
periodSet.lastMonth = 6;
periodSet.lastDay = 5;
perate.periodSet = periodSet;
sdkManager.setMenstrual(operate: perate,callBack: (){

},errCallBack: (e){

});
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum operate_type {
    INVALID = 0; // Invalid or unspecified value.
    INQUIRE = 1; // Query
    SET = 2; // Set
}

enum period_log {
    PERIOD_LOG_NULL = 0; // No record
    PERIOD_LOG_NOT_FLOW = 1; // No bleeding
    PERIOD_LOG_AS_USUAL = 2; // As usual
    PERIOD_LOG_LIGHT_FLOW = 3; // Light bleeding
    PERIOD_LOG_MEDIUM_FLOW = 4; // Medium bleeding
    PERIOD_LOG_HEAVY_FLOW = 5; // Heavy bleeding
}

message protocol_menstrual_period_set {
    bool switch_flag = 1; // Female health switch: true - On, false - Off
    uint32 period_length = 2; // Length of menstrual period
    uint32 cycle_length = 3; // Menstrual cycle length
    uint32 last_year = 4; // Last start date of the recent menstrual period
    uint32 last_month = 5; // Month of the last period.
    uint32 last_day = 6; // Day of the last period.
}

message protocol_menstrual_record {
    uint32 year = 1; // Date
    uint32 month = 2; // Month.
    uint32 day = 3; // Day.
    period_log log = 4; // Periodic log data.
    uint32 operate_utc_time = 5; // Operation time in UTC, e.g., recording menstrual period
}

message protocol_menstruation_operate {
    operate_type operate = 1; // Operation type: 0 - Invalid, 1 - Query, 2 - Set
    protocol_menstrual_period_set period_set = 2; // Menstrual period settings
    repeated protocol_menstrual_record record = 3; // Recorded operation times
    uint32 set_utc_time = 4; // UTC time for setting the record, recording time
}

message protocol_menstruation_inquire_reply {
    uint32 func_table = 1; // Function table
    operate_type operate = 2; // Operation type: 0 - Invalid, 1 - Query, 2 - Set
    protocol_menstrual_period_set menstrual_period_set = 3; // Menstrual period settings
    repeated protocol_menstrual_record record = 4; // Recorded operation times
    uint32 set_utc_time = 5; // UTC time for setting the record, recording time
}
```

### Field Reference

#### `protocol_menstrual_period_set`

| Field | Type | Description |
| --- | --- | --- |
| `switch_flag` | `bool` | Female health switch: true - On, false - Off |
| `period_length` | `uint32` | Length of menstrual period |
| `cycle_length` | `uint32` | Menstrual cycle length |
| `last_year` | `uint32` | Last start date of the recent menstrual period |
| `last_month` | `uint32` | Month of the last period. |
| `last_day` | `uint32` | Day of the last period. |

#### `protocol_menstrual_record`

| Field | Type | Description |
| --- | --- | --- |
| `year` | `uint32` | Date |
| `month` | `uint32` | Month. |
| `day` | `uint32` | Day. |
| `log` | `period_log` | Periodic log data. |
| `operate_utc_time` | `uint32` | Operation time in UTC, e.g., recording menstrual period |

#### `protocol_menstruation_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | Operation type: 0 - Invalid, 1 - Query, 2 - Set |
| `period_set` | `protocol_menstrual_period_set` | Menstrual period settings |
| `record` | `repeated protocol_menstrual_record` | Recorded operation times |
| `set_utc_time` | `uint32` | UTC time for setting the record, recording time |

#### `protocol_menstruation_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `func_table` | `uint32` | Function table |
| `operate` | `operate_type` | Operation type: 0 - Invalid, 1 - Query, 2 - Set |
| `menstrual_period_set` | `protocol_menstrual_period_set` | Menstrual period settings |
| `record` | `repeated protocol_menstrual_record` | Recorded operation times |
| `set_utc_time` | `uint32` | UTC time for setting the record, recording time |

### Enum Values

#### `operate_type`

| Value | Number | Description |
| --- | --- | --- |
| `INVALID` | `0` | Invalid or unspecified value. |
| `INQUIRE` | `1` | Query |
| `SET` | `2` | Set |

#### `period_log`

| Value | Number | Description |
| --- | --- | --- |
| `PERIOD_LOG_NULL` | `0` | No record |
| `PERIOD_LOG_NOT_FLOW` | `1` | No bleeding |
| `PERIOD_LOG_AS_USUAL` | `2` | As usual |
| `PERIOD_LOG_LIGHT_FLOW` | `3` | Light bleeding |
| `PERIOD_LOG_MEDIUM_FLOW` | `4` | Medium bleeding |
| `PERIOD_LOG_HEAVY_FLOW` | `5` | Heavy bleeding |

### `func_table` Capability Bits

| Bit | Description |
| - | - |
| 0 | Supports the menstrual-cycle reminder switch `reminder_switch`. |
| 1 | Supports the menstrual-cycle feature switch `protocol_menstrual_period_set.switch_flag`. |
