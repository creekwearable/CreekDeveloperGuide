---
docId: android-frequent-contacts
locale: zh-CN
title: Android 常用联系人
description: 读取并设置设备常用联系人。
platform: Android
slug: android/frequent-contacts
order: 108
status: published
version: v2.0
---

# Android 常用联系人

读取并设置设备常用联系人。

```kotlin
CreekManager.sInstance.getContacts({ model: Contacts.protocol_frequent_contacts_inquire_reply ->
    
}, failure = { _, m ->
    
})

var model = Contacts.protocol_frequent_contacts_operate()
var item = Contacts.protocol_frequent_contacts_item()
item.phoneNumber = ByteString.copyFrom("12345678912".toByteArray())
item.contactName = ByteString.copyFrom("bean".toByteArray())
model.addContactsItem(item)
CreekManager.sInstance.setContacts(model = model, {
  
}, failure = { _, m ->
    
})
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";

message protocol_frequent_contacts_item
{
    bytes phone_number = 1; //max:32 联系人电话号码
    bytes contact_name = 2; //max:64 联系人名字
}

message protocol_frequent_contacts_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    repeated protocol_frequent_contacts_item contacts_item = 2;//max:20 常用联系人信息
}

message protocol_frequent_contacts_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 frequent_contacts_support_max = 2; //1bytes 常用联系人支持显示最大数量
    repeated protocol_frequent_contacts_item contacts_item = 3;//max:20 常用联系人信息
    uint32 func_table = 4;//功能表
    uint32 contact_icon_width = 5;//联系人图片宽度
    uint32 contact_icon_height = 6;//联系人图片高度
}
```

### `func_table` 位说明

| bit位 | 说明 |
|-|-|
| 0 | 是否支持联系人头像下发 |
| 1 | 是否支持联系人头像压缩 |
| 2 |  是否支持联系人头像显示 show_icon |
