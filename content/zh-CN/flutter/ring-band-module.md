---
docId: flutter-ring-band-module
locale: zh-CN
title: "Flutter 戒指/手环模块"
description: "使用戒指与手环的健康测量、提醒、运动识别及校准能力。"
platform: Flutter
slug: flutter/ring-band-module
order: 130
status: published
version: v2.0
---

# Flutter 戒指/手环模块

使用戒指与手环的健康测量、提醒、运动识别及校准能力。

## 健康测量
```dart
///Start measurement
sdkManager.startMeasure(selectedType: ring_health_type.values[options.indexOf(selectedOption.value)],timeout: const Duration(seconds: 60),measureDuration:  const Duration(seconds: 30), onResult: (e){
  debugData.value = e.toString();
  measuredValue.value = e.value;
},success: (){
  state.value = "测量完成 ✅";
}, failure: (e){

  state.value = e.message;
});
  ///End measurement
sdkManager.stopMeasure(ring_health_type.values[options.indexOf(selectedOption.value)]);
```

## 戒指/手环提醒开关
```dart
///get
sdkManager.getWatchReminderWitch(callBack: (reply){
  try {
    // 兼容返回对象为相同协议体
    goalAchievedOn.value = reply.goalAchievedSwitch == switch_type.SWITCH_ON;
    lowPowerOn.value = reply.lowPowerSwitch == switch_type.SWITCH_ON;
    chargerFullOn.value = reply.chargerFullSwitch == switch_type.SWITCH_ON;
    findRingLedOn.value = reply.findRingLedSwitch == switch_type.SWITCH_ON;
    ntcTemperatureHighOn.value = reply.ntctemperatureHighSwitch == switch_type.SWITCH_ON;
    heartRateHighOn.value = reply.heartRateHighSwitch == switch_type.SWITCH_ON;
    heartRateLowOn.value = reply.heartRateLowSwitch == switch_type.SWITCH_ON;
    sedentaryRemindOn.value = reply.sedentaryRemindSwitch == switch_type.SWITCH_ON;
    highStressOn.value = reply.highStressSwitch == switch_type.SWITCH_ON;
    lowSpo2On.value = reply.lowSpo2Switch == switch_type.SWITCH_ON;
    afAbnormalOn.value = reply.afAbnormalSwitch == switch_type.SWITCH_ON;
    edaHighStressOn.value = reply.edaHighStressSwitch == switch_type.SWITCH_ON;
    update();
  } catch (e) {
    CreekLog.error("解析提醒开关失败 $e");
  }
},errCallBack: (e){

});

  ///set
protocol_remind_mark_switch_operate operate = protocol_remind_mark_switch_operate();
operate.operate = operate_type.SET;
operate.goalAchievedSwitch = goalAchievedOn.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF; //目标达成提醒开关
operate.lowPowerSwitch = lowPowerOn.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF; //低电量提醒开关
operate.chargerFullSwitch = chargerFullOn.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF; //充电满提醒开关
operate.findRingLedSwitch = findRingLedOn.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF; //寻找戒指闪灯开关
operate.ntctemperatureHighSwitch = ntcTemperatureHighOn.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF; //NTC温度过高提醒开关
operate.heartRateHighSwitch = heartRateHighOn.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF; //心率过高提醒开关
operate.heartRateLowSwitch = heartRateLowOn.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF; //心率过低提醒开关
operate.sedentaryRemindSwitch = sedentaryRemindOn.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
operate.highStressSwitch = highStressOn.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
operate.lowSpo2Switch = lowSpo2On.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
operate.afAbnormalSwitch = afAbnormalOn.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
operate.edaHighStressSwitch = edaHighStressOn.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
//设备触发提醒开关
sdkManager.setWatchReminderWitch(operate: operate, callBack: (){
  CreekLog.info("设置开关成功");
}, errCallBack: (e){
  CreekLog.error("设置开关失败 $e");
});
```

## 提醒通知
```dart
sdkManager.ringReminderListen ((e){

});
```

## 闹钟通知
```dart
sdkManager.ringAlarmVibrateListen ((e){

});
```

