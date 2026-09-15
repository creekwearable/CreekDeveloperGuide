---
docId: flutter-focus-mode
locale: zh-CN
title: "Flutter 专注模式"
description: "读取并配置专注模式日程。"
platform: Flutter
slug: flutter/focus-mode
order: 122
status: published
version: v2.0
---

# Flutter 专注模式

读取并配置专注模式日程。

## 接口示例

```dart
///get
sdkManager.getFocusSleep(callBack: (e) {
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
}, errCallBack: (e) {
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});
///set
protocol_focus_mode_operate operate =  protocol_focus_mode_operate();
protocol_focus_sleep_mode mode = protocol_focus_sleep_mode();
mode.switchFlag = true;
mode.startHour = 8;
mode.startMinute = 0;
mode.endHour = 18;
mode.endMinute = 0;
operate.sleepMode = mode;
sdkManager.setFocusSleep(operate: operate,callBack: (){

},errCallBack: (e){

});
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum switch_type
{
    SWITCH_NULL = 0; // NULL
    SWITCH_ON = 1; // 开启
    SWITCH_OFF = 2; // 关闭
}

message protocol_focus_sleep_mode
{
    bool switch_flag = 1; // Enable/Disable sleep mode
    uint32 start_hour = 2; // 开始小时
    uint32 start_minute = 3; // 开始分钟
    uint32 end_hour = 4; // 结束小时
    uint32 end_minute = 5; // 结束分钟
}

message protocol_focus_mode_operate
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    protocol_focus_sleep_mode sleep_mode = 2; // 睡眠模式
    switch_type sleep_mode_switch = 3; // 1bytes 睡眠模式功能开关 true 开启,false 关闭
}

message protocol_focus_mode_inquire_reply
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 func_table = 2; // 1bytes 功能表
    protocol_focus_sleep_mode sleep_mode = 3; // 睡眠模式
    switch_type sleep_mode_switch = 4; // 1bytes 睡眠模式功能开关 true 开启,false 关闭
}
```

### 字段说明

#### `protocol_focus_sleep_mode`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `switch_flag` | `bool` | Enable/Disable sleep mode |
| `start_hour` | `uint32` | 开始小时 |
| `start_minute` | `uint32` | 开始分钟 |
| `end_hour` | `uint32` | 结束小时 |
| `end_minute` | `uint32` | 结束分钟 |

#### `protocol_focus_mode_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `sleep_mode` | `protocol_focus_sleep_mode` | 睡眠模式 |
| `sleep_mode_switch` | `switch_type` | 1bytes 睡眠模式功能开关 true 开启,false 关闭 |

#### `protocol_focus_mode_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `func_table` | `uint32` | 1bytes 功能表 |
| `sleep_mode` | `protocol_focus_sleep_mode` | 睡眠模式 |
| `sleep_mode_switch` | `switch_type` | 1bytes 睡眠模式功能开关 true 开启,false 关闭 |

### 枚举值

#### `switch_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `SWITCH_NULL` | `0` | NULL |
| `SWITCH_ON` | `1` | 开启 |
| `SWITCH_OFF` | `2` | 关闭 |
