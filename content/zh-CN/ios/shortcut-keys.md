---
docId: ios-shortcut-keys
locale: zh-CN
title: iOS 快捷键
description: 读取和设置表冠或按键的快捷操作。
platform: iOS
slug: ios/shortcut-keys
order: 110
status: published
version: v2.0
---

# iOS 快捷键

## 功能说明

读取和设置表冠或按键的快捷操作。

## Swift 示例

```swift
///获取快捷键
CreekInterFace.instance.getHotKey { model in
                
            } failure: { code, message in
                
            }
            
            
/// 设置快捷键
var operate = protocol_button_crown_operate()
operate.pauseWorkout = true
operate.longType = .pressTypeSos

CreekInterFace.instance.setHotKey(model: operate) {
    //Handle success
} failure: { code, message in
    //Handle failure
}
```

## 功能表字段

读取 `protocol_function_table` 后检查以下字段：

```protobuf
message function_table {
    bool is_support = 1;//是否支持该能力。
    uint32 cmd_id = 2;//能力对应的指令标识。
}

message protocol_function_table {
    function_table button_crown = 19;//按键快捷操作能力。
}
```

## Protobuf 数据模型

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
