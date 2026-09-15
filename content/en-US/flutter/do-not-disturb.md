---
docId: flutter-do-not-disturb
locale: en-US
title: "Flutter Do Not Disturb"
description: "Read and configure device Do Not Disturb settings."
platform: Flutter
slug: flutter/do-not-disturb
order: 107
status: published
version: v2.0
---

# Flutter Do Not Disturb

Read and configure device Do Not Disturb settings.

## SDK Usage

When setting scheduled Do Not Disturb on the phone, it will not be displayed on the watch. The Do Not Disturb switch on the watch takes precedence. If it is turned on, it is fully enabled; if turned off on the watch, the scheduled Do Not Disturb set on the phone will take effect.

```dart
/// Retrieve Do Not Disturb
sdkManager.getDisturb(callBack: (e) {
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
}, errCallBack: (e) {
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});

/// Set Do Not Disturb
protocol_disturb_operate operate =  protocol_disturb_operate();
operate.disturbOnOff = true;
sdkManager.setDisturb(operate: operate,callBack: (){

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

enum switch_type
{
    SWITCH_NULL = 0;// NULL
    SWITCH_ON = 1;// On
    SWITCH_OFF = 2;// Off
}

// Set Do Not Disturb (DND) timing data item
message protocol_set_disturb_item
{
    uint32 disturb_id = 1;// 1byte DND timer ID, starting from 0
    uint32 start_hour = 2; // 1byte Start hour
    uint32 start_minute = 3;// 1byte Start minute
    uint32 end_hour = 4;// 1byte End hour
    uint32 end_minute = 5; // 1byte End minute
    repeated bool repeat = 6; // 7bytes Repeat, from Monday to Sunday
    bool switch_flag = 7;// 1byte Switch flag
};

message protocol_disturb_operate
{
    operate_type operate = 1; // 1byte Operation type, 0: Invalid, 1: Query, 2: Set
    uint32 num = 2;  // 1byte Number of DND settings
    bool disturb_on_off = 3;  // 1byte Disable DND switch, true: On, false: Off
    repeated protocol_set_disturb_item disturb_item = 4;// max: 5
    switch_type disturb_switch = 5;  // 1byte DND mode function switch, true: On, false: Off
}

message protocol_disturb_inquire_reply
{
    uint32 func_table = 1;// 1byte Function table
    uint32 disturb_max = 2; // 1byte Max number of DND timers supported
    operate_type operate = 3; // 1byte Operation type, 0: Invalid, 1: Query, 2: Set
    uint32 num = 4;  // 1byte Number of DND timers
    bool disturb_on_off = 5;  // 1byte Disable DND switch, true: On, false: Off
    repeated protocol_set_disturb_item disturb_item = 6;// max: 5
    switch_type disturb_switch = 7;  // 1byte DND mode function switch, true: On, false: Off
}
```

### Field Reference

#### `protocol_set_disturb_item`

| Field | Type | Description |
| --- | --- | --- |
| `disturb_id` | `uint32` | 1byte DND timer ID, starting from 0 |
| `start_hour` | `uint32` | 1byte Start hour |
| `start_minute` | `uint32` | 1byte Start minute |
| `end_hour` | `uint32` | 1byte End hour |
| `end_minute` | `uint32` | 1byte End minute |
| `repeat` | `repeated bool` | 7bytes Repeat, from Monday to Sunday |
| `switch_flag` | `bool` | 1byte Switch flag |

#### `protocol_disturb_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1byte Operation type, 0: Invalid, 1: Query, 2: Set |
| `num` | `uint32` | 1byte Number of DND settings |
| `disturb_on_off` | `bool` | 1byte Disable DND switch, true: On, false: Off |
| `disturb_item` | `repeated protocol_set_disturb_item` | max: 5 |
| `disturb_switch` | `switch_type` | 1byte DND mode function switch, true: On, false: Off |

#### `protocol_disturb_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `func_table` | `uint32` | 1byte Function table |
| `disturb_max` | `uint32` | 1byte Max number of DND timers supported |
| `operate` | `operate_type` | 1byte Operation type, 0: Invalid, 1: Query, 2: Set |
| `num` | `uint32` | 1byte Number of DND timers |
| `disturb_on_off` | `bool` | 1byte Disable DND switch, true: On, false: Off |
| `disturb_item` | `repeated protocol_set_disturb_item` | max: 5 |
| `disturb_switch` | `switch_type` | 1byte DND mode function switch, true: On, false: Off |

### Enum Values

#### `operate_type`

| Value | Number | Description |
| --- | --- | --- |
| `INVALID` | `0` | Invalid or unspecified value. |
| `INQUIRE` | `1` | Query |
| `SET` | `2` | Set |

#### `switch_type`

| Value | Number | Description |
| --- | --- | --- |
| `SWITCH_NULL` | `0` | NULL |
| `SWITCH_ON` | `1` | On |
| `SWITCH_OFF` | `2` | Off |
