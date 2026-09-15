---
docId: flutter-quick-card
locale: zh-CN
title: "Flutter 快捷卡片"
description: "读取、排序、添加与移除快捷卡片。"
platform: Flutter
slug: flutter/quick-card
order: 111
status: published
version: v2.0
---

# Flutter 快捷卡片

读取、排序、添加与移除快捷卡片。

## 接口示例

```dart
///get
sdkManager.getCard(callBack: (e){

  protocol_quick_card_operate operate =  protocol_quick_card_operate();
  List<quick_card_type> types = [];
  for (var type in e.cardType) {
    if(type == quick_card_type.CARD_TYPE_DIAL){
      if(e.cardTypeDialSupport.isDelete == false){
      ///Removal is not supported and must be added
        types.add(type);
      }
    }else{
      ///All other changes can be removed
      if(type == quick_card_type.CARD_TYPE_ACTIVITY){

      }else{
        types.add(type);
      }
    }
  }

  ///set
  sdkManager.setCard(operate: operate,callBack: (){

  },errCallBack: (e){

  });

},errCallBack: (e){

});
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum quick_card_type
{
    CARD_TYPE_EXERCISE  = 0; // 卡片类型锻炼。
    CARD_TYPE_WEATHER   = 1; // 天气
    CARD_TYPE_SUGGEST   = 2; // 建议
    CARD_TYPE_DIAL      = 3; // 卡片类型表盘。
    CARD_TYPE_ACTIVITY  = 4; // 卡片类型活动。
    CARD_TYPE_HEARTRATE = 5; // 卡片类型心率。
    CARD_TYPE_SLEEP     = 6; // 睡眠
    CARD_TYPE_STEPS     = 7; // 计步
    CARD_TYPE_SPO2      = 8; // 卡片类型血氧。
    CARD_TYPE_MENSTRUATION = 9; // 女性生理周期
    CARD_TYPE_MEASUREMENT  = 10; // 一键测量（血氧、心率、压力）
    CARD_TYPE_RECENT_WORKOUT = 11; // 最近一次户外运动的轨迹和活动
    CARD_TYPE_HRV       = 12; // 卡片类型心率变异性。
    CARD_TYPE_UV        = 13; // 紫外线
    CARD_TYPE_ASTRONOMY = 14; // 月出月落、日出日落
    CARD_TYPE_WORLD_CLOCK = 15; // 世界时钟
    CARD_TYPE_ALEXA     = 16; // alexa
    CARD_TYPE_ALIPAY = 17; // 支付宝
    CARD_TYPE_STRESS = 18; // 压力
    CARD_TYPE_HEALTH_EXPRESS = 19; // 健康快照（心率，血氧，压力，hrv ,呼吸率）
    CARD_TYPE_TEMPERATURE = 20; // 体温
    CARD_TYPE_DRINK_ASSISTANT = 21; // 喝水助手
    CARD_TYPE_TRAINING_LOAD = 22; // 训练负荷
    CARD_TYPE_HEALTH_SNAP = 23; // 健康快照
    CARD_TYPE_INTENSITY_MINUTES = 24; // 周训练
    CARD_TYPE_COMPASS = 25; // 指南针
}

message quick_card_func{
    bool is_support = 1; // 是否支持
    bool is_delete = 2; // 是否支持删除
}

message protocol_quick_card_operate
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    repeated quick_card_type card_type = 2; // 已配置的快捷卡片类型。
}

message protocol_quick_card_inquire_reply
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 quick_card_support_max = 2; // 1bytes 快捷卡片支持显示最大数量
    uint32 quick_card_support_min = 3; // 1bytes 快捷卡片支持显示最小数量
    uint32 func_table = 4; // 功能位掩码。
    repeated quick_card_type card_type  = 5; // 已配置的快捷卡片类型。
    quick_card_func card_type_exercise_support      = 6; // 是否支持锻炼快捷卡片。
    quick_card_func card_type_weather_support       = 7; // 支持类型
    quick_card_func card_type_suggest_support       = 8; // 是否支持建议快捷卡片。
    quick_card_func card_type_dial_support          = 9; // 是否支持表盘快捷卡片。
    quick_card_func card_type_activity_support      = 10; // 是否支持活动快捷卡片。
    quick_card_func card_type_heartrate_support     = 11; // 是否支持心率快捷卡片。
    quick_card_func card_type_sleep_support         = 12; // 是否支持睡眠快捷卡片。
    quick_card_func card_type_steps_support         = 13; // 是否支持步数快捷卡片。
    quick_card_func card_type_spo2_support          = 14; // 是否支持血氧快捷卡片。
    quick_card_func card_type_menstruation_support  = 15; // 是否支持女性健康快捷卡片。
    quick_card_func card_type_measurement_support   = 16; // 是否支持测量快捷卡片。
    quick_card_func card_type_recent_workout_support = 17; // 是否支持最近运动快捷卡片。
    quick_card_func card_type_hrv_support           = 18; // 是否支持心率变异性快捷卡片。
    quick_card_func card_type_uv_support            = 19; // 是否支持紫外线快捷卡片。
    quick_card_func card_type_astronomy_support     = 20; // 是否支持天文快捷卡片。
    quick_card_func card_type_world_clock_support   = 21; // 是否支持世界时钟快捷卡片。
    quick_card_func card_type_alexa_support         = 22; // 是否支持Alexa快捷卡片。
    quick_card_func card_type_stress_support        = 23; // 是否支持压力快捷卡片。
    quick_card_func card_type_alipay_support        = 24; // 是否支持支付宝快捷卡片。
    quick_card_func card_type_health_express_support  = 25; // 是否支持健康快捷测量快捷卡片。
    quick_card_func card_type_temperature_support   = 26; // 是否支持温度快捷卡片。
    quick_card_func card_type_drink_assitant_support = 27; // 是否支持饮水助手快捷卡片。
    quick_card_func card_type_training_load_support  = 28; // 是否支持训练负荷快捷卡片。
    quick_card_func card_type_health_snap_support    = 29; // 是否支持健康快照快捷卡片。
    quick_card_func card_type_intensity_minutes_support = 30; // 是否支持强度分钟快捷卡片。
    quick_card_func card_type_compass_support           = 31; // 是否支持指南针快捷卡片。
}
```

