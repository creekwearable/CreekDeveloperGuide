---
docId: android-sensors
locale: zh-CN
title: Android 传感器
description: 读取并设置设备传感器开关。
platform: Android
slug: android/sensors
order: 121
status: published
version: v2.0
---

# Android 传感器

读取并设置设备传感器开关。

```kotlin
CreekManager.sInstance.getWatchSensor({ model ->
    responseText.value = model.toString()
}, failure = { _, m ->
    responseText.value = m
})

val  operate =  WatchSensor.protocol_watch_sensors_operate()
operate.heartRateAllSwitch = Enums.switch_type.SWITCH_OFF
operate.bloodOxygenAllSwitch = Enums.switch_type.SWITCH_ON
CreekManager.sInstance.setWatchSensor(model = operate, success = {
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
enum switch_type
{
    SWITCH_NULL = 0;//NULL
    SWITCH_ON = 1;//开启
    SWITCH_OFF = 2;//关闭
}

message protocol_watch_sensors_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    switch_type heart_rate_all_switch = 2;//1bytes 心率总开关
    switch_type blood_oxygen_all_switch = 3;//1bytes 血氧总开关
    switch_type compass_all_switch = 4;//1bytes 地磁总开关
    switch_type baromater_all_switch = 5;//1bytes 气压总开关
}

message protocol_watch_sensors_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    switch_type heart_rate_all_switch = 2;//1bytes 心率总开关
    switch_type blood_oxygen_all_switch = 3;//1bytes 血氧总开关
    switch_type compass_all_switch = 4;//1bytes 地磁总开关
    switch_type baromater_all_switch = 5;//1bytes 气压总开关
}
```
