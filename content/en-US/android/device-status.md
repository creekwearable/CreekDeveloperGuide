---
docId: android-device-status
locale: en-US
title: Android Device Status
description: Query workout and other runtime states from the device.
platform: Android
slug: android/device-status
order: 144
status: published
version: v2.0
---

# Android Device Status

Query workout and other runtime states from the device.

```kotlin
CreekManager.sInstance.getDeviceStatus(type = Enums.device_status_type.sport_status,{ model ->
    if(model.value == 1){
        println("Workout in progress")
    }else{
        println("No workout in progress")
    }
   
}, failure = { _, m ->

})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

enum device_status_type
{
    sport_status = 0;// WorkoutState
}

message protocol_device_status_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    device_status_type status_type = 2;// DeviceStateType
}
 
message protocol_device_status_inquire_reply
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    device_status_type status_type = 2;// DeviceStateType
    uint32 value = 3;
}
```
