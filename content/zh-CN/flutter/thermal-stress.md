---
docId: flutter-thermal-stress
locale: zh-CN
title: "Flutter 热应激"
description: "配置热应激监测的基线、开关与预警监听。"
platform: Flutter
slug: flutter/thermal-stress
order: 16
status: published
version: v2.0
---

# Flutter 热应激

配置热应激监测的基线、开关与预警监听。

## 17.1  Quiet Baseline
```dart
DateTime today = DateTime.now();
DateTime dateOnly = DateTime(today.year, today.month, today.day);
int timestamp = dateOnly.millisecondsSinceEpoch ~/ 1000;
protocol_quiet_baseline_operate baselineOperate = protocol_quiet_baseline_operate();
baselineOperate.baselineDate = timestamp;
final coreTemp = double.tryParse(quietCoreTempText.text) ?? quietCoreTempTextValue.value;
final skinTemp = double.tryParse(quietSkinTempText.text) ?? quietSkinTempTextValue.value;
baselineOperate.quietCoreTemp = (coreTemp * 100).round();
baselineOperate.quietSkinTemp = (skinTemp * 100).round();
baselineOperate.quietHr = quietHrTempTextValue.value;
sdkManager.setQuietBaseline(operate: baselineOperate,callBack: (){

},errCallBack: (e){

});
```

## 17.3  Warning Switch
```dart
protocol_warning_switch_operate operate = protocol_warning_switch_operate();
operate.coldWarning = coldWarningValue ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
operate.heatWarning = heatWarningValue ? switch_type.SWITCH_ON : switch_type.SWITCH_OFF;
sdkManager.setThermalStressWarningSwitch(
    operate: operate,
    callBack: (protocol_warning_switch_inquire_reply reply) {
      if (reply.coldWarning.value == 1) {
        coldWarningSwitch.value = true;
      } else if (reply.coldWarning.value == 2) {
        coldWarningSwitch.value = false;
      }
      if (reply.heatWarning.value == 1) {
        heatWarningSwitch.value = true;
      } else if (reply.heatWarning.value == 2) {
        heatWarningSwitch.value = false;
      }
    },
    errCallBack: (e) {

    }
);

sdkManager.getThermalStressWarningSwitch(
    callBack: (protocol_warning_switch_inquire_reply reply) {
      if (reply.coldWarning.value == 1) {
        coldWarningSwitch.value = true;
      } else if (reply.coldWarning.value == 2) {
        coldWarningSwitch.value = false;
      }
      if (reply.heatWarning.value == 1) {
        heatWarningSwitch.value = true;
      } else if (reply.heatWarning.value == 2) {
        heatWarningSwitch.value = false;
      }
    },
    errCallBack: (e) {

    }
);
```

## 16.1  Warning Remind Listen
```dart
sdkManager.thermalStressWarningRemindListen((e) {
  if (e.type == warning_type.WARNING_NONE) {
    warningTypeValue = '别疑惑，当应激指数小于6的时候，只传值给app，但是app不弹窗';
    warningLevelValue = '冷应激指数:${e.coldWarningLevel / 10.0}  热应激指数:${e.heatWarningLevel / 10.0}';
  }
  switch (e.type) {
    case warning_type.WARNING_COLD:
      title = '冷应激';
      content = '冷指数:${e.coldWarningLevel / 10.0}';
      break;
    case warning_type.WARNING_HEAT:
      title = '热应激';
      content = '热指数:${e.heatWarningLevel / 10.0}';
      break;
    case warning_type.WARNING_BOTH:
      title = '冷应激和热应激';
      content = '冷指数:${e.coldWarningLevel / 10.0} 热指数:${e.heatWarningLevel / 10.0}';
      break;
    default:
      return;
  }
});
```

## Protobuf 数据模型

```protobuf
enum tran_direction_type {
    WATCH_TRAN = 0; // 操作由手表发起。
    APP_TRAN = 1; // 操作由应用发起。
}
```

```protobuf
syntax = "proto3";

message protocol_quiet_baseline_operate {
  operate_type operate = 1; // 操作类型
  uint32 baseline_date = 2; // 生效日期
  uint32 quiet_core_temp = 3; // 安静核心体温 CT0
  uint32 quiet_skin_temp = 4; // 安静皮肤温度 ST0
  uint32 quiet_hr = 5; // 安静心率 HR0
}
```

```protobuf
syntax = "proto3";
message protocol_warning_switch_operate {
  operate_type operate = 1; // 操作类型
  switch_type cold_warning = 2; // 冷预警开关
  switch_type heat_warning = 3; // 热预警开关
}

message protocol_warning_switch_inquire_reply {
  operate_type operate = 1; // 操作类型
  switch_type cold_warning = 2; // 冷预警开关状态
  switch_type heat_warning = 3; // 热预警开关状态
}
```

```protobuf
enum warning_type {
  WARNING_NONE = 0; // 无特定标记
  WARNING_COLD = 1; // 冷应激
  WARNING_HEAT = 2; // 热应激
  WARNING_BOTH = 3; // 冷热同时触发
}
message protocol_warning_remind_operate {
  tran_direction_type tran_type = 1; // 本次操作的发起方。
  warning_type type = 2; // 区分标记
  uint32 cold_warning_level = 3; // 冷应激预警指数
  uint32 heat_warning_level = 4; // 热应激预警指数
  uint32 message_push_time = 5; // 消息推送时间
}
```

### 字段说明

#### `protocol_quiet_baseline_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 操作类型 |
| `baseline_date` | `uint32` | 生效日期 |
| `quiet_core_temp` | `uint32` | 安静核心体温 CT0 |
| `quiet_skin_temp` | `uint32` | 安静皮肤温度 ST0 |
| `quiet_hr` | `uint32` | 安静心率 HR0 |

#### `protocol_warning_switch_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 操作类型 |
| `cold_warning` | `switch_type` | 冷预警开关 |
| `heat_warning` | `switch_type` | 热预警开关 |

#### `protocol_warning_switch_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 操作类型 |
| `cold_warning` | `switch_type` | 冷预警开关状态 |
| `heat_warning` | `switch_type` | 热预警开关状态 |

#### `protocol_warning_remind_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `tran_type` | `tran_direction_type` | 本次操作的发起方。 |
| `type` | `warning_type` | 区分标记 |
| `cold_warning_level` | `uint32` | 冷应激预警指数 |
| `heat_warning_level` | `uint32` | 热应激预警指数 |
| `message_push_time` | `uint32` | 消息推送时间 |

### 枚举值

#### `tran_direction_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `WATCH_TRAN` | `0` | 操作由手表发起。 |
| `APP_TRAN` | `1` | 操作由应用发起。 |

#### `warning_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `WARNING_NONE` | `0` | 无特定标记 |
| `WARNING_COLD` | `1` | 冷应激 |
| `WARNING_HEAT` | `2` | 热应激 |
| `WARNING_BOTH` | `3` | 冷热同时触发 |
