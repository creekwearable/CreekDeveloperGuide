---
docId: flutter-app-list
locale: zh-CN
title: "Flutter 应用列表"
description: "读取并配置设备应用列表。"
platform: Flutter
slug: flutter/app-list
order: 123
status: published
version: v2.0
---

# Flutter 应用列表

读取并配置设备应用列表。

## 接口示例

```dart
///get
sdkManager.getAppList(callBack: (e){
  protocol_app_list_operate operate = protocol_app_list_operate();
  operate.list.addAll(e.list);
  sdkManager.setAppList(operate: operate);
},errCallBack: (e){

});
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum app_list
{
     APP_LIST_ACTIVITY = 0; // 活动
     APP_LIST_WORKOUT = 1; // 运动
     APP_LIST_STEPS = 2; // 计步
     APP_LIST_HEARTRATE = 3; // 心率
     APP_LIST_SLEEP = 4; // 睡眠
     APP_LIST_STRESS = 5; // 压力
     APP_LIST_MENSTRUATION = 6; // 女性健康
     APP_LIST_BREATHE = 7; // 呼吸训练
     APP_LIST_ALARMS = 8; // 闹钟
     APP_LIST_PHONE = 9; // 电话
     APP_LIST_TIMERS = 10; // 倒计时
     APP_LIST_STOPWATCH = 11; // 秒表
     APP_LIST_SPO2 = 12; // 血氧
     APP_LIST_WEATHER = 13; // 天气
     APP_LIST_CAMERA_REMOTE = 14; // 相机控制
     APP_LIST_MUSIC = 15; // 音乐控制
     APP_LIST_FIND_PHONE = 16; // 寻找手机
     APP_LIST_WORLD_CLOCK = 17; // 世界时钟
     APP_LIST_SETTINGS = 18; // 设置
}

message protocol_app_list_operate
{
     operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
     repeated app_list list = 2; // 应用列表项。
}

message protocol_app_list_inquire_reply
{
     operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
     uint32 func_table = 2; // 功能位掩码。
     uint32 support_show_num = 3; // 1bytes 应用列表显示数量
     repeated app_list list = 4; // 应用列表项。
     bool app_list_activity_support = 5; // 应用列表项是否支持活动数据。
     bool app_list_workout_support = 6; // 应用列表项是否支持运动数据。
     bool app_list_steps_support = 7; // 应用列表项是否支持步数数据。
     bool app_list_heartrate_support = 8; // 心率
     bool app_list_sleep_support = 9; // 睡眠
     bool app_list_stress_support = 10; // 压力
     bool app_list_menstruation_support = 11; // 女性健康
     bool app_list_breathe_support = 12; // 呼吸训练
     bool app_list_alarms_support = 13; // 闹钟
     bool app_list_phone_support = 14; // 电话
     bool app_list_timers_support = 15; // 倒计时
     bool app_list_stopwatch_support = 16; // 秒表
     bool app_list_spo2_support = 17; // 血氧
     bool app_list_weather_support = 18; // 天气
     bool app_list_camera_remote_support = 19; // 相机控制
     bool app_list_music_support = 20; // 音乐控制
     bool app_list_find_phone_support = 21; // 寻找手机
     bool app_list_world_clock_support = 22; // 世界时钟
     bool app_list_settings_support = 23; // 设置
}
```

### 字段说明

#### `protocol_app_list_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `list` | `repeated app_list` | 应用列表项。 |

#### `protocol_app_list_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `func_table` | `uint32` | 功能位掩码。 |
| `support_show_num` | `uint32` | 1bytes 应用列表显示数量 |
| `list` | `repeated app_list` | 应用列表项。 |
| `app_list_activity_support` | `bool` | 应用列表项是否支持活动数据。 |
| `app_list_workout_support` | `bool` | 应用列表项是否支持运动数据。 |
| `app_list_steps_support` | `bool` | 应用列表项是否支持步数数据。 |
| `app_list_heartrate_support` | `bool` | 心率 |
| `app_list_sleep_support` | `bool` | 睡眠 |
| `app_list_stress_support` | `bool` | 压力 |
| `app_list_menstruation_support` | `bool` | 女性健康 |
| `app_list_breathe_support` | `bool` | 呼吸训练 |
| `app_list_alarms_support` | `bool` | 闹钟 |
| `app_list_phone_support` | `bool` | 电话 |
| `app_list_timers_support` | `bool` | 倒计时 |
| `app_list_stopwatch_support` | `bool` | 秒表 |
| `app_list_spo2_support` | `bool` | 血氧 |
| `app_list_weather_support` | `bool` | 天气 |
| `app_list_camera_remote_support` | `bool` | 相机控制 |
| `app_list_music_support` | `bool` | 音乐控制 |
| `app_list_find_phone_support` | `bool` | 寻找手机 |
| `app_list_world_clock_support` | `bool` | 世界时钟 |
| `app_list_settings_support` | `bool` | 设置 |

### 枚举值

#### `app_list`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `APP_LIST_ACTIVITY` | `0` | 活动 |
| `APP_LIST_WORKOUT` | `1` | 运动 |
| `APP_LIST_STEPS` | `2` | 计步 |
| `APP_LIST_HEARTRATE` | `3` | 心率 |
| `APP_LIST_SLEEP` | `4` | 睡眠 |
| `APP_LIST_STRESS` | `5` | 压力 |
| `APP_LIST_MENSTRUATION` | `6` | 女性健康 |
| `APP_LIST_BREATHE` | `7` | 呼吸训练 |
| `APP_LIST_ALARMS` | `8` | 闹钟 |
| `APP_LIST_PHONE` | `9` | 电话 |
| `APP_LIST_TIMERS` | `10` | 倒计时 |
| `APP_LIST_STOPWATCH` | `11` | 秒表 |
| `APP_LIST_SPO2` | `12` | 血氧 |
| `APP_LIST_WEATHER` | `13` | 天气 |
| `APP_LIST_CAMERA_REMOTE` | `14` | 相机控制 |
| `APP_LIST_MUSIC` | `15` | 音乐控制 |
| `APP_LIST_FIND_PHONE` | `16` | 寻找手机 |
| `APP_LIST_WORLD_CLOCK` | `17` | 世界时钟 |
| `APP_LIST_SETTINGS` | `18` | 设置 |