## 运动自动识别
```dart
sdkManager.motionRecognitionListen ((e){

});
```

## 红外校准按钮
```dart
protocol_ir_calibration_button_operate operate = protocol_ir_calibration_button_operate();
operate.operate = operate_type.SET;
operate.irCalibrationSwitch = value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
sdkManager.setIrCalibrationButton(
      operate: operate,
      callBack: () {

      },
      errCallBack: (e) {

      }
  );
}

protocol_ir_calibration_button_operate operate = protocol_ir_calibration_button_operate();
operate.operate = operate_type.INQUIRE;
sdkManager.getIrCalibrationButton(
    operate: operate,
    callBack: (reply) {

    },
    errCallBack: (e) {

    }
);
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum tran_direction_type {
    WATCH_TRAN = 0; // 操作由手表发起。
    APP_TRAN = 1; // 操作由应用发起。
}

enum ring_health_type {
    HEART_RATE = 0; // 心率
    STRESS = 1; // 压力
    SPO2 = 2; // 血氧
    HRV = 3; // HRV
    RESPIRATORY_RATE = 4; // 呼吸率
    AF = 5; // 鱼跃房颤算法
}

enum health_measure_type {
    HEALTH_MEASURE_START = 0; // 开始测量
    HEALTH_MEASURE_PAUSE = 1; // 暂停测量
    HEALTH_MEASURE_STOP = 2; // 停止测量
    HEALTH_MEASURE_INQUIRE = 3; // 查询状态
}

enum health_measure_status {
    HEALTH_STATUS_MEASURING = 0; // 测量中
    HEALTH_STATUS_NO_WEAR = 1; // 未佩戴
    HEALTH_STATUS_RESULT = 2; // 测量结果
    HEALTH_STATUS_FAIL = 3; // 测量失败
}

message protocol_ring_click_measure_operate {
    tran_direction_type tran_type = 1; // 本次操作的发起方。
    ring_health_type health_type = 2; // 测量类型
    health_measure_type measure_type = 3; // 测量操作
    uint32 value = 4; // 测量值
    uint32 measure_time = 5; // 测量时间
    health_measure_status measure_status = 6; // 测量状态
    bytes data_list = 7; // 数据组
    uint32 pulse_rate_value = 8; // 脉率测量值
}
```

```protobuf
syntax = "proto3";

enum CommonErrorCode {
  COMMON_UNKNOWN = 0;             // Unknown error
  COMMON_IN_PROGRESS = 1;         // Operation in progress
  COMMON_CANCELED = 2;            // Operation canceled
  COMMON_TIMEOUT = 3;             // Timeout
  COMMON_NOT_WORN = 4;            // Not worn
  COMMON_FAILED = 5;              // Operation failed
  COMMON_INTERNAL_ERROR = 6;      // Internal error
}

message CommonError {
  CommonErrorCode code = 1; // 错误码。
  string message = 2; // 便于阅读的错误信息。
}
```

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0; // 无效或未指定的值。
    INQUIRE = 1; // 查询
    SET = 2; // 设置
}

enum switch_type
{
    SWITCH_NULL = 0; // NULL
    SWITCH_ON = 1; // 开启
    SWITCH_OFF = 2; // 关闭
}

message protocol_remind_mark_switch_operate
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    switch_type goal_achieved_switch = 2; // 目标达成提醒开关
    switch_type low_power_switch = 3; // 低电量提醒开关
    switch_type charger_full_switch = 4; // 充电满提醒开关
    switch_type find_ring_led_switch =5; // 寻找戒指闪灯开关
    switch_type ntctemperature_high_switch = 6; // NTC温度过高提醒开关
    switch_type heart_rate_high_switch = 7; // 心率过高提醒开关
    switch_type heart_rate_low_switch = 8; // 心率过低提醒开关
    switch_type sedentary_remind_switch = 9; // 久坐提醒开关
    switch_type high_stress_switch = 10; // 压力过高提醒开关
    switch_type low_spo2_switch = 11; // 血氧过低开关
    switch_type af_abnormal_switch = 12; // 房颤异常提醒开关
}

