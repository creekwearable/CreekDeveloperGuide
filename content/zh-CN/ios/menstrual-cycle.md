---
docId: ios-menstrual-cycle
locale: zh-CN
title: iOS 生理周期
description: 读取和设置生理周期参数。
platform: iOS
slug: ios/menstrual-cycle
order: 105
status: published
version: v2.0
---

# iOS 生理周期

## 功能说明

读取和设置生理周期参数。

## Swift 示例

```swift
///获取
         CreekInterFace.instance.getMenstrual { model in
            // 处理返回结果。
         } failure: { code, message in
            // 处理错误。
         }
         ///设置
         var operate =  protocol_menstruation_operate()
         var period = protocol_menstrual_period_set()
         period.switchFlag = true
         period.periodLength = 28
         period.cycleLength = 5;
         period.lastYear = 2025
         period.lastMonth = 10
         period.lastDay = 10
         operate.periodSet = period
         CreekInterFace.instance.setMenstrual(model: operate) {
            
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
    function_table female_health = 4;//女性健康能力。
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

enum period_log
{
    PERIOD_LOG_NULL = 0;//无记录
    PERIOD_LOG_NOT_FLOW = 1;//无血量
    PERIOD_LOG_AS_USUAL = 2;//照常
    PERIOD_LOG_LIGHT_FLOW = 3;//少血量
    PERIOD_LOG_MENDIUM_FLOW = 4;//中等血量
    PERIOD_LOG_HEAVY_FLOW = 5;//大血量
}

message protocol_menstrual_period_set
{
    bool switch_flag = 1; //1bytes 女性健康开关 true 开启,false 关闭
    uint32 period_length = 2;  //1bytes 经期长度
    uint32 cycle_length = 3;    //1bytes 经期周期
    uint32 last_year = 4; //2bytes 最近一次经期开始时间
    uint32 last_month = 5;
    uint32 last_day = 6;
}

message protocol_menstrual_record
{
    uint32 year = 1; //2bytes 日期
    uint32 month = 2;
    uint32 day = 3;
    period_log log = 4;
    uint32 operate_utc_time = 5;//操作的时间，utc时间,比如操作记录经期，这个时间点作为操作时间
}

message protocol_menstruation_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    protocol_menstrual_period_set period_set = 2;//经期设置
    repeated protocol_menstrual_record record = 3;//记录操作的时间
    uint32 set_utc_time = 4;//设置记录的utc时间，记录时间
    bool reminder_switch = 5; //1bytes 生理周期提醒（排卵期提醒、预测的经期提醒）开关
}

message protocol_menstruation_inquire_reply
{
    uint32 func_table = 1;//1bytes 功能表
    operate_type operate = 2; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    protocol_menstrual_period_set menstrual_period_set = 3;//经期设置
    repeated protocol_menstrual_record record= 4;//记录操作的时间
    uint32 set_utc_time = 5;//设置记录的utc时间，记录时间
    bool reminder_switch = 6; //1bytes 生理周期提醒（排卵期提醒、预测的经期提醒）开关
}
```
