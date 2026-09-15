---
docId: ios-display
locale: zh-CN
title: iOS 屏幕
description: 读取和设置屏幕亮度、亮屏时长等参数。
platform: iOS
slug: ios/display
order: 128
status: published
version: v2.0
---

# iOS 屏幕

## 功能说明

读取和设置屏幕亮度、亮屏时长等参数。

## Swift 示例

```swift
///获取
CreekInterFace.instance.getScreen{ model in
                var operate =  protocol_screen_brightness_operate()
                var screenTable = model.fromTable()
                if  screenTable.steady{
                   var aod = protocol_screen_aod_time_setting()
                   aod.mode = .intelligentMode
                   aod.startHour = 8
                   aod.startMinute = 0
                   aod.endHour = 10
                   aod.endMinute = 0
                   operate.aodTimeSetting = aod
                }else{
                    operate.aodSwitchFlag = true
                }
                operate.level = 100
                operate.showInterval = 5
                operate.levelFlag = true
                
                ////设置
                CreekInterFace.instance.setScreen(model: operate) {
                    self.view.hideRemark()
                    self.textView.text = "success"
                } failure: { code, message in
                    self.view.hideRemark()
                    self.textView.text = message
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
    function_table screen_brightness_nonsuport = 48;//屏幕设置不支持标志。
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

enum aod_mode
{
    INTELLIGENT_MODE = 0;
    TIMER_MDOE = 1;
}

message protocol_screen_night_auto_adjust
{
    bool switch_flag = 1;//1bytes 夜间自动亮度调整 true 开启,false 关闭
    //开始时间
    uint32 start_hour = 2; 
    uint32 start_minute = 3;
    //结束时间
    uint32 end_hour = 4;
    uint32 end_minute = 5;
    uint32 night_level = 6; //1bytes 夜间亮度等级(0-100)
}

message protocol_screen_aod_time_setting
{
    aod_mode mode = 1;
    //开始时间 定时模式
    uint32 start_hour = 2; 
    uint32 start_minute = 3;
    //结束时间
    uint32 end_hour = 4;
    uint32 end_minute = 5;

}

message protocol_screen_brightness_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 level = 2;  //1bytes (0-100)
    uint32 show_interval = 3; //1bytes 屏幕显示间隔 比如5秒
    protocol_screen_night_auto_adjust night_auto_adjust = 4; //夜间自动亮度调整子项数据
    bool aod_switch_flag = 5;//1bytes 息屏显示开关 true 开启,false 关闭
    bool raise_wrist_switch_flag = 6;//1bytes 抬腕时亮屏开关 true 开启,false 关闭
    protocol_screen_aod_time_setting aod_time_setting = 7;//常亮模式选择
    bool level_flag = 8;//是否设置亮度生效
}

message protocol_screen_brightness_inquire_reply
{
    uint32 func_table = 1;//1bytes 功能表
    operate_type operate = 2; //1bytes操作类型 0：无效操作 1：查询 2：设置
    uint32 level = 3;  //1bytes (0-100)
    uint32 show_interval = 4; //1bytes 屏幕显示间隔 单位:秒
    protocol_screen_night_auto_adjust night_auto_adjust = 5;//夜间自动亮度调整子项数据
    bool aod_switch_flag = 6;//1bytes 常亮显示开关 true 开启,false 关闭
    bool raise_wrist_switch_flag = 7;//1bytes 抬腕时亮屏开关 true 开启,false 关闭
    protocol_screen_aod_time_setting aod_time_setting = 8;//常亮模式选择
    repeated uint32 show_interval_options = 9;//亮屏时长显示选项 单位:秒
}
```
