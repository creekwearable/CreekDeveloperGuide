---
docId: android-sos-contacts
locale: zh-CN
title: Android 紧急联系人（SOS）
description: 配置设备 SOS 紧急联系人。
platform: Android
slug: android/sos-contacts
order: 109
status: published
version: v2.0
---

# Android 紧急联系人（SOS）

配置设备 SOS 紧急联系人。

紧急联系人设置会根据功能表、快捷键等前置条件进行组合判断设置联系人

```kotlin
CreekManager.sInstance.getContactsSOS( {model: Contactssos.protocol_emergency_contacts_inquire_reply ->  
    
}, failure = {
    _,_ ->
})

var model = Contactssos.protocol_emergency_contacts_operate()
var item = Contactssos.protocol_emergency_contacts_item()
item.phoneNumber = ByteString.copyFrom("12345678912".toByteArray())
item.contactName = ByteString.copyFrom("bean".toByteArray())
model.addContactsItem(item)

CreekManager.sInstance.setContactsSOS(model = model,{

}, failure = {
    _,_ ->
})
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";
import "common.proto";

message protocol_emergency_contacts_item
{
    bytes phone_number = 1; //max:32 联系人电话号码
    bytes contact_name = 2; //max:64 联系人名字
}

message protocol_emergency_contacts_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    repeated protocol_emergency_contacts_item contacts_item = 2;//max:20 紧急联系人信息
}

message protocol_emergency_contacts_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 emergency_contacts_support_max = 2; //1bytes 紧急联系人支持显示最大数量
    repeated protocol_emergency_contacts_item contacts_item = 3;//max:20 紧急联系人信息
}
```
