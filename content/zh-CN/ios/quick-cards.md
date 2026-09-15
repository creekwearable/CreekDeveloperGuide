---
docId: ios-quick-cards
locale: zh-CN
title: iOS 快捷卡片
description: 读取和调整设备快捷卡片列表。
platform: iOS
slug: ios/quick-cards
order: 111
status: published
version: v2.0
---

# iOS 快捷卡片

## 功能说明

读取和调整设备快捷卡片列表。

## Swift 示例

```swift
///获取
            CreekInterFace.instance.getCard { model in
                var operate =  protocol_quick_card_operate()
                var cardType:[quick_card_type] = []
                model.cardType.forEach { type in
                    
                    if type == .cardTypeDial {
                        if  model.cardTypeDialSupport.isDelete ==  false{
                            ///不支持移除  必须添加
                            cardType.append(type)
                        }
                        
                    }else{
                        ///其他的都可以移除变动
                        if type == .cardTypeActivity{
                            ///移除
                        }else{
                           /// 添加
                            cardType.append(type)
                        }
                    }
                
                   
                }
                operate.cardType =  cardType
                ///设置
                CreekInterFace.instance.setCard(model: operate) {
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
    function_table quick_card = 11;//快捷卡片能力。
}
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum quick_card_type
{
    CARD_TYPE_EXERCISE  = 0;
    CARD_TYPE_WEATHER   = 1;//天气
    CARD_TYPE_SUGGEST   = 2;//建议
    CARD_TYPE_DIAL      = 3;
    CARD_TYPE_ACTIVITY  = 4;
    CARD_TYPE_HEARTRATE = 5;
    CARD_TYPE_SLEEP     = 6;//睡眠
    CARD_TYPE_STEPS     = 7;//计步
    CARD_TYPE_SPO2      = 8;
    CARD_TYPE_MENSTRUATION = 9;//女性生理周期
    CARD_TYPE_MEASUREMENT  = 10;//一键测量（血氧、心率、压力）
    CARD_TYPE_RECENT_WORKOUT = 11;//最近一次户外运动的轨迹和活动
    CARD_TYPE_HRV       = 12;
    CARD_TYPE_UV        = 13;//紫外线
    CARD_TYPE_ASTRONOMY = 14;//月出月落、日出日落
    CARD_TYPE_WORLD_CLOCK = 15;//世界时钟
    CARD_TYPE_ALEXA     = 16;//alexa
    CARD_TYPE_ALIPAY = 17;//支付宝
    CARD_TYPE_STRESS = 18;//压力
    CARD_TYPE_HEALTH_EXPRESS = 19;//健康快照（心率，血氧，压力，hrv ,呼吸率）
    CARD_TYPE_TEMPERATURE = 20;//体温
    CARD_TYPE_DRINK_ASSISTANT = 21;//喝水助手
    CARD_TYPE_TRAINING_LOAD = 22;//训练负荷
    CARD_TYPE_HEALTH_SNAP = 23;//健康快照
    CARD_TYPE_INTENSITY_MINUTES = 24;//周训练
    CARD_TYPE_COMPASS = 25; //指南针

}

message quick_card_func{
    bool is_support = 1;//是否支持
    bool is_delete = 2; //是否支持删除
}

message protocol_quick_card_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    repeated quick_card_type card_type = 2;
}

message protocol_quick_card_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 quick_card_support_max = 2; //1bytes 快捷卡片支持显示最大数量
    uint32 quick_card_support_min = 3; //1bytes 快捷卡片支持显示最小数量
    uint32 func_table = 4;
    repeated quick_card_type card_type  = 5;
    quick_card_func card_type_exercise_support      = 6;
    quick_card_func card_type_weather_support       = 7;//支持类型
    quick_card_func card_type_suggest_support       = 8;
    quick_card_func card_type_dial_support          = 9;
    quick_card_func card_type_activity_support      = 10;
    quick_card_func card_type_heartrate_support     = 11;
    quick_card_func card_type_sleep_support         = 12;
    quick_card_func card_type_steps_support         = 13;
    quick_card_func card_type_spo2_support          = 14;
    quick_card_func card_type_menstruation_support  = 15;
    quick_card_func card_type_measurement_support   = 16;
    quick_card_func card_type_recent_workout_support = 17;
    quick_card_func card_type_hrv_support           = 18;
    quick_card_func card_type_uv_support            = 19;
    quick_card_func card_type_astronomy_support     = 20;
    quick_card_func card_type_world_clock_support   = 21;
    quick_card_func card_type_alexa_support         = 22;
    quick_card_func card_type_stress_support        = 23;
    quick_card_func card_type_alipay_support        = 24;
    quick_card_func card_type_health_express_support  = 25;
    quick_card_func card_type_temperature_support   = 26;
    quick_card_func card_type_drink_assitant_support = 27;
    quick_card_func card_type_training_load_support  = 28;
    quick_card_func card_type_health_snap_support    = 29;
    quick_card_func card_type_intensity_minutes_support = 30;
    quick_card_func card_type_compass_support           = 31;
}
```
