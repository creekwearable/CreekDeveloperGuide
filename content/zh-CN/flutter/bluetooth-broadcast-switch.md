---
docId: flutter-bluetooth-broadcast-switch
locale: zh-CN
title: "Flutter 蓝牙广播开关"
description: "查询并配置蓝牙广播行为。"
platform: Flutter
slug: flutter/bluetooth-broadcast-switch
order: 20
status: published
version: v2.0
---

# Flutter 蓝牙广播开关

查询并配置蓝牙广播行为。

## 接口示例

```dart
final bool isOn = switchFlag.value;
protocol_broadcast_switch_operate operate = protocol_broadcast_switch_operate();
operate.broadcastSwitch = isOn ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
if (isOn) {
  if (heartRateStatus.value) {
    operate.selectedTypes.add(broadcast_type.BROADCAST_HEART_RATE);
  }
  if (coreTemperatureStatus.value) {
    operate.selectedTypes.add(broadcast_type.BROADCAST_CORE_TEMPERATURE);
  }
  if (heatWarningStatus.value) {
    operate.selectedTypes.add(broadcast_type.BROADCAST_HEAT_WARNING);
  }
}
sdkManager.setBroadcastSwitch(
    operate: operate,
    callBack: (protocol_broadcast_switch_inquire_reply reply) {

    },
    errCallBack: (e) {

    }
);

sdkManager.getBroadcastSwitch(
    callBack: (protocol_broadcast_switch_inquire_reply reply) {

    },
    errCallBack: (e) {

    }
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

enum switch_type 
{ 
  SWITCH_NULL = 0; // NULL
  SWITCH_ON = 1; // 开启
  SWITCH_OFF = 2; // 关闭
}

// 广播数据类型
enum broadcast_type {
  BROADCAST_HEART_RATE       = 0; // 心率
  BROADCAST_CORE_TEMPERATURE = 1; // 核心体温
  BROADCAST_HEAT_WARNING = 2; // 热应激蓝牙广播
}

message protocol_broadcast_switch_operate 
{ 
  operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
  switch_type broadcast_switch = 2; // 开关状态
  repeated broadcast_type selected_types = 3; // 当前勾选的数据类型
}

message protocol_broadcast_switch_inquire_reply 
{ 
  uint32 func_table = 1; // 1bytes 功能表
  operate_type operate = 2; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
  switch_type broadcast_switch = 3; // 开关状态
  repeated broadcast_type selected_types = 4; // 当前勾选的数据类型
}
```

### 字段说明

#### `protocol_broadcast_switch_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `broadcast_switch` | `switch_type` | 开关状态 |
| `selected_types` | `repeated broadcast_type` | 当前勾选的数据类型 |

#### `protocol_broadcast_switch_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `func_table` | `uint32` | 1bytes 功能表 |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `broadcast_switch` | `switch_type` | 开关状态 |
| `selected_types` | `repeated broadcast_type` | 当前勾选的数据类型 |

### 枚举值

#### `operate_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `INVALID` | `0` | 无效或未指定的值。 |
| `INQUIRE` | `1` | 查询 |
| `SET` | `2` | 设置 |

#### `switch_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `SWITCH_NULL` | `0` | NULL |
| `SWITCH_ON` | `1` | 开启 |
| `SWITCH_OFF` | `2` | 关闭 |

#### `broadcast_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `BROADCAST_HEART_RATE` | `0` | 心率 |
| `BROADCAST_CORE_TEMPERATURE` | `1` | 核心体温 |
| `BROADCAST_HEAT_WARNING` | `2` | 热应激蓝牙广播 |
