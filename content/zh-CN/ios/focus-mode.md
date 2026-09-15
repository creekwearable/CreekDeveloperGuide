---
docId: ios-focus-mode
locale: zh-CN
title: iOS 专注模式
description: 读取和设置专注模式。
platform: iOS
slug: ios/focus-mode
order: 126
status: published
version: v2.0
---

# iOS 专注模式

## 功能说明

读取和设置专注模式。

## Swift 示例

```swift
///获取
CreekInterFace.instance.getFocusSleep { model in
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
var  operate =  protocol_focus_mode_operate()
             var mode = protocol_focus_sleep_mode()
            mode.switchFlag = true
            mode.startHour = 22
            mode.endHour = 8
            mode.startMinute = 0
            mode.endMinute = 0
            operate.sleepMode = mode
            CreekInterFace.instance.setFocusSleep(model: operate) {
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
    function_table focus_mode = 20;//专注模式能力。
}
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum switch_type
{
    SWITCH_NULL = 0;//NULL
    SWITCH_ON = 1;//开启
    SWITCH_OFF = 2;//关闭
}

message protocol_focus_sleep_mode
{
    bool switch_flag = 1;
    //开始时间
    uint32 start_hour = 2; 
    uint32 start_minute = 3;
    //结束时间
    uint32 end_hour = 4;
    uint32 end_minute = 5;
}

message protocol_focus_mode_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    protocol_focus_sleep_mode sleep_mode = 2; //睡眠模式
    switch_type sleep_mode_switch = 3;  //1bytes 睡眠模式功能开关 true 开启,false 关闭
}

message protocol_focus_mode_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 func_table = 2;//1bytes 功能表
    protocol_focus_sleep_mode sleep_mode = 3; //睡眠模式
    switch_type sleep_mode_switch = 4;  //1bytes 睡眠模式功能开关 true 开启,false 关闭
}
```
