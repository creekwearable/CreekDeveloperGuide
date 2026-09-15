---
docId: flutter-thermal-stress
locale: en-US
title: "Flutter Thermal Stress"
description: "Configure baselines and warnings for thermal-stress monitoring."
platform: Flutter
slug: flutter/thermal-stress
order: 16
status: published
version: v2.0
---

# Flutter Thermal Stress

Configure baselines and warnings for thermal-stress monitoring.

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
    warningTypeValue = 'When the stress index is below 6, report the value to the app without showing a pop-up';
    warningLevelValue = 'Cold-stress index:${e.coldWarningLevel / 10.0}  Heat-stress index:${e.heatWarningLevel / 10.0}';
  }
  switch (e.type) {
    case warning_type.WARNING_COLD:
      title = 'Cold stress';
      content = 'Cold index:${e.coldWarningLevel / 10.0}';
      break;
    case warning_type.WARNING_HEAT:
      title = 'Heat stress';
      content = 'Heat index:${e.heatWarningLevel / 10.0}';
      break;
    case warning_type.WARNING_BOTH:
      title = 'Cold and heat stress';
      content = 'Cold index:${e.coldWarningLevel / 10.0} Heat index:${e.heatWarningLevel / 10.0}';
      break;
    default:
      return;
  }
});
```

## Protobuf Data Model

```protobuf
enum tran_direction_type {
    WATCH_TRAN = 0; // Operation originated from the watch.
    APP_TRAN = 1; // Operation originated from the application.
}
```

```protobuf
syntax = "proto3";

message protocol_quiet_baseline_operate {
  operate_type operate = 1;            // operation type.
  uint32 baseline_date = 2;            // effective date.
  uint32 quiet_core_temp = 3;          // resting core temperature CT0.
  uint32 quiet_skin_temp = 4;          // resting skin temperature ST0.
  uint32 quiet_hr = 5;                // resting heart rate HR0.
}
```

```protobuf
syntax = "proto3";
message protocol_warning_switch_operate {
  operate_type operate = 1;     // operation type.
  switch_type cold_warning = 2; // cold-warning switch.
  switch_type heat_warning = 3; // heat-warning switch.
}

message protocol_warning_switch_inquire_reply {
  operate_type operate = 1;     // operation type.
  switch_type cold_warning = 2; // cold-warning switch state.
  switch_type heat_warning = 3; // heat-warning switch state.
}
```

```protobuf
enum warning_type {
  WARNING_NONE = 0;   // no specific flag.
  WARNING_COLD = 1;   // cold stress.
  WARNING_HEAT = 2;   // heat stress.
  WARNING_BOTH = 3;   // cold and heat warnings both triggered.
}
message protocol_warning_remind_operate {
  tran_direction_type tran_type = 1; // Origin of this operation.
  warning_type type = 2;               // classification flag.
  uint32 cold_warning_level = 3;       // cold-stress warning index.
  uint32 heat_warning_level = 4;       // heat-stress warning index.
  uint32 message_push_time = 5;         // message push time.
}
```

### Field Reference

#### `protocol_quiet_baseline_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | operation type. |
| `baseline_date` | `uint32` | effective date. |
| `quiet_core_temp` | `uint32` | resting core temperature CT0. |
| `quiet_skin_temp` | `uint32` | resting skin temperature ST0. |
| `quiet_hr` | `uint32` | resting heart rate HR0. |

#### `protocol_warning_switch_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | operation type. |
| `cold_warning` | `switch_type` | cold-warning switch. |
| `heat_warning` | `switch_type` | heat-warning switch. |

#### `protocol_warning_switch_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | operation type. |
| `cold_warning` | `switch_type` | cold-warning switch state. |
| `heat_warning` | `switch_type` | heat-warning switch state. |

#### `protocol_warning_remind_operate`

| Field | Type | Description |
| --- | --- | --- |
| `tran_type` | `tran_direction_type` | Origin of this operation. |
| `type` | `warning_type` | classification flag. |
| `cold_warning_level` | `uint32` | cold-stress warning index. |
| `heat_warning_level` | `uint32` | heat-stress warning index. |
| `message_push_time` | `uint32` | message push time. |

### Enum Values

#### `tran_direction_type`

| Value | Number | Description |
| --- | --- | --- |
| `WATCH_TRAN` | `0` | Operation originated from the watch. |
| `APP_TRAN` | `1` | Operation originated from the application. |

#### `warning_type`

| Value | Number | Description |
| --- | --- | --- |
| `WARNING_NONE` | `0` | no specific flag. |
| `WARNING_COLD` | `1` | cold stress. |
| `WARNING_HEAT` | `2` | heat stress. |
| `WARNING_BOTH` | `3` | cold and heat warnings both triggered. |
