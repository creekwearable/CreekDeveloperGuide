---
docId: android-shortcut-keys
locale: en-US
title: Android Shortcut Keys
description: Read and configure device button shortcuts.
platform: Android
slug: android/shortcut-keys
order: 110
status: published
version: v2.0
---

# Android Shortcut Keys

Read and configure device button shortcuts.

```kotlin
CreekManager.sInstance.getHotKey(model = {
    
}, failure = {
    _,_ ->
})

var  model = HotKey.protocol_button_crown_operate()
model.pauseWorkout = true
model.longType = Enums.long_2s_press_type.PRESS_TYPE_SOS
CreekManager.sInstance.setHotKey(model = model,{
                                               
}, failure = {
    _,_ ->
})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

enum long_2s_press_type
{
    PRESS_TYPE_NULL = 0;
    PRESS_TYPE_SOS = 1;
    PRESS_TYPE_WORKOUT = 2;
    PRESS_TYPE_ALEXA = 3;
    PRESS_TYPE_RESTART = 4;// PRESS TYPE RESTART.
}

message protocol_button_crown_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    long_2s_press_type long_type = 2;// Long Type. 1bytes.
    bool pause_workout = 3;// Pause Workout. 1bytes.
}

message protocol_button_crown_inquire_reply
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    long_2s_press_type long_type = 2;// Long Type. 1bytes.
    bool pause_workout = 3;// Pause Workout. 1bytes.
    uint32 func_table = 4;// 1bytes Function table
}
```

### `func_table` Bit Definitions

| Bit | Description |
| - | - |
| 0 | Whether a two-second long press can open Alexa, Related field PRESS_TYPE_ALEXA |
| 1 | Whether a two-second long press can open restart and shutdown actions, Related field PRESS_TYPE_RESTART |
| 2 | Whether the SOS long-press option is unsupported, Related field PRESS_TYPE_SOS |
| 3 | Whether the button-to-pause option during workouts is unsupported, Related field pause_workout |
