---
docId: flutter-screen
locale: zh-CN
title: "Flutter 屏幕"
description: "读取并配置屏幕与亮度设置。"
platform: Flutter
slug: flutter/screen
order: 124
status: published
version: v2.0
---

# Flutter 屏幕

读取并配置屏幕与亮度设置。

## 接口示例

```dart
///get
sdkManager.getScreen(callBack: (e){
  CreekLog.info("getScreenInfo:${e.toString()}");
});

sdkManager.setScreen(operate: operate);
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum operate_type {
    INVALID = 0; // 无效或未指定的值。
    INQUIRE = 1; // 查询
    SET = 2; // 设置
}

enum aod_mode {
    INTELLIGENT_MODE = 0; // 智能息屏显示模式。
    TIMER_MDOE = 1; // 定时息屏显示模式。
}

message protocol_screen_night_auto_adjust {
    bool switch_flag = 1; // 1bytes 夜间自动亮度调整 true 开启,false 关闭
    uint32 start_hour = 2; // 开始小时
    uint32 start_minute = 3; // 开始分钟
    uint32 end_hour = 4; // 结束小时
    uint32 end_minute = 5; // 结束分钟
    uint32 night_level = 6; // 1bytes 夜间亮度等级(0-100)
}

message protocol_screen_aod_time_setting {
    aod_mode mode = 1; // 选中的息屏显示模式。
    uint32 start_hour = 2; // 开始小时 (for timer mode)
    uint32 start_minute = 3; // 开始分钟 (for timer mode)
    uint32 end_hour = 4; // 结束小时
    uint32 end_minute = 5; // 结束分钟
}

message protocol_screen_brightness_operate {
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 level = 2; // 1bytes (0-100)
    uint32 show_interval = 3; // 1bytes 屏幕显示间隔 比如5秒
    protocol_screen_night_auto_adjust night_auto_adjust = 4; // 夜间自动亮度调整子项数据
    bool aod_switch_flag = 5; // 1bytes 息屏显示开关 true 开启,false 关闭
    bool raise_wrist_switch_flag = 6; // 1bytes 抬腕时亮屏开关 true 开启,false 关闭
    protocol_screen_aod_time_setting aod_time_setting = 7; // 常亮模式选择
    bool level_flag = 8; // 是否设置亮度生效
}

message protocol_screen_brightness_inquire_reply {
    uint32 func_table = 1; // 1bytes 功能表
    operate_type operate = 2; // 1bytes操作类型 0：无效操作 1：查询 2：设置
    uint32 level = 3; // 1bytes (0-100)
    uint32 show_interval = 4; // 1bytes 屏幕显示间隔 单位:秒
    protocol_screen_night_auto_adjust night_auto_adjust = 5; // 夜间自动亮度调整子项数据
    bool aod_switch_flag = 6; // 1bytes 常亮显示开关 true 开启,false 关闭
    bool raise_wrist_switch_flag = 7; // 1bytes 抬腕时亮屏开关 true 开启,false 关闭
    protocol_screen_aod_time_setting aod_time_setting = 8; // 常亮模式选择
    repeated uint32 show_interval_options = 9; // 亮屏时长显示选项 单位:秒
}
```

### 字段说明

#### `protocol_screen_night_auto_adjust`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `switch_flag` | `bool` | 1bytes 夜间自动亮度调整 true 开启,false 关闭 |
| `start_hour` | `uint32` | 开始小时 |
| `start_minute` | `uint32` | 开始分钟 |
| `end_hour` | `uint32` | 结束小时 |
| `end_minute` | `uint32` | 结束分钟 |
| `night_level` | `uint32` | 1bytes 夜间亮度等级(0-100) |

#### `protocol_screen_aod_time_setting`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `mode` | `aod_mode` | 选中的息屏显示模式。 |
| `start_hour` | `uint32` | 开始小时 (for timer mode) |
| `start_minute` | `uint32` | 开始分钟 (for timer mode) |
| `end_hour` | `uint32` | 结束小时 |
| `end_minute` | `uint32` | 结束分钟 |

#### `protocol_screen_brightness_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `level` | `uint32` | 1bytes (0-100) |
| `show_interval` | `uint32` | 1bytes 屏幕显示间隔 比如5秒 |
| `night_auto_adjust` | `protocol_screen_night_auto_adjust` | 夜间自动亮度调整子项数据 |
| `aod_switch_flag` | `bool` | 1bytes 息屏显示开关 true 开启,false 关闭 |
| `raise_wrist_switch_flag` | `bool` | 1bytes 抬腕时亮屏开关 true 开启,false 关闭 |
| `aod_time_setting` | `protocol_screen_aod_time_setting` | 常亮模式选择 |
| `level_flag` | `bool` | 是否设置亮度生效 |

#### `protocol_screen_brightness_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `func_table` | `uint32` | 1bytes 功能表 |
| `operate` | `operate_type` | 1bytes操作类型 0：无效操作 1：查询 2：设置 |
| `level` | `uint32` | 1bytes (0-100) |
| `show_interval` | `uint32` | 1bytes 屏幕显示间隔 单位:秒 |
| `night_auto_adjust` | `protocol_screen_night_auto_adjust` | 夜间自动亮度调整子项数据 |
| `aod_switch_flag` | `bool` | 1bytes 常亮显示开关 true 开启,false 关闭 |
| `raise_wrist_switch_flag` | `bool` | 1bytes 抬腕时亮屏开关 true 开启,false 关闭 |
| `aod_time_setting` | `protocol_screen_aod_time_setting` | 常亮模式选择 |
| `show_interval_options` | `repeated uint32` | 亮屏时长显示选项 单位:秒 |

### 枚举值

#### `operate_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `INVALID` | `0` | 无效或未指定的值。 |
| `INQUIRE` | `1` | 查询 |
| `SET` | `2` | 设置 |

#### `aod_mode`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `INTELLIGENT_MODE` | `0` | 智能息屏显示模式。 |
| `TIMER_MDOE` | `1` | 定时息屏显示模式。 |

### `func_table` 功能位

| bit位 | 说明 |
| - | - |
| 0 | 是否支持夜间自动亮度调整 |
| 1 | 是否支持常亮模式选择，支持用aod_time_setting ，不支持用aod_switch_flag |
| 2 | 是否支持亮屏时长显示选项 |
