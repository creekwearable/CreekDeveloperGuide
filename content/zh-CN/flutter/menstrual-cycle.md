---
docId: flutter-menstrual-cycle
locale: zh-CN
title: "Flutter 生理周期"
description: "读取并配置生理周期设置。"
platform: Flutter
slug: flutter/menstrual-cycle
order: 106
status: published
version: v2.0
---

# Flutter 生理周期

读取并配置生理周期设置。

## 接口示例

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

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum operate_type {
    INVALID = 0; // 无效或未指定的值。
    INQUIRE = 1; // 查询
    SET = 2; // 设置
}

enum period_log {
    PERIOD_LOG_NULL = 0; // 无记录
    PERIOD_LOG_NOT_FLOW = 1; // 无血量
    PERIOD_LOG_AS_USUAL = 2; // 照常
    PERIOD_LOG_LIGHT_FLOW = 3; // 少血量
    PERIOD_LOG_MEDIUM_FLOW = 4; // Medium bleeding
    PERIOD_LOG_HEAVY_FLOW = 5; // 大血量
}

message protocol_menstrual_period_set {
    bool switch_flag = 1; // 1bytes 女性健康开关 true 开启,false 关闭
    uint32 period_length = 2; // 1bytes 经期长度
    uint32 cycle_length = 3; // 1bytes 经期周期
    uint32 last_year = 4; // 2bytes 最近一次经期开始时间
    uint32 last_month = 5; // 上次经期的月份。
    uint32 last_day = 6; // 上次经期的日期。
}

message protocol_menstrual_record {
    uint32 year = 1; // 2bytes 日期
    uint32 month = 2; // 月份。
    uint32 day = 3; // 日期。
    period_log log = 4; // 周期日志数据。
    uint32 operate_utc_time = 5; // 操作的时间，utc时间,比如操作记录经期，这个时间点作为操作时间
}

message protocol_menstruation_operate {
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    protocol_menstrual_period_set period_set = 2; // 经期设置
    repeated protocol_menstrual_record record = 3; // 记录操作的时间
    uint32 set_utc_time = 4; // 设置记录的utc时间，记录时间
}

message protocol_menstruation_inquire_reply {
    uint32 func_table = 1; // 1bytes 功能表
    operate_type operate = 2; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    protocol_menstrual_period_set menstrual_period_set = 3; // 经期设置
    repeated protocol_menstrual_record record = 4; // 记录操作的时间
    uint32 set_utc_time = 5; // 设置记录的utc时间，记录时间
}
```

### 字段说明

#### `protocol_menstrual_period_set`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `switch_flag` | `bool` | 1bytes 女性健康开关 true 开启,false 关闭 |
| `period_length` | `uint32` | 1bytes 经期长度 |
| `cycle_length` | `uint32` | 1bytes 经期周期 |
| `last_year` | `uint32` | 2bytes 最近一次经期开始时间 |
| `last_month` | `uint32` | 上次经期的月份。 |
| `last_day` | `uint32` | 上次经期的日期。 |

#### `protocol_menstrual_record`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `year` | `uint32` | 2bytes 日期 |
| `month` | `uint32` | 月份。 |
| `day` | `uint32` | 日期。 |
| `log` | `period_log` | 周期日志数据。 |
| `operate_utc_time` | `uint32` | 操作的时间，utc时间,比如操作记录经期，这个时间点作为操作时间 |

#### `protocol_menstruation_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `period_set` | `protocol_menstrual_period_set` | 经期设置 |
| `record` | `repeated protocol_menstrual_record` | 记录操作的时间 |
| `set_utc_time` | `uint32` | 设置记录的utc时间，记录时间 |

#### `protocol_menstruation_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `func_table` | `uint32` | 1bytes 功能表 |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `menstrual_period_set` | `protocol_menstrual_period_set` | 经期设置 |
| `record` | `repeated protocol_menstrual_record` | 记录操作的时间 |
| `set_utc_time` | `uint32` | 设置记录的utc时间，记录时间 |

### 枚举值

#### `operate_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `INVALID` | `0` | 无效或未指定的值。 |
| `INQUIRE` | `1` | 查询 |
| `SET` | `2` | 设置 |

#### `period_log`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `PERIOD_LOG_NULL` | `0` | 无记录 |
| `PERIOD_LOG_NOT_FLOW` | `1` | 无血量 |
| `PERIOD_LOG_AS_USUAL` | `2` | 照常 |
| `PERIOD_LOG_LIGHT_FLOW` | `3` | 少血量 |
| `PERIOD_LOG_MEDIUM_FLOW` | `4` | Medium bleeding |
| `PERIOD_LOG_HEAVY_FLOW` | `5` | 大血量 |

### `func_table` 功能位

| bit位 | 说明 |
| - | - |
| 0 | 是否支持生理周期提醒开关reminder_switch |
| 1 | 是否支持生理周期功能开关protocol_menstrual_period_set->switch_flag |
