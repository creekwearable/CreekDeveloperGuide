---
docId: flutter-water-reminder
locale: en-US
title: "Flutter Water Reminder"
description: "Read and configure scheduled water reminders."
platform: Flutter
slug: flutter/water-reminder
order: 120
status: published
version: v2.0
---

# Flutter Water Reminder

Read and configure scheduled water reminders.

## SDK Usage

```dart
///get
sdkManager.getWater(callBack: (e) {
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
}, errCallBack: (e) {
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});
///set
protocol_drink_water_operate operate =  protocol_drink_water_operate();
 operate.switchFlag = true;
 operate.startHour = 8;
 operate.startMinute = 0;
 operate.endHour = 18;
 operate.endMinute = 0;
 sdkManager.setWater(operate: operate,callBack: (){

 },errCallBack: (e){

 });
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum operate_type
{
     INVALID = 0; // Invalid or unspecified value.
     INQUIRE = 1; // Query
     SET = 2;// Set
}

message protocol_drink_water_operate
{
     operate_type operate = 1; // 1bytes operation type 0: invalid operation 1: query 2: setting
     bool switch_flag = 2; // 1bytes drinking water reminder switch true to turn on, false to turn off
     notify_type notify_flag = 3; // 1bytes notification type
     uint32 start_hour = 4; // Reminder start time
     uint32 start_minute = 5; // Start minute.
     uint32 end_hour = 6; // Reminder end time
     uint32 end_minute = 7; // End minute.
     repeated bool repeat = 8; // 1bytes repetition period Monday to Sunday
     uint32 interval = 9; // 2bytes reminder interval, unit minutes
}

message protocol_drink_water_inquire_reply
{
     uint32 func_table = 1;// 1bytes function table
     operate_type operate = 2; // 1bytes operation type 0: invalid operation 1: query 2: setting
     bool switch_flag = 3; // 1bytes drinking water reminder switch true to turn on, false to turn off
     notify_type notify_flag = 4; // 1bytes notification type
     uint32 start_hour = 5; // Reminder start time
     uint32 start_minute = 6; // Start minute.
     uint32 end_hour = 7; // Reminder end time
     uint32 end_minute = 8; // End minute.
     repeated bool repeat = 9; // 1bytes repetition period Monday to Sunday
     uint32 interval = 10; // 2bytes reminder interval, unit minutes
}
```

### Field Reference

#### `protocol_drink_water_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes operation type 0: invalid operation 1: query 2: setting |
| `switch_flag` | `bool` | 1bytes drinking water reminder switch true to turn on, false to turn off |
| `notify_flag` | `notify_type` | 1bytes notification type |
| `start_hour` | `uint32` | Reminder start time |
| `start_minute` | `uint32` | Start minute. |
| `end_hour` | `uint32` | Reminder end time |
| `end_minute` | `uint32` | End minute. |
| `repeat` | `repeated bool` | 1bytes repetition period Monday to Sunday |
| `interval` | `uint32` | 2bytes reminder interval, unit minutes |

#### `protocol_drink_water_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `func_table` | `uint32` | 1bytes function table |
| `operate` | `operate_type` | 1bytes operation type 0: invalid operation 1: query 2: setting |
| `switch_flag` | `bool` | 1bytes drinking water reminder switch true to turn on, false to turn off |
| `notify_flag` | `notify_type` | 1bytes notification type |
| `start_hour` | `uint32` | Reminder start time |
| `start_minute` | `uint32` | Start minute. |
| `end_hour` | `uint32` | Reminder end time |
| `end_minute` | `uint32` | End minute. |
| `repeat` | `repeated bool` | 1bytes repetition period Monday to Sunday |
| `interval` | `uint32` | 2bytes reminder interval, unit minutes |

### Enum Values

#### `operate_type`

| Value | Number | Description |
| --- | --- | --- |
| `INVALID` | `0` | Invalid or unspecified value. |
| `INQUIRE` | `1` | Query |
| `SET` | `2` | Set |

### `func_table` Capability Bits

| Bit | Description |
| - | - |
| 0 | The protocol supports only the water-reminder switch when this bit is set. |
