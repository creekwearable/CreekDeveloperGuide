---
docId: android-water-assistant
locale: zh-CN
title: Android 喝水助手
description: 读取并配置喝水助手数据。
platform: Android
slug: android/water-assistant
order: 125
status: published
version: v2.0
---

# Android 喝水助手

读取并配置喝水助手数据。

```kotlin
CreekManager.sInstance.getWatchSensor({ model ->
    responseText.value = model.toString()
}, failure = { _, m ->
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

message water_assistant_time
{
    uint32 year = 1;
    uint32 month = 2;
    uint32 day = 3;
    uint32 hour = 4;
    uint32 minute = 5;
    uint32 second = 6;
};

message water_assistant_time_section
{
    uint32 start_hour = 1;     //1bytes 开始时间
    uint32 start_minute = 2;   //1bytes 
    uint32 end_hour = 3;       //1bytes 结束时间
    uint32 end_minute = 4;     //1bytes 
}

message water_assistant_setting
{
    uint32 user_target = 1;          //2bytes用户设置目标
    uint32 interval = 2;             //2bytes 提醒间隔,单位分钟
    bool   switch_flag = 3;          //提醒开关
    repeated water_assistant_time_section time_section = 4;//max:8 提醒时间段
}

message water_assistant_daily_status
{
    uint32 year = 1;
    uint32 month = 2;
    uint32 day = 3;
    bool  status = 4;//完成状态
    uint32 drink_value = 5;//喝水总量
    uint32 user_target = 6; //用户设置目标
}

message protocol_water_assistant_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    water_assistant_time last_drink_time = 2;//上一次喝水时间
    repeated water_assistant_daily_status daily_data = 3;//7天内喝水量
    water_assistant_setting setting = 4;//设置
    uint32 set_utc_time = 5;//设置记录的utc时间，记录时间
}

message protocol_water_assistant_inquire_reply
{
    uint32 func_table = 1;//1bytes 功能表
    operate_type operate = 2; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    water_assistant_time last_drink_time = 3;//上一次喝水时间
    repeated water_assistant_daily_status daily_data = 4;//7天内喝水量
    water_assistant_setting setting = 5;//设置
    uint32 set_utc_time = 6;//设置记录的utc时间，记录时间
}
```
