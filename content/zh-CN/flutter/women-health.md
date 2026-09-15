---
docId: flutter-women-health
locale: zh-CN
title: "Flutter 女性健康"
description: "设置并查询女性健康数据。"
platform: Flutter
slug: flutter/women-health
order: 19
status: published
version: v2.0
---

# Flutter 女性健康

设置并查询女性健康数据。

## 接口示例

```dart
late final periodLengthText = TextEditingController(text: '5');  // App 自行设置
late final cycleLengthText = TextEditingController(text: '28');  // App 自行设置
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

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0; // 无效或未指定的值。
    INQUIRE = 1; // 查询
    SET = 2; // 设置
}

enum women_health_status
{
    WOMEN_HEALTH_INVALID                 = 0;   // 无效值
    WOMEN_HEALTH_SUCCESS                 = 100;   // 成功
    WOMEN_HEALTH_CYCLE_OUT_OF_RANGE = 102; // 周期不是 13~60
    WOMEN_HEALTH_LAST_MENS_TOO_OLD  = 201; // 末次经期不在前 96 天内
    WOMEN_HEALTH_CYCLE_NOT_SET      = 202; // 未设过有效周期却传 -128
}

message women_health_prediction
{
    uint32 ovulation_cycle_days            = 1; // 排卵周期（天），两次排卵间隔，例如 28
    uint32 menstrual_cycle_days            = 2; // 预测月经周期（天），两次月经开始日间隔
    repeated uint32 next_ovulation_offsets = 3; // 未来 5 次排卵日，秒，升序
    repeated uint32 next_menstrual_offsets = 4; // 未来 5 次经期开始日，秒，升序
    uint32 menstrual_duration_days         = 5; // 预测月经持续天数；未来 5 次经期都用这个值
    uint32 fertile_window_start_offset     = 6; // 受孕窗口开始 秒；对应当前周期
    uint32 fertile_window_end_offset       = 7; // 受孕窗口结束 秒；对应当前周期
}

message protocol_women_health_menstrual_period_set
{
    uint32 period_length = 1;  // 1bytes 经期长度
    uint32 cycle_length = 2;    // 1bytes 经期周期
    uint32 last_year = 3; // 2bytes 最近一次经期开始时间
    uint32 last_month = 4; // 上次经期的月份。
    uint32 last_day = 5; // 上次经期的日期。
}

message protocol_women_health_operate
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    protocol_women_health_menstrual_period_set period_set =3; // 经期设置
}

message protocol_women_health_reply
{
    uint32 func_table = 1;        // 1bytes 功能表
    operate_type operate = 2; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    women_health_prediction prediction = 3; // gomore算法返回
    women_health_status status = 4; // 状态码
    protocol_women_health_menstrual_period_set period_set = 5; // 经期设置
}
```

### 字段说明

#### `women_health_prediction`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `ovulation_cycle_days` | `uint32` | 排卵周期（天），两次排卵间隔，例如 28 |
| `menstrual_cycle_days` | `uint32` | 预测月经周期（天），两次月经开始日间隔 |
| `next_ovulation_offsets` | `repeated uint32` | 未来 5 次排卵日，秒，升序 |
| `next_menstrual_offsets` | `repeated uint32` | 未来 5 次经期开始日，秒，升序 |
| `menstrual_duration_days` | `uint32` | 预测月经持续天数；未来 5 次经期都用这个值 |
| `fertile_window_start_offset` | `uint32` | 受孕窗口开始 秒；对应当前周期 |
| `fertile_window_end_offset` | `uint32` | 受孕窗口结束 秒；对应当前周期 |

#### `protocol_women_health_menstrual_period_set`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `period_length` | `uint32` | 1bytes 经期长度 |
| `cycle_length` | `uint32` | 1bytes 经期周期 |
| `last_year` | `uint32` | 2bytes 最近一次经期开始时间 |
| `last_month` | `uint32` | 上次经期的月份。 |
| `last_day` | `uint32` | 上次经期的日期。 |

#### `protocol_women_health_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `period_set` | `protocol_women_health_menstrual_period_set` | 经期设置 |

#### `protocol_women_health_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `func_table` | `uint32` | 1bytes 功能表 |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `prediction` | `women_health_prediction` | gomore算法返回 |
| `status` | `women_health_status` | 状态码 |
| `period_set` | `protocol_women_health_menstrual_period_set` | 经期设置 |

### 枚举值

#### `operate_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `INVALID` | `0` | 无效或未指定的值。 |
| `INQUIRE` | `1` | 查询 |
| `SET` | `2` | 设置 |

#### `women_health_status`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `WOMEN_HEALTH_INVALID` | `0` | 无效值 |
| `WOMEN_HEALTH_SUCCESS` | `100` | 成功 |
| `WOMEN_HEALTH_CYCLE_OUT_OF_RANGE` | `102` | 周期不是 13~60 |
| `WOMEN_HEALTH_LAST_MENS_TOO_OLD` | `201` | 末次经期不在前 96 天内 |
| `WOMEN_HEALTH_CYCLE_NOT_SET` | `202` | 未设过有效周期却传 -128 |

### `func_table` 功能位

| bit位 | 说明 |
| - | - |
| 0 | 是否支持生理周期提醒开关reminder_switch |
| 1 | 是否支持生理周期功能开关protocol_menstrual_period_set->switch_flag |
