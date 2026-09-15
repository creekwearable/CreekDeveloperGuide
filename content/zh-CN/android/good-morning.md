---
docId: android-good-morning
locale: zh-CN
title: Android 早安问候
description: 读取并设置设备早安问候内容。
platform: Android
slug: android/good-morning
order: 134
status: published
version: v2.0
---

# Android 早安问候

读取并设置设备早安问候内容。

```kotlin
CreekManager.sInstance.getMorning(model = {

}, failure = {
    code, message ->
})

var operate = Morning.protocol_good_morning_operate()
operate.switchFlag = true
operate.startHour = 8
operate.startMinute = 0
operate.endHour = 9
operate.endMinute = 0
///重复 周一~周七
operate.repeatList.addAll(listOf(true,true,true,true,true,true,true))
operate.contentList.add(ByteString.copyFrom("早上好".toByteArray()))
CreekManager.sInstance.setMorning(model = operate, success = {
    
}, failure = {
    code, message ->
})
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";
enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;//查询
    SET = 2;//设置
}

message protocol_good_morning_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool switch_flag = 2; //1bytes 提醒开关 true 开启,false 关闭
    uint32 start_hour = 3; //提醒开始时间
    uint32 start_minute = 4;
    uint32 end_hour = 5;   //提醒结束时间
    uint32 end_minute = 6;
    repeated bool repeat = 7; //7bytes 重复 周一~周七  
    repeated bytes content = 8;//编辑文案
}

message protocol_good_morning_inquire_reply
{
    uint32 func_table = 1;//1bytes 功能表
    operate_type operate = 2; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool switch_flag = 3; //1bytes 提醒开关 true 开启,false 关闭
    uint32 start_hour = 4; //提醒开始时间
    uint32 start_minute = 5;
    uint32 end_hour = 6;   //提醒结束时间
    uint32 end_minute = 7;
    repeated bool repeat = 8; //7bytes 重复 周一~周七  
    repeated bytes content = 9;//编辑文案
}
```

### `func_table` 位说明

| bit位 | 说明 |
|-|-|
| 0 | 是否支持重复日期，字段repeat |
| 1 | 是否支持编辑文案，对应字段content |
