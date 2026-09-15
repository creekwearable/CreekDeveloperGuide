---
docId: android-focus-mode
locale: zh-CN
title: Android 专注模式
description: 读取并设置专注模式计划。
platform: Android
slug: android/focus-mode
order: 126
status: published
version: v2.0
---

# Android 专注模式

读取并设置专注模式计划。

```kotlin
///获取
CreekManager.sInstance.getFocusSleep({model: Focus.protocol_focus_mode_inquire_reply ->
    responseText.value = model.toString()
}, failure = {_, m ->
    responseText.value = m
})

///设置
var  operate =  Focus.protocol_focus_mode_operate()
var mode = Focus.protocol_focus_sleep_mode()
mode.switchFlag = true
mode.startHour = 22
mode.endHour = 8
mode.startMinute = 0
mode.endMinute = 0
operate.sleepMode = mode
CreekManager.sInstance.setFocusSleep(model = operate, success = {
    responseText.value = "success"
}, failure = {_, m ->
    responseText.value = m
})
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";

enum switch_type
{
    SWITCH_NULL = 0;//NULL
    SWITCH_ON = 1;//开启
    SWITCH_OFF = 2;//关闭
}

message protocol_focus_sleep_mode
{
    bool switch_flag = 1;
    //开始时间 
    uint32 start_hour = 2; 
    uint32 start_minute = 3;
    //结束时间
    uint32 end_hour = 4;
    uint32 end_minute = 5;
}

message protocol_focus_mode_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    protocol_focus_sleep_mode sleep_mode = 2; //睡眠模式
    switch_type sleep_mode_switch = 3;  //1bytes 睡眠模式功能开关 true 开启,false 关闭
}

message protocol_focus_mode_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 func_table = 2;//1bytes 功能表
    protocol_focus_sleep_mode sleep_mode = 3; //睡眠模式
    switch_type sleep_mode_switch = 4;  //1bytes 睡眠模式功能开关 true 开启,false 关闭
}
```
