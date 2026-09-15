---
docId: android-health-monitoring
locale: zh-CN
title: Android 健康监测
description: 读取并设置健康监测模式、间隔和提醒阈值。
platform: Android
slug: android/health-monitoring
order: 120
status: published
version: v2.0
---

# Android 健康监测

读取并设置健康监测模式、间隔和提醒阈值。

```kotlin
///获取
var model = Monitor.protocol_health_monitor_operate()
model.healthType = Enums.health_type.HEART_RATE

CreekManager.sInstance.getMonitor(
    operate = model,
    { model: Monitor.protocol_health_monitor_inquire_reply ->
     },
    failure = { _, m ->
       
    })
///设置

var model = Monitor.protocol_health_monitor_operate()
model.healthType = Enums.health_type.HEART_RATE
CreekManager.sInstance.setMonitor(model = model, {
    textView.text = "success"
}, failure = { _, m ->
    textView.text = m
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

enum notify_type
{
    ALLOW = 0;//允许通知
    SILENT = 1;//静默通知
    CLOSE = 2;//关闭通知
}

enum health_monitor_mode
{
    MANUAL = 0;//手动
    AUTO = 1;//自动
    CONTINUOUS = 2;//连续监测
    INTELLIHENT = 3;//智能监测
}

enum health_type
{
    HEART_RATE = 0;//心率
    STRESS = 1;//压力
    SPO2 = 2;//血氧
    NOISE = 3;//噪音
    BODY_ENERGY = 4;//身体电量
    RESPIRATORY_RATE = 5;//呼吸率
    SKIN_TEMPERATURE = 6;//皮肤温度
    ATRIAL_FIBRILLATION = 7;//房颤
    OSA = 8;//睡眠呼吸暂停
}

message protocol_health_monitor_auto_adjust
{
    bool switch_flag = 1; //1bytes 模式自动调整开关 true 开启,false 关闭
    health_monitor_mode adjust_mode = 2; //1bytes 监测模式 
    //开始时间
    uint32 start_hour = 3;
    uint32 start_minute = 4;
    //结束时间
    uint32 end_hour = 5;
    uint32 end_minute = 6;
}

message protocol_heart_monitor_notify
{
    notify_type notify_flag = 1; //1bytes 通知类型
    bool high_remind_switch = 2;  //1bytes true:开启过高提醒开关， false:关闭
    bool low_remind_switch = 3;  //1bytes true:开启过低提醒开关， false:关闭
    uint32 high_threshold_value = 4;  //1bytes 过高提醒阈值
    uint32 low_threshold_value = 5;  //1bytes 过低提醒阈值
    uint32 interval = 6;  //1bytes 提醒间隔,单位分钟
    repeated bool repeat = 7;   //1bytes 重复周期 周一~周日
    //开始时间
    uint32 start_hour = 8;
    uint32 start_minute = 9;
    //结束时间
    uint32 end_hour = 10;
    uint32 end_minute = 11;
}

message protocol_health_monitor_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    health_type health_type = 2;//健康监测类型
    health_monitor_mode default_mode = 3;   //1bytes  默认监测模式类型
    uint32 measurement_interval = 4;   //2bytes 测量间隔,单位s
    protocol_health_monitor_auto_adjust mode_auto_adjust = 5; //监测模式自动调整子项数据
    protocol_heart_monitor_notify notify_setting = 6;//提醒通知配置
}

message protocol_health_monitor_inquire_reply
{
    uint32 func_table = 1;//1bytes 功能表
    operate_type operate = 2; //1bytes操作类型 0：无效操作 1：查询 2：设置
    health_type health_type = 3;//健康监测类型
    health_monitor_mode default_mode = 4;   //1bytes  默认模式类型 
    uint32 measurement_interval = 5;   //2bytes 自动测量间隔,单位s
    protocol_health_monitor_auto_adjust mode_auto_adjust = 6; //监测模式自动调整子项数据
    protocol_heart_monitor_notify notify_setting = 7;//提醒通知配置
    
}
```

### `func_table` 位说明

| bit位 | 说明 |
|-|-|
| 0 | 是否支持心率测量间隔时长修改 |
| 1 | 是否支持心率测量连续监测模式 |
| 2 | 是否支持心率测量智能监测模式 |
| 3 | 是否支持心率日志过高过低提醒，不包括时间段设置，字段protocol_heart_monitor_notify |
| 4 | 是否不支持心率测量自动测量模式 |
| 5 | 是否不支持血氧测量自动测量模式 |
| 6 | 是支持睡眠秒级血氧测量设置（OSA） |
