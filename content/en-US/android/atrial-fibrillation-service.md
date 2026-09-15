---
docId: android-atrial-fibrillation-service
locale: en-US
title: Android Atrial Fibrillation Service Switch
description: Read and configure the custom atrial-fibrillation service switch.
platform: Android
slug: android/atrial-fibrillation-service
order: 149
status: published
version: v2.0
---

# Android Atrial Fibrillation Service Switch

Read and configure the custom atrial-fibrillation service switch.

```kotlin
CreekManager.sInstance.getAfServer({ model: AfServeSwitch.protocol_custom_yuwell_af_inquire_reply ->
    responseText.value = model.toString()
}, failure = { _, m ->
    responseText.value = m
})

val operate = AfServeSwitch.protocol_custom_yuwell_af_operate()
operate.afSwitch = Enums.switch_type.SWITCH_ON
CreekManager.sInstance.setAfServer(model = operate, success = {
    responseText.value = "success"
}, failure = { _,m ->
    responseText.value = m
})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

message protocol_custom_yuwell_af_operate 
{ 
   operate_type operate = 1;     // Operation type
   switch_type switch = 2;       // Switch
}
message protocol_custom_yuwell_af_inquire_reply
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    switch_type
     switch = 2;   // Switch
}
```
