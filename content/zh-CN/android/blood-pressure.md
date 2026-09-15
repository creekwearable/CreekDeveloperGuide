---
docId: android-blood-pressure
locale: zh-CN
title: Android 血压
description: 读取设备血压数据。
platform: Android
slug: android/blood-pressure
order: 139
status: published
version: v2.0
---

# Android 血压

读取设备血压数据。

```kotlin
// 获取血压数据
CreekManager.sInstance.getBloodPressure(model = {model ->
    println(model.toString())
}, failure = { c,d ->
    println("errCode: $c, errDesc: $d")
})
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";
 
enum operate_blood_pressure_type
{
    INVALID = 0;
    INQUIRE = 1; //查询
}
 
message protocol_blood_pressure_item
{
    uint32 year = 1;
    uint32 month = 2;
    uint32 day = 3;
    uint32 hour = 4;
    uint32 minute = 5;
    uint32 second = 6;
    uint32 pluse = 7;//脉搏
    uint32 spb = 8;//收缩压
    uint32 dbp = 9;//舒张压
};
 
message protocol_blood_pressure_operate
{
    operate_blood_pressure_type operate = 1; //1bytes 操作类型 
    uint32 page_index = 2;//当前多少页，用于分段传输。
    uint32 page_num = 3;//当前页传输多少条数据，用于分段传输。
}
 
message protocol_blood_pressure_inquire_reply
{
    operate_blood_pressure_type operate = 1;     //1bytes操作类型
    uint32 func_table = 2;        //1bytes 功能表
    uint32 blood_pressure_record_support_max = 3; //1bytes 血压记录最大数量
    uint32 page_index = 4;//当前多少页，用于分段传输。
    uint32 page_num = 5;//当前页传输多少条数据，用于分段传输。
    repeated protocol_blood_pressure_item bp_items = 6;
}
```
