---
docId: android-quick-cards
locale: en-US
title: Android Quick Cards
description: Read and update the device quick-card list.
platform: Android
slug: android/quick-cards
order: 111
status: published
version: v2.0
---

# Android Quick Cards

Read and update the device quick-card list.

```kotlin
// /Get
CreekManager.sInstance.getCard({model: Card.protocol_quick_card_inquire_reply ->
    var operate = Card. protocol_quick_card_operate()
    val cardType: MutableList<Enums.quick_card_type> = mutableListOf()
    model.cardTypeList.forEach { quickCardType ->
        if (quickCardType == Enums.quick_card_type.CARD_TYPE_DIAL) {
            if (!model.cardTypeDialSupport.isDelete) {
                // /Removal is not supported and must be added
                cardType.add(quickCardType)
            }
        }else{
            if(quickCardType == Enums.quick_card_type.CARD_TYPE_ACTIVITY){

            }else{
                cardType.add(quickCardType)
            }
        }
    }
    operate.cardTypeList.addAll(cardType)
    
    // /Set
    CreekManager.sInstance.setCard(model = operate, success = {
        responseText.value = "success"
    }, failure = {_, m ->
        responseText.value = m
    })
}, failure = {_, m ->
    responseText.value = m
})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

enum quick_card_type
{
    CARD_TYPE_EXERCISE  = 0;
    CARD_TYPE_WEATHER   = 1;// Weather
    CARD_TYPE_SUGGEST   = 2;// CARD TYPE SUGGEST.
    CARD_TYPE_DIAL      = 3;
    CARD_TYPE_ACTIVITY  = 4;
    CARD_TYPE_HEARTRATE = 5;
    CARD_TYPE_SLEEP     = 6;// CARD TYPE SLEEP.
    CARD_TYPE_STEPS     = 7;// CARD TYPE STEPS.
    CARD_TYPE_SPO2      = 8;
    CARD_TYPE_MENSTRUATION = 9;// CARD TYPE MENSTRUATION.
    CARD_TYPE_MEASUREMENT  = 10;// CARD TYPE MEASUREMENT.
    CARD_TYPE_RECENT_WORKOUT = 11;// CARD TYPE RECENT WORKOUT.
    CARD_TYPE_HRV       = 12;
    CARD_TYPE_UV        = 13;// CARD TYPE UV.
    CARD_TYPE_ASTRONOMY = 14;// MoonriseMoonset、SunriseSunset
    CARD_TYPE_WORLD_CLOCK = 15;// World clock
    CARD_TYPE_ALEXA     = 16;// alexa
    CARD_TYPE_ALIPAY = 17;// CARD TYPE ALIPAY.
    CARD_TYPE_STRESS = 18;// Stress
    CARD_TYPE_HEALTH_EXPRESS = 19;// Health snapshot(Heart rate, Blood oxygen, Stress, hrv ,Respiratory rate)
    CARD_TYPE_TEMPERATURE = 20;// CARD TYPE TEMPERATURE.
    CARD_TYPE_DRINK_ASSISTANT = 21;// CARD TYPE DRINK ASSISTANT.
    CARD_TYPE_TRAINING_LOAD = 22;// CARD TYPE TRAINING LOAD.
    CARD_TYPE_HEALTH_SNAP = 23;// Health snapshot
    CARD_TYPE_INTENSITY_MINUTES = 24;// CARD TYPE INTENSITY MINUTES.
    CARD_TYPE_COMPASS = 25; // CARD TYPE COMPASS.

}

message quick_card_func{
    bool is_support = 1;// Whether supported
    bool is_delete = 2; // Whether supportedDelete
}

message protocol_quick_card_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    repeated quick_card_type card_type = 2;
}

message protocol_quick_card_inquire_reply
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    uint32 quick_card_support_max = 2; // 1bytes Quick cardSupportedShownMaximum count
    uint32 quick_card_support_min = 3; // Number of quick card support min. 1bytes.
    uint32 func_table = 4;
    repeated quick_card_type card_type  = 5;
    quick_card_func card_type_exercise_support      = 6;
    quick_card_func card_type_weather_support       = 7;// SupportedType
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
