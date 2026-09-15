---
docId: flutter-sensor
locale: zh-CN
title: "Flutter 传感器"
description: "读取并配置传感器采集行为。"
platform: Flutter
slug: flutter/sensor
order: 117
status: published
version: v2.0
---

# Flutter 传感器

读取并配置传感器采集行为。

## 接口示例

```dart
sdkManager.getWatchSensor(callBack: (e){

   },errCallBack: (m){

  });

///Currently only supports the settings of heartRateAllSwitch and bloodOxygenAllSwitch, the other two items are not supported

var  operate =  protocol_watch_sensors_operate()
operate.heartRateAllSwitch = switch_type.SWITCH_ON;
operate.bloodOxygenAllSwitch = switch_type.SWITCH_ON;
//operate.compassAllSwitch = .switchOn
//operate.baromaterAllSwitch = .switchOn
sdkManager.setWatchSensor(operate: operate,callBack: (){

},errCallBack: (e){

});
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

// Enum for switch state
enum switch_type {
    SWITCH_NULL = 0; // NULL
    SWITCH_ON = 1; // 开启
    SWITCH_OFF = 2; // 关闭
}

// Message for sensor switch operation on the watch
message protocol_watch_sensors_operate {
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    switch_type heart_rate_all_switch = 2; // 1bytes 心率总开关
    switch_type blood_oxygen_all_switch = 3; // 1bytes 血氧总开关
    switch_type compass_all_switch = 4; // 1bytes 地磁总开关
    switch_type baromater_all_switch = 5; // 1bytes 气压总开关
}

// Message for sensor switch inquiry reply
message protocol_watch_sensors_inquire_reply {
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    switch_type heart_rate_all_switch = 2; // 1bytes 心率总开关
    switch_type blood_oxygen_all_switch = 3; // 1bytes 血氧总开关
    switch_type compass_all_switch = 4; // 1bytes 地磁总开关
    switch_type baromater_all_switch = 5; // 1bytes 气压总开关
}
```

### 字段说明

#### `protocol_watch_sensors_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `heart_rate_all_switch` | `switch_type` | 1bytes 心率总开关 |
| `blood_oxygen_all_switch` | `switch_type` | 1bytes 血氧总开关 |
| `compass_all_switch` | `switch_type` | 1bytes 地磁总开关 |
| `baromater_all_switch` | `switch_type` | 1bytes 气压总开关 |

#### `protocol_watch_sensors_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `heart_rate_all_switch` | `switch_type` | 1bytes 心率总开关 |
| `blood_oxygen_all_switch` | `switch_type` | 1bytes 血氧总开关 |
| `compass_all_switch` | `switch_type` | 1bytes 地磁总开关 |
| `baromater_all_switch` | `switch_type` | 1bytes 气压总开关 |

### 枚举值

#### `switch_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `SWITCH_NULL` | `0` | NULL |
| `SWITCH_ON` | `1` | 开启 |
| `SWITCH_OFF` | `2` | 关闭 |
