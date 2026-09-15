---
docId: ios-emergency-contacts
locale: en-US
title: iOS Emergency Contacts (SOS)
description: Configure SOS contacts after checking the capability table and shortcut support.
platform: iOS
slug: ios/emergency-contacts
order: 109
status: published
version: v2.0
---

# iOS Emergency Contacts (SOS)

## Overview

Configure SOS contacts after checking the capability table and shortcut support.

## Swift example

```swift
// Read the capability table first.
// Check button_crown before configuring SOS.
// model.buttonCrown.isSupport == true means shortcut configuration is available.

// If shortcuts are supported, configure the shortcut first, then the SOS contact.
// Otherwise, configure the contact and use the device's built-in SOS control.

// Devices without shortcut support use their built-in two-second SOS control.

// Get SOS contacts.
CreekInterFace.instance.getContactsSOS(model: { model in
                
}) { code, message in
                
}

// set
var data =  protocol_emergency_contacts_operate()
var item =  protocol_emergency_contacts_item()
item.phoneNumber = "12345678912".data(using: .utf8)!
item.contactName = "bean".data(using: .utf8)!
data.contactsItem.append(item)
CreekInterFace.instance.setContactsSOS(model: data) {
                
} failure: { code, message in
                
}
```

## Capability-table fields

Check these fields after reading `protocol_function_table`:

```protobuf
message function_table {
    bool is_support = 1;// Whether the capability is supported.
    uint32 cmd_id = 2;// Capability command identifier.
}

message protocol_function_table {
    function_table emergency_contacts = 17;// Emergency-contact (SOS) capability.
}
```

## Protobuf data model

```protobuf
syntax = "proto3";
import "common.proto";

message protocol_emergency_contacts_item
{
    bytes phone_number = 1; // Phone number, up to 32 bytes
    bytes contact_name = 2; // Contact name, up to 64 bytes
}

message protocol_emergency_contacts_operate
{
    operate_type operate = 1; // Operation: 0 invalid, 1 query, 2 set
    repeated protocol_emergency_contacts_item contacts_item = 2;// Emergency contacts, up to 20 entries
}

message protocol_emergency_contacts_inquire_reply
{
    operate_type operate = 1; // Operation: 0 invalid, 1 query, 2 set
    uint32 emergency_contacts_support_max = 2; // Maximum supported emergency contacts; 1 byte
    repeated protocol_emergency_contacts_item contacts_item = 3;// Emergency contacts returned by the device, up to 20 entries
}
```
