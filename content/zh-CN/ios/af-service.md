---
docId: ios-af-service
locale: zh-CN
title: iOS 房颤服务开关
description: 读取和设置客户定制的房颤服务开关。
platform: iOS
slug: ios/af-service
order: 149
status: published
version: v2.0
---

# iOS 房颤服务开关

## 功能说明

读取和设置客户定制的房颤服务开关。

## Swift 示例

```swift
///获取
         CreekInterFace.instance.getAfServer{ model in
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
         var operate = protocol_custom_yuwell_af_operate()
         operate.afSwitch = .switchOn
         CreekInterFace.instance.setAfServer(model: operate) {
            self.view.hideRemark()
            self.textView.text = "success"
         } failure: { code, message in
            self.view.hideRemark()
            self.textView.text = message
         }
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

message protocol_custom_yuwell_af_operate 
{ 
   operate_type operate = 1;     //操作类型
   switch_type switch = 2;       //开关
}
message protocol_custom_yuwell_af_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    switch_type
     switch = 2;   //开关
}
```
