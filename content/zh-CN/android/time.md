---
docId: android-time
locale: zh-CN
title: Android 时间
description: 同步手机时间并读取设备当前时间。
platform: Android
slug: android/time
order: 102
status: published
version: v2.0
---

# Android 时间

同步手机时间并读取设备当前时间。

```kotlin
CreekManager.sInstance.syncTime(success = {
    textView.text = "success"
}, failure = { _, m ->
    textView.text = m
})

CreekManager.sInstance.getTime({ model: Time.protocol_device_time_inquire_reply ->
   
}, failure = { _, m ->
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;//查询
    SET = 2;//设置
}

message protocol_time
{
    uint32 year = 1; //2bytes
    uint32 month = 2;//1bytes
    uint32 day = 3;//1bytes
    uint32 hour = 4;//1bytes
    uint32 minute = 5;//1bytes
    uint32 second = 6;//1bytes
    uint32 week = 7;//1bytes 0~6 星期一~星期日
    uint32 utc_time = 8;//4bytes
    uint32 time_zone = 9; //4bytes 用24时区的，手机端的获取时区是整数，0-12东，13-24西 单位分钟，例如东八区：8*60 
};

message protocol_device_time_operate
{
    operate_type operate = 1; //操作类型 0：无效操作 1：查询 2：设置
    protocol_time time = 2;
}

message protocol_device_time_inquire_reply
{
    operate_type operate = 1; //操作类型 0：无效操作 1：查询 2：设置
    protocol_time time = 2;
}
```
