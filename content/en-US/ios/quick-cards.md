---
docId: ios-quick-cards
locale: en-US
title: iOS Quick Cards
description: Read and update the device quick-card list.
platform: iOS
slug: ios/quick-cards
order: 111
status: published
version: v2.0
---

# iOS Quick Cards

## Overview

Read and update the device quick-card list.

## Swift example

```swift
// get
            CreekInterFace.instance.getCard { model in
                var operate =  protocol_quick_card_operate()
                var cardType:[quick_card_type] = []
                model.cardType.forEach { type in
                    
                    if type == .cardTypeDial {
                        if  model.cardTypeDialSupport.isDelete ==  false{
                            // supported add
                            cardType.append(type)
                        }
                        
                    }else{
                        if type == .cardTypeActivity{
                        }else{
                           // add
                            cardType.append(type)
                        }
                    }
                
                   
                }
                operate.cardType =  cardType
                // set
                CreekInterFace.instance.setCard(model: operate) {
                    self.view.hideRemark()
                    self.textView.text = "success"
                } failure: { code, message in
                    self.view.hideRemark()
                    self.textView.text = message
                }
```

## Capability-table fields

Check these fields after reading `protocol_function_table`:

```protobuf
message function_table {
    bool is_support = 1;// Whether the capability is supported.
    uint32 cmd_id = 2;// Capability command identifier.
}

message protocol_function_table {
    function_table quick_card = 11;// Quick-card capability.
}
```

## Protobuf data model

```protobuf
syntax = "proto3";

enum quick_card_type
{
    CARD_TYPE_EXERCISE  = 0;
    CARD_TYPE_WEATHER   = 1;// weather
    CARD_TYPE_SUGGEST   = 2;// CARD TYPE SUGGEST
    CARD_TYPE_DIAL      = 3;
    CARD_TYPE_ACTIVITY  = 4;
    CARD_TYPE_HEARTRATE = 5;
    CARD_TYPE_SLEEP     = 6;// CARD TYPE SLEEP
    CARD_TYPE_STEPS     = 7;// CARD TYPE STEPS
    CARD_TYPE_SPO2      = 8;
    CARD_TYPE_MENSTRUATION = 9;// CARD TYPE MENSTRUATION
    CARD_TYPE_MEASUREMENT  = 10;// CARD TYPE MEASUREMENT
    CARD_TYPE_RECENT_WORKOUT = 11;// CARD TYPE RECENT WORKOUT
    CARD_TYPE_HRV       = 12;
    CARD_TYPE_UV        = 13;// CARD TYPE UV
    CARD_TYPE_ASTRONOMY = 14;// Astronomy information.
    CARD_TYPE_WORLD_CLOCK = 15;// world clock
    CARD_TYPE_ALEXA     = 16;// alexa
    CARD_TYPE_ALIPAY = 17;// CARD TYPE ALIPAY
    CARD_TYPE_STRESS = 18;// CARD TYPE STRESS
    CARD_TYPE_HEALTH_EXPRESS = 19;// health snapshot hrv ,
    CARD_TYPE_TEMPERATURE = 20;// CARD TYPE TEMPERATURE
    CARD_TYPE_DRINK_ASSISTANT = 21;// hydration
    CARD_TYPE_TRAINING_LOAD = 22;// CARD TYPE TRAINING LOAD
    CARD_TYPE_HEALTH_SNAP = 23;// health snapshot
    CARD_TYPE_INTENSITY_MINUTES = 24;// CARD TYPE INTENSITY MINUTES
    CARD_TYPE_COMPASS = 25; // CARD TYPE COMPASS

}

message quick_card_func{
    bool is_support = 1;// whether supported
    bool is_delete = 2; // Whether the card may be removed
}

message protocol_quick_card_operate
{
    operate_type operate = 1; // Operation: 0 invalid, 1 query, 2 set
    repeated quick_card_type card_type = 2;
}

message protocol_quick_card_inquire_reply
{
    operate_type operate = 1; // Operation: 0 invalid, 1 query, 2 set
    uint32 quick_card_support_max = 2; // Maximum supported quick cards; 1 byte
    uint32 quick_card_support_min = 3; // Minimum required quick cards; 1 byte
    uint32 func_table = 4;// Quick-card capability bit field
    repeated quick_card_type card_type  = 5;// Card types currently configured
    quick_card_func card_type_exercise_support      = 6;
    quick_card_func card_type_weather_support       = 7;// Weather-card support and removability
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
