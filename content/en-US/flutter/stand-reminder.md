---
docId: flutter-stand-reminder
locale: en-US
title: "Flutter Stand Reminder"
description: "Read and configure standing reminders."
platform: Flutter
slug: flutter/stand-reminder
order: 119
status: published
version: v2.0
---

# Flutter Stand Reminder

Read and configure standing reminders.

## SDK Usage

```dart
///get
sdkManager.getStanding(callBack: (e) {
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
}, errCallBack: (e) {
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});

///set
protocol_standing_remind_operate operate =  protocol_standing_remind_operate();
protocol_standing_remind_set set =   protocol_standing_remind_set();
set.switchFlag = true;
operate.standingRemind = set;
sdkManager.setStanding(operate: operate,callBack: (){

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

enum notify_type
{
     ALLOW = 0; // Allow notifications
     SILENT = 1;// Silent notification
     CLOSE = 2; // Close notification
}

message protocol_standing_remind_set
{
     bool switch_flag = 1; // 1bytes standing reminder switch true to turn on, false to turn off
     notify_type notify_flag = 2; // 1bytes notification type
     uint32 start_hour = 3; // Reminder start time
     uint32 start_minute = 4; // Start minute.
     uint32 end_hour = 5; // Reminder end time
     uint32 end_minute = 6; // End minute.
     repeated bool repeat = 7; // 1bytes repetition period Monday to Sunday
}

message protocol_standing_remind_operate
{
     operate_type operate = 1; // 1bytes operation type 0: invalid operation 1: query 2: setting
     protocol_standing_remind_set standing_remind = 2; // Standing-reminder settings.
}

message protocol_standing_remind_inquire_reply
{
     uint32 func_table = 1;// 1bytes function table
     operate_type operate = 2; // 1bytes operation type 0: invalid operation 1: query 2: setting
     protocol_standing_remind_set standing_remind = 3; // Standing-reminder settings.
}
```

### Field Reference

#### `protocol_standing_remind_set`

| Field | Type | Description |
| --- | --- | --- |
| `switch_flag` | `bool` | 1bytes standing reminder switch true to turn on, false to turn off |
| `notify_flag` | `notify_type` | 1bytes notification type |
| `start_hour` | `uint32` | Reminder start time |
| `start_minute` | `uint32` | Start minute. |
| `end_hour` | `uint32` | Reminder end time |
| `end_minute` | `uint32` | End minute. |
| `repeat` | `repeated bool` | 1bytes repetition period Monday to Sunday |

#### `protocol_standing_remind_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes operation type 0: invalid operation 1: query 2: setting |
| `standing_remind` | `protocol_standing_remind_set` | Standing-reminder settings. |

#### `protocol_standing_remind_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `func_table` | `uint32` | 1bytes function table |
| `operate` | `operate_type` | 1bytes operation type 0: invalid operation 1: query 2: setting |
| `standing_remind` | `protocol_standing_remind_set` | Standing-reminder settings. |

### Enum Values

#### `operate_type`

| Value | Number | Description |
| --- | --- | --- |
| `INVALID` | `0` | Invalid or unspecified value. |
| `INQUIRE` | `1` | Query |
| `SET` | `2` | Set |

#### `notify_type`

| Value | Number | Description |
| --- | --- | --- |
| `ALLOW` | `0` | Allow notifications |
| `SILENT` | `1` | Silent notification |
| `CLOSE` | `2` | Close notification |
