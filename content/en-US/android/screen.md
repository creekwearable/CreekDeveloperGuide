---
docId: android-screen
locale: en-US
title: Android Screen
description: Read and configure screen brightness, timeout, and related capabilities.
platform: Android
slug: android/screen
order: 128
status: published
version: v2.0
---

# Android Screen

Read and configure screen brightness, timeout, and related capabilities.

```kotlin
// /Get
CreekManager.sInstance.getScreen({ model: Screen.protocol_screen_brightness_inquire_reply ->

    var operate = Screen.protocol_screen_brightness_operate()
    var screenTable = model.fromTable()
    if(screenTable.steady){
        var aod = Screen.protocol_screen_aod_time_setting()
        aod.mode = Enums.aod_mode.INTELLIGENT_MODE
        aod.startHour = 8
        aod.startMinute = 0
        aod.endHour = 10
        aod.endMinute = 0
        operate.aodTimeSetting = aod
    }else{
        operate.aodSwitchFlag = true
    }
    operate.level = 100
    operate.showInterval = 5
    operate.levelFlag = true
    
    // /Set
    CreekManager.sInstance.setScreen(model = operate, {
        responseText.value = "success"
    }, failure = { _, m ->
        responseText.value = m
    })
}, failure = { _, m ->
    responseText.value = m
})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;// Query
    SET = 2;// Set
}

enum aod_mode
{
    INTELLIGENT_MODE = 0;
    TIMER_MDOE = 1;
}

message protocol_screen_night_auto_adjust
{
    bool switch_flag = 1;// Switch Flag. 1bytes.
    // StartTime
    uint32 start_hour = 2; 
    uint32 start_minute = 3;
    // EndTime
    uint32 end_hour = 4;
    uint32 end_minute = 5;
    uint32 night_level = 6; // Night Level. 1bytes.
}

message protocol_screen_aod_time_setting
{
    aod_mode mode = 1;

    uint32 start_hour = 2; 
    uint32 start_minute = 3;
    // EndTime
    uint32 end_hour = 4;
    uint32 end_minute = 5;

}

message protocol_screen_brightness_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    uint32 level = 2;  // 1bytes (0-100)
    uint32 show_interval = 3; // Show Interval. 1bytes, 5Second.
    protocol_screen_night_auto_adjust night_auto_adjust = 4; // Night Auto Adjust.
    bool aod_switch_flag = 5;// Aod Switch Flag switch. 1bytes.
    bool raise_wrist_switch_flag = 6;// Raise Wrist Switch Flag switch. 1bytes.
    protocol_screen_aod_time_setting aod_time_setting = 7;// Aod Time Setting.
    bool level_flag = 8;// Level Flag.
}

message protocol_screen_brightness_inquire_reply
{
    uint32 func_table = 1;// 1bytes Function table
    operate_type operate = 2; // 1bytesOperation type 0: Invalid operation 1: Query 2: Set
    uint32 level = 3;  // 1bytes (0-100)
    uint32 show_interval = 4; // Show Interval. 1bytes.
    protocol_screen_night_auto_adjust night_auto_adjust = 5;// Night Auto Adjust.
    bool aod_switch_flag = 6;// Aod Switch Flag switch. 1bytes.
    bool raise_wrist_switch_flag = 7;// Raise Wrist Switch Flag switch. 1bytes.
    protocol_screen_aod_time_setting aod_time_setting = 8;// Aod Time Setting.
    repeated uint32 show_interval_options = 9;// Show Interval Options.
}
```

### `func_table` Bit Definitions

| Bit | Description |
| - | - |
| 0 | Whether automatic nighttime brightness adjustment is supported |
| 1 | Whether Always-On Display mode selection is supported, Use when supported: aod_time_setting , Use when unsupported: aod_switch_flag |
| 2 | Whether screen-on duration options are supported |
