---
docId: flutter-health-monitoring
locale: zh-CN
title: "Flutter 健康监测"
description: "读取并配置健康监测模式、间隔与提醒。"
platform: Flutter
slug: flutter/health-monitoring
order: 116
status: published
version: v2.0
---

# Flutter 健康监测

读取并配置健康监测模式、间隔与提醒。

## 接口示例

```dart
sdkManager.getMonitor(healthType: health_type.HEART_RATE,callBack: (e) {
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
}, errCallBack: (e) {
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});

protocol_health_monitor_operate operate =  protocol_health_monitor_operate();
operate.healthType = health_type.HEART_RATE;
protocol_health_monitor_auto_adjust adjust =  protocol_health_monitor_auto_adjust();
adjust.switchFlag = true;
operate.modeAutoAdjust = adjust;
sdkManager.setMonitor(operate: operate,callBack: (){

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

enum notify_type {
    ALLOW = 0; // 允许通知
    SILENT = 1; // 静默通知
    CLOSE = 2; // 关闭通知
}

enum health_monitor_mode {
    MANUAL = 0; // 手动
    AUTO = 1; // 自动
    CONTINUOUS = 2; // 连续监测
    INTELLIGENT = 3; // Intelligent monitoring
}

enum health_type {
    HEART_RATE = 0; // 心率
    STRESS = 1; // 压力
    SPO2 = 2; // 血氧
    NOISE = 3; // 噪音
    BODY_ENERGY = 4; // 身体电量
    RESPIRATORY_RATE = 5; // 呼吸率
    SKIN_TEMPERATURE = 6; // 皮肤温度
}

message protocol_health_monitor_auto_adjust {
    bool switch_flag = 1; // 1bytes 模式自动调整开关 true 开启,false 关闭
    health_monitor_mode adjust_mode = 2; // 1bytes 监测模式
    uint32 start_hour = 3; // 开始小时
    uint32 start_minute = 4; // 开始分钟
    uint32 end_hour = 5; // 结束小时
    uint32 end_minute = 6; // 结束分钟
}

message protocol_heart_monitor_notify {
    notify_type notify_flag = 1; // 1bytes 通知类型
    bool high_remind_switch = 2; // 1bytes true:开启过高提醒开关， false:关闭
    bool low_remind_switch = 3; // 1bytes true:开启过低提醒开关， false:关闭
    uint32 high_threshold_value = 4; // 1bytes 过高提醒阈值
    uint32 low_threshold_value = 5; // 1bytes 过低提醒阈值
    uint32 interval = 6; // 1bytes 提醒间隔,单位分钟
    repeated bool repeat = 7; // 1bytes 重复周期 周一~周日
    uint32 start_hour = 8; // 开始小时
    uint32 start_minute = 9; // 开始分钟
    uint32 end_hour = 10; // 结束小时
    uint32 end_minute = 11; // 结束分钟
}

message protocol_health_monitor_operate {
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    health_type health_type = 2; // 健康监测类型
    health_monitor_mode default_mode = 3; // 1bytes  默认监测模式类型
    uint32 measurement_interval = 4; // 2bytes 测量间隔,单位s
    protocol_health_monitor_auto_adjust mode_auto_adjust = 5; // 监测模式自动调整子项数据
    protocol_heart_monitor_notify notify_setting = 6; // 提醒通知配置
}

message protocol_health_monitor_inquire_reply {
    uint32 func_table = 1; // 1bytes 功能表
    operate_type operate = 2; // 1bytes操作类型 0：无效操作 1：查询 2：设置
    health_type health_type = 3; // 健康监测类型
    health_monitor_mode default_mode = 4; // 1bytes  默认模式类型
    uint32 measurement_interval = 5; // 2bytes 自动测量间隔,单位s
    protocol_health_monitor_auto_adjust mode_auto_adjust = 6; // 监测模式自动调整子项数据
    protocol_heart_monitor_notify notify_setting = 7; // 提醒通知配置
}
```

### 字段说明

