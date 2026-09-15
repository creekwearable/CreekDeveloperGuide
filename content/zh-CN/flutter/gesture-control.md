---
docId: flutter-gesture-control
locale: zh-CN
title: "Flutter 手势控制"
description: "读取并配置手势动作。"
platform: Flutter
slug: flutter/gesture-control
order: 131
status: published
version: v2.0
---

# Flutter 手势控制

读取并配置手势动作。

## 接口示例

```dart
protocol_gesture_control_operate operate = protocol_gesture_control_operate();
gesture_switch gestureSwitch = gesture_switch();
gestureSwitch.gestureType = gesture_type.GESTURE_TYPE_DOUBLECLICK;
gestureSwitch.controlSwitchType = hidControlType.value;
gestureSwitch.controlCloseAlarm = controlCloseAlarm.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
gestureSwitch.controlCall = controlCall.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
gestureSwitch.switchFlag = gestureSwitchFlag.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
gestureSwitch.controlSport = controlSport.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
gestureSwitch.controlAlarmLaterRemind = controlAlarmLaterRemind.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;

operate.operate = operate_type.SET;
operate.gestureSwitch.add(gestureSwitch);

sdkManager.setGesture(
  operate: operate,
  callBack: () {
    SmartDialog.dismiss();
  },
  errCallBack: (e) {
    SmartDialog.dismiss();
  },
);

sdkManager.getGesture(
  callBack: (e) {
    SmartDialog.dismiss();
  },
  errCallBack: (e) {
    SmartDialog.dismiss();
  },
);
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

enum gesture_type{
    GESTURE_TYPE_DOUBLECLICK = 0; // 双击
}

enum gesture_switch_hid_type
{
    SWITCH_NULL = 0; // NULL 关闭
    SWITCH_TURNPAGE = 1; // 开启 手机HID发送坐标模拟上下滑动  peripheral_hids_mouse
    SWITCH_BUTTON = 2; // 开启 手机HID发送坐标模拟音量键  peripheral_hids_keyboard
}

message gesture_switch{
    gesture_type gesture_type = 1; // 手势类型。
    gesture_switch_hid_type control_switch_type = 2; // //1模拟翻页  2模拟拍照
    switch_type control_close_alarm = 3; // 控制关闭闹钟
    switch_type control_call = 4; // 控制接听电话
    switch_type switch_flag = 5; // 当前手势总开关
    switch_type control_sport = 6; // 控制运动（暂停/恢复）
    switch_type control_alarm_later_remind = 7; // 控制闹钟延迟提醒
}

message protocol_gesture_control_operate
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    repeated gesture_switch gesture_switch = 2; // 手势开关列表。
}

message protocol_gesture_control_inquire_reply
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 func_table = 2; // 1bytes 功能表
    repeated gesture_switch gesture_switch = 3; // 手势开关列表。
}
```

### 字段说明

#### `gesture_switch`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `gesture_type` | `gesture_type` | 手势类型。 |
| `control_switch_type` | `gesture_switch_hid_type` | //1模拟翻页  2模拟拍照 |
| `control_close_alarm` | `switch_type` | 控制关闭闹钟 |
| `control_call` | `switch_type` | 控制接听电话 |
| `switch_flag` | `switch_type` | 当前手势总开关 |
| `control_sport` | `switch_type` | 控制运动（暂停/恢复） |
| `control_alarm_later_remind` | `switch_type` | 控制闹钟延迟提醒 |

#### `protocol_gesture_control_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `gesture_switch` | `repeated gesture_switch` | 手势开关列表。 |

#### `protocol_gesture_control_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `func_table` | `uint32` | 1bytes 功能表 |
| `gesture_switch` | `repeated gesture_switch` | 手势开关列表。 |

### 枚举值

#### `switch_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `SWITCH_NULL` | `0` | NULL |
| `SWITCH_ON` | `1` | 开启 |
| `SWITCH_OFF` | `2` | 关闭 |

#### `gesture_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `GESTURE_TYPE_DOUBLECLICK` | `0` | 双击 |

#### `gesture_switch_hid_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `SWITCH_NULL` | `0` | NULL 关闭 |
| `SWITCH_TURNPAGE` | `1` | 开启 手机HID发送坐标模拟上下滑动  peripheral_hids_mouse |
| `SWITCH_BUTTON` | `2` | 开启 手机HID发送坐标模拟音量键  peripheral_hids_keyboard |

### `func_table` 功能位

| bit位 | 说明 |
| - | - |
| 0 | 是否支持控制抖音开关 |
| 1 | 是否支持关闭闹钟 |
| 2 | 是否支持接听电话 |
| 3 | 是否支持拍照 |
| 4 | 是否支持控制运动（暂停/恢复） |
| 5 | 是否支持控制闹钟延迟提醒 |
