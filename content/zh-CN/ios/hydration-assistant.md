---
docId: ios-hydration-assistant
locale: zh-CN
title: iOS 喝水助手
description: 读取和设置喝水助手数据。
platform: iOS
slug: ios/hydration-assistant
order: 125
status: published
version: v2.0
---

# iOS 喝水助手

## 功能说明

读取和设置喝水助手数据。

## Swift 示例

```swift
///这个为true的时候，代表喝水提醒的功能迁移到喝水助手中
/// protocol_function_table().waterAssistant.isSupport

///喝水助手的设置在手表端，现在只有获取喝水的记录
 CreekInterFace.instance.getWaterAssistant{ model in
       self.view.hideRemark()
            let json = try? model.jsonString()
            if let str = json{
               dispatch_main_sync_safe {
                  self.textView.text = str
               }
            }
         } failure: { code, message in
            self.view.hideRemark()
            self.textView.text = message
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
    function_table water_assistant = 34;//喝水助手能力。
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
