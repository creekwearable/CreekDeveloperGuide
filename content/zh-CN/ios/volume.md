---
docId: ios-volume
locale: zh-CN
title: iOS 音量
description: 读取和设置设备铃声音量。
platform: iOS
slug: ios/volume
order: 141
status: published
version: v2.0
---

# iOS 音量

## 功能说明

读取和设置设备铃声音量。

## Swift 示例

当前 SDK 用法文档未提供可确认的 Swift 示例。本页保留公开能力及数据模型，不推断接口签名。

## Protobuf 数据模型

```protobuf
syntax = "proto3";

message protocol_volume_adjust_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 ringtone_volume = 2;//铃声音量 0~100
}

message protocol_volume_adjust_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 func_table = 2;//1bytes 功能表
    uint32 ringtone_volume = 3;//铃声音量 0~100
}
```
