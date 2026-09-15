---
docId: android-volume
locale: zh-CN
title: Android 音量
description: 读取并设置设备铃声音量。
platform: Android
slug: android/volume
order: 141
status: published
version: v2.0
---

# Android 音量

读取并设置设备铃声音量。

```kotlin
//获取音量大小
CreekManager.sInstance.getVolumeAdjust(model = {model->
    println(model.toString())
}, failure = {c, d ->
    println("errCode: $c, errDesc: $d")
})
```

```kotlin
// 设置音量大小，最大设置是100， 最小设置 0
// 测试数据45，
val volumeOperate = VolumeAdjust.protocol_volume_adjust_operate()
volumeOperate.ringtoneVolume = 45;
CreekManager.sInstance.setVolumeAdjust(model = volumeOperate, success = {
    println("set volume success")
}, failure = {c, d ->
    println("errCode: $c, errDesc: $d")
})
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";

message protocol_volume_adjust_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 ringtone_volume = 2;//铃声音量 0~100
}

message protocol_volume_adjust_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 func_table = 2;//1bytes 功能表
    uint32 ringtone_volume = 3;//铃声音量 0~100
}
```
