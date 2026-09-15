---
docId: ios-emergency-contacts
locale: zh-CN
title: iOS 紧急联系人（SOS）
description: 配置 SOS 紧急联系人；设置前应先检查功能表和快捷键能力。
platform: iOS
slug: ios/emergency-contacts
order: 109
status: published
version: v2.0
---

# iOS 紧急联系人（SOS）

## 功能说明

配置 SOS 紧急联系人；设置前应先检查功能表和快捷键能力。

### 使用要点

紧急联系人设置会根据功能表、快捷键等前置条件进行组合判断设置联系人

## Swift 示例

```swift
///先获取功能表 调用看功能表指令
// button_crown;//按键快捷操作
// model.buttonCrown.isSupport == true  //true 支持  false不支持

///如果支持的话，
// 第一步：就要先设置快捷键（详看基础指令中快捷键）（图1）
// 第二步：设置联系人（图2）
// 第三步：长按按钮2秒中手表就会出现（图3）

///如果不支持的话，说明手表自带长按2秒的功能，就不用设置快捷键了
// 第一步：设置联系人（图2）
// 第二步：实际看手表的设计，哪个按钮是控制SOS的

//获取联系人
CreekInterFace.instance.getContactsSOS(model: { model in
                
}) { code, message in
                
}

//设置联系人
var data =  protocol_emergency_contacts_operate()
var item =  protocol_emergency_contacts_item()
item.phoneNumber = "12345678912".data(using: .utf8)!
item.contactName = "bean".data(using: .utf8)!
data.contactsItem.append(item)
CreekInterFace.instance.setContactsSOS(model: data) {
                
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
    function_table emergency_contacts = 17;//紧急联系人（SOS）能力。
}
```

## Protobuf 数据模型

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
