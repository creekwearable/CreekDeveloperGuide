---
docId: android-sensors
locale: en-US
title: Android Sensors
description: Read and configure device sensor switches.
platform: Android
slug: android/sensors
order: 121
status: published
version: v2.0
---

# Android Sensors

Read and configure device sensor switches.

```kotlin
CreekManager.sInstance.getWatchSensor({ model ->
    responseText.value = model.toString()
}, failure = { _, m ->
    responseText.value = m
})

val  operate =  WatchSensor.protocol_watch_sensors_operate()
operate.heartRateAllSwitch = Enums.switch_type.SWITCH_OFF
operate.bloodOxygenAllSwitch = Enums.switch_type.SWITCH_ON
CreekManager.sInstance.setWatchSensor(model = operate, success = {
    responseText.value = "success"
}, failure = {_, m ->
    responseText.value = m
})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";
enum switch_type
{
    SWITCH_NULL = 0;// NULL
    SWITCH_ON = 1;// On
    SWITCH_OFF = 2;// Off
}

message protocol_watch_sensors_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    switch_type heart_rate_all_switch = 2;// Heart Rate All Switch switch. 1bytes.
    switch_type blood_oxygen_all_switch = 3;// Blood Oxygen All Switch switch. 1bytes.
    switch_type compass_all_switch = 4;// Compass All Switch switch. 1bytes.
    switch_type baromater_all_switch = 5;// Baromater All Switch switch. 1bytes.
}

message protocol_watch_sensors_inquire_reply
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    switch_type heart_rate_all_switch = 2;// Heart Rate All Switch switch. 1bytes.
    switch_type blood_oxygen_all_switch = 3;// Blood Oxygen All Switch switch. 1bytes.
    switch_type compass_all_switch = 4;// Compass All Switch switch. 1bytes.
    switch_type baromater_all_switch = 5;// Baromater All Switch switch. 1bytes.
}
```
