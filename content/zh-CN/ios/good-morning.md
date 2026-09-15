---
docId: ios-good-morning
locale: zh-CN
title: iOS 早安问候
description: 读取和设置设备早安问候内容。
platform: iOS
slug: ios/good-morning
order: 134
status: published
version: v2.0
---

# iOS 早安问候

## 功能说明

读取和设置设备早安问候内容。

## Swift 示例

```swift
///获取早安问候
 CreekInterFace.instance.getMorning { model in
            // 处理返回结果。
         } failure: { code, message in
            // 处理错误。
 }
 ///设置早安问候
         var operate = protocol_good_morning_operate()
         operate.switchFlag = true
         operate.startHour = 8
         operate.startMinute = 0
         operate.endHour = 9
         operate.endMinute = 0
         ///重复 周一~周七
         operate.repeat = [true,true,true,true,true,true,true]
         operate.content.append("早上好".data(using: .utf8)!)
         CreekInterFace.instance.setMorning(model: operate) {
            // 处理成功。
         } failure: { code, message in
            // 处理错误。
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
    function_table good_morning = 32;//早安问候能力。
    function_table good_morning_content = 46;//自定义早安问候内容能力。
}
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";
enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;//查询
    SET = 2;//设置
}

message protocol_good_morning_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool switch_flag = 2; //1bytes 提醒开关 true 开启,false 关闭
    uint32 start_hour = 3; //提醒开始时间
    uint32 start_minute = 4;
    uint32 end_hour = 5;   //提醒结束时间
    uint32 end_minute = 6;
    repeated bool repeat = 7; //7bytes 重复 周一~周七
    repeated bytes content = 8;//编辑文案
}

message protocol_good_morning_inquire_reply
{
    uint32 func_table = 1;//1bytes 功能表
    operate_type operate = 2; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool switch_flag = 3; //1bytes 提醒开关 true 开启,false 关闭
    uint32 start_hour = 4; //提醒开始时间
    uint32 start_minute = 5;
    uint32 end_hour = 6;   //提醒结束时间
    uint32 end_minute = 7;
    repeated bool repeat = 8; //7bytes 重复 周一~周七
    repeated bytes content = 9;//编辑文案
}
```
