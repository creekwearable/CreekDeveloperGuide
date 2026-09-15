---
docId: ios-incoming-call-reminder
locale: zh-CN
title: iOS 来电提醒配置
description: 配置来电提醒开关和相关选项。
platform: iOS
slug: ios/incoming-call-reminder
order: 117
status: published
version: v2.0
---

# iOS 来电提醒配置

## 功能说明

配置来电提醒开关和相关选项。

## Swift 示例

```swift
//获取来电提醒
CreekInterFace.instance.getCall { model in
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
///设置来电提醒
            var data =  protocol_call_switch()
            data.callSwitch = true
            data.callDelay = 2
            CreekInterFace.instance.setCall(model: data) {
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
    function_table ble_call_coming = 35;//来电提醒能力。
}
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum call_status
{
    RECEIVED_CALL = 0;//来电已接
    REJECT_CALL = 1;//来电已拒
}

enum tran_direction_type
{
    WATCH_TRAN = 0;//手表发起
    APP_TRAN = 1;//app发起
}

//来电配置
message protocol_call_switch
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool call_switch = 2; //1bytes 来电开关 true 开启 false 关闭
    uint32 call_delay = 3;//1bytes 来电延时 单位秒
}

message protocol_call_switch_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool call_switch = 2; //1bytes 来电开关 true 开启 false 关闭
    uint32 call_delay = 3;//1bytes 来电延时 单位秒
}

//来电提醒
message protocol_call_remind
{
    bytes contact_name = 1; //max:64 联系人名字
    bytes phone_number = 2; //max:32 电话号码
}

//来电状态
message protocol_call_remind_status
{
    tran_direction_type tran_type = 1;//传输方向
    call_status status = 2;//1bytes 来电状态
}
```
