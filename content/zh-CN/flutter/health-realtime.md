---
docId: flutter-health-realtime
locale: zh-CN
title: "Flutter 健康实时监听"
description: "启动、停止、查询并监听实时健康测量。"
platform: Flutter
slug: flutter/health-realtime
order: 140
status: published
version: v2.0
---

# Flutter 健康实时监听

启动、停止、查询并监听实时健康测量。

## 接口示例

```dart
//listen health data
sdkManager.healthRealtimeListen((e){
  currentHeartRate = e.hrValue;
  update();
});

//open
sdkManager.setHealthRealtime(operate: protocol_health_realtime_monitor_operate()..operate = health_realtime_operate_type.HEALTH_START,callBack: (){
  SmartDialog.dismiss();
  Common.toast(label:   S.of(Get.context!).successful);
},errCallBack: (e){
  SmartDialog.dismiss();
  Common.toast(label:   e);
});

//close
sdkManager.setHealthRealtime(operate: protocol_health_realtime_monitor_operate()..operate = health_realtime_operate_type.HEALTH_END,callBack: (){
  SmartDialog.dismiss();
  Common.toast(label:   S.of(Get.context!).successful);
},errCallBack: (e){
  SmartDialog.dismiss();
  Common.toast(label:   e);
});
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum health_realtime_operate_type
{
    HEALTH_START = 0; // 健康start。
    HEALTH_END = 1; // 健康end。
}

// 实时健康数据类型
enum health_realtime_data_type {
  HEART_RATE              = 0; // 心率
  CORE_TEMPERATURE        = 1; // 核心体温
  EDA_STRESS_LEVEL        = 2; // eda实时压力
}

message protocol_health_realtime_monitor_operate
{
    uint32 func_table = 1; // 1bytes 功能表
    health_realtime_operate_type operate = 2; // 开始监控
    repeated health_realtime_data_type data_types = 3; // datatypes。
}
```

```protobuf
syntax = "proto3";
enum tran_direction_type
{
    WATCH_TRAN = 0; // 操作由手表发起。
    APP_TRAN = 1; // 操作由应用发起。
}

// 实时健康数据监听
message protocol_health_realtime_data_operate{
    tran_direction_type tran_type = 1; // 本次操作的发起方。
    uint32 hr_value = 2; // 心率数据
    uint32 core_temp_value = 3; // 核心体温数据  扩大100倍
    repeated health_realtime_data_type data_types = 4; // datatypes。
    uint32 eda_stress_value = 5; // eda实时压力指数，指数范围0-100分，实际值 × 100
}
```

```protobuf
syntax = "proto3";

message protocol_health_realtime_operate
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
}

message protocol_health_realtime_inquire_reply
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 total_step = 2; // 总步数
    uint32 totol_exercise_min = 3; // 总锻炼时长 单位分钟
    uint32 totol_activity_calories = 4; // 活动卡路里
    uint32 totol_distance = 5; // 距离，单位米
    uint32 spo2_value = 6; // 血氧
    uint32 hrv_value = 7; // 心率
    uint32 stress_value = 8; // 压力值

}
```

### 字段说明

#### `protocol_health_realtime_monitor_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `func_table` | `uint32` | 1bytes 功能表 |
| `operate` | `health_realtime_operate_type` | 开始监控 |
| `data_types` | `repeated health_realtime_data_type` | datatypes。 |

#### `protocol_health_realtime_data_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `tran_type` | `tran_direction_type` | 本次操作的发起方。 |
| `hr_value` | `uint32` | 心率数据 |
| `core_temp_value` | `uint32` | 核心体温数据  扩大100倍 |
| `data_types` | `repeated health_realtime_data_type` | datatypes。 |
| `eda_stress_value` | `uint32` | eda实时压力指数，指数范围0-100分，实际值 × 100 |

#### `protocol_health_realtime_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |

#### `protocol_health_realtime_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `total_step` | `uint32` | 总步数 |
| `totol_exercise_min` | `uint32` | 总锻炼时长 单位分钟 |
| `totol_activity_calories` | `uint32` | 活动卡路里 |
| `totol_distance` | `uint32` | 距离，单位米 |
| `spo2_value` | `uint32` | 血氧 |
| `hrv_value` | `uint32` | 心率 |
| `stress_value` | `uint32` | 压力值 |

### 枚举值

#### `health_realtime_operate_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `HEALTH_START` | `0` | 健康start。 |
| `HEALTH_END` | `1` | 健康end。 |

#### `health_realtime_data_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `HEART_RATE` | `0` | 心率 |
| `CORE_TEMPERATURE` | `1` | 核心体温 |
| `EDA_STRESS_LEVEL` | `2` | eda实时压力 |

#### `tran_direction_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `WATCH_TRAN` | `0` | 操作由手表发起。 |
| `APP_TRAN` | `1` | 操作由应用发起。 |
