---
docId: ios-device-status
locale: zh-CN
title: iOS 设备状态
description: 按状态类型读取设备当前状态。
platform: iOS
slug: ios/device-status
order: 144
status: published
version: v2.0
---

# iOS 设备状态

## 功能说明

按状态类型读取设备当前状态。

## Swift 示例

```swift
CreekInterFace.instance.getDeviceStatus(type: .sportStatus){ model in
            if model.value == 1 {
               print("运动中")
            }else{
               print("未运动")
            }
 
         } failure: { code, message in
     
         }
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum device_status_type
{
    sport_status = 0;//运动状态
}

message protocol_device_status_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    device_status_type status_type = 2;//设备状态类型
}
 
message protocol_device_status_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    device_status_type status_type = 2;//设备状态类型
    uint32 value = 3;
}
```
