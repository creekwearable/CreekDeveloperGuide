---
docId: android-standing-reminder
locale: zh-CN
title: Android 站立提醒
description: 读取并设置站立提醒时间和重复周期。
platform: Android
slug: android/standing-reminder
order: 123
status: published
version: v2.0
---

# Android 站立提醒

读取并设置站立提醒时间和重复周期。

```kotlin
///获取
CreekManager.sInstance.getStanding({model: Standing.protocol_standing_remind_inquire_reply ->
    responseText.value = model.toString()
}, failure = {_, m ->
    responseText.value = m
})

///设置
var  operate =  Standing.protocol_standing_remind_operate()
var standing =  Standing.protocol_standing_remind_set()
///Just set the switch  other attributes do not need to be set
standing.switchFlag = true
operate.standingRemind = standing
CreekManager.sInstance.setStanding(model = operate, success = {
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

enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;//查询
    SET = 2;//设置
}

enum notify_type
{
    ALLOW = 0;//允许通知
    SILENT = 1;//静默通知
    CLOSE = 2;//关闭通知
}

message protocol_standing_remind_set
{
    bool switch_flag = 1; //1bytes 站立提醒开关 true 开启,false 关闭
    notify_type notify_flag = 2;//1bytes 通知类型
    uint32 start_hour = 3; //提醒开始时间
    uint32 start_minute = 4;
    uint32 end_hour = 5;   //提醒结束时间
    uint32 end_minute = 6;
    repeated bool repeat = 7; //1bytes 重复周期 周一~周日
}

message protocol_standing_remind_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    protocol_standing_remind_set standing_remind = 2;
}

message protocol_standing_remind_inquire_reply
{
    uint32 func_table = 1;//1bytes 功能表
    operate_type operate = 2; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    protocol_standing_remind_set standing_remind = 3;
}
```
