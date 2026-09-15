---
docId: android-atrial-fibrillation-service
locale: zh-CN
title: Android 房颤服务开关
description: 读取并设置定制房颤服务开关。
platform: Android
slug: android/atrial-fibrillation-service
order: 149
status: published
version: v2.0
---

# Android 房颤服务开关

读取并设置定制房颤服务开关。

```kotlin
CreekManager.sInstance.getAfServer({ model: AfServeSwitch.protocol_custom_yuwell_af_inquire_reply ->
    responseText.value = model.toString()
}, failure = { _, m ->
    responseText.value = m
})

val operate = AfServeSwitch.protocol_custom_yuwell_af_operate()
operate.afSwitch = Enums.switch_type.SWITCH_ON
CreekManager.sInstance.setAfServer(model = operate, success = {
    responseText.value = "success"
}, failure = { _,m ->
    responseText.value = m
})
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";

message protocol_custom_yuwell_af_operate 
{ 
   operate_type operate = 1;     //操作类型
   switch_type switch = 2;       //开关
}
message protocol_custom_yuwell_af_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    switch_type
     switch = 2;   //开关
}
```
