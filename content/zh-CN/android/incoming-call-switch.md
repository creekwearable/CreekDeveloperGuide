---
docId: android-incoming-call-switch
locale: zh-CN
title: Android 来电提醒开关
description: 读取并配置来电提醒开关。
platform: Android
slug: android/incoming-call-switch
order: 117
status: published
version: v2.0
---

# Android 来电提醒开关

读取并配置来电提醒开关。

```kotlin
///获取来电提醒
CreekManager.sInstance.getCall({ model: Call.protocol_call_switch_inquire_reply ->
    textView.text = model.toString()
}, failure = { _, m ->
    textView.text = m
})

///设置来电提醒
var model = Call.protocol_call_switch()
model.callSwitch = true
model.callDelay = 5
CreekManager.sInstance.setCall(model = model, {
    textView.text = "success"
}, failure = { _, m ->
    textView.text = m
})
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";

enum call_status
{
    RECEIVED_CALL = 0;//来电已接
    REJECT_CALL = 1;//来电已拒
}

enum tran_direction_type
{
    WATCH_TRAN = 0;//手表发起
    APP_TRAN = 1;//app发起
}

//来电配置
message protocol_call_switch
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool call_switch = 2; //1bytes 来电开关 true 开启 false 关闭
    uint32 call_delay = 3;//1bytes 来电延时 单位秒
}

message protocol_call_switch_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool call_switch = 2; //1bytes 来电开关 true 开启 false 关闭
    uint32 call_delay = 3;//1bytes 来电延时 单位秒
}

//来电提醒
message protocol_call_remind
{
    bytes contact_name = 1; // max:64 联系人名字
    bytes phone_number = 2; // max:32 电话号码
}

//来电状态
message protocol_call_remind_status
{
    tran_direction_type tran_type = 1;//传输方向
    call_status status = 2;//1bytes 来电状态
}
```
