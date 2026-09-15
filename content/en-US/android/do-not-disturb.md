---
docId: android-do-not-disturb
locale: en-US
title: Android Do Not Disturb
description: Read and configure Do Not Disturb settings.
platform: Android
slug: android/do-not-disturb
order: 107
status: published
version: v2.0
---

# Android Do Not Disturb

Read and configure Do Not Disturb settings.

```kotlin
CreekManager.sInstance.getDisturb({ model: Disturb.protocol_disturb_inquire_reply ->
   }, failure = { _, m ->
   
})

var model = Disturb.protocol_disturb_operate()
model.disturbOnOff = true
CreekManager.sInstance.setDisturb(model = model, {
   
}, failure = { _, m ->
    
})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;// Query
    SET = 2;// Set
}

enum switch_type
{
    SWITCH_NULL = 0;// NULL
    SWITCH_ON = 1;// On
    SWITCH_OFF = 2;// Off
}

message protocol_set_disturb_item
{
    uint32 disturb_id = 1;// Disturb Id. 1bytes.
    uint32 start_hour = 2; // 1bytes StartTime
    uint32 start_minute = 3;// 1bytes
    uint32 end_hour = 4;// 1bytes EndTime
    uint32 end_minute = 5; // 1bytes
    repeated bool repeat = 6; // 7bytes Repeat Monday through Sunday
    bool switch_flag = 7;// 1bytes Switch
};

message protocol_disturb_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    uint32 num = 2;  // 1bytes Do Not DisturbCount
    bool disturb_on_off = 3;  // Disturb On Off switch. 1bytes.
    repeated protocol_set_disturb_item disturb_item = 4;// max: 5
    switch_type disturb_switch = 5;  // Disturb Switch switch. 1bytes.
}

message protocol_disturb_inquire_reply
{
    uint32 func_table = 1;// 1bytes Function table
    uint32 disturb_max = 2; // Number of disturb max. 1bytes.
    operate_type operate = 3; // 1bytesOperation type 0: Invalid operation 1: Query 2: Set
    uint32 num = 4;  // Number of num. 1bytes.
    bool disturb_on_off = 5;  // Disturb On Off switch. 1bytes.
    repeated protocol_set_disturb_item disturb_item = 6;// max: 5
    switch_type disturb_switch = 7;  // Disturb Switch switch. 1bytes.
}
```
