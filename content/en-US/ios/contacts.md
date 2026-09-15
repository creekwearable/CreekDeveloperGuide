---
docId: ios-contacts
locale: en-US
title: iOS Frequent Contacts
description: Read and configure frequent contacts on the device.
platform: iOS
slug: ios/contacts
order: 108
status: published
version: v2.0
---

# iOS Frequent Contacts

## Overview

Read and configure frequent contacts on the device.

## Swift example

```swift
// Get frequent contacts.
CreekInterFace.instance.getContacts { model in
       
} failure: { code, message in
               
}

// Set frequent contacts.
var data =  protocol_frequent_contacts_operate()
var item =  protocol_frequent_contacts_item()
item.phoneNumber = "12345678912".data(using: .utf8)!
item.contactName = "bean".data(using: .utf8)!
data.contactsItem.append(item)
CreekInterFace.instance.setContacts(model: data) {
               
} failure: { code, message in
               
}
```

## Capability-table fields

Check these fields after reading `protocol_function_table`:

```protobuf
message function_table {
    bool is_support = 1;//Whether the capability is supported.
    uint32 cmd_id = 2;//Capability command identifier.
}

message protocol_function_table {
    function_table frequent_contacts = 13;//Frequent-contacts capability.
}
```

## Protobuf data model

```protobuf
syntax = "proto3";

message protocol_frequent_contacts_item
{
    bytes phone_number = 1; // Phone number, up to 32 bytes
    bytes contact_name = 2; // Contact name, up to 64 bytes
}

message protocol_frequent_contacts_operate
{
    operate_type operate = 1; // Operation: 0 invalid, 1 query, 2 set
    repeated protocol_frequent_contacts_item contacts_item = 2;// Frequent contacts, up to 20 entries
}

message protocol_frequent_contacts_inquire_reply
{
    operate_type operate = 1; // Operation: 0 invalid, 1 query, 2 set
    uint32 frequent_contacts_support_max = 2; // Maximum supported frequent contacts; 1 byte
    repeated protocol_frequent_contacts_item contacts_item = 3;// Frequent contacts returned by the device, up to 20 entries
    uint32 func_table = 4;// Contact capability bit field
    uint32 contact_icon_width = 5;// Contact-avatar width in pixels
    uint32 contact_icon_height = 6;// Contact-avatar height in pixels
}
```
