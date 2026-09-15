---
docId: flutter-frequent-contacts
locale: zh-CN
title: "Flutter 常用联系人"
description: "读取并替换常用联系人列表。"
platform: Flutter
slug: flutter/frequent-contacts
order: 108
status: published
version: v2.0
---

# Flutter 常用联系人

读取并替换常用联系人列表。

## 接口示例

```dart
/// Retrieve
sdkManager.getContacts(callBack: (e) {
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
}, errCallBack: (e) {
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});

/// Set
protocol_frequent_contacts_operate operate =  protocol_frequent_contacts_operate();
protocol_frequent_contacts_item item = protocol_frequent_contacts_item();
item.phoneNumber =  utf8.encode("12345678912");
item.contactName =  utf8.encode("bean");
operate.contactsItem.add(item);
sdkManager.setContacts(operate: operate,callBack: (){

},errCallBack: (e){

});
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

message protocol_frequent_contacts_item
{
    bytes phone_number = 1; // max:32 联系人电话号码
    bytes contact_name = 2; // max:64 联系人名字
}

message protocol_frequent_contacts_operate
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    repeated protocol_frequent_contacts_item contacts_item = 2; // max:20 常用联系人信息
}

message protocol_frequent_contacts_inquire_reply
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 frequent_contacts_support_max = 2; // 1bytes 常用联系人支持显示最大数量
    repeated protocol_frequent_contacts_item contacts_item = 3; // max:20 常用联系人信息
    uint32 func_table = 4; // 功能表
    uint32 contact_icon_width = 5; // 联系人图片宽度
    uint32 contact_icon_height = 6; // 联系人图片高度
}
```

### 字段说明

#### `protocol_frequent_contacts_item`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `phone_number` | `bytes` | max:32 联系人电话号码 |
| `contact_name` | `bytes` | max:64 联系人名字 |

#### `protocol_frequent_contacts_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `contacts_item` | `repeated protocol_frequent_contacts_item` | max:20 常用联系人信息 |

#### `protocol_frequent_contacts_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `frequent_contacts_support_max` | `uint32` | 1bytes 常用联系人支持显示最大数量 |
| `contacts_item` | `repeated protocol_frequent_contacts_item` | max:20 常用联系人信息 |
| `func_table` | `uint32` | 功能表 |
| `contact_icon_width` | `uint32` | 联系人图片宽度 |
| `contact_icon_height` | `uint32` | 联系人图片高度 |

### `func_table` 功能位

| bit位 | 说明 |
| - | - |
| 0 | 是否支持联系人头像设置 |
| 1 | 是否支持联系人头像压缩 |
| 2 | 是否支持联系人头像显示 show_icon |
