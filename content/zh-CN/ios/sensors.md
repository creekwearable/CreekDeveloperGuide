---
docId: ios-sensors
locale: zh-CN
title: iOS 传感器
description: 读取和设置设备传感器开关。
platform: iOS
slug: ios/sensors
order: 121
status: published
version: v2.0
---

# iOS 传感器

## 功能说明

读取和设置设备传感器开关。

## Swift 示例

```swift
///获取
      CreekInterFace.instance.getWatchSensor{ model in
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

   ///现在只支持heartRateAllSwitch、bloodOxygenAllSwitch的设置，其他两项不支持
        
         var  operate =  protocol_watch_sensors_operate()
         operate.heartRateAllSwitch = .switchOn
         operate.bloodOxygenAllSwitch = .switchOn
  //operate.compassAllSwitch = .switchOn
//operate.baromaterAllSwitch = .switchOn
         CreekInterFace.instance.setWatchSensor(model: operate) {
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
    function_table watch_sensors = 40;//传感器开关能力。
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

message protocol_watch_sensors_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    switch_type heart_rate_all_switch = 2;//1bytes 心率总开关
    switch_type blood_oxygen_all_switch = 3;//1bytes 血氧总开关
    switch_type compass_all_switch = 4;//1bytes 地磁总开关
    switch_type baromater_all_switch = 5;//1bytes 气压总开关
}

message protocol_watch_sensors_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    switch_type heart_rate_all_switch = 2;//1bytes 心率总开关
    switch_type blood_oxygen_all_switch = 3;//1bytes 血氧总开关
    switch_type compass_all_switch = 4;//1bytes 地磁总开关
    switch_type baromater_all_switch = 5;//1bytes 气压总开关
}
```
