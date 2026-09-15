---
docId: ios-find-device
locale: zh-CN
title: iOS 寻找手表
description: 触发或停止寻找手表。
platform: iOS
slug: ios/find-device
order: 129
status: published
version: v2.0
---

# iOS 寻找手表

## 功能说明

触发或停止寻找手表。

## Swift 示例

```swift
///Start looking for a watch
           var operate = protocol_find_phone_watch_operate()
           operate.findWatchSwitch = true
           operate.findWatchFlag = true
           CreekInterFace.instance.setFindPhoneWatch(model: operate) {
              
           } failure: { code, message in
              
           }
           
           ///end looking for a watch
           var operate = protocol_find_phone_watch_operate()
           operate.findWatchSwitch = true
           operate.findWatchFlag = false
           CreekInterFace.instance.setFindPhoneWatch(model: operate) {
              
           } failure: { code, message in
              
           }
```

## 功能表字段

读取 `protocol_function_table` 后检查以下字段：

```protobuf
message function_table {
    bool is_support = 1;//是否支持该能力。
    uint32 cmd_id = 2;//能力对应的指令标识。
}

message protocol_function_table {
    function_table find_watch = 21;//寻找手表能力。
}
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

message protocol_find_phone_watch_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool find_watch_switch = 2;//1bytes 寻找手表开关 true 开启,false 关闭
    bool find_watch_flag = 3;//1bytes 寻找手表 0 停止 1:开始
    bool find_phone_close_flag = 4;//1bytes 寻找手机关闭 1关闭
}

message protocol_find_phone_watch_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 func_table = 2;
    bool find_watch_switch = 3;//1bytes 寻找手表开关 true 开启,false 关闭
    bool find_watch_support = 4;//是否支持寻找手表
}
```
