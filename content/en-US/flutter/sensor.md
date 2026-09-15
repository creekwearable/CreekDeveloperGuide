---
docId: flutter-sensor
locale: en-US
title: "Flutter Sensors"
description: "Read and configure sensor collection behavior."
platform: Flutter
slug: flutter/sensor
order: 117
status: published
version: v2.0
---

# Flutter Sensors

Read and configure sensor collection behavior.

## SDK Usage

```dart
sdkManager.getWatchSensor(callBack: (e){

   },errCallBack: (m){

  });

///Currently only supports the settings of heartRateAllSwitch and bloodOxygenAllSwitch, the other two items are not supported

var  operate =  protocol_watch_sensors_operate()
operate.heartRateAllSwitch = switch_type.SWITCH_ON;
operate.bloodOxygenAllSwitch = switch_type.SWITCH_ON;
//operate.compassAllSwitch = .switchOn
//operate.baromaterAllSwitch = .switchOn
sdkManager.setWatchSensor(operate: operate,callBack: (){

},errCallBack: (e){

});
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

// Enum for switch state
enum switch_type {
    SWITCH_NULL = 0;   // NULL
    SWITCH_ON = 1;     // ON
    SWITCH_OFF = 2;    // OFF
}

// Message for sensor switch operation on the watch
message protocol_watch_sensors_operate {
    operate_type operate = 1;                    // Operation type: 0 - Invalid, 1 - Inquiry, 2 - Set (1 byte)
    switch_type heart_rate_all_switch = 2;       // Heart rate global switch (1 byte)
    switch_type blood_oxygen_all_switch = 3;     // Blood oxygen global switch (1 byte)
    switch_type compass_all_switch = 4;          // Compass (geomagnetic) global switch (1 byte)
    switch_type baromater_all_switch = 5;        // Barometer global switch (1 byte)
}

// Message for sensor switch inquiry reply
message protocol_watch_sensors_inquire_reply {
    operate_type operate = 1;                    // Operation type: 0 - Invalid, 1 - Inquiry, 2 - Set (1 byte)
    switch_type heart_rate_all_switch = 2;       // Heart rate global switch (1 byte)
    switch_type blood_oxygen_all_switch = 3;     // Blood oxygen global switch (1 byte)
    switch_type compass_all_switch = 4;          // Compass (geomagnetic) global switch (1 byte)
    switch_type baromater_all_switch = 5;        // Barometer global switch (1 byte)
}
```

### Field Reference

#### `protocol_watch_sensors_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | Operation type: 0 - Invalid, 1 - Inquiry, 2 - Set (1 byte) |
| `heart_rate_all_switch` | `switch_type` | Heart rate global switch (1 byte) |
| `blood_oxygen_all_switch` | `switch_type` | Blood oxygen global switch (1 byte) |
| `compass_all_switch` | `switch_type` | Compass (geomagnetic) global switch (1 byte) |
| `baromater_all_switch` | `switch_type` | Barometer global switch (1 byte) |

#### `protocol_watch_sensors_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | Operation type: 0 - Invalid, 1 - Inquiry, 2 - Set (1 byte) |
| `heart_rate_all_switch` | `switch_type` | Heart rate global switch (1 byte) |
| `blood_oxygen_all_switch` | `switch_type` | Blood oxygen global switch (1 byte) |
| `compass_all_switch` | `switch_type` | Compass (geomagnetic) global switch (1 byte) |
| `baromater_all_switch` | `switch_type` | Barometer global switch (1 byte) |

### Enum Values

#### `switch_type`

| Value | Number | Description |
| --- | --- | --- |
| `SWITCH_NULL` | `0` | NULL |
| `SWITCH_ON` | `1` | ON |
| `SWITCH_OFF` | `2` | OFF |
