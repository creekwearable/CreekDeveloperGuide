---
docId: android-ring-module
locale: zh-CN
title: Android 戒指模块
description: 使用戒指健康测量、提醒、运动识别和房颤测量能力。
platform: Android
slug: android/ring-module
order: 143
status: published
version: v2.0
---

# Android 戒指模块

使用戒指健康测量、提醒、运动识别和房颤测量能力。

### 健康测量

  错误码

```kotlin
///开始测量
measureDuration: // 测量时长
model： // 根据你设置的measureDuration 时间，持续出值
timeout: // 查询结果超时

CreekManager.sInstance.startMeasure(
    type = selectedType,
    measureDuration = 20,
    timeout = 60,
    model =  { model: Ring.protocol_ring_click_measure_operate ->
        resultText = "结果：${model.value}"
    },
    success = {
        statusText = "状态：测量成功 ✅"
    },
    failure =  { error: CommonErrorOuterClass.CommonError ->
        statusText = "错误：${error.message}"
    }, abnormal = {
      println("有异动")
   }, wearingNoStandard = {
    println("佩戴不标准")
}
)
  ///结束测量
CreekManager.sInstance.stopMeasure(selectedType)
```

### **戒指 提醒开关**

```kotlin
///获取
 CreekManager.sInstance.getWatchReminderWitch( model = {
        model ->
    responseText.value = model.toString()
},failure = { _, m ->
    responseText.value = m
})

///设置
val  operate =  Ring.protocol_remind_mark_switch_operate()
operate.goalAchievedSwitch = Enums.switch_type.SWITCH_ON
operate.lowPowerSwitch = Enums.switch_type.SWITCH_ON
operate.chargerFullSwitch = Enums.switch_type.SWITCH_ON
operate.findRingLedSwitch = Enums.switch_type.SWITCH_ON
operate.ntctemperatureHighSwitch = Enums.switch_type.SWITCH_ON
operate.heartRateHighSwitch = Enums.switch_type.SWITCH_ON
operate.heartRateLowSwitch = Enums.switch_type.SWITCH_ON
operate.sedentaryRemindSwitch = Enums.switch_type.SWITCH_ON
operate.highStressSwitch = Enums.switch_type.SWITCH_ON
operate.lowSpo2Switch = Enums.switch_type.SWITCH_ON
CreekManager.sInstance.setWatchReminderWitch(model = operate, success = {
    responseText.value = "success"
}, failure = {_, m ->
    responseText.value = m
})
```

### 提醒通知

```kotlin
CreekManager.sInstance.ringReminderListen { model ->
    
}
```

### 闹钟通知

```kotlin
CreekManager.sInstance.ringAlarmVibrateListen { model ->
    
}
```

### 运动自识别

```kotlin
CreekManager.sInstance.motionRecognitionListen { model ->
    
}
```

### 房颤健康测量

