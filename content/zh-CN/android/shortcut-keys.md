---
docId: android-shortcut-keys
locale: zh-CN
title: Android 快捷键
description: 读取并设置设备按键快捷操作。
platform: Android
slug: android/shortcut-keys
order: 110
status: published
version: v2.0
---

# Android 快捷键

读取并设置设备按键快捷操作。

```kotlin
CreekManager.sInstance.getHotKey(model = {
    
}, failure = {
    _,_ ->
})

var  model = HotKey.protocol_button_crown_operate()
model.pauseWorkout = true
model.longType = Enums.long_2s_press_type.PRESS_TYPE_SOS
CreekManager.sInstance.setHotKey(model = model,{
                                               
}, failure = {
    _,_ ->
})
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";

enum long_2s_press_type
{
    PRESS_TYPE_NULL = 0;
    PRESS_TYPE_SOS = 1;
    PRESS_TYPE_WORKOUT = 2;
    PRESS_TYPE_ALEXA = 3;
    PRESS_TYPE_RESTART = 4;//关机重启
}

message protocol_button_crown_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    long_2s_press_type long_type = 2;//1bytes 长按2s进入
    bool pause_workout = 3;//1bytes 设置运动中是否需要按键暂停功能
}

message protocol_button_crown_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    long_2s_press_type long_type = 2;//1bytes 长按2s进入
    bool pause_workout = 3;//1bytes 设置运动中是否需要按键暂停功能
    uint32 func_table = 4;//1bytes 功能表
}
```

### `func_table` 位说明

| bit位 | 说明 |
|-|-|
| 0 | 是否支持ALEXA长按2s进入，对应字段PRESS_TYPE_ALEXA  |
| 1 | 是否支持重启关机长按2s进入，对应字段PRESS_TYPE_RESTART |
| 2 | 是否不支持SOS长按选项显示，对应字段PRESS_TYPE_SOS |
| 3 | 是否不支持运动中按键暂停选项显示，对应字段pause_workout  |
