---
docId: ios-stand-reminder
locale: zh-CN
title: iOS 站立提醒
description: 读取和设置站立提醒时段及重复规则。
platform: iOS
slug: ios/stand-reminder
order: 123
status: published
version: v2.0
---

# iOS 站立提醒

## 功能说明

读取和设置站立提醒时段及重复规则。

## Swift 示例

```swift
///获取
CreekInterFace.instance.getStanding { model in
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
var  operate =  protocol_standing_remind_operate()
             var standing =  protocol_standing_remind_set()
            ///只需要设置开关，其他的属性不需设置
            standing.switchFlag = true
            CreekInterFace.instance.setStanding(model: operate) {
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
    function_table standing_remind = 3;//站立提醒能力。
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

enum notify_type
{
    ALLOW = 0;//允许通知
    SILENT = 1;//静默通知
    CLOSE = 2;//关闭通知
}

message protocol_standing_remind_set
{
    bool switch_flag = 1; //1bytes 站立提醒开关 true 开启,false 关闭
    notify_type notify_flag = 2;//1bytes 通知类型
    uint32 start_hour = 3; //提醒开始时间
    uint32 start_minute = 4;
    uint32 end_hour = 5;   //提醒结束时间
    uint32 end_minute = 6;
    repeated bool repeat = 7; //1bytes 重复周期 周一~周日
}

message protocol_standing_remind_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    protocol_standing_remind_set standing_remind = 2;
}

message protocol_standing_remind_inquire_reply
{
    uint32 func_table = 1;//1bytes 功能表
    operate_type operate = 2; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    protocol_standing_remind_set standing_remind = 3;
}
```
