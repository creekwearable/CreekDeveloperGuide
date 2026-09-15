---
docId: flutter-heart-rate-zone
locale: zh-CN
title: "Flutter 心率区间"
description: "配置运动心率区间。"
platform: Flutter
slug: flutter/heart-rate-zone
order: 115
status: published
version: v2.0
---

# Flutter 心率区间

配置运动心率区间。

## Protobuf 数据模型

```protobuf
syntax = "proto3";
enum heart_rate_zone_mode
{
    HR_MAX_MODE = 0;// 最大心率模式
    RESERVE_HR_MODE = 1;// 储备心率模式
}
/* 心率区间 */
message protocol_exercise_heart_rate_zone
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    // 最大心率区间
    uint32 zone1 = 2;// 1bytes 心率区间1
    uint32 zone2 = 3;// 1bytes 心率区间2
    uint32 zone3 = 4;// 1bytes 心率区间3
    uint32 zone4 = 5;// 1bytes 心率区间4
    uint32 zone5 = 6;// 1bytes 心率区间5
    uint32 zone6 = 7;// 1bytes 心率区间6
    heart_rate_zone_mode hr_mode = 8;// 心率区间模式
    uint32 reserve_hr = 9;// 储备心率值
    // 心率区间1 zone1~zone2
    // 心率区间2 zone2~zone3
    // 心率区间3 zone3~zone4
    // 心率区间4 zone4~zone5
    // 心率区间5 zone5~zone6
}
message protocol_exercise_heart_rate_zone_inquire_reply
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    // 查询返回的是储备心率区间
    uint32 zone1 = 2;// 1bytes 心率区间1
    uint32 zone2 = 3;// 1bytes 心率区间2
    uint32 zone3 = 4;// 1bytes 心率区间3
    uint32 zone4 = 5;// 1bytes 心率区间4
    uint32 zone5 = 6;// 1bytes 心率区间5
    uint32 zone6 = 7;// 1bytes 心率区间6
    heart_rate_zone_mode hr_mode = 8;// 心率区间模式
    uint32 func_table = 9;// 功能表
    // 心率区间1 zone1~zone2
    // 心率区间2 zone2~zone3
    // 心率区间3 zone3~zone4
    // 心率区间4 zone4~zone5
    // 心率区间5 zone5~zone6
}
```

### 字段说明

#### `protocol_exercise_heart_rate_zone`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `zone1` | `uint32` | 1bytes 心率区间1 |
| `zone2` | `uint32` | 1bytes 心率区间2 |
| `zone3` | `uint32` | 1bytes 心率区间3 |
| `zone4` | `uint32` | 1bytes 心率区间4 |
| `zone5` | `uint32` | 1bytes 心率区间5 |
| `zone6` | `uint32` | 1bytes 心率区间6 |
| `hr_mode` | `heart_rate_zone_mode` | 心率区间模式 |
| `reserve_hr` | `uint32` | 储备心率值 |

#### `protocol_exercise_heart_rate_zone_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `zone1` | `uint32` | 1bytes 心率区间1 |
| `zone2` | `uint32` | 1bytes 心率区间2 |
| `zone3` | `uint32` | 1bytes 心率区间3 |
| `zone4` | `uint32` | 1bytes 心率区间4 |
| `zone5` | `uint32` | 1bytes 心率区间5 |
| `zone6` | `uint32` | 1bytes 心率区间6 |
| `hr_mode` | `heart_rate_zone_mode` | 心率区间模式 |
| `func_table` | `uint32` | 功能表 |

### 枚举值

#### `heart_rate_zone_mode`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `HR_MAX_MODE` | `0` | 最大心率模式 |
| `RESERVE_HR_MODE` | `1` | 储备心率模式 |

### `func_table` 功能位

| bit位 | 说明 |
| - | - |
| 0 | 是否支持储备心率 |
| 1 | 是否支持储备心率值设置 字段：reserve_hr |
