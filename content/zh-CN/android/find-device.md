---
docId: android-find-device
locale: zh-CN
title: Android 寻找手表
description: 触发或停止寻找设备。
platform: Android
slug: android/find-device
order: 129
status: published
version: v2.0
---

# Android 寻找手表

触发或停止寻找设备。

```kotlin
///Start looking for a watch
val operate  =  Findphone.protocol_find_phone_watch_operate()
operate.findWatchSwitch = true
operate.findWatchFlag = true

CreekManager.sInstance.setFindPhoneWatch(model = operate, success = {

}, failure = {_,_ ->

})

///end looking for a watch
val operate  =  Findphone.protocol_find_phone_watch_operate()
operate.findWatchSwitch = true
operate.findWatchFlag = false

CreekManager.sInstance.setFindPhoneWatch(model = operate, success = {

}, failure = {_,_ ->

})
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";

message protocol_find_phone_watch_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool find_watch_switch = 2;//1bytes 寻找手表开关 true 开启,false 关闭
    bool find_watch_flag = 3;//1bytes 寻找手表 0 停止 1:开始
    bool find_phone_close_flag = 4;//1bytes 寻找手机关闭 1关闭
}

message protocol_find_phone_watch_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 func_table = 2;
    bool find_watch_switch = 3;//1bytes 寻找手表开关 true 开启,false 关闭
    bool find_watch_support = 4;//是否支持寻找手表
}
```
