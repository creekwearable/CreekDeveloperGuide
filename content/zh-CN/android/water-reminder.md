---
docId: android-water-reminder
locale: zh-CN
title: Android 喝水提醒
description: 读取并设置喝水提醒。
platform: Android
slug: android/water-reminder
order: 124
status: published
version: v2.0
---

# Android 喝水提醒

读取并设置喝水提醒。

```kotlin
///获取
CreekManager.sInstance.getWater({model: WaterMonitor.protocol_drink_water_inquire_reply ->
    responseText.value = model.toString()
}, failure = {_, m ->
    responseText.value = m
})

///设置
var  operate =  WaterMonitor.protocol_drink_water_operate()
operate.switchFlag = true
operate.startHour = 8
operate.startMinute = 0
operate.endHour = 18
operate.endMinute = 0
CreekManager.sInstance.setWater(model = operate, success = {
    responseText.value = "success"
}, failure = {_, m ->
    responseText.value = m
})
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

message protocol_drink_water_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool switch_flag = 2; //1bytes 喝水提醒开关 true 开启,false 关闭
    notify_type notify_flag = 3;//1bytes 通知类型
    uint32 start_hour = 4; //提醒开始时间
    uint32 start_minute = 5;
    uint32 end_hour = 6;   //提醒结束时间
    uint32 end_minute = 7;
    repeated bool repeat = 8; //1bytes 重复周期 周一~周日
    uint32 interval = 9;  //2bytes 提醒间隔,单位分钟
}

message protocol_drink_water_inquire_reply
{
    uint32 func_table = 1;//1bytes 功能表
    operate_type operate = 2; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool switch_flag = 3; //1bytes 喝水提醒开关 true 开启,false 关闭
    notify_type notify_flag = 4;//1bytes 通知类型 
    uint32 start_hour = 5; //提醒开始时间
    uint32 start_minute = 6;
    uint32 end_hour = 7;   //提醒结束时间
    uint32 end_minute = 8;
    repeated bool repeat = 9; //1bytes 重复周期 周一~周日
    uint32 interval = 10;  //2bytes 提醒间隔,单位分钟
}
```

### `func_table` 位说明

| bit位 | 说明 |
|-|-|
| 0 | 是否协议只支持喝水开关 |
