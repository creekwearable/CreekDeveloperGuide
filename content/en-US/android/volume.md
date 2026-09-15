---
docId: android-volume
locale: en-US
title: Android Volume
description: Read and configure device ringtone volume.
platform: Android
slug: android/volume
order: 141
status: published
version: v2.0
---

# Android Volume

Read and configure device ringtone volume.

```kotlin
CreekManager.sInstance.getVolumeAdjust(model = {model->
    println(model.toString())
}, failure = {c, d ->
    println("errCode: $c, errDesc: $d")
})
```

```kotlin
val volumeOperate = VolumeAdjust.protocol_volume_adjust_operate()
volumeOperate.ringtoneVolume = 45;
CreekManager.sInstance.setVolumeAdjust(model = volumeOperate, success = {
    println("set volume success")
}, failure = {c, d ->
    println("errCode: $c, errDesc: $d")
})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

message protocol_volume_adjust_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    uint32 ringtone_volume = 2;// Ringtone Volume.
}

message protocol_volume_adjust_inquire_reply
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    uint32 func_table = 2;// 1bytes Function table
    uint32 ringtone_volume = 3;// Ringtone Volume.
}
```
