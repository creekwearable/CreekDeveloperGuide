---
docId: flutter-heart-rate-zone
locale: en-US
title: "Flutter Heart Rate Zones"
description: "Configure workout heart-rate zones."
platform: Flutter
slug: flutter/heart-rate-zone
order: 115
status: published
version: v2.0
---

# Flutter Heart Rate Zones

Configure workout heart-rate zones.

## Protobuf Data Model

```protobuf
syntax = "proto3";
enum heart_rate_zone_mode
{
    HR_MAX_MODE = 0;// Heart rate max mode.
    RESERVE_HR_MODE = 1;// heart-rate reserve mode.
}
/* heart-rate zone */
message protocol_exercise_heart_rate_zone
{
    operate_type operate = 1; // 1bytes operation type 0: invalid operation 1: query 2: set.
    // maximum heart rate
    uint32 zone1 = 2;// 1bytes heart-rate zone1.
    uint32 zone2 = 3;// 1bytes heart-rate zone2.
    uint32 zone3 = 4;// 1bytes heart-rate zone3.
    uint32 zone4 = 5;// 1bytes heart-rate zone4.
    uint32 zone5 = 6;// 1bytes heart-rate zone5.
    uint32 zone6 = 7;// 1bytes heart-rate zone6.
    heart_rate_zone_mode hr_mode = 8;// Heart rate mode.
    uint32 reserve_hr = 9;// heart-rate reserve value.
    // heart-rate zone1 zone1~zone2
    // heart-rate zone2 zone2~zone3
    // heart-rate zone3 zone3~zone4
    // heart-rate zone4 zone4~zone5
    // heart-rate zone5 zone5~zone6
}
message protocol_exercise_heart_rate_zone_inquire_reply
{
    operate_type operate = 1; // 1bytes operation type 0: invalid operation 1: query 2: set.
    // the query returns heart-rate reserve zones
    uint32 zone1 = 2;// 1bytes heart-rate zone1.
    uint32 zone2 = 3;// 1bytes heart-rate zone2.
    uint32 zone3 = 4;// 1bytes heart-rate zone3.
    uint32 zone4 = 5;// 1bytes heart-rate zone4.
    uint32 zone5 = 6;// 1bytes heart-rate zone5.
    uint32 zone6 = 7;// 1bytes heart-rate zone6.
    heart_rate_zone_mode hr_mode = 8;// Heart rate mode.
    uint32 func_table = 9;// capability table.
    // heart-rate zone1 zone1~zone2
    // heart-rate zone2 zone2~zone3
    // heart-rate zone3 zone3~zone4
    // heart-rate zone4 zone4~zone5
    // heart-rate zone5 zone5~zone6
}
```

### Field Reference

#### `protocol_exercise_heart_rate_zone`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes operation type 0: invalid operation 1: query 2: set. |
| `zone1` | `uint32` | 1bytes heart-rate zone1. |
| `zone2` | `uint32` | 1bytes heart-rate zone2. |
| `zone3` | `uint32` | 1bytes heart-rate zone3. |
| `zone4` | `uint32` | 1bytes heart-rate zone4. |
| `zone5` | `uint32` | 1bytes heart-rate zone5. |
| `zone6` | `uint32` | 1bytes heart-rate zone6. |
| `hr_mode` | `heart_rate_zone_mode` | Heart rate mode. |
| `reserve_hr` | `uint32` | heart-rate reserve value. |

#### `protocol_exercise_heart_rate_zone_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes operation type 0: invalid operation 1: query 2: set. |
| `zone1` | `uint32` | 1bytes heart-rate zone1. |
| `zone2` | `uint32` | 1bytes heart-rate zone2. |
| `zone3` | `uint32` | 1bytes heart-rate zone3. |
| `zone4` | `uint32` | 1bytes heart-rate zone4. |
| `zone5` | `uint32` | 1bytes heart-rate zone5. |
| `zone6` | `uint32` | 1bytes heart-rate zone6. |
| `hr_mode` | `heart_rate_zone_mode` | Heart rate mode. |
| `func_table` | `uint32` | capability table. |

### Enum Values

#### `heart_rate_zone_mode`

| Value | Number | Description |
| --- | --- | --- |
| `HR_MAX_MODE` | `0` | Heart rate max mode. |
| `RESERVE_HR_MODE` | `1` | heart-rate reserve mode. |

### `func_table` Capability Bits

| Bit | Description |
| - | - |
| 0 | Supports heart-rate reserve. |
| 1 | Supports setting heart-rate reserve through `reserve_hr`. |
