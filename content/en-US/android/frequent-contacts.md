---
docId: android-frequent-contacts
locale: en-US
title: Android Frequent Contacts
description: Read and configure frequent contacts on the device.
platform: Android
slug: android/frequent-contacts
order: 108
status: published
version: v2.0
---

# Android Frequent Contacts

Read and configure frequent contacts on the device.

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

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

message protocol_frequent_contacts_item
{
    bytes phone_number = 1; // max:32 ContactPhone number
    bytes contact_name = 2; // Contact Name. max:64.
}

message protocol_frequent_contacts_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    repeated protocol_frequent_contacts_item contacts_item = 2;// Contacts Item. max:20.
}

message protocol_frequent_contacts_inquire_reply
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    uint32 frequent_contacts_support_max = 2; // 1bytes Frequent contactsSupportedShownMaximum count
    repeated protocol_frequent_contacts_item contacts_item = 3;// Contacts Item. max:20.
    uint32 func_table = 4;// Function table
    uint32 contact_icon_width = 5;// Contact Icon Width.
    uint32 contact_icon_height = 6;// Contact Icon Height.
}
```

### `func_table` Bit Definitions

| Bit | Description |
| - | - |
| 0 | Whether contact-avatar delivery is supported |
| 1 | Whether contact-avatar compression is supported |
| 2 | Whether contact-avatar display is supported show_icon |
