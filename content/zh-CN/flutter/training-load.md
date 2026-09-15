---
docId: flutter-training-load
locale: zh-CN
title: "Flutter 训练负荷"
description: "读取设备训练负荷数据。"
platform: Flutter
slug: flutter/training-load
order: 133
status: published
version: v2.0
---

# Flutter 训练负荷

读取设备训练负荷数据。

## 接口示例

```dart
sdkManager.getTrainingLoad(callBack: (e) {
  SmartDialog.dismiss();
}, errCallBack: (e) {
  SmartDialog.dismiss();
});
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum operate_training_load_type
{
    INVALID = 0; // 无效或未指定的值。
    INQUIRE = 1; // 查询
}

enum readiness_level
{
    LOW = 0; // 低
    MEDIUM = 1; // 中
    HIGH = 2; // 高
}

enum readiness_status
{
    NULL = 0; // 无数据
    RECOVER = 1; // 恢复模式
    GEARED_UP = 2; // 蓄势待发
    MAX_EFFORT = 3; // 全力冲刺
    CAUTION = 4; // 谨慎调整
    MAINTAIN = 5; // 稳中求进
    OPTIMIZE = 6; // 精准优化
    CRITICAL = 7; // 紧急暂停
    BURNOUT_RIST = 8; // 控量防崩
    PRO_ZONE = 9; // 勇竞巅峰
}

message protocol_training_load_item
{
    uint32 year = 1; // 年份。
    uint32 month = 2; // 月份。
    uint32 day = 3; // 日期。
    uint32 load_value = 4; // 训练负荷值
    uint32 load_suggest_max = 5; // 建议区间最大值
    uint32 load_suggest_min = 6; // 建议区间最小值
    uint32 load_critical_max = 7; // 区间临界值，用于划图表
    uint32 readiness_value = 8; // 训练准备度值
    readiness_level readiness_level = 9; // 训练准备度等级
    readiness_status readiness_status = 10; // 训练准备度状态
};

message protocol_training_load_operate
{
    operate_training_load_type operate = 1; // 1bytes 操作类型
}

message protocol_training_load_inquire_reply
{
    operate_training_load_type operate = 1; // 1bytes操作类型
    uint32 func_table = 2; // 1bytes 功能表
    uint32 snap_record_support_max = 3; // 1bytes 训练负荷记录最大数量
    repeated protocol_training_load_item load_items = 4; // 训练负荷数据
}
```

### 字段说明

#### `protocol_training_load_item`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `year` | `uint32` | 年份。 |
| `month` | `uint32` | 月份。 |
| `day` | `uint32` | 日期。 |
| `load_value` | `uint32` | 训练负荷值 |
| `load_suggest_max` | `uint32` | 建议区间最大值 |
| `load_suggest_min` | `uint32` | 建议区间最小值 |
| `load_critical_max` | `uint32` | 区间临界值，用于划图表 |
| `readiness_value` | `uint32` | 训练准备度值 |
| `readiness_level` | `readiness_level` | 训练准备度等级 |
| `readiness_status` | `readiness_status` | 训练准备度状态 |

#### `protocol_training_load_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_training_load_type` | 1bytes 操作类型 |

#### `protocol_training_load_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_training_load_type` | 1bytes操作类型 |
| `func_table` | `uint32` | 1bytes 功能表 |
| `snap_record_support_max` | `uint32` | 1bytes 训练负荷记录最大数量 |
| `load_items` | `repeated protocol_training_load_item` | 训练负荷数据 |

### 枚举值

#### `operate_training_load_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `INVALID` | `0` | 无效或未指定的值。 |
| `INQUIRE` | `1` | 查询 |

#### `readiness_level`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `LOW` | `0` | 低 |
| `MEDIUM` | `1` | 中 |
| `HIGH` | `2` | 高 |

#### `readiness_status`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `NULL` | `0` | 无数据 |
| `RECOVER` | `1` | 恢复模式 |
| `GEARED_UP` | `2` | 蓄势待发 |
| `MAX_EFFORT` | `3` | 全力冲刺 |
| `CAUTION` | `4` | 谨慎调整 |
| `MAINTAIN` | `5` | 稳中求进 |
| `OPTIMIZE` | `6` | 精准优化 |
| `CRITICAL` | `7` | 紧急暂停 |
| `BURNOUT_RIST` | `8` | 控量防崩 |
| `PRO_ZONE` | `9` | 勇竞巅峰 |
