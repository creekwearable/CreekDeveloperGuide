---
docId: ios-contacts
locale: zh-CN
title: iOS 常用联系人
description: 读取和设置设备常用联系人。
platform: iOS
slug: ios/contacts
order: 108
status: published
version: v2.0
---

# iOS 常用联系人

## 功能说明

读取和设置设备常用联系人。

## Swift 示例

```swift
///获取
CreekInterFace.instance.getContacts { model in
       
} failure: { code, message in
               
}

///设置
var data =  protocol_frequent_contacts_operate()
var item =  protocol_frequent_contacts_item()
item.phoneNumber = "12345678912".data(using: .utf8)!
item.contactName = "bean".data(using: .utf8)!
data.contactsItem.append(item)
CreekInterFace.instance.setContacts(model: data) {
               
} failure: { code, message in
               
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
    function_table frequent_contacts = 13;//常用联系人能力。
}
```

## Protobuf 数据模型

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
