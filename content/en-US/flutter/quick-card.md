---
docId: flutter-quick-card
locale: en-US
title: "Flutter Quick Cards"
description: "Read, reorder, add, and remove quick cards."
platform: Flutter
slug: flutter/quick-card
order: 111
status: published
version: v2.0
---

# Flutter Quick Cards

Read, reorder, add, and remove quick cards.

## SDK Usage

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

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum quick_card_type
{
    CARD_TYPE_EXERCISE  = 0; // Card type exercise.
    CARD_TYPE_WEATHER   = 1;// Weather
    CARD_TYPE_SUGGEST   = 2;// Suggestion
    CARD_TYPE_DIAL      = 3; // Card type dial.
    CARD_TYPE_ACTIVITY  = 4; // Card type activity.
    CARD_TYPE_HEARTRATE = 5; // Card type heartrate.
    CARD_TYPE_SLEEP     = 6;// Sleep
    CARD_TYPE_STEPS     = 7;// Steps
    CARD_TYPE_SPO2      = 8; // Card type blood oxygen.
    CARD_TYPE_MENSTRUATION = 9;// Menstruation cycle (for women)
    CARD_TYPE_MEASUREMENT  = 10;// One-click measurement (Blood oxygen, heart rate, pressure)
    CARD_TYPE_RECENT_WORKOUT = 11;// Recent outdoor workout track and activity
    CARD_TYPE_HRV       = 12; // Card type hrv.
    CARD_TYPE_UV        = 13;// Ultraviolet (UV)
    CARD_TYPE_ASTRONOMY = 14;// Moonrise, moonset, sunrise, sunset
    CARD_TYPE_WORLD_CLOCK = 15;// World clock
    CARD_TYPE_ALEXA     = 16;// Alexa
    CARD_TYPE_ALIPAY = 17;// Alipay
    CARD_TYPE_STRESS = 18;// Stress
    CARD_TYPE_HEALTH_EXPRESS = 19;// Health snapshot (Heart rate, blood oxygen, pressure, HRV, breathing rate)
    CARD_TYPE_TEMPERATURE = 20;// Body temperature
    CARD_TYPE_DRINK_ASSISTANT = 21;// Water reminder assistant
    CARD_TYPE_TRAINING_LOAD = 22;// Training load
    CARD_TYPE_HEALTH_SNAP = 23;// Health snapshot
    CARD_TYPE_INTENSITY_MINUTES = 24;// Weekly training minutes
    CARD_TYPE_COMPASS = 25; // Compass
}

message quick_card_func{
    bool is_support = 1;// Is supported
    bool is_delete = 2; // Is deletion supported
}

message protocol_quick_card_operate
{
    operate_type operate = 1; // 1byte Operation type: 0: Invalid operation, 1: Query, 2: Set
    repeated quick_card_type card_type = 2; // Configured quick-card types.
}

message protocol_quick_card_inquire_reply
{
    operate_type operate = 1; // 1byte Operation type: 0: Invalid operation, 1: Query, 2: Set
    uint32 quick_card_support_max = 2; // 1byte Maximum number of supported quick cards
    uint32 quick_card_support_min = 3; // 1byte Minimum number of supported quick cards
    uint32 func_table = 4; // Capability bitmask.
    repeated quick_card_type card_type  = 5; // Configured quick-card types.
    quick_card_func card_type_exercise_support      = 6; // Whether the exercise quick card is supported.
    quick_card_func card_type_weather_support       = 7;// Supported type
    quick_card_func card_type_suggest_support       = 8; // Whether the suggest quick card is supported.
    quick_card_func card_type_dial_support          = 9; // Whether the dial quick card is supported.
    quick_card_func card_type_activity_support      = 10; // Whether the activity quick card is supported.
    quick_card_func card_type_heartrate_support     = 11; // Whether the heartrate quick card is supported.
    quick_card_func card_type_sleep_support         = 12; // Whether the sleep quick card is supported.
    quick_card_func card_type_steps_support         = 13; // Whether the steps quick card is supported.
    quick_card_func card_type_spo2_support          = 14; // Whether the blood oxygen quick card is supported.
    quick_card_func card_type_menstruation_support  = 15; // Whether the menstruation quick card is supported.
    quick_card_func card_type_measurement_support   = 16; // Whether the measurement quick card is supported.
    quick_card_func card_type_recent_workout_support = 17; // Whether the recent workout quick card is supported.
    quick_card_func card_type_hrv_support           = 18; // Whether the hrv quick card is supported.
    quick_card_func card_type_uv_support            = 19; // Whether the uv quick card is supported.
    quick_card_func card_type_astronomy_support     = 20; // Whether the astronomy quick card is supported.
    quick_card_func card_type_world_clock_support   = 21; // Whether the world clock quick card is supported.
    quick_card_func card_type_alexa_support         = 22; // Whether the alexa quick card is supported.
    quick_card_func card_type_stress_support        = 23; // Whether the stress quick card is supported.
    quick_card_func card_type_alipay_support        = 24; // Whether the alipay quick card is supported.
    quick_card_func card_type_health_express_support  = 25; // Whether the health express quick card is supported.
    quick_card_func card_type_temperature_support   = 26; // Whether the temperature quick card is supported.
    quick_card_func card_type_drink_assitant_support = 27; // Whether the drink assitant quick card is supported.
    quick_card_func card_type_training_load_support  = 28; // Whether the training load quick card is supported.
    quick_card_func card_type_health_snap_support    = 29; // Whether the health snap quick card is supported.
    quick_card_func card_type_intensity_minutes_support = 30; // Whether the intensity minutes quick card is supported.
    quick_card_func card_type_compass_support           = 31; // Whether the compass quick card is supported.
}
```

### Field Reference

#### `quick_card_func`

| Field | Type | Description |
| --- | --- | --- |
| `is_support` | `bool` | Is supported |
| `is_delete` | `bool` | Is deletion supported |

#### `protocol_quick_card_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1byte Operation type: 0: Invalid operation, 1: Query, 2: Set |
| `card_type` | `repeated quick_card_type` | Configured quick-card types. |

