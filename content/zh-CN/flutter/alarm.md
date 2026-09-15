---
docId: flutter-alarm
locale: zh-CN
title: "Flutter 闹钟"
description: "读取、添加、更新和删除设备闹钟。"
platform: Flutter
slug: flutter/alarm
order: 105
status: published
version: v2.0
---

# Flutter 闹钟

读取、添加、更新和删除设备闹钟。

## 接口示例

```dart
/// 每次设置前都应先读取现有信息，再修改需要变更的字段。

/// 例如，现有闹钟为 [1, 2, 3]。删除闹钟 2 时提交 [1, 3]；新增闹钟时则在原列表中加入新条目。

/// Retrieve
sdkManager.getAlarm(callBack: (e) {
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
}, errCallBack: (e) {
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});

protocol_alarm_operate operate = protocol_alarm_operate();
protocol_set_alarm_item item =  protocol_set_alarm_item();
item.alarmId = 1;
item.dispStatus = disp_status.DISP_ON;
item.type = alarm_type.GET_UP;
item.hour = 22;
item.minute = 30;
item.repeat.addAll([true,true,true,true,true,false,false]);
item.switchFlag = false;
item.laterRemindRepeatTimes = 1;
item.vibrateOnOff = true;
item.name = utf8.encode("abc");
sdkManager.setAlarm(operate,callBack: (){

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

enum disp_status
{
    DISP_OFF = 0; // 关闭显示。
    DISP_ON = 1; // 开启显示。
}

enum alarm_type
{
    GET_UP = 0; // 起床
    SLEEP = 1; // 睡觉
}

// Set alarm data item
message protocol_set_alarm_item
{
    uint32 alarm_id = 1; // 1bytes 闹钟id 从0开始
    disp_status disp_status = 2; // 1bytes 显示状态 disp_off不显示 disp_on 显示
    alarm_type type = 3; // 1bytes 闹钟类型
    uint32 hour = 4; // 1bytes
    uint32 minute = 5; // 1bytes
    bool switch_flag = 6; // 1bytes 开关
    repeated bool repeat = 7; // 7bytes 重复 周一~周七
    bool later_remind_switch_flag = 8; // 延迟提醒开关
    uint32 later_remind_repeat_times = 9; // 1bytes 稍后提醒重复闹铃次数
    uint32 later_remind_min = 10; // 1bytes 稍后提醒分钟
    bool vibrate_on_off = 11; // 1bytes 闹钟震动开关 0关闭 1开启
    bytes name = 12; // max:30 闹钟名称
};

message protocol_alarm_operate
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 num = 2; // 1bytes 闹钟数量
    repeated protocol_set_alarm_item alarm_item = 3; // max: 20
    repeated bytes custom_name_list = 4; // 闹钟自定义曾用选项名字 max:10
}

message protocol_alarm_inquire_reply
{
    uint32 func_table = 1; // 1bytes 功能表
    uint32 alarm_support_max = 2; // 1bytes 闹钟支持最大数量
    operate_type operate = 3; // 1bytes操作类型 0：无效操作 1：查询 2：设置
    uint32 num = 4; // 1bytes 闹钟数量
    repeated protocol_set_alarm_item alarm_item = 5; // max: 20
    repeated bytes custom_name_list = 6; // 闹钟自定义曾用选项名字 max:10
}
```

### 字段说明

#### `protocol_set_alarm_item`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `alarm_id` | `uint32` | 1bytes 闹钟id 从0开始 |
| `disp_status` | `disp_status` | 1bytes 显示状态 disp_off不显示 disp_on 显示 |
| `type` | `alarm_type` | 1bytes 闹钟类型 |
| `hour` | `uint32` | 1bytes |
| `minute` | `uint32` | 1bytes |
| `switch_flag` | `bool` | 1bytes 开关 |
| `repeat` | `repeated bool` | 7bytes 重复 周一~周七 |
| `later_remind_switch_flag` | `bool` | 延迟提醒开关 |
| `later_remind_repeat_times` | `uint32` | 1bytes 稍后提醒重复闹铃次数 |
| `later_remind_min` | `uint32` | 1bytes 稍后提醒分钟 |
| `vibrate_on_off` | `bool` | 1bytes 闹钟震动开关 0关闭 1开启 |
| `name` | `bytes` | max:30 闹钟名称 |

#### `protocol_alarm_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `num` | `uint32` | 1bytes 闹钟数量 |
| `alarm_item` | `repeated protocol_set_alarm_item` | max: 20 |
| `custom_name_list` | `repeated bytes` | 闹钟自定义曾用选项名字 max:10 |

#### `protocol_alarm_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `func_table` | `uint32` | 1bytes 功能表 |
| `alarm_support_max` | `uint32` | 1bytes 闹钟支持最大数量 |
| `operate` | `operate_type` | 1bytes操作类型 0：无效操作 1：查询 2：设置 |
| `num` | `uint32` | 1bytes 闹钟数量 |
| `alarm_item` | `repeated protocol_set_alarm_item` | max: 20 |
| `custom_name_list` | `repeated bytes` | 闹钟自定义曾用选项名字 max:10 |

### 枚举值

#### `operate_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `INVALID` | `0` | 无效或未指定的值。 |
| `INQUIRE` | `1` | 查询 |
| `SET` | `2` | 设置 |

#### `disp_status`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `DISP_OFF` | `0` | 关闭显示。 |
| `DISP_ON` | `1` | 开启显示。 |

#### `alarm_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `GET_UP` | `0` | 起床 |
| `SLEEP` | `1` | 睡觉 |

### `func_table` 功能位

| bit位 | 说明 |
| - | - |
| 0 | 是否支持稍后提醒分钟自定义修改，字段：later_remind_min |
| 1 | 是否支持闹钟自定义标签曾用选项，字段：custom_name_list |
| 2 | 是否不支持延迟提醒 |