### 字段说明

#### `quick_card_func`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `is_support` | `bool` | 是否支持 |
| `is_delete` | `bool` | 是否支持删除 |

#### `protocol_quick_card_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `card_type` | `repeated quick_card_type` | 已配置的快捷卡片类型。 |

#### `protocol_quick_card_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `quick_card_support_max` | `uint32` | 1bytes 快捷卡片支持显示最大数量 |
| `quick_card_support_min` | `uint32` | 1bytes 快捷卡片支持显示最小数量 |
| `func_table` | `uint32` | 功能位掩码。 |
| `card_type` | `repeated quick_card_type` | 已配置的快捷卡片类型。 |
| `card_type_exercise_support` | `quick_card_func` | 是否支持锻炼快捷卡片。 |
| `card_type_weather_support` | `quick_card_func` | 支持类型 |
| `card_type_suggest_support` | `quick_card_func` | 是否支持建议快捷卡片。 |
| `card_type_dial_support` | `quick_card_func` | 是否支持表盘快捷卡片。 |
| `card_type_activity_support` | `quick_card_func` | 是否支持活动快捷卡片。 |
| `card_type_heartrate_support` | `quick_card_func` | 是否支持心率快捷卡片。 |
| `card_type_sleep_support` | `quick_card_func` | 是否支持睡眠快捷卡片。 |
| `card_type_steps_support` | `quick_card_func` | 是否支持步数快捷卡片。 |
| `card_type_spo2_support` | `quick_card_func` | 是否支持血氧快捷卡片。 |
| `card_type_menstruation_support` | `quick_card_func` | 是否支持女性健康快捷卡片。 |
| `card_type_measurement_support` | `quick_card_func` | 是否支持测量快捷卡片。 |
| `card_type_recent_workout_support` | `quick_card_func` | 是否支持最近运动快捷卡片。 |
| `card_type_hrv_support` | `quick_card_func` | 是否支持心率变异性快捷卡片。 |
| `card_type_uv_support` | `quick_card_func` | 是否支持紫外线快捷卡片。 |
| `card_type_astronomy_support` | `quick_card_func` | 是否支持天文快捷卡片。 |
| `card_type_world_clock_support` | `quick_card_func` | 是否支持世界时钟快捷卡片。 |
| `card_type_alexa_support` | `quick_card_func` | 是否支持Alexa快捷卡片。 |
| `card_type_stress_support` | `quick_card_func` | 是否支持压力快捷卡片。 |
| `card_type_alipay_support` | `quick_card_func` | 是否支持支付宝快捷卡片。 |
| `card_type_health_express_support` | `quick_card_func` | 是否支持健康快捷测量快捷卡片。 |
| `card_type_temperature_support` | `quick_card_func` | 是否支持温度快捷卡片。 |
| `card_type_drink_assitant_support` | `quick_card_func` | 是否支持饮水助手快捷卡片。 |
| `card_type_training_load_support` | `quick_card_func` | 是否支持训练负荷快捷卡片。 |
| `card_type_health_snap_support` | `quick_card_func` | 是否支持健康快照快捷卡片。 |
| `card_type_intensity_minutes_support` | `quick_card_func` | 是否支持强度分钟快捷卡片。 |
| `card_type_compass_support` | `quick_card_func` | 是否支持指南针快捷卡片。 |

