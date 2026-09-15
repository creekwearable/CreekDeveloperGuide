---
docId: android-health-snapshot
locale: zh-CN
title: Android 健康快照
description: 读取并配置健康快照测量项目。
platform: Android
slug: android/health-snapshot
order: 131
status: published
version: v2.0
---

# Android 健康快照

读取并配置健康快照测量项目。

```kotlin
CreekManager.sInstance.getHealthSnapshotList(page = 1, size = 20, model = {
    
}, failure = {
    code, message ->  
})
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";
 
enum operate_health_snap_type
{
    INVALID = 0;
    INQUIRE = 1; //查询
}
 
message protocol_health_snap_item
{
    uint32 year = 1;
    uint32 month = 2;
    uint32 day = 3;
    uint32 hour = 4;
    uint32 minute = 5;
    uint32 second = 6;
    uint32 hr_value = 7;
    uint32 spo2_value = 8;
    uint32 hrv_value = 9;
    uint32 rr_value = 10; //respiratory rate
    uint32 stress_value = 11;
};
 
message protocol_health_snap_operate
{
    operate_health_snap_type operate = 1; //1bytes 操作类型 
    uint32 page_index = 2;//当前多少页，用于分段传输。
    uint32 page_num = 3;//当前页传输多少条数据，用于分段传输。
}
 
message protocol_health_snap_inquire_reply
{
    operate_health_snap_type operate = 1;     //1bytes操作类型
    uint32 func_table = 2;        //1bytes 功能表
    uint32 snap_record_support_max = 3; //1bytes 健康快照记录最大数量
    uint32 page_index = 4;//当前多少页，用于分段传输。
    uint32 page_num = 5;//当前页传输多少条数据，用于分段传输。
    repeated protocol_health_snap_item snap_items = 6;
}
```

### `func_table` 位说明

| bit位 | 说明 |
|-|-|
| 0 | 是否支持日程设置全天提醒重复类型 all_day_type |
| 1 | 是否支持日程自定义设置重复类型功能 repeat_custom & custom_type |

| bit位 | 说明 |
|-|-|
| 0 | 是否支持控制抖音开关 |
| 1 | 是否支持关闭闹钟 |
| 2 | 是否支持接听电话 |
| 3 | 是否支持拍照 |
| 4 | 是否支持控制运动（暂停/恢复） |
| 5 | 是否支持控制闹钟延迟提醒 |