#### `protocol_health_monitor_auto_adjust`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `switch_flag` | `bool` | 1bytes 模式自动调整开关 true 开启,false 关闭 |
| `adjust_mode` | `health_monitor_mode` | 1bytes 监测模式 |
| `start_hour` | `uint32` | 开始小时 |
| `start_minute` | `uint32` | 开始分钟 |
| `end_hour` | `uint32` | 结束小时 |
| `end_minute` | `uint32` | 结束分钟 |

#### `protocol_heart_monitor_notify`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `notify_flag` | `notify_type` | 1bytes 通知类型 |
| `high_remind_switch` | `bool` | 1bytes true:开启过高提醒开关， false:关闭 |
| `low_remind_switch` | `bool` | 1bytes true:开启过低提醒开关， false:关闭 |
| `high_threshold_value` | `uint32` | 1bytes 过高提醒阈值 |
| `low_threshold_value` | `uint32` | 1bytes 过低提醒阈值 |
| `interval` | `uint32` | 1bytes 提醒间隔,单位分钟 |
| `repeat` | `repeated bool` | 1bytes 重复周期 周一~周日 |
| `start_hour` | `uint32` | 开始小时 |
| `start_minute` | `uint32` | 开始分钟 |
| `end_hour` | `uint32` | 结束小时 |
| `end_minute` | `uint32` | 结束分钟 |

#### `protocol_health_monitor_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `health_type` | `health_type` | 健康监测类型 |
| `default_mode` | `health_monitor_mode` | 1bytes  默认监测模式类型 |
| `measurement_interval` | `uint32` | 2bytes 测量间隔,单位s |
| `mode_auto_adjust` | `protocol_health_monitor_auto_adjust` | 监测模式自动调整子项数据 |
| `notify_setting` | `protocol_heart_monitor_notify` | 提醒通知配置 |

#### `protocol_health_monitor_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `func_table` | `uint32` | 1bytes 功能表 |
| `operate` | `operate_type` | 1bytes操作类型 0：无效操作 1：查询 2：设置 |
| `health_type` | `health_type` | 健康监测类型 |
| `default_mode` | `health_monitor_mode` | 1bytes  默认模式类型 |
| `measurement_interval` | `uint32` | 2bytes 自动测量间隔,单位s |
| `mode_auto_adjust` | `protocol_health_monitor_auto_adjust` | 监测模式自动调整子项数据 |
| `notify_setting` | `protocol_heart_monitor_notify` | 提醒通知配置 |

### 枚举值

#### `operate_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `INVALID` | `0` | 无效或未指定的值。 |
| `INQUIRE` | `1` | 查询 |
| `SET` | `2` | 设置 |

#### `notify_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `ALLOW` | `0` | 允许通知 |
| `SILENT` | `1` | 静默通知 |
| `CLOSE` | `2` | 关闭通知 |

#### `health_monitor_mode`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `MANUAL` | `0` | 手动 |
| `AUTO` | `1` | 自动 |
| `CONTINUOUS` | `2` | 连续监测 |
| `INTELLIGENT` | `3` | Intelligent monitoring |

#### `health_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `HEART_RATE` | `0` | 心率 |
| `STRESS` | `1` | 压力 |
| `SPO2` | `2` | 血氧 |
| `NOISE` | `3` | 噪音 |
| `BODY_ENERGY` | `4` | 身体电量 |
| `RESPIRATORY_RATE` | `5` | 呼吸率 |
| `SKIN_TEMPERATURE` | `6` | 皮肤温度 |

### `func_table` 功能位

| bit位 | 说明 |
| - | - |
| 0 | 是否支持心率测量间隔时长修改 |
| 1 | 是否支持心率测量连续监测模式 |
| 2 | 是否支持心率测量智能监测模式 |
| 3 | 是否支持心率日志过高过低提醒，不包括时间段设置，字段protocol_heart_monitor_notify |
| 4 | 是否不支持心率测量自动测量模式 |
| 5 | 是否不支持血氧测量自动测量模式 |
| 6 | 是支持睡眠秒级血氧测量设置（OSA） |
