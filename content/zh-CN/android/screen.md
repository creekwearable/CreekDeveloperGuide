---
docId: android-screen
locale: zh-CN
title: Android 屏幕
description: 读取并设置屏幕亮度、亮屏时长和相关能力。
platform: Android
slug: android/screen
order: 128
status: published
version: v2.0
---

# Android 屏幕

读取并设置屏幕亮度、亮屏时长和相关能力。

```kotlin
///获取
CreekManager.sInstance.getScreen({ model: Screen.protocol_screen_brightness_inquire_reply ->

    var operate = Screen.protocol_screen_brightness_operate()
    var screenTable = model.fromTable()
    if(screenTable.steady){
        var aod = Screen.protocol_screen_aod_time_setting()
        aod.mode = Enums.aod_mode.INTELLIGENT_MODE
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
    
    ///设置
    CreekManager.sInstance.setScreen(model = operate, {
        responseText.value = "success"
    }, failure = { _, m ->
        responseText.value = m
    })
}, failure = { _, m ->
    responseText.value = m
})
```

---

## 数据模型

### Protobuf 定义

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

### `func_table` 位说明

| bit位 | 说明 |
|-|-|
| 0 | 是否支持夜间自动亮度调整 |
| 1 | 是否支持常亮模式选择，支持用aod_time_setting ，不支持用aod_switch_flag |
| 2 | 是否支持亮屏时长显示选项 |
