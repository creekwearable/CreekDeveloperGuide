---
docId: flutter-water-assistant
locale: zh-CN
title: "Flutter 喝水助手"
description: "读取并配置喝水助手记录与设置。"
platform: Flutter
slug: flutter/water-assistant
order: 121
status: published
version: v2.0
---

# Flutter 喝水助手

读取并配置喝水助手记录与设置。

## 接口示例

```dart
sdkManager.getWaterAssistant(callBack: (e){
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
},errCallBack: (e){
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

// Enum for operation type
enum operate_type {
    INVALID = 0;   // Invalid operation
    INQUIRE = 1; // 查询
    SET = 2; // 设置
}

// Message representing a timestamp
message water_assistant_time {
    uint32 year = 1; // 年份。
    uint32 month = 2; // 月份。
    uint32 day = 3; // 日期。
    uint32 hour = 4; // 小时。
    uint32 minute = 5; // 分钟。
    uint32 second = 6; // 秒。
}

// Message representing a time section for reminders
message water_assistant_time_section {
    uint32 start_hour = 1; // 1bytes 开始时间
    uint32 start_minute = 2; // 1bytes
    uint32 end_hour = 3; // 1bytes 结束时间
    uint32 end_minute = 4; // 1bytes
}

// Message for water assistant settings
message water_assistant_setting {
    uint32 user_target = 1; // 2bytes用户设置目标
    uint32 interval = 2; // 2bytes 提醒间隔,单位分钟
    bool switch_flag = 3; // 提醒开关
    repeated water_assistant_time_section time_section = 4; // max:8 提醒时间段
}

// Message for daily water consumption status
message water_assistant_daily_status {
    uint32 year = 1; // 年份。
    uint32 month = 2; // 月份。
    uint32 day = 3; // 日期。
    bool status = 4; // 完成状态
    uint32 drink_value = 5; // 喝水总量
    uint32 user_target = 6; // 用户设置目标
}

// Message for water assistant operation request
message protocol_water_assistant_operate {
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    water_assistant_time last_drink_time = 2; // 上一次喝水时间
    repeated water_assistant_daily_status daily_data = 3; // 7天内喝水量
    water_assistant_setting setting = 4; // 设置
    uint32 set_utc_time = 5; // 设置记录的utc时间，记录时间
}

// Message for water assistant inquiry reply
message protocol_water_assistant_inquire_reply {
    uint32 func_table = 1; // 1bytes 功能表
    operate_type operate = 2; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    water_assistant_time last_drink_time = 3; // 上一次喝水时间
    repeated water_assistant_daily_status daily_data = 4; // 7天内喝水量
    water_assistant_setting setting = 5; // 设置
    uint32 set_utc_time = 6; // 设置记录的utc时间，记录时间
}
```

### 字段说明

#### `water_assistant_time`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `year` | `uint32` | 年份。 |
| `month` | `uint32` | 月份。 |
| `day` | `uint32` | 日期。 |
| `hour` | `uint32` | 小时。 |
| `minute` | `uint32` | 分钟。 |
| `second` | `uint32` | 秒。 |

#### `water_assistant_time_section`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `start_hour` | `uint32` | 1bytes 开始时间 |
| `start_minute` | `uint32` | 1bytes |
| `end_hour` | `uint32` | 1bytes 结束时间 |
| `end_minute` | `uint32` | 1bytes |

#### `water_assistant_setting`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `user_target` | `uint32` | 2bytes用户设置目标 |
| `interval` | `uint32` | 2bytes 提醒间隔,单位分钟 |
| `switch_flag` | `bool` | 提醒开关 |
| `time_section` | `repeated water_assistant_time_section` | max:8 提醒时间段 |

#### `water_assistant_daily_status`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `year` | `uint32` | 年份。 |
| `month` | `uint32` | 月份。 |
| `day` | `uint32` | 日期。 |
| `status` | `bool` | 完成状态 |
| `drink_value` | `uint32` | 喝水总量 |
| `user_target` | `uint32` | 用户设置目标 |

#### `protocol_water_assistant_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `last_drink_time` | `water_assistant_time` | 上一次喝水时间 |
| `daily_data` | `repeated water_assistant_daily_status` | 7天内喝水量 |
| `setting` | `water_assistant_setting` | 设置 |
| `set_utc_time` | `uint32` | 设置记录的utc时间，记录时间 |

#### `protocol_water_assistant_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `func_table` | `uint32` | 1bytes 功能表 |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `last_drink_time` | `water_assistant_time` | 上一次喝水时间 |
| `daily_data` | `repeated water_assistant_daily_status` | 7天内喝水量 |
| `setting` | `water_assistant_setting` | 设置 |
| `set_utc_time` | `uint32` | 设置记录的utc时间，记录时间 |

### 枚举值

#### `operate_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `INVALID` | `0` | Invalid operation |
| `INQUIRE` | `1` | 查询 |
| `SET` | `2` | 设置 |
