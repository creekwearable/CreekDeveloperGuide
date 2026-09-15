---
docId: flutter-health-snapshot
locale: zh-CN
title: "Flutter 健康快照"
description: "读取并配置一键健康快照测量。"
platform: Flutter
slug: flutter/health-snapshot
order: 126
status: published
version: v2.0
---

# Flutter 健康快照

读取并配置一键健康快照测量。

## 接口示例

```dart

```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum operate_health_snap_type
{
    INVALID = 0; // 无效或未指定的值。
    INQUIRE = 1; // 查询
}

message protocol_health_snap_item
{
    uint32 year = 1; // 年份。
    uint32 month = 2; // 月份。
    uint32 day = 3; // 日期。
    uint32 hour = 4; // 小时。
    uint32 minute = 5; // 分钟。
    uint32 second = 6; // 秒。
    uint32 hr_value = 7; // 心率值。
    uint32 spo2_value = 8; // 血氧值。
    uint32 hrv_value = 9; // 心率变异性值。
    uint32 rr_value = 10; // respiratory rate
    uint32 stress_value = 11; // 压力值。
};

message protocol_health_snap_operate
{
    operate_health_snap_type operate = 1; // 1bytes 操作类型
    uint32 page_index = 2; // 当前多少页，用于分段传输。
    uint32 page_num = 3; // 当前页传输多少条数据，用于分段传输。
}

message protocol_health_snap_inquire_reply
{
    operate_health_snap_type operate = 1; // 1bytes操作类型
    uint32 func_table = 2; // 1bytes 功能表
    uint32 snap_record_support_max = 3; // 1bytes 健康快照记录最大数量
    uint32 page_index = 4; // 当前多少页，用于分段传输。
    uint32 page_num = 5; // 当前页传输多少条数据，用于分段传输。
    repeated protocol_health_snap_item snap_items = 6; // Health snapshot items
}
```

### 字段说明

#### `protocol_health_snap_item`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `year` | `uint32` | 年份。 |
| `month` | `uint32` | 月份。 |
| `day` | `uint32` | 日期。 |
| `hour` | `uint32` | 小时。 |
| `minute` | `uint32` | 分钟。 |
| `second` | `uint32` | 秒。 |
| `hr_value` | `uint32` | 心率值。 |
| `spo2_value` | `uint32` | 血氧值。 |
| `hrv_value` | `uint32` | 心率变异性值。 |
| `rr_value` | `uint32` | respiratory rate |
| `stress_value` | `uint32` | 压力值。 |

#### `protocol_health_snap_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_health_snap_type` | 1bytes 操作类型 |
| `page_index` | `uint32` | 当前多少页，用于分段传输。 |
| `page_num` | `uint32` | 当前页传输多少条数据，用于分段传输。 |

#### `protocol_health_snap_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_health_snap_type` | 1bytes操作类型 |
| `func_table` | `uint32` | 1bytes 功能表 |
| `snap_record_support_max` | `uint32` | 1bytes 健康快照记录最大数量 |
| `page_index` | `uint32` | 当前多少页，用于分段传输。 |
| `page_num` | `uint32` | 当前页传输多少条数据，用于分段传输。 |
| `snap_items` | `repeated protocol_health_snap_item` | Health snapshot items |

### 枚举值

#### `operate_health_snap_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `INVALID` | `0` | 无效或未指定的值。 |
| `INQUIRE` | `1` | 查询 |
