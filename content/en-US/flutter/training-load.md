---
docId: flutter-training-load
locale: en-US
title: "Flutter Training Load"
description: "Read device training-load data."
platform: Flutter
slug: flutter/training-load
order: 133
status: published
version: v2.0
---

# Flutter Training Load

Read device training-load data.

## SDK Usage

```dart
sdkManager.getTrainingLoad(callBack: (e) {
  SmartDialog.dismiss();
}, errCallBack: (e) {
  SmartDialog.dismiss();
});
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum operate_training_load_type
{
    INVALID = 0; // Invalid or unspecified value.
    INQUIRE = 1; // inquire
}

enum readiness_level
{
    LOW = 0;    // low
    MEDIUM = 1; // medium
    HIGH = 2;   // high
}

enum readiness_status
{
    NULL = 0;        // no data
    RECOVER = 1;     // recovery mode
    GEARED_UP = 2;   // ready to go
    MAX_EFFORT = 3;  // max effort
    CAUTION = 4;     // cautious adjustment
    MAINTAIN = 5;    // steady progress
    OPTIMIZE = 6;    // precise optimization
    CRITICAL = 7;    // critical pause
    BURNOUT_RIST = 8;// prevent burnout
    PRO_ZONE = 9;    // pro zone
}

message protocol_training_load_item
{
    uint32 year = 1; // Year.
    uint32 month = 2; // Month.
    uint32 day = 3; // Day.
    uint32 load_value = 4;        // training load value
    uint32 load_suggest_max = 5;  // suggested range max
    uint32 load_suggest_min = 6;  // suggested range min
    uint32 load_critical_max = 7; // critical threshold for charting
    uint32 readiness_value = 8;   // readiness value
    readiness_level readiness_level = 9;   // readiness level
    readiness_status readiness_status = 10;// readiness status
};

message protocol_training_load_operate
{
    operate_training_load_type operate = 1; // 1 byte operation type
}

message protocol_training_load_inquire_reply
{
    operate_training_load_type operate = 1;   // 1 byte operation type
    uint32 func_table = 2;                    // 1 byte function table
    uint32 snap_record_support_max = 3;       // 1 byte max training load records
    repeated protocol_training_load_item load_items = 4; // training load data
}
```

### Field Reference

#### `protocol_training_load_item`

| Field | Type | Description |
| --- | --- | --- |
| `year` | `uint32` | Year. |
| `month` | `uint32` | Month. |
| `day` | `uint32` | Day. |
| `load_value` | `uint32` | training load value |
| `load_suggest_max` | `uint32` | suggested range max |
| `load_suggest_min` | `uint32` | suggested range min |
| `load_critical_max` | `uint32` | critical threshold for charting |
| `readiness_value` | `uint32` | readiness value |
| `readiness_level` | `readiness_level` | readiness level |
| `readiness_status` | `readiness_status` | readiness status |

#### `protocol_training_load_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_training_load_type` | 1 byte operation type |

#### `protocol_training_load_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_training_load_type` | 1 byte operation type |
| `func_table` | `uint32` | 1 byte function table |
| `snap_record_support_max` | `uint32` | 1 byte max training load records |
| `load_items` | `repeated protocol_training_load_item` | training load data |

### Enum Values

#### `operate_training_load_type`

| Value | Number | Description |
| --- | --- | --- |
| `INVALID` | `0` | Invalid or unspecified value. |
| `INQUIRE` | `1` | inquire |

#### `readiness_level`

| Value | Number | Description |
| --- | --- | --- |
| `LOW` | `0` | low |
| `MEDIUM` | `1` | medium |
| `HIGH` | `2` | high |

#### `readiness_status`

| Value | Number | Description |
| --- | --- | --- |
| `NULL` | `0` | no data |
| `RECOVER` | `1` | recovery mode |
| `GEARED_UP` | `2` | ready to go |
| `MAX_EFFORT` | `3` | max effort |
| `CAUTION` | `4` | cautious adjustment |
| `MAINTAIN` | `5` | steady progress |
| `OPTIMIZE` | `6` | precise optimization |
| `CRITICAL` | `7` | critical pause |
| `BURNOUT_RIST` | `8` | prevent burnout |
| `PRO_ZONE` | `9` | pro zone |
