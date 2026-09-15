---
docId: flutter-alarm
locale: en-US
title: "Flutter Alarms"
description: "Retrieve, add, update, and remove device alarms."
platform: Flutter
slug: flutter/alarm
order: 105
status: published
version: v2.0
---

# Flutter Alarms

Retrieve, add, update, and remove device alarms.

## SDK Usage

```dart
/// Before each setting, it is necessary to retrieve the existing information and then modify the values that need to be changed.

/// For example, if there are alarm items [1, 2, 3], and you want to delete alarm 2, set only [1, 3] during the setting. Adding works similarly, e.g., [1, 2, 3, 4].

/// Retrieve
sdkManager.getAlarm(callBack: (e) {
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
}, errCallBack: (e) {
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});

protocol_alarm_operate operate = protocol_alarm_operate();
protocol_set_alarm_item item =  protocol_set_alarm_item();
item.alarmId = 1;
item.dispStatus = disp_status.DISP_ON;
item.type = alarm_type.GET_UP;
item.hour = 22;
item.minute = 30;
item.repeat.addAll([true,true,true,true,true,false,false]);
item.switchFlag = false;
item.laterRemindRepeatTimes = 1;
item.vibrateOnOff = true;
item.name = utf8.encode("abc");
sdkManager.setAlarm(operate,callBack: (){

},errCallBack: (e){

});
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0; // Invalid or unspecified value.
    INQUIRE = 1;// Query
    SET = 2;// Set
}

enum disp_status
{
    DISP_OFF = 0; // Display is off.
    DISP_ON = 1; // Display is on.
}

enum alarm_type
{
    GET_UP = 0; // Wake up
    SLEEP = 1;// Sleep
}

// Set alarm data item
message protocol_set_alarm_item
{
    uint32 alarm_id = 1;// 1byte Alarm ID, starting from 0
    disp_status disp_status = 2;// 1byte Display status, DISP_OFF: don't show, DISP_ON: show
    alarm_type type = 3; // 1byte Alarm type
    uint32 hour = 4;// 1byte
    uint32 minute = 5;// 1byte
    bool switch_flag = 6;// 1byte Switch flag
    repeated bool repeat = 7; // 7bytes Repeat, from Monday to Sunday
    bool later_remind_switch_flag = 8;// Delay reminder switch
    uint32 later_remind_repeat_times = 9;   // 1byte Number of repeat alarm reminders
    uint32 later_remind_min = 10;    // 1byte Minutes for later reminder
    bool vibrate_on_off = 11;  // 1byte Alarm vibration switch, 0: off, 1: on
    bytes name = 12;    // max:30 Alarm name
};

message protocol_alarm_operate
{
    operate_type operate = 1; // 1byte Operation type, 0: Invalid, 1: Query, 2: Set
    uint32 num = 2;  // 1byte Number of alarms
    repeated protocol_set_alarm_item alarm_item = 3;// max: 20
    repeated bytes custom_name_list = 4;// Alarm custom used options names, max: 10
}

message protocol_alarm_inquire_reply
{
    uint32 func_table = 1;// 1byte Function table
    uint32 alarm_support_max = 2; // 1byte Max number of supported alarms
    operate_type operate = 3; // 1byte Operation type, 0: Invalid, 1: Query, 2: Set
    uint32 num = 4;  // 1byte Number of alarms
    repeated protocol_set_alarm_item alarm_item = 5;// max: 20
    repeated bytes custom_name_list = 6;// Alarm custom used options names, max: 10
}
```

### Field Reference

#### `protocol_set_alarm_item`

| Field | Type | Description |
| --- | --- | --- |
| `alarm_id` | `uint32` | 1byte Alarm ID, starting from 0 |
| `disp_status` | `disp_status` | 1byte Display status, DISP_OFF: don't show, DISP_ON: show |
| `type` | `alarm_type` | 1byte Alarm type |
| `hour` | `uint32` | 1byte |
| `minute` | `uint32` | 1byte |
| `switch_flag` | `bool` | 1byte Switch flag |
| `repeat` | `repeated bool` | 7bytes Repeat, from Monday to Sunday |
| `later_remind_switch_flag` | `bool` | Delay reminder switch |
| `later_remind_repeat_times` | `uint32` | 1byte Number of repeat alarm reminders |
| `later_remind_min` | `uint32` | 1byte Minutes for later reminder |
| `vibrate_on_off` | `bool` | 1byte Alarm vibration switch, 0: off, 1: on |
| `name` | `bytes` | max:30 Alarm name |

#### `protocol_alarm_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1byte Operation type, 0: Invalid, 1: Query, 2: Set |
| `num` | `uint32` | 1byte Number of alarms |
| `alarm_item` | `repeated protocol_set_alarm_item` | max: 20 |
| `custom_name_list` | `repeated bytes` | Alarm custom used options names, max: 10 |

#### `protocol_alarm_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `func_table` | `uint32` | 1byte Function table |
| `alarm_support_max` | `uint32` | 1byte Max number of supported alarms |
| `operate` | `operate_type` | 1byte Operation type, 0: Invalid, 1: Query, 2: Set |
| `num` | `uint32` | 1byte Number of alarms |
| `alarm_item` | `repeated protocol_set_alarm_item` | max: 20 |
| `custom_name_list` | `repeated bytes` | Alarm custom used options names, max: 10 |

### Enum Values

#### `operate_type`

| Value | Number | Description |
| --- | --- | --- |
| `INVALID` | `0` | Invalid or unspecified value. |
| `INQUIRE` | `1` | Query |
| `SET` | `2` | Set |

#### `disp_status`

| Value | Number | Description |
| --- | --- | --- |
| `DISP_OFF` | `0` | Display is off. |
| `DISP_ON` | `1` | Display is on. |

#### `alarm_type`

| Value | Number | Description |
| --- | --- | --- |
| `GET_UP` | `0` | Wake up |
| `SLEEP` | `1` | Sleep |

### `func_table` Capability Bits

| Bit | Description |
| - | - |
| 0 | Supports custom snooze duration through `later_remind_min`. |
| 1 | Supports previously used custom alarm labels through `custom_name_list`. |
| 2 | Snooze is unavailable when this bit is set. |