#### `protocol_quick_card_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1byte Operation type: 0: Invalid operation, 1: Query, 2: Set |
| `quick_card_support_max` | `uint32` | 1byte Maximum number of supported quick cards |
| `quick_card_support_min` | `uint32` | 1byte Minimum number of supported quick cards |
| `func_table` | `uint32` | Capability bitmask. |
| `card_type` | `repeated quick_card_type` | Configured quick-card types. |
| `card_type_exercise_support` | `quick_card_func` | Whether the exercise quick card is supported. |
| `card_type_weather_support` | `quick_card_func` | Supported type |
| `card_type_suggest_support` | `quick_card_func` | Whether the suggest quick card is supported. |
| `card_type_dial_support` | `quick_card_func` | Whether the dial quick card is supported. |
| `card_type_activity_support` | `quick_card_func` | Whether the activity quick card is supported. |
| `card_type_heartrate_support` | `quick_card_func` | Whether the heartrate quick card is supported. |
| `card_type_sleep_support` | `quick_card_func` | Whether the sleep quick card is supported. |
| `card_type_steps_support` | `quick_card_func` | Whether the steps quick card is supported. |
| `card_type_spo2_support` | `quick_card_func` | Whether the blood oxygen quick card is supported. |
| `card_type_menstruation_support` | `quick_card_func` | Whether the menstruation quick card is supported. |
| `card_type_measurement_support` | `quick_card_func` | Whether the measurement quick card is supported. |
| `card_type_recent_workout_support` | `quick_card_func` | Whether the recent workout quick card is supported. |
| `card_type_hrv_support` | `quick_card_func` | Whether the hrv quick card is supported. |
| `card_type_uv_support` | `quick_card_func` | Whether the uv quick card is supported. |
| `card_type_astronomy_support` | `quick_card_func` | Whether the astronomy quick card is supported. |
| `card_type_world_clock_support` | `quick_card_func` | Whether the world clock quick card is supported. |
| `card_type_alexa_support` | `quick_card_func` | Whether the alexa quick card is supported. |
| `card_type_stress_support` | `quick_card_func` | Whether the stress quick card is supported. |
| `card_type_alipay_support` | `quick_card_func` | Whether the alipay quick card is supported. |
| `card_type_health_express_support` | `quick_card_func` | Whether the health express quick card is supported. |
| `card_type_temperature_support` | `quick_card_func` | Whether the temperature quick card is supported. |
| `card_type_drink_assitant_support` | `quick_card_func` | Whether the drink assitant quick card is supported. |
| `card_type_training_load_support` | `quick_card_func` | Whether the training load quick card is supported. |
| `card_type_health_snap_support` | `quick_card_func` | Whether the health snap quick card is supported. |
| `card_type_intensity_minutes_support` | `quick_card_func` | Whether the intensity minutes quick card is supported. |
| `card_type_compass_support` | `quick_card_func` | Whether the compass quick card is supported. |

### Enum Values

#### `quick_card_type`

| Value | Number | Description |
| --- | --- | --- |
| `CARD_TYPE_EXERCISE` | `0` | Card type exercise. |
| `CARD_TYPE_WEATHER` | `1` | Weather |
| `CARD_TYPE_SUGGEST` | `2` | Suggestion |
| `CARD_TYPE_DIAL` | `3` | Card type dial. |
| `CARD_TYPE_ACTIVITY` | `4` | Card type activity. |
| `CARD_TYPE_HEARTRATE` | `5` | Card type heartrate. |
| `CARD_TYPE_SLEEP` | `6` | Sleep |
| `CARD_TYPE_STEPS` | `7` | Steps |
| `CARD_TYPE_SPO2` | `8` | Card type blood oxygen. |
| `CARD_TYPE_MENSTRUATION` | `9` | Menstruation cycle (for women) |
| `CARD_TYPE_MEASUREMENT` | `10` | One-click measurement (Blood oxygen, heart rate, pressure) |
| `CARD_TYPE_RECENT_WORKOUT` | `11` | Recent outdoor workout track and activity |
| `CARD_TYPE_HRV` | `12` | Card type hrv. |
| `CARD_TYPE_UV` | `13` | Ultraviolet (UV) |
| `CARD_TYPE_ASTRONOMY` | `14` | Moonrise, moonset, sunrise, sunset |
| `CARD_TYPE_WORLD_CLOCK` | `15` | World clock |
| `CARD_TYPE_ALEXA` | `16` | Alexa |
| `CARD_TYPE_ALIPAY` | `17` | Alipay |
| `CARD_TYPE_STRESS` | `18` | Stress |
| `CARD_TYPE_HEALTH_EXPRESS` | `19` | Health snapshot (Heart rate, blood oxygen, pressure, HRV, breathing rate) |
| `CARD_TYPE_TEMPERATURE` | `20` | Body temperature |
| `CARD_TYPE_DRINK_ASSISTANT` | `21` | Water reminder assistant |
| `CARD_TYPE_TRAINING_LOAD` | `22` | Training load |
| `CARD_TYPE_HEALTH_SNAP` | `23` | Health snapshot |
| `CARD_TYPE_INTENSITY_MINUTES` | `24` | Weekly training minutes |
| `CARD_TYPE_COMPASS` | `25` | Compass |
