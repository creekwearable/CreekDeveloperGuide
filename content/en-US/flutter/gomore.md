---
docId: flutter-gomore
locale: en-US
title: "Flutter Gomore"
description: "Read fitness-level data and configure Gomore features."
platform: Flutter
slug: flutter/gomore
order: 15
status: published
version: v2.0
---

# Flutter Gomore

Read fitness-level data and configure Gomore features.

## 16.1  Gomore Config Switch
```dart
protocol_gomore_config_switch_operate operate = protocol_gomore_config_switch_operate();
operate.lactateSwitch = switchFlag.value ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
sdkManager.setGomoreLactateSwitch(
    operate: operate,
    callBack: (protocol_gomore_config_switch_inquire_reply reply) {
      if (reply.lactateSwitch.value == 1) {
        switchFlag.value = true;
      } else if (reply.lactateSwitch.value == 2) {
        switchFlag.value = false;
      }
    },
    errCallBack: (e) {

    }
);

sdkManager.getGomoreLactateSwitch(
    callBack: (protocol_gomore_config_switch_inquire_reply reply) {
      if (reply.lactateSwitch.value == 1) {
        switchFlag.value = true;
      } else if (reply.lactateSwitch.value == 2) {
        switchFlag.value = false;
      }
    },
    errCallBack: (e) {

    }
);
```

## Protobuf Data Model

```protobuf
message gomore_fitness_level_day {
    uint32 year = 1; // Year.
    uint32 month = 2; // Month.
    uint32 day = 3; // Day.
    repeated gomore_fitness_level_item level_item = 4; // Fitness-level entries.
}

 message gomore_fitness_level_item {
  uint32 hour = 1; // Hour.
  uint32 minute = 2; // Minute.
  uint32 second = 3; // Second.
  uint32 fitnessLevel = 4;              // overall endurance level（fitness level）, 10.0~80.0, ×10.
  uint32 aerobicEnduranceLevel = 5;     // aerobic endurance level, ×10.
  uint32 anaerobicEnduranceLevel = 6;   // anaerobic endurance level, ×10.
  uint32 explosivePowerAbility = 7;     // explosive-power ability, ×10.
  uint32 anaerobicCapacity = 8;         // anaerobic capacity, ×10.
  uint32 aerobicSprintAbility = 9;      // aerobic sprint ability, ×10.
  uint32 aerobicCapacity = 10;           // aerobic capacity, ×10.
  uint32 enduranceAbility = 11;          // endurance ability, ×10.
  uint32 ultraEnduranceAbility = 12;     // ultra-endurance ability, ×10.
}

message protocol_gomore_fitness_level_operate {
  operate_type operate = 1;             // INQUIRE=1 query.
}

message protocol_gomore_fitness_level_inquire_reply {
  operate_type operate = 1;             // 1bytes operation type 0: invalid operation 1: query 2: set.
  repeated gomore_fitness_level_day level_item = 3; // Fitness-level entries.
}
```

```protobuf
message protocol_gomore_config_switch_operate 
{ 
   operate_type operate = 1;     // operation type.
   switch_type lactate_switch = 2;  // lactate switch.
}
message protocol_gomore_config_switch_inquire_reply
{
    operate_type operate = 1; // 1bytes operation type 0: invalid operation 1: query 2: set.
    switch_type lactate_switch = 2;   // lactate switch.
}
```

### Field Reference

#### `gomore_fitness_level_day`

| Field | Type | Description |
| --- | --- | --- |
| `year` | `uint32` | Year. |
| `month` | `uint32` | Month. |
| `day` | `uint32` | Day. |
| `level_item` | `repeated gomore_fitness_level_item` | Fitness-level entries. |

#### `gomore_fitness_level_item`

| Field | Type | Description |
| --- | --- | --- |
| `hour` | `uint32` | Hour. |
| `minute` | `uint32` | Minute. |
| `second` | `uint32` | Second. |
| `fitnessLevel` | `uint32` | overall endurance level（fitness level）, 10.0~80.0, ×10. |
| `aerobicEnduranceLevel` | `uint32` | aerobic endurance level, ×10. |
| `anaerobicEnduranceLevel` | `uint32` | anaerobic endurance level, ×10. |
| `explosivePowerAbility` | `uint32` | explosive-power ability, ×10. |
| `anaerobicCapacity` | `uint32` | anaerobic capacity, ×10. |
| `aerobicSprintAbility` | `uint32` | aerobic sprint ability, ×10. |
| `aerobicCapacity` | `uint32` | aerobic capacity, ×10. |
| `enduranceAbility` | `uint32` | endurance ability, ×10. |
| `ultraEnduranceAbility` | `uint32` | ultra-endurance ability, ×10. |

#### `protocol_gomore_fitness_level_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | INQUIRE=1 query. |

#### `protocol_gomore_fitness_level_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes operation type 0: invalid operation 1: query 2: set. |
| `level_item` | `repeated gomore_fitness_level_day` | Fitness-level entries. |

#### `protocol_gomore_config_switch_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | operation type. |
| `lactate_switch` | `switch_type` | lactate switch. |

#### `protocol_gomore_config_switch_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes operation type 0: invalid operation 1: query 2: set. |
| `lactate_switch` | `switch_type` | lactate switch. |
