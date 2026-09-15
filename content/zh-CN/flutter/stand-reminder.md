---
docId: flutter-stand-reminder
locale: zh-CN
title: "Flutter 站立提醒"
description: "读取并配置站立提醒。"
platform: Flutter
slug: flutter/stand-reminder
order: 119
status: published
version: v2.0
---

# Flutter 站立提醒

读取并配置站立提醒。

## 接口示例

```dart
///get
sdkManager.getStanding(callBack: (e) {
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
}, errCallBack: (e) {
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});

///set
protocol_standing_remind_operate operate =  protocol_standing_remind_operate();
protocol_standing_remind_set set =   protocol_standing_remind_set();
set.switchFlag = true;
operate.standingRemind = set;
sdkManager.setStanding(operate: operate,callBack: (){

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

enum notify_type
{
     ALLOW = 0; // 允许通知
     SILENT = 1; // 静默通知
     CLOSE = 2; // 关闭通知
}

message protocol_standing_remind_set
{
     bool switch_flag = 1; // 1bytes 站立提醒开关 true 开启,false 关闭
     notify_type notify_flag = 2; // 1bytes 通知类型
     uint32 start_hour = 3; // 提醒开始时间
     uint32 start_minute = 4; // 开始分钟。
     uint32 end_hour = 5; // 提醒结束时间
     uint32 end_minute = 6; // 结束分钟。
     repeated bool repeat = 7; // 1bytes 重复周期 周一~周日
}

message protocol_standing_remind_operate
{
     operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
     protocol_standing_remind_set standing_remind = 2; // 站立提醒设置。
}

message protocol_standing_remind_inquire_reply
{
     uint32 func_table = 1; // 1bytes 功能表
     operate_type operate = 2; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
     protocol_standing_remind_set standing_remind = 3; // 站立提醒设置。
}
```

### 字段说明

#### `protocol_standing_remind_set`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `switch_flag` | `bool` | 1bytes 站立提醒开关 true 开启,false 关闭 |
| `notify_flag` | `notify_type` | 1bytes 通知类型 |
| `start_hour` | `uint32` | 提醒开始时间 |
| `start_minute` | `uint32` | 开始分钟。 |
| `end_hour` | `uint32` | 提醒结束时间 |
| `end_minute` | `uint32` | 结束分钟。 |
| `repeat` | `repeated bool` | 1bytes 重复周期 周一~周日 |

#### `protocol_standing_remind_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `standing_remind` | `protocol_standing_remind_set` | 站立提醒设置。 |

#### `protocol_standing_remind_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `func_table` | `uint32` | 1bytes 功能表 |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `standing_remind` | `protocol_standing_remind_set` | 站立提醒设置。 |

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
