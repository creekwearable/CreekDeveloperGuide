---
docId: android-device-status
locale: zh-CN
title: Android 设备状态
description: 查询设备运动等运行状态。
platform: Android
slug: android/device-status
order: 144
status: published
version: v2.0
---

# Android 设备状态

查询设备运动等运行状态。

```kotlin
CreekManager.sInstance.getDeviceStatus(type = Enums.device_status_type.sport_status,{ model ->
    if(model.value == 1){
        println("运动中")
    }else{
        println("未运动")
    }
   
}, failure = { _, m ->

})
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";

enum device_status_type
{
    sport_status = 0;//运动状态
}

message protocol_device_status_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    device_status_type status_type = 2;//设备状态类型
}
 
message protocol_device_status_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    device_status_type status_type = 2;//设备状态类型
    uint32 value = 3;
}
```
