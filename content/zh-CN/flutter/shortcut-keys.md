---
docId: flutter-shortcut-keys
locale: zh-CN
title: "Flutter 快捷键"
description: "读取并配置按键与表冠快捷操作。"
platform: Flutter
slug: flutter/shortcut-keys
order: 110
status: published
version: v2.0
---

# Flutter 快捷键

读取并配置按键与表冠快捷操作。

## 接口示例

```dart
/// Get shortcut keys
sdkManager.getHotKey(callBack: (e) {
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
}, errCallBack: (e) {
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});

/// Set shortcut keys
 protocol_button_crown_operate operate = protocol_button_crown_operate();
 operate.pauseWorkout = true;
 operate.longType = long_2s_press_type.PRESS_TYPE_SOS;
sdkManager.setHotKey(operate: operate,callBack: (){

},errCallBack: (e){

});
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum long_2s_press_type
{
    PRESS_TYPE_NULL = 0; // 未指定按压类型。
    PRESS_TYPE_SOS = 1; // SOS
    PRESS_TYPE_WORKOUT = 2; // Workout
    PRESS_TYPE_ALEXA = 3; // Alexa
    PRESS_TYPE_RESTART = 4; // 关机重启
}

message protocol_button_crown_operate
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    long_2s_press_type long_type = 2; // 1bytes 长按2s进入
    bool pause_workout = 3; // 1bytes 设置运动中是否需要按键暂停功能
}

message protocol_button_crown_inquire_reply
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    long_2s_press_type long_type = 2; // 1bytes 长按2s进入
    bool pause_workout = 3; // 1bytes 设置运动中是否需要按键暂停功能
    uint32 func_table = 4; // 1bytes 功能表
}
```

### 字段说明

#### `protocol_button_crown_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `long_type` | `long_2s_press_type` | 1bytes 长按2s进入 |
| `pause_workout` | `bool` | 1bytes 设置运动中是否需要按键暂停功能 |

#### `protocol_button_crown_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `long_type` | `long_2s_press_type` | 1bytes 长按2s进入 |
| `pause_workout` | `bool` | 1bytes 设置运动中是否需要按键暂停功能 |
| `func_table` | `uint32` | 1bytes 功能表 |

### 枚举值

#### `long_2s_press_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `PRESS_TYPE_NULL` | `0` | 未指定按压类型。 |
| `PRESS_TYPE_SOS` | `1` | SOS |
| `PRESS_TYPE_WORKOUT` | `2` | Workout |
| `PRESS_TYPE_ALEXA` | `3` | Alexa |
| `PRESS_TYPE_RESTART` | `4` | 关机重启 |

### `func_table` 功能位

| bit位 | 说明 |
| - | - |
| 0 | 是否支持ALEXA长按2s进入，对应字段PRESS_TYPE_ALEXA |
| 1 | 是否支持重启关机长按2s进入，对应字段PRESS_TYPE_RESTART |
| 2 | 是否不支持SOS长按选项显示，对应字段PRESS_TYPE_SOS |
| 3 | 是否不支持运动中按键暂停选项显示，对应字段pause_workout |
