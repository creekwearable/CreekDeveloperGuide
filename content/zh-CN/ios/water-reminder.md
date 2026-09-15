---
docId: ios-water-reminder
locale: zh-CN
title: iOS 喝水提醒
description: 读取和设置喝水提醒。
platform: iOS
slug: ios/water-reminder
order: 124
status: published
version: v2.0
---

# iOS 喝水提醒

## 功能说明

读取和设置喝水提醒。

## Swift 示例

```swift
///获取
CreekInterFace.instance.getWater { model in
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
///设置
var  operate =  protocol_drink_water_operate()
            ///只需要设置这5个属性，其他属性设置无效
            operate.switchFlag = true
            operate.startHour = 8
            operate.startMinute = 0
            operate.endHour = 18
            operate.endMinute = 0
            CreekInterFace.instance.setWater(model: operate) {
                self.view.hideRemark()
                self.textView.text = "success"
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
    function_table water_remind = 2;//喝水提醒能力。
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

message protocol_drink_water_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool switch_flag = 2; //1bytes 喝水提醒开关 true 开启,false 关闭
    notify_type notify_flag = 3;//1bytes 通知类型
    uint32 start_hour = 4; //提醒开始时间
    uint32 start_minute = 5;
    uint32 end_hour = 6;   //提醒结束时间
    uint32 end_minute = 7;
    repeated bool repeat = 8; //1bytes 重复周期 周一~周日
    uint32 interval = 9;  //2bytes 提醒间隔,单位分钟
}

message protocol_drink_water_inquire_reply
{
    uint32 func_table = 1;//1bytes 功能表
    operate_type operate = 2; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool switch_flag = 3; //1bytes 喝水提醒开关 true 开启,false 关闭
    notify_type notify_flag = 4;//1bytes 通知类型
    uint32 start_hour = 5; //提醒开始时间
    uint32 start_minute = 6;
    uint32 end_hour = 7;   //提醒结束时间
    uint32 end_minute = 8;
    repeated bool repeat = 9; //1bytes 重复周期 周一~周日
    uint32 interval = 10;  //2bytes 提醒间隔,单位分钟
}
```