```kotlin
///测量
CreekManager.sInstance.startAFMeasure(
    measureDuration = 45,
    timeout = 60,
    pulseDuration = 15,
    model =  { model: Ring.protocol_ring_click_measure_operate ->
        resultText = "结果：${model.value}"
        println("spo:${model.value}  pulseRateValue:${model.pulseRateValue}")
    },
    success = {
        statusText = "状态：测量成功 ✅"
    },
    failure =  { error: CommonErrorOuterClass.CommonError ->
        statusText = "错误：${error.message}"
    }, abnormal = {
        println("有异动")
    }, wearingNoStandard = {
        println("佩戴不标准")
    }, processResult = {model: Ring.protocol_ring_click_measure_operate ->
        if (model.pulseRateValue > 0) {
            resultText = "结果：${model.pulseRateValue}"
        }
    }, onCountDown = { type, countDown ->
        if (type == HealthMeasureCountDownType.pulseRate){
            statusText = "脉率倒计时：${countDown}"
        }else if (type == HealthMeasureCountDownType.afMeasure){
            statusText = "房颤测量倒计时：${countDown}"
        }
    }
)

///停止
CreekManager.sInstance.stopAFMeasure()
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";
enum tran_direction_type
{
    WATCH_TRAN = 0;//手表发起
    APP_TRAN = 1;//app发起
}

enum ring_health_type
{
    HEART_RATE = 0;//心率
    STRESS = 1;//压力
    SPO2 = 2;//血氧
    HRV = 3;//HRV
    RESPIRATORY_RATE = 4;//呼吸率
    AF = 5;//鱼跃房颤算法
}

enum health_measure_type
{
    HEALTH_MEASURE_START = 0;//开始测量
    HEALTH_MEASURE_PAUSE = 1;//暂停测量
    HEALTH_MEASURE_STOP = 2;//停止测量
    HEALTH_MEASURE_INQUIRE = 3;//查询状态
}

enum health_measure_status
{
    HEALTH_STATUS_MEASURING = 0;//测量中
    HEALTH_STATUS_NO_WEAR = 1;//未佩戴
    HEALTH_STATUS_RESULT = 2;//测量结果
    HEALTH_STATUS_FAIL = 3;//测量失败
}

enum health_abnormal_status//异常状态 
{  
    HEALTH_ABNORMAL_NONE = 0;//无异动 
    HEALTH_ABNORMAL_EXIST = 1;//监测到异常
} 

message protocol_ring_click_measure_operate
{
    tran_direction_type tran_type = 1;//传输方向
    ring_health_type health_type = 2;//测量类型
    health_measure_type measure_type = 3;//测量操作
    uint32 value = 4;//测量值
    uint32 measure_time = 5;//测量时间 
    health_measure_status measure_status = 6;//测量状态
    bytes data_list = 7;//数据组
    uint32 pulse_rate_value = 8;//脉率测量值
    health_abnormal_status abnormal_status = 9;//异常状态
}

syntax = "proto3";
enum tran_direction_type
{
    WATCH_TRAN = 0;//手表发起
    APP_TRAN = 1;//app发起
}

enum ring_goal_status 
{
    GOAL_NOT_ACHIEVED  = 0;//未达成
    GOAL_ACHIEVED = 1;//已达成
    EVENT_INVAlID  = 2;//事件无效
}

message ring_remind_event_time
{
    uint32 year = 1;    //事件发生的起始时间点
    uint32 month = 2;
    uint32 day = 3;
    uint32 hour = 4;
    uint32 minute = 5;
    uint32 second = 6;   
    uint32 duration = 7;//事件的持续时长，单位s
}

enum ring_remind_event_type
{
    INVALID_EVENT = 0;
    STEP_GOAL = 1;   //步数目标达成状态
    KCAL_GOAL = 2;   //卡路里目标达成状态
    ACTIVE_TIME = 3; //活跃时长目标达成状态
    STAND_TIME = 4;  //站立时长目标达成状态
    DIS_TIME = 5;    //距离目标达成状态
    EXERCISE_TIME = 6;  //锻炼时长目标达成状态
    HIGH_HEART_RATE = 7;    //高心率提醒
    LOW_HEART_RATE = 8;      //低心率提醒
    LOW_POWER = 9;           //低电量提醒
    NTC_HIGH_TEMPERATURE = 10;//NTC温度过高 
    NTC_LOW_TEMPERATURE = 11;//NTC温度过低 
    HRV_MEASURE_FAILED = 12;  //hrv测量失败
    STRESS_MEASURE_FAILED = 13;//压力测量失败
    RESPIRATORY_MEASURE_FAILED = 14;//呼吸率测量失败
    CHARGE_FULL = 15;//充电满
    SYS_POWEROFF = 16;//关机提醒标记
    IS_AF = 17;//疑似房颤提醒标记
    SEDENTARY_REMIND = 18;     //久坐提醒
    HIGH_STRESS = 19;    //压力过高提醒
    LOW_SPO2 = 20;    //血氧过低提醒
}
message protocol_ring_remind_mark_operate
{
    tran_direction_type tran_type = 1;//传输方向
    uint32 func_table = 2;//1bytes 功能表 
    ring_remind_event_type event_id = 3; //1bytes 事件id 
    ring_goal_status event_value = 4;//具体事件数值
    ring_remind_event_time event_time = 5; //事件发生的时间
    ring_remind_type remind_type = 6;   //提醒方式
    int32 current_value = 7; //事件当前值（核心体温*100）
    uint32 event_value_min = 8; //事件最小值
    uint32 event_value_max = 9; //事件最大值
}

syntax = "proto3";
enum tran_direction_type
{
    WATCH_TRAN = 0;//手表发起
    APP_TRAN = 1;//app发起
}
 
message protocol_ring_motion_recognition_operate
{
    tran_direction_type tran_type = 1;//传输方向
    uint32 func_table = 2;//1bytes 功能表 
    sport_type sport_type = 2;//运动识别运动类型
}

syntax = "proto3";
enum tran_direction_type
{
    WATCH_TRAN = 0;//手表发起
    APP_TRAN = 1;//app发起
}

enum ring_alarm_vibrate_status
{
    VIBRATION_STOP = 0;
    VIBRATION_START = 1;
}

message protocol_ring_alarm_vibrate_notify_operate
{
    tran_direction_type tran_type = 1;//传输方向
    uint32 func_table = 2;//1bytes 功能表 
    uint32 alarm_id = 3;  //闹钟id 从0开始
    uint32 hour = 4;//1bytes 
    uint32 minute = 5;//1bytes
    bytes alarm_name = 6;    //max:30 闹钟名称
    ring_alarm_vibrate_status status = 7;//闹钟震动状态
}

syntax = "proto3";

enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;//查询
    SET = 2;//设置
}

enum switch_type
{
    SWITCH_NULL = 0;//NULL
    SWITCH_ON = 1;//开启
    SWITCH_OFF = 2;//关闭
}

message protocol_remind_mark_switch_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    switch_type goal_achieved_switch = 2;//目标达成提醒开关
    switch_type low_power_switch = 3;           //低电量提醒开关
    switch_type charger_full_switch = 4;//充电满提醒开关
    switch_type find_ring_led_switch =5;//寻找戒指闪灯开关
    switch_type ntctemperature_high_switch = 6;//NTC温度过高提醒开关
    switch_type heart_rate_high_switch = 7;//心率过高提醒开关
    switch_type heart_rate_low_switch = 8;//心率过低提醒开关
    switch_type sedentary_remind_switch = 9;  //久坐提醒开关
    switch_type high_stress_switch = 10;   //压力过高提醒开关
    switch_type low_spo2_switch = 11;   //血氧过低开关
    switch_type af_abnormal_switch = 12;   //房颤异常提醒开关
}

message protocol_remind_switch_inquire_reply
{
    uint32 func_table = 1;//1bytes 功能表
    operate_type operate = 2; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    switch_type goal_achieved_switch = 3;//目标达成提醒开关
    switch_type low_power_switch = 4;           //低电量提醒开关
    switch_type charger_full_switch = 5;//充电满提醒开关
    switch_type find_ring_led_switch = 6;//寻找戒指闪灯开关
    switch_type ntctemperature_high_switch = 7;//NTC温度过高提醒开关
    switch_type heart_rate_high_switch = 8;//心率过高提醒开关
    switch_type heart_rate_low_switch = 9;
    switch_type sedentary_remind_switch = 10;  //久坐提醒开关
    switch_type high_stress_switch = 11;   //压力过高提醒开关
    switch_type low_spo2_switch = 12;   //血氧过低开关
    switch_type af_abnormal_switch = 13;   //房颤异常提醒开关
}
```

### `func_table` 位说明

| bit位 | 说明 |
|-|-|
| 0 | 是否支持目标达成提醒开关，影响 goal_achieved_switch |