message protocol_remind_switch_inquire_reply
{
    uint32 func_table = 1; // 1bytes 功能表
    operate_type operate = 2; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    switch_type goal_achieved_switch = 3; // 目标达成提醒开关
    switch_type low_power_switch = 4; // 低电量提醒开关
    switch_type charger_full_switch = 5; // 充电满提醒开关
    switch_type find_ring_led_switch = 6; // 寻找戒指闪灯开关
    switch_type ntctemperature_high_switch = 7; // NTC温度过高提醒开关
    switch_type heart_rate_high_switch = 8; // 心率过高提醒开关
    switch_type heart_rate_low_switch = 9; // 低心率提醒开关状态。
    switch_type sedentary_remind_switch = 10; // 久坐提醒开关
    switch_type high_stress_switch = 11; // 压力过高提醒开关
    switch_type low_spo2_switch = 12; // 血氧过低开关
    switch_type af_abnormal_switch = 13; // 房颤异常提醒开关
}
```

```protobuf
syntax = "proto3";

enum ring_goal_status 
{
    GOAL_NOT_ACHIEVED  = 0; // 未达成
    GOAL_ACHIEVED = 1; // 已达成
    EVENT_INVAlID  = 2; // 事件无效
}

message ring_remind_event_time
{
    uint32 year = 1; // 事件发生的起始时间点
    uint32 month = 2; // 月份。
    uint32 day = 3; // 日期。
    uint32 hour = 4; // 小时。
    uint32 minute = 5; // 分钟。
    uint32 second = 6; // 秒。
    uint32 duration = 7; // 事件的持续时长，单位s
}

enum ring_remind_type
{
    RING_REMIND_TYPE_ALERT  = 0; // 弹窗通知
    RING_REMIND_TYPE_SILENT = 1; // 静默执行
}

enum ring_remind_event_type
{
    INVALID_EVENT = 0; // 无效或未指定的事件。
    STEP_GOAL = 1; // 步数目标达成状态
    KCAL_GOAL = 2; // 卡路里目标达成状态
    ACTIVE_TIME = 3; // 活跃时长目标达成状态
    STAND_TIME = 4; // 站立时长目标达成状态
    DIS_TIME = 5; // 距离目标达成状态
    EXERCISE_TIME = 6; // 锻炼时长目标达成状态
    HIGH_HEART_RATE = 7; // 高心率提醒
    LOW_HEART_RATE = 8; // 低心率提醒
    LOW_POWER = 9; // 低电量提醒
    NTC_HIGH_TEMPERATURE = 10; // NTC温度过高
    NTC_LOW_TEMPERATURE = 11; // NTC温度过低
    HRV_MEASURE_FAILED = 12; // hrv测量失败
    STRESS_MEASURE_FAILED = 13; // 压力测量失败
    RESPIRATORY_MEASURE_FAILED = 14; // 呼吸率测量失败
    CHARGE_FULL = 15; // 充电满
    SYS_POWEROFF = 16; // 关机提醒标记
    IS_AF = 17; // 疑似房颤提醒标记
    SEDENTARY_REMIND = 18; // 久坐提醒
    HIGH_STRESS = 19; // 压力过高提醒
    LOW_SPO2 = 20; // 血氧过低提醒
    CORE_HIGH_TEMPERATURE = 21; // 核心体温过高
    CORE_LOW_TEMPERATURE = 22; // 核心体温过低
    EDA_HIGH_STRESS = 23; // EDA压力过高提醒

    WEAR_REMIND = 24; // 佩戴提醒
    WEAR_REMIND_SEC = 25;   // 未佩戴第二次提醒(40分钟)
}

message protocol_ring_remind_mark_operate
{
    tran_direction_type tran_type = 1; // 本次操作的发起方。
    uint32 func_table = 2; // 1bytes 功能表
    ring_remind_event_type event_id = 3; // 1bytes 事件id
    ring_goal_status event_value = 4; // 具体事件数值
    ring_remind_event_time event_time = 5; // 事件发生的时间
    ring_remind_type remind_type = 6; // 提醒方式
    int32 current_value = 7; // 事件当前值（核心体温*100）
    uint32 event_value_min = 8; // 事件最小值
    uint32 event_value_max = 9; // 事件最大值
}
```

```protobuf
syntax = "proto3";

