---
docId: ios-ring-module
locale: zh-CN
title: iOS 戒指模块
description: 接入戒指健康测量、提醒开关、提醒通知、闹钟通知和运动自识别。
platform: iOS
slug: ios/ring-module
order: 143
status: published
version: v2.0
---

# iOS 戒指模块

## 功能说明

接入戒指健康测量、提醒开关、提醒通知、闹钟通知和运动自识别。

## Swift 示例

```swift
///开始测量
 CreekInterFace.instance.startMeasure(type: selectedType,measureDuration: 30,timeout: 60) { [weak self] model in
          self?.resultLabel.text =  "结果：\(model.value)"
       } success: {[weak self] in
          self?.statusLabel.text = "状态：测量完成 ✅"
       } failure: {[weak self] model in
          self?.statusLabel.text = model.message
       } abnormal: {
          print("有异动")
       } wearingNoStandard: {
          print("不标准")
       }
  ///结束测量
  CreekInterFace.instance.stopMeasure(type: selectedType)
```

```swift
///获取
     CreekInterFace.instance.getWatchReminderWitch { model in

         } failure: { code, message in
    
     }
     ///设置
         var  operate =  protocol_remind_mark_switch_operate()
         operate.goalAchievedSwitch = switch_type.switchOn
         operate.lowPowerSwitch = switch_type.switchOn
         operate.chargerFullSwitch = switch_type.switchOn
         operate.findRingLedSwitch = switch_type.switchOn
         operate.ntctemperatureHighSwitch = switch_type.switchOn
         operate.heartRateHighSwitch = switch_type.switchOn
         operate.heartRateLowSwitch = switch_type.switchOn
         operate.sedentaryRemindSwitch = switch_type.switchOn
         operate.highStressSwitch = switch_type.switchOn
         operate.lowSpo2Switch = switch_type.switchOn
         CreekInterFace.instance.setWatchReminderWitch(model: operate) {
             self.textView.text = "success"
         } failure: { code, message in
            self.textView.text = message
         }
```

```swift
CreekInterFace.instance.ringReminderListen { model in
            let json = try? model.jsonString()
            print(json ?? "")
 }
```

```swift
CreekInterFace.instance.ringAlarmVibrateListen { model in
            let json = try? model.jsonString()
            print(json ?? "")
   }
```

```swift
CreekInterFace.instance.motionRecognitionListen { model in
            let json = try? model.jsonString()
            print(json ?? "")
 }
```

```swift
///测量
   CreekInterFace.instance.startAFMeasure { [weak self]  model in
         self?.resultLabel.text =  "结果：\(model.value) 脉率:\(model.pulseRateValue)"
      } success: {
         self.statusLabel.text = "状态：测量完成 ✅"
      } failure: { model in
         self.statusLabel.text = model.message
      } abnormal: {
         print("有异动")
      } wearingNoStandard: {
         print("不标准")
      } processResult: { model in
         if model.pulseRateValue > 0{
           
         }
      } onCountDown: { type, remainSeconds in
         if type == .pulseRate {
            ///当前脉率倒计时
            print("pulseRate:\(remainSeconds)")
         }else if type == .afMeasure {
            ///当前房颤倒计时
            print("afMeasure:\(remainSeconds)")
         }
      }
      
   ///停止
   CreekInterFace.instance.stopAFMeasure()
```

## 功能表字段

读取 `protocol_function_table` 后检查以下字段：

```protobuf
message function_table {
    bool is_support = 1;//是否支持该能力。
    uint32 cmd_id = 2;//能力对应的指令标识。
}

message protocol_function_table {
    function_table ring_click_measure = 54;//戒指点击测量能力。
    function_table sport_recognition = 27;//运动识别能力。
}
```

## Protobuf 数据模型

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
```

```protobuf
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

```protobuf
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
```

```protobuf
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
```

```protobuf
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
```
