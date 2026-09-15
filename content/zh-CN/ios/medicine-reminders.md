---
docId: ios-medicine-reminders
locale: zh-CN
title: iOS 吃药提醒
description: 读取和设置吃药提醒时段、重复日期及间隔。
platform: iOS
slug: ios/medicine-reminders
order: 140
status: published
version: v2.0
---

# iOS 吃药提醒

## 功能说明

读取和设置吃药提醒时段、重复日期及间隔。

## Swift 示例

当前 SDK 用法文档未提供可确认的 Swift 示例。本页保留公开能力及数据模型，不推断接口签名。

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;//查询
    SET = 2;//设置
}

enum notify_type
{
    ALLOW = 0;//允许通知
    SILENT = 1;//静默通知
    CLOSE = 2;//关闭通知
}

message protocol_medicine_remind_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool switch_flag = 2; //1bytes 提醒开关 true 开启,false 关闭
    notify_type notify_flag = 3;//1bytes 通知类型
    uint32 start_hour = 4; //提醒开始时间
    uint32 start_minute = 5;
    uint32 end_hour = 6;   //提醒结束时间
    uint32 end_minute = 7;
    repeated bool repeat = 8; //1bytes 重复周期 周一~周日
    uint32 interval = 9;  //2bytes 提醒间隔,单位分钟
}

message protocol_medicine_remind_inquire_reply
{
    uint32 func_table = 1;//1bytes 功能表
    operate_type operate = 2; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool switch_flag = 3; //1bytes 提醒开关 true 开启,false 关闭
    notify_type notify_flag = 4;//1bytes 通知类型
    uint32 start_hour = 5; //提醒开始时间
    uint32 start_minute = 6;
    uint32 end_hour = 7;   //提醒结束时间
    uint32 end_minute = 8;
    repeated bool repeat = 9; //1bytes 重复周期 周一~周日
    uint32 interval = 10;  //2bytes 提醒间隔,单位分钟
}
```
