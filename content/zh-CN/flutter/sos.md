---
docId: flutter-sos
locale: zh-CN
title: "Flutter 紧急联系人（SOS）"
description: "读取并配置紧急联系人。"
platform: Flutter
slug: flutter/sos
order: 109
status: published
version: v2.0
---

# Flutter 紧急联系人（SOS）

读取并配置紧急联系人。

## 接口示例

```dart
// Get SOS contacts
 sdkManager.getContactsSOS(callBack: (e) {
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
}, errCallBack: (e) {
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});

    // Set SOS contacts
protocol_emergency_contacts_operate operate =  protocol_emergency_contacts_operate();
protocol_emergency_contacts_item item = protocol_emergency_contacts_item();
item.phoneNumber =  utf8.encode("12345678912");
item.contactName =  utf8.encode("bean");
operate.contactsItem.add(item);
sdkManager.setContactsSOS(operate: operate,callBack: (){

},errCallBack: (e){

});
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";
import "common.proto";

message protocol_emergency_contacts_item {
    bytes phone_number = 1; // max:32 联系人电话号码
    bytes contact_name = 2; // max:64 联系人名字
}

message protocol_emergency_contacts_operate {
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    repeated protocol_emergency_contacts_item contacts_item = 2; // max:20 紧急联系人信息
}

message protocol_emergency_contacts_inquire_reply {
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 emergency_contacts_support_max = 2; // 1bytes 紧急联系人支持显示最大数量
    repeated protocol_emergency_contacts_item contacts_item = 3; // max:20 紧急联系人信息
}
```

### 字段说明

#### `protocol_emergency_contacts_item`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `phone_number` | `bytes` | max:32 联系人电话号码 |
| `contact_name` | `bytes` | max:64 联系人名字 |

#### `protocol_emergency_contacts_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `contacts_item` | `repeated protocol_emergency_contacts_item` | max:20 紧急联系人信息 |

#### `protocol_emergency_contacts_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `emergency_contacts_support_max` | `uint32` | 1bytes 紧急联系人支持显示最大数量 |
| `contacts_item` | `repeated protocol_emergency_contacts_item` | max:20 紧急联系人信息 |
