---
docId: ios-app-list
locale: zh-CN
title: iOS 应用列表
description: 读取和调整设备应用列表。
platform: iOS
slug: ios/app-list
order: 127
status: published
version: v2.0
---

# iOS 应用列表

## 功能说明

读取和调整设备应用列表。

## Swift 示例

```swift
///获取
CreekInterFace.instance.getAppList { model in
                var operate = protocol_app_list_operate()
                operate.list = model.list
                
                ///设置
                CreekInterFace.instance.setAppList(model: operate) {
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
    function_table app_list = 23;//应用列表能力。
}
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum app_list
{
    APP_LIST_ACTIVITY   = 0;//活动
    APP_LIST_WORKOUT    = 1;//运动
    APP_LIST_STEPS      = 2;//计步
    APP_LIST_HEARTRATE  = 3;//心率
    APP_LIST_SLEEP      = 4;//睡眠
    APP_LIST_STRESS     = 5;//压力
    APP_LIST_MENSTRUATION = 6;//女性健康
    APP_LIST_BREATHE    = 7;//呼吸训练
    APP_LIST_ALARMS     = 8;//闹钟
    APP_LIST_PHONE      = 9;//电话
    APP_LIST_TIMERS     = 10;//倒计时
    APP_LIST_STOPWATCH  = 11;//秒表
    APP_LIST_SPO2       = 12;//血氧
    APP_LIST_WEATHER    = 13;//天气
    APP_LIST_CAMERA_REMOTE = 14;//相机控制
    APP_LIST_MUSIC      = 15;//音乐控制
    APP_LIST_FIND_PHONE = 16;//寻找手机
    APP_LIST_WORLD_CLOCK = 17;//世界时钟
    APP_LIST_SETTINGS = 18;//设置
}

message protocol_app_list_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    repeated app_list list = 2;
}

message protocol_app_list_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 func_table = 2;
    uint32 support_show_num = 3; //1bytes 应用列表显示数量
    repeated app_list list  = 4;
    bool app_list_activity_support = 5;
    bool app_list_workout_support = 6;
    bool app_list_steps_support = 7;
    bool app_list_heartrate_support  = 8;//心率
    bool app_list_sleep_support      = 9;//睡眠
    bool app_list_stress_support     = 10;//压力
    bool app_list_menstruation_support = 11;//女性健康
    bool app_list_breathe_support    = 12;//呼吸训练
    bool app_list_alarms_support     = 13;//闹钟
    bool app_list_phone_support      = 14;//电话
    bool app_list_timers_support     = 15;//倒计时
    bool app_list_stopwatch_support  = 16;//秒表
    bool app_list_spo2_support       = 17;//血氧
    bool app_list_weather_support    = 18;//天气
    bool app_list_camera_remote_support = 19;//相机控制
    bool app_list_music_support      = 20;//音乐控制
    bool app_list_find_phone_support = 21;//寻找手机
    bool app_list_world_clock_support = 22;//世界时钟
    bool app_list_settings_support = 23;//设置
}
```