enum ring_alarm_vibrate_status {
    VIBRATION_STOP = 0;  // Vibration stopped
    VIBRATION_START = 1; // Vibration started
}

message protocol_ring_alarm_vibrate_notify_operate {
    tran_direction_type tran_type = 1; // 本次操作的发起方。
    uint32 func_table = 2; // 1bytes 功能表
    uint32 alarm_id = 3; // 闹钟id 从0开始
    uint32 hour = 4; // 1bytes
    uint32 minute = 5; // 1bytes
    bytes alarm_name = 6; // max:30 闹钟名称
    ring_alarm_vibrate_status status = 7; // 闹钟震动状态
}
```

```protobuf
syntax = "proto3";

message protocol_ring_motion_recognition_operate {
    tran_direction_type tran_type = 1; // 本次操作的发起方。
    uint32 func_table = 2; // 1bytes 功能表
    sport_type sport_type = 3; // 运动识别运动类型
}
```

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0; // 无效或未指定的值。
    INQUIRE = 1; // 查询
    SET = 2; // 设置
}

enum switch_type
{
    SWITCH_NULL = 0; // NULL
    SWITCH_ON = 1; // 开启
    SWITCH_OFF = 2; // 关闭
}

message protocol_ir_calibration_button_operate
{
    operate_type operate = 1; // 1bytes操作类型 0：无效操作 1：查询 2：设置
    switch_type ir_calibration_switch = 2; // 1bytes 红外校准的校准按钮 true 开启,false 关闭
}

message protocol_ir_calibration_button_inquire_reply
{
    operate_type operate = 1; // 1bytes操作类型 0：无效操作 1：查询 2：设置
    switch_type ir_calibration_switch = 2; // 1bytes 红外校准的校准按钮 true 开启,false 关闭
}
```

### 字段说明

#### `protocol_ring_click_measure_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `tran_type` | `tran_direction_type` | 本次操作的发起方。 |
| `health_type` | `ring_health_type` | 测量类型 |
| `measure_type` | `health_measure_type` | 测量操作 |
| `value` | `uint32` | 测量值 |
| `measure_time` | `uint32` | 测量时间 |
| `measure_status` | `health_measure_status` | 测量状态 |
| `data_list` | `bytes` | 数据组 |
| `pulse_rate_value` | `uint32` | 脉率测量值 |

#### `CommonError`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `code` | `CommonErrorCode` | 错误码。 |
| `message` | `string` | 便于阅读的错误信息。 |

#### `protocol_remind_mark_switch_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `goal_achieved_switch` | `switch_type` | 目标达成提醒开关 |
| `low_power_switch` | `switch_type` | 低电量提醒开关 |
| `charger_full_switch` | `switch_type` | 充电满提醒开关 |
| `find_ring_led_switch` | `switch_type` | 寻找戒指闪灯开关 |
| `ntctemperature_high_switch` | `switch_type` | NTC温度过高提醒开关 |
| `heart_rate_high_switch` | `switch_type` | 心率过高提醒开关 |
| `heart_rate_low_switch` | `switch_type` | 心率过低提醒开关 |
| `sedentary_remind_switch` | `switch_type` | 久坐提醒开关 |
| `high_stress_switch` | `switch_type` | 压力过高提醒开关 |
| `low_spo2_switch` | `switch_type` | 血氧过低开关 |
| `af_abnormal_switch` | `switch_type` | 房颤异常提醒开关 |

