---
docId: android-find-device
locale: en-US
title: Android Find Device
description: Start or stop device finding.
platform: Android
slug: android/find-device
order: 129
status: published
version: v2.0
---

# Android Find Device

Start or stop device finding.

```kotlin
// /Start looking for a watch
val operate  =  Findphone.protocol_find_phone_watch_operate()
operate.findWatchSwitch = true
operate.findWatchFlag = true

CreekManager.sInstance.setFindPhoneWatch(model = operate, success = {

}, failure = {_,_ ->

})

// /end looking for a watch
val operate  =  Findphone.protocol_find_phone_watch_operate()
operate.findWatchSwitch = true
operate.findWatchFlag = false

CreekManager.sInstance.setFindPhoneWatch(model = operate, success = {

}, failure = {_,_ ->

})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

message protocol_find_phone_watch_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    bool find_watch_switch = 2;// 1bytes Find watchSwitch true On,false Off
    bool find_watch_flag = 3;// Find Watch Flag. 1bytes.
    bool find_phone_close_flag = 4;// Find Phone Close Flag. 1bytes.
}

message protocol_find_phone_watch_inquire_reply
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    uint32 func_table = 2;
    bool find_watch_switch = 3;// 1bytes Find watchSwitch true On,false Off
    bool find_watch_support = 4;// Whether supportedFind watch
}
```
