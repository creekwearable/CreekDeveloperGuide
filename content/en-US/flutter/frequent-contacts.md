---
docId: flutter-frequent-contacts
locale: en-US
title: "Flutter Frequent Contacts"
description: "Read and replace the frequent-contact list."
platform: Flutter
slug: flutter/frequent-contacts
order: 108
status: published
version: v2.0
---

# Flutter Frequent Contacts

Read and replace the frequent-contact list.

## SDK Usage

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

## Protobuf Data Model

```protobuf
syntax = "proto3";

message protocol_frequent_contacts_item
{
    bytes phone_number = 1; // max:32 Contact's phone number
    bytes contact_name = 2; // max:64 Contact's name
}

message protocol_frequent_contacts_operate
{
    operate_type operate = 1; // 1byte Operation type: 0: Invalid operation, 1: Query, 2: Set
    repeated protocol_frequent_contacts_item contacts_item = 2;// max:20 Frequent contact information
}

message protocol_frequent_contacts_inquire_reply
{
    operate_type operate = 1; // 1byte Operation type: 0: Invalid operation, 1: Query, 2: Set
    uint32 frequent_contacts_support_max = 2; // 1byte Maximum number of supported frequent contacts
    repeated protocol_frequent_contacts_item contacts_item = 3;// max:20 Frequent contact information
    uint32 func_table = 4;// Function table
    uint32 contact_icon_width = 5;// Contact image width
    uint32 contact_icon_height = 6;// Contact image height
}
```

### Field Reference

#### `protocol_frequent_contacts_item`

| Field | Type | Description |
| --- | --- | --- |
| `phone_number` | `bytes` | max:32 Contact's phone number |
| `contact_name` | `bytes` | max:64 Contact's name |

#### `protocol_frequent_contacts_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1byte Operation type: 0: Invalid operation, 1: Query, 2: Set |
| `contacts_item` | `repeated protocol_frequent_contacts_item` | max:20 Frequent contact information |

#### `protocol_frequent_contacts_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1byte Operation type: 0: Invalid operation, 1: Query, 2: Set |
| `frequent_contacts_support_max` | `uint32` | 1byte Maximum number of supported frequent contacts |
| `contacts_item` | `repeated protocol_frequent_contacts_item` | max:20 Frequent contact information |
| `func_table` | `uint32` | Function table |
| `contact_icon_width` | `uint32` | Contact image width |
| `contact_icon_height` | `uint32` | Contact image height |

### `func_table` Capability Bits

| Bit | Description |
| - | - |
| 0 | Supports contact-avatar delivery. |
| 1 | Supports contact-avatar compression. |
| 2 | Supports contact-avatar display through `show_icon`. |