#### `protocol_remind_switch_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `func_table` | `uint32` | 1bytes 功能表 |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `goal_achieved_switch` | `switch_type` | 目标达成提醒开关 |
| `low_power_switch` | `switch_type` | 低电量提醒开关 |
| `charger_full_switch` | `switch_type` | 充电满提醒开关 |
| `find_ring_led_switch` | `switch_type` | 寻找戒指闪灯开关 |
| `ntctemperature_high_switch` | `switch_type` | NTC温度过高提醒开关 |
| `heart_rate_high_switch` | `switch_type` | 心率过高提醒开关 |
| `heart_rate_low_switch` | `switch_type` | 低心率提醒开关状态。 |
| `sedentary_remind_switch` | `switch_type` | 久坐提醒开关 |
| `high_stress_switch` | `switch_type` | 压力过高提醒开关 |
| `low_spo2_switch` | `switch_type` | 血氧过低开关 |
| `af_abnormal_switch` | `switch_type` | 房颤异常提醒开关 |

#### `ring_remind_event_time`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `year` | `uint32` | 事件发生的起始时间点 |
| `month` | `uint32` | 月份。 |
| `day` | `uint32` | 日期。 |
| `hour` | `uint32` | 小时。 |
| `minute` | `uint32` | 分钟。 |
| `second` | `uint32` | 秒。 |
| `duration` | `uint32` | 事件的持续时长，单位s |

#### `protocol_ring_remind_mark_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `tran_type` | `tran_direction_type` | 本次操作的发起方。 |
| `func_table` | `uint32` | 1bytes 功能表 |
| `event_id` | `ring_remind_event_type` | 1bytes 事件id |
| `event_value` | `ring_goal_status` | 具体事件数值 |
| `event_time` | `ring_remind_event_time` | 事件发生的时间 |
| `remind_type` | `ring_remind_type` | 提醒方式 |
| `current_value` | `int32` | 事件当前值（核心体温*100） |
| `event_value_min` | `uint32` | 事件最小值 |
| `event_value_max` | `uint32` | 事件最大值 |

#### `protocol_ring_alarm_vibrate_notify_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `tran_type` | `tran_direction_type` | 本次操作的发起方。 |
| `func_table` | `uint32` | 1bytes 功能表 |
| `alarm_id` | `uint32` | 闹钟id 从0开始 |
| `hour` | `uint32` | 1bytes |
| `minute` | `uint32` | 1bytes |
| `alarm_name` | `bytes` | max:30 闹钟名称 |
| `status` | `ring_alarm_vibrate_status` | 闹钟震动状态 |

#### `protocol_ring_motion_recognition_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `tran_type` | `tran_direction_type` | 本次操作的发起方。 |
| `func_table` | `uint32` | 1bytes 功能表 |
| `sport_type` | `sport_type` | 运动识别运动类型 |

#### `protocol_ir_calibration_button_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes操作类型 0：无效操作 1：查询 2：设置 |
| `ir_calibration_switch` | `switch_type` | 1bytes 红外校准的校准按钮 true 开启,false 关闭 |

#### `protocol_ir_calibration_button_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes操作类型 0：无效操作 1：查询 2：设置 |
| `ir_calibration_switch` | `switch_type` | 1bytes 红外校准的校准按钮 true 开启,false 关闭 |

### 枚举值

#### `tran_direction_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `WATCH_TRAN` | `0` | 操作由手表发起。 |
| `APP_TRAN` | `1` | 操作由应用发起。 |

#### `ring_health_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `HEART_RATE` | `0` | 心率 |
| `STRESS` | `1` | 压力 |
| `SPO2` | `2` | 血氧 |
| `HRV` | `3` | HRV |
| `RESPIRATORY_RATE` | `4` | 呼吸率 |
| `AF` | `5` | 鱼跃房颤算法 |

#### `health_measure_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `HEALTH_MEASURE_START` | `0` | 开始测量 |
| `HEALTH_MEASURE_PAUSE` | `1` | 暂停测量 |
| `HEALTH_MEASURE_STOP` | `2` | 停止测量 |
| `HEALTH_MEASURE_INQUIRE` | `3` | 查询状态 |

#### `health_measure_status`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `HEALTH_STATUS_MEASURING` | `0` | 测量中 |
| `HEALTH_STATUS_NO_WEAR` | `1` | 未佩戴 |
| `HEALTH_STATUS_RESULT` | `2` | 测量结果 |
| `HEALTH_STATUS_FAIL` | `3` | 测量失败 |

