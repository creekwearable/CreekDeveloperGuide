---
docId: flutter-gomore
locale: zh-CN
title: "Flutter Gomore"
description: "读取体能等级并配置 Gomore 功能。"
platform: Flutter
slug: flutter/gomore
order: 15
status: published
version: v2.0
---

# Flutter Gomore

读取体能等级并配置 Gomore 功能。

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

## Protobuf 数据模型

```protobuf
message gomore_fitness_level_day {
    uint32 year = 1; // 年份。
    uint32 month = 2; // 月份。
    uint32 day = 3; // 日期。
    repeated gomore_fitness_level_item level_item = 4; // 体能等级数据项。
}

 message gomore_fitness_level_item {
  uint32 hour = 1; // 小时。
  uint32 minute = 2; // 分钟。
  uint32 second = 3; // 秒。
  uint32 fitnessLevel = 4; // 整体耐力水平（体能等级），10.0~80.0，×10
  uint32 aerobicEnduranceLevel = 5; // 有氧耐力水平，×10
  uint32 anaerobicEnduranceLevel = 6; // 无氧耐力水平，×10
  uint32 explosivePowerAbility = 7; // 爆发力能力，×10
  uint32 anaerobicCapacity = 8; // 无氧能力，×10
  uint32 aerobicSprintAbility = 9; // 有氧冲刺能力，×10
  uint32 aerobicCapacity = 10; // 有氧能力，×10
  uint32 enduranceAbility = 11; // 耐力能力，×10
  uint32 ultraEnduranceAbility = 12; // 超耐力能力，×10
}

message protocol_gomore_fitness_level_operate {
  operate_type operate = 1; // INQUIRE=1 查询
}

message protocol_gomore_fitness_level_inquire_reply {
  operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
  repeated gomore_fitness_level_day level_item = 3; // 体能等级数据项。
}
```

```protobuf
message protocol_gomore_config_switch_operate 
{ 
   operate_type operate = 1; // 操作类型
   switch_type lactate_switch = 2; // 乳酸开关
}
message protocol_gomore_config_switch_inquire_reply
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    switch_type lactate_switch = 2; // 乳酸开关
}
```

### 字段说明

#### `gomore_fitness_level_day`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `year` | `uint32` | 年份。 |
| `month` | `uint32` | 月份。 |
| `day` | `uint32` | 日期。 |
| `level_item` | `repeated gomore_fitness_level_item` | 体能等级数据项。 |

#### `gomore_fitness_level_item`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `hour` | `uint32` | 小时。 |
| `minute` | `uint32` | 分钟。 |
| `second` | `uint32` | 秒。 |
| `fitnessLevel` | `uint32` | 整体耐力水平（体能等级），10.0~80.0，×10 |
| `aerobicEnduranceLevel` | `uint32` | 有氧耐力水平，×10 |
| `anaerobicEnduranceLevel` | `uint32` | 无氧耐力水平，×10 |
| `explosivePowerAbility` | `uint32` | 爆发力能力，×10 |
| `anaerobicCapacity` | `uint32` | 无氧能力，×10 |
| `aerobicSprintAbility` | `uint32` | 有氧冲刺能力，×10 |
| `aerobicCapacity` | `uint32` | 有氧能力，×10 |
| `enduranceAbility` | `uint32` | 耐力能力，×10 |
| `ultraEnduranceAbility` | `uint32` | 超耐力能力，×10 |

#### `protocol_gomore_fitness_level_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | INQUIRE=1 查询 |

#### `protocol_gomore_fitness_level_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `level_item` | `repeated gomore_fitness_level_day` | 体能等级数据项。 |

#### `protocol_gomore_config_switch_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 操作类型 |
| `lactate_switch` | `switch_type` | 乳酸开关 |

#### `protocol_gomore_config_switch_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `lactate_switch` | `switch_type` | 乳酸开关 |