### 枚举值

#### `quick_card_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `CARD_TYPE_EXERCISE` | `0` | 卡片类型锻炼。 |
| `CARD_TYPE_WEATHER` | `1` | 天气 |
| `CARD_TYPE_SUGGEST` | `2` | 建议 |
| `CARD_TYPE_DIAL` | `3` | 卡片类型表盘。 |
| `CARD_TYPE_ACTIVITY` | `4` | 卡片类型活动。 |
| `CARD_TYPE_HEARTRATE` | `5` | 卡片类型心率。 |
| `CARD_TYPE_SLEEP` | `6` | 睡眠 |
| `CARD_TYPE_STEPS` | `7` | 计步 |
| `CARD_TYPE_SPO2` | `8` | 卡片类型血氧。 |
| `CARD_TYPE_MENSTRUATION` | `9` | 女性生理周期 |
| `CARD_TYPE_MEASUREMENT` | `10` | 一键测量（血氧、心率、压力） |
| `CARD_TYPE_RECENT_WORKOUT` | `11` | 最近一次户外运动的轨迹和活动 |
| `CARD_TYPE_HRV` | `12` | 卡片类型心率变异性。 |
| `CARD_TYPE_UV` | `13` | 紫外线 |
| `CARD_TYPE_ASTRONOMY` | `14` | 月出月落、日出日落 |
| `CARD_TYPE_WORLD_CLOCK` | `15` | 世界时钟 |
| `CARD_TYPE_ALEXA` | `16` | alexa |
| `CARD_TYPE_ALIPAY` | `17` | 支付宝 |
| `CARD_TYPE_STRESS` | `18` | 压力 |
| `CARD_TYPE_HEALTH_EXPRESS` | `19` | 健康快照（心率，血氧，压力，hrv ,呼吸率） |
| `CARD_TYPE_TEMPERATURE` | `20` | 体温 |
| `CARD_TYPE_DRINK_ASSISTANT` | `21` | 喝水助手 |
| `CARD_TYPE_TRAINING_LOAD` | `22` | 训练负荷 |
| `CARD_TYPE_HEALTH_SNAP` | `23` | 健康快照 |
| `CARD_TYPE_INTENSITY_MINUTES` | `24` | 周训练 |
| `CARD_TYPE_COMPASS` | `25` | 指南针 |
