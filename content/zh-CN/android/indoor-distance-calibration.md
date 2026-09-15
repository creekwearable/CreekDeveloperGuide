---
docId: android-indoor-distance-calibration
locale: zh-CN
title: Android 室内运动距离校准
description: 校准室内运动的实际距离与设备记录距离。
platform: Android
slug: android/indoor-distance-calibration
order: 150
status: published
version: v2.0
---

# Android 室内运动距离校准

校准室内运动的实际距离与设备记录距离。

```kotlin
CreekManager.sInstance.androidPair()
 val operate =  DistanceAdjust.protocol_distance_adjust_operate()
operate.realityDistance = 100
operate.adjustDistance = 200
CreekManager.sInstance.setDistanceAdjust(model = operate, success = {
    responseText.value = "success"
}, failure = { _,m ->
    responseText.value = m
})
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";

message protocol_distance_adjust_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 reality_distance = 2;//实际距离
    uint32 adjust_distance = 3;  //校准距离
}
```
