---
docId: android-sos-contacts
locale: en-US
title: Android Emergency Contacts (SOS)
description: Configure SOS emergency contacts for the device.
platform: Android
slug: android/sos-contacts
order: 109
status: published
version: v2.0
---

# Android Emergency Contacts (SOS)

Configure SOS emergency contacts for the device.

```kotlin
CreekManager.sInstance.getContactsSOS( {model: Contactssos.protocol_emergency_contacts_inquire_reply ->  
    
}, failure = {
    _,_ ->
})

var model = Contactssos.protocol_emergency_contacts_operate()
var item = Contactssos.protocol_emergency_contacts_item()
item.phoneNumber = ByteString.copyFrom("12345678912".toByteArray())
item.contactName = ByteString.copyFrom("bean".toByteArray())
model.addContactsItem(item)

CreekManager.sInstance.setContactsSOS(model = model,{

}, failure = {
    _,_ ->
})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";
import "common.proto";

message protocol_emergency_contacts_item
{
    bytes phone_number = 1; // max:32 ContactPhone number
    bytes contact_name = 2; // Contact Name. max:64.
}

message protocol_emergency_contacts_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    repeated protocol_emergency_contacts_item contacts_item = 2;// Contacts Item. max:20.
}

message protocol_emergency_contacts_inquire_reply
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    uint32 emergency_contacts_support_max = 2; // 1bytes Emergency contactSupportedShownMaximum count
    repeated protocol_emergency_contacts_item contacts_item = 3;// Contacts Item. max:20.
}
```
