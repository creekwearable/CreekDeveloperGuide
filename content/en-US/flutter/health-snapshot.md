---
docId: flutter-health-snapshot
locale: en-US
title: "Flutter Health Snapshot"
description: "Read and configure one-tap health snapshot measurements."
platform: Flutter
slug: flutter/health-snapshot
order: 126
status: published
version: v2.0
---

# Flutter Health Snapshot

Read and configure one-tap health snapshot measurements.

## SDK Usage

```dart

```

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum operate_health_snap_type
{
    INVALID = 0; // Invalid or unspecified value.
    INQUIRE = 1; // Query
}

message protocol_health_snap_item
{
    uint32 year = 1; // Year.
    uint32 month = 2; // Month.
    uint32 day = 3; // Day.
    uint32 hour = 4; // Hour.
    uint32 minute = 5; // Minute.
    uint32 second = 6; // Second.
    uint32 hr_value = 7; // Heart-rate value.
    uint32 spo2_value = 8; // Blood-oxygen value.
    uint32 hrv_value = 9; // Heart-rate-variability value.
    uint32 rr_value = 10; // Respiratory rate
    uint32 stress_value = 11; // Stress value.
};

message protocol_health_snap_operate
{
    operate_health_snap_type operate = 1; // 1 byte: Operation type
    uint32 page_index = 2; // Current page number, used for segmented transmission.
    uint32 page_num = 3; // Number of items on the current page, used for segmented transmission.
}

message protocol_health_snap_inquire_reply
{
    operate_health_snap_type operate = 1; // 1 byte: Operation type
    uint32 func_table = 2; // 1 byte: Function table
    uint32 snap_record_support_max = 3; // 1 byte: Maximum number of health snapshot records supported
    uint32 page_index = 4; // Current page number, used for segmented transmission.
    uint32 page_num = 5; // Number of items on the current page, used for segmented transmission.
    repeated protocol_health_snap_item snap_items = 6; // Health snapshot items
}
```

### Field Reference

#### `protocol_health_snap_item`

| Field | Type | Description |
| --- | --- | --- |
| `year` | `uint32` | Year. |
| `month` | `uint32` | Month. |
| `day` | `uint32` | Day. |
| `hour` | `uint32` | Hour. |
| `minute` | `uint32` | Minute. |
| `second` | `uint32` | Second. |
| `hr_value` | `uint32` | Heart-rate value. |
| `spo2_value` | `uint32` | Blood-oxygen value. |
| `hrv_value` | `uint32` | Heart-rate-variability value. |
| `rr_value` | `uint32` | Respiratory rate |
| `stress_value` | `uint32` | Stress value. |

#### `protocol_health_snap_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_health_snap_type` | 1 byte: Operation type |
| `page_index` | `uint32` | Current page number, used for segmented transmission. |
| `page_num` | `uint32` | Number of items on the current page, used for segmented transmission. |

#### `protocol_health_snap_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_health_snap_type` | 1 byte: Operation type |
| `func_table` | `uint32` | 1 byte: Function table |
| `snap_record_support_max` | `uint32` | 1 byte: Maximum number of health snapshot records supported |
| `page_index` | `uint32` | Current page number, used for segmented transmission. |
| `page_num` | `uint32` | Number of items on the current page, used for segmented transmission. |
| `snap_items` | `repeated protocol_health_snap_item` | Health snapshot items |

### Enum Values

#### `operate_health_snap_type`

| Value | Number | Description |
| --- | --- | --- |
| `INVALID` | `0` | Invalid or unspecified value. |
| `INQUIRE` | `1` | Query |
