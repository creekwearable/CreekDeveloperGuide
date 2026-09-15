---
docId: flutter-women-health
locale: en-US
title: "Flutter Women's Health"
description: "Configure and query women's health data."
platform: Flutter
slug: flutter/women-health
order: 19
status: published
version: v2.0
---

# Flutter Women's Health

Configure and query women's health data.

## SDK Usage

```dart
late final periodLengthText = TextEditingController(text: '5');  // Set by the application
late final cycleLengthText = TextEditingController(text: '28');  // Set by the application
final periodLength = int.tryParse(periodLengthText.text.trim());
final cycleLength = int.tryParse(cycleLengthText.text.trim());
if (periodLength == null || cycleLength == null) {
   return;
}

final periodSet = protocol_women_health_menstrual_period_set()
  ..periodLength = _toU32(periodLength)
  ..cycleLength = _toU32(cycleLength)
  ..lastYear = lastPeriodDate.year
  ..lastMonth = lastPeriodDate.month
  ..lastDay = lastPeriodDate.day;
final operate = protocol_women_health_operate()
  ..operate = operate_type.SET
  ..periodSet = periodSet;

sdkManager.setWomenHealth(
  operate: operate,
  callBack: (protocol_women_health_reply reply) {
  },
  errCallBack: (e) {
  },
);

sdkManager.getWomenHealth(
  callBack: (protocol_women_health_reply reply) {
  },
  errCallBack: (e) {
  },
);
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0; // Invalid or unspecified value.
    INQUIRE = 1;// query.
    SET = 2;// set.
}

enum women_health_status
{
    WOMEN_HEALTH_INVALID                 = 0;   // Women health invalid.
    WOMEN_HEALTH_SUCCESS                 = 100;   // success.
    WOMEN_HEALTH_CYCLE_OUT_OF_RANGE = 102; // cycle is outside 13~60.
    WOMEN_HEALTH_LAST_MENS_TOO_OLD  = 201; // last period is not within the previous 96 days.
    WOMEN_HEALTH_CYCLE_NOT_SET      = 202; // no valid cycle was configured before using -128.
}

message women_health_prediction
{
    uint32 ovulation_cycle_days            = 1; // ovulation cycle（days）, interval between ovulations, for example 28.
    uint32 menstrual_cycle_days            = 2; // predicted menstrual cycle（days）, interval between period start dates.
    repeated uint32 next_ovulation_offsets = 3; // next 5 ovulation dates, seconds, ascending order.
    repeated uint32 next_menstrual_offsets = 4; // next 5 period start dates, seconds, ascending order.
    uint32 menstrual_duration_days         = 5; // predicted period duration; next 5 periods use this value.
    uint32 fertile_window_start_offset     = 6; // fertile-window start seconds; for the current cycle.
    uint32 fertile_window_end_offset       = 7; // fertile-window end seconds; for the current cycle.
}

message protocol_women_health_menstrual_period_set
{
    uint32 period_length = 1;  // Period length; 1bytes.
    uint32 cycle_length = 2;    // Cycle length; 1bytes.
    uint32 last_year = 3; // Last year; 2bytes.
    uint32 last_month = 4; // Month of the last period.
    uint32 last_day = 5; // Day of the last period.
}

message protocol_women_health_operate
{
    operate_type operate = 1; // 1bytes operation type 0: invalid operation 1: query 2: set.
    protocol_women_health_menstrual_period_set period_set =3; // period settings.
}

message protocol_women_health_reply
{
    uint32 func_table = 1;        // 1bytes capability table.
    operate_type operate = 2; // 1bytes operation type 0: invalid operation 1: query 2: set.
    women_health_prediction prediction = 3; // Prediction.
    women_health_status status = 4; // status code.
    protocol_women_health_menstrual_period_set period_set = 5; // period settings.
}
```

### Field Reference

#### `women_health_prediction`

| Field | Type | Description |
| --- | --- | --- |
| `ovulation_cycle_days` | `uint32` | ovulation cycle（days）, interval between ovulations, for example 28. |
| `menstrual_cycle_days` | `uint32` | predicted menstrual cycle（days）, interval between period start dates. |
| `next_ovulation_offsets` | `repeated uint32` | next 5 ovulation dates, seconds, ascending order. |
| `next_menstrual_offsets` | `repeated uint32` | next 5 period start dates, seconds, ascending order. |
| `menstrual_duration_days` | `uint32` | predicted period duration; next 5 periods use this value. |
| `fertile_window_start_offset` | `uint32` | fertile-window start seconds; for the current cycle. |
| `fertile_window_end_offset` | `uint32` | fertile-window end seconds; for the current cycle. |

#### `protocol_women_health_menstrual_period_set`

| Field | Type | Description |
| --- | --- | --- |
| `period_length` | `uint32` | Period length; 1bytes. |
| `cycle_length` | `uint32` | Cycle length; 1bytes. |
| `last_year` | `uint32` | Last year; 2bytes. |
| `last_month` | `uint32` | Month of the last period. |
| `last_day` | `uint32` | Day of the last period. |

#### `protocol_women_health_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes operation type 0: invalid operation 1: query 2: set. |
| `period_set` | `protocol_women_health_menstrual_period_set` | period settings. |

#### `protocol_women_health_reply`

| Field | Type | Description |
| --- | --- | --- |
| `func_table` | `uint32` | 1bytes capability table. |
| `operate` | `operate_type` | 1bytes operation type 0: invalid operation 1: query 2: set. |
| `prediction` | `women_health_prediction` | Prediction. |
| `status` | `women_health_status` | status code. |
| `period_set` | `protocol_women_health_menstrual_period_set` | period settings. |

### Enum Values

#### `operate_type`

| Value | Number | Description |
| --- | --- | --- |
| `INVALID` | `0` | Invalid or unspecified value. |
| `INQUIRE` | `1` | query. |
| `SET` | `2` | set. |

#### `women_health_status`

| Value | Number | Description |
| --- | --- | --- |
| `WOMEN_HEALTH_INVALID` | `0` | Women health invalid. |
| `WOMEN_HEALTH_SUCCESS` | `100` | success. |
| `WOMEN_HEALTH_CYCLE_OUT_OF_RANGE` | `102` | cycle is outside 13~60. |
| `WOMEN_HEALTH_LAST_MENS_TOO_OLD` | `201` | last period is not within the previous 96 days. |
| `WOMEN_HEALTH_CYCLE_NOT_SET` | `202` | no valid cycle was configured before using -128. |

### `func_table` Capability Bits

| Bit | Description |
| - | - |
| 0 | Supports the menstrual-cycle reminder switch `reminder_switch`. |
| 1 | Supports the menstrual-cycle feature switch `protocol_menstrual_period_set.switch_flag`. |
