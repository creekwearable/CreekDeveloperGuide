---
docId: ios-indoor-distance-calibration
locale: zh-CN
title: iOS 室内运动距离校准
description: 提交实际距离和设备记录距离，用于校准室内运动。
platform: iOS
slug: ios/indoor-distance-calibration
order: 150
status: published
version: v2.0
---

# iOS 室内运动距离校准

## 功能说明

提交实际距离和设备记录距离，用于校准室内运动。

## Swift 示例

```swift
var operate  =  protocol_distance_adjust_operate()
    operate.realityDistance = 100
    operate.adjustDistance = 200
    CreekInterFace.instance.setDistanceAdjust(model: protocol_distance_adjust_operate) {
            
    } failure: { code, message in
            
    }
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

message protocol_distance_adjust_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 reality_distance = 2;//实际距离
    uint32 adjust_distance = 3;  //校准距离
}
```
