---
docId: flutter-sos
locale: en-US
title: "Flutter Emergency Contacts (SOS)"
description: "Read and configure emergency contacts."
platform: Flutter
slug: flutter/sos
order: 109
status: published
version: v2.0
---

# Flutter Emergency Contacts (SOS)

Read and configure emergency contacts.

## SDK Usage

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

## Protobuf Data Model

```protobuf
syntax = "proto3";
import "common.proto";

message protocol_emergency_contacts_item {
    bytes phone_number = 1; // max:32 Contact phone number
    bytes contact_name = 2; // max:64 Contact name
}

message protocol_emergency_contacts_operate {
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    repeated protocol_emergency_contacts_item contacts_item = 2; // max:20 Emergency contact information
}

message protocol_emergency_contacts_inquire_reply {
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    uint32 emergency_contacts_support_max = 2; // 1bytes Maximum number of supported emergency contacts
    repeated protocol_emergency_contacts_item contacts_item = 3; // max:20 Emergency contact information
}
```

### Field Reference

#### `protocol_emergency_contacts_item`

| Field | Type | Description |
| --- | --- | --- |
| `phone_number` | `bytes` | max:32 Contact phone number |
| `contact_name` | `bytes` | max:64 Contact name |

#### `protocol_emergency_contacts_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes Operation type 0: Invalid operation 1: Query 2: Set |
| `contacts_item` | `repeated protocol_emergency_contacts_item` | max:20 Emergency contact information |

#### `protocol_emergency_contacts_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes Operation type 0: Invalid operation 1: Query 2: Set |
| `emergency_contacts_support_max` | `uint32` | 1bytes Maximum number of supported emergency contacts |
| `contacts_item` | `repeated protocol_emergency_contacts_item` | max:20 Emergency contact information |