#### `CommonErrorCode`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `COMMON_UNKNOWN` | `0` | Unknown error |
| `COMMON_IN_PROGRESS` | `1` | Operation in progress |
| `COMMON_CANCELED` | `2` | Operation canceled |
| `COMMON_TIMEOUT` | `3` | Timeout |
| `COMMON_NOT_WORN` | `4` | Not worn |
| `COMMON_FAILED` | `5` | Operation failed |
| `COMMON_INTERNAL_ERROR` | `6` | Internal error |

#### `operate_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `INVALID` | `0` | 无效或未指定的值。 |
| `INQUIRE` | `1` | 查询 |
| `SET` | `2` | 设置 |

#### `switch_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `SWITCH_NULL` | `0` | NULL |
| `SWITCH_ON` | `1` | 开启 |
| `SWITCH_OFF` | `2` | 关闭 |

#### `ring_goal_status`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `GOAL_NOT_ACHIEVED` | `0` | 未达成 |
| `GOAL_ACHIEVED` | `1` | 已达成 |
| `EVENT_INVAlID` | `2` | 事件无效 |

#### `ring_remind_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `RING_REMIND_TYPE_ALERT` | `0` | 弹窗通知 |
| `RING_REMIND_TYPE_SILENT` | `1` | 静默执行 |

#### `ring_remind_event_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `INVALID_EVENT` | `0` | 无效或未指定的事件。 |
| `STEP_GOAL` | `1` | 步数目标达成状态 |
| `KCAL_GOAL` | `2` | 卡路里目标达成状态 |
| `ACTIVE_TIME` | `3` | 活跃时长目标达成状态 |
| `STAND_TIME` | `4` | 站立时长目标达成状态 |
| `DIS_TIME` | `5` | 距离目标达成状态 |
| `EXERCISE_TIME` | `6` | 锻炼时长目标达成状态 |
| `HIGH_HEART_RATE` | `7` | 高心率提醒 |
| `LOW_HEART_RATE` | `8` | 低心率提醒 |
| `LOW_POWER` | `9` | 低电量提醒 |
| `NTC_HIGH_TEMPERATURE` | `10` | NTC温度过高 |
| `NTC_LOW_TEMPERATURE` | `11` | NTC温度过低 |
| `HRV_MEASURE_FAILED` | `12` | hrv测量失败 |
| `STRESS_MEASURE_FAILED` | `13` | 压力测量失败 |
| `RESPIRATORY_MEASURE_FAILED` | `14` | 呼吸率测量失败 |
| `CHARGE_FULL` | `15` | 充电满 |
| `SYS_POWEROFF` | `16` | 关机提醒标记 |
| `IS_AF` | `17` | 疑似房颤提醒标记 |
| `SEDENTARY_REMIND` | `18` | 久坐提醒 |
| `HIGH_STRESS` | `19` | 压力过高提醒 |
| `LOW_SPO2` | `20` | 血氧过低提醒 |
| `CORE_HIGH_TEMPERATURE` | `21` | 核心体温过高 |
| `CORE_LOW_TEMPERATURE` | `22` | 核心体温过低 |
| `EDA_HIGH_STRESS` | `23` | EDA压力过高提醒 |
| `WEAR_REMIND` | `24` | 佩戴提醒 |
| `WEAR_REMIND_SEC` | `25` | 未佩戴第二次提醒(40分钟) |

#### `ring_alarm_vibrate_status`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `VIBRATION_STOP` | `0` | Vibration stopped |
| `VIBRATION_START` | `1` | Vibration started |

#### `operate_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `INVALID` | `0` | 无效或未指定的值。 |
| `INQUIRE` | `1` | 查询 |
| `SET` | `2` | 设置 |

#### `switch_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `SWITCH_NULL` | `0` | NULL |
| `SWITCH_ON` | `1` | 开启 |
| `SWITCH_OFF` | `2` | 关闭 |

### `func_table` 功能位

| bit位 | 说明 |
| - | - |
| 0 | 是否支持目标达成提醒开关，影响 goal_achieved_switch |
