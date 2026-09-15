---
docId: flutter-water-reminder
locale: zh-CN
title: "Flutter 喝水提醒"
description: "读取并配置定时喝水提醒。"
platform: Flutter
slug: flutter/water-reminder
order: 120
status: published
version: v2.0
---

# Flutter 喝水提醒

读取并配置定时喝水提醒。

## 接口示例

```dart
///get
sdkManager.getWater(callBack: (e) {
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
}, errCallBack: (e) {
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});
///set
protocol_drink_water_operate operate =  protocol_drink_water_operate();
 operate.switchFlag = true;
 operate.startHour = 8;
 operate.startMinute = 0;
 operate.endHour = 18;
 operate.endMinute = 0;
 sdkManager.setWater(operate: operate,callBack: (){

 },errCallBack: (e){

 });
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

message protocol_drink_water_operate
{
     operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
     bool switch_flag = 2; // 1bytes 喝水提醒开关 true 开启,false 关闭
     notify_type notify_flag = 3; // 1bytes 通知类型
     uint32 start_hour = 4; // 提醒开始时间
     uint32 start_minute = 5; // 开始分钟。
     uint32 end_hour = 6; // 提醒结束时间
     uint32 end_minute = 7; // 结束分钟。
     repeated bool repeat = 8; // 1bytes 重复周期 周一~周日
     uint32 interval = 9; // 2bytes 提醒间隔,单位分钟
}

message protocol_drink_water_inquire_reply
{
     uint32 func_table = 1; // 1bytes 功能表
     operate_type operate = 2; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
     bool switch_flag = 3; // 1bytes 喝水提醒开关 true 开启,false 关闭
     notify_type notify_flag = 4; // 1bytes 通知类型
     uint32 start_hour = 5; // 提醒开始时间
     uint32 start_minute = 6; // 开始分钟。
     uint32 end_hour = 7; // 提醒结束时间
     uint32 end_minute = 8; // 结束分钟。
     repeated bool repeat = 9; // 1bytes 重复周期 周一~周日
     uint32 interval = 10; // 2bytes 提醒间隔,单位分钟
}
```

### 字段说明

#### `protocol_drink_water_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `switch_flag` | `bool` | 1bytes 喝水提醒开关 true 开启,false 关闭 |
| `notify_flag` | `notify_type` | 1bytes 通知类型 |
| `start_hour` | `uint32` | 提醒开始时间 |
| `start_minute` | `uint32` | 开始分钟。 |
| `end_hour` | `uint32` | 提醒结束时间 |
| `end_minute` | `uint32` | 结束分钟。 |
| `repeat` | `repeated bool` | 1bytes 重复周期 周一~周日 |
| `interval` | `uint32` | 2bytes 提醒间隔,单位分钟 |

#### `protocol_drink_water_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `func_table` | `uint32` | 1bytes 功能表 |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `switch_flag` | `bool` | 1bytes 喝水提醒开关 true 开启,false 关闭 |
| `notify_flag` | `notify_type` | 1bytes 通知类型 |
| `start_hour` | `uint32` | 提醒开始时间 |
| `start_minute` | `uint32` | 开始分钟。 |
| `end_hour` | `uint32` | 提醒结束时间 |
| `end_minute` | `uint32` | 结束分钟。 |
| `repeat` | `repeated bool` | 1bytes 重复周期 周一~周日 |
| `interval` | `uint32` | 2bytes 提醒间隔,单位分钟 |

### 枚举值

#### `operate_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `INVALID` | `0` | 无效或未指定的值。 |
| `INQUIRE` | `1` | 查询 |
| `SET` | `2` | 设置 |

### `func_table` 功能位

| bit位 | 说明 |
| - | - |
| 0 | 是否协议只支持喝水开关 |
