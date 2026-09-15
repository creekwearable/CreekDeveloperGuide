---
docId: flutter-find-device
locale: en-US
title: "Flutter Find Device"
description: "Trigger and stop device-finding behavior."
platform: Flutter
slug: flutter/find-device
order: 125
status: published
version: v2.0
---

# Flutter Find Device

Trigger and stop device-finding behavior.

## SDK Usage

```dart
var operate = protocol_find_phone_watch_operate();
operate.findWatchSwitch = true;
operate.findWatchFlag = true;
sdkManager.setFindPhoneWatch(operate: operate,callBack: (){
  Common.toast(label: S.of(Get.context!).successful);
},errCallBack: (e){

});
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

message protocol_find_phone_watch_operate
{
    operate_type operate = 1; // 1 byte - Operation type: 0 = Invalid operation, 1 = Query, 2 = Set
    bool find_watch_switch = 2; // 1 byte - Find Watch switch: true = On, false = Off
    bool find_watch_flag = 3; // 1 byte - Find Watch: 0 = Stop, 1 = Start
    bool find_phone_close_flag = 4; // 1 byte - Find Phone Close: 1 = Close
}

message protocol_find_phone_watch_inquire_reply
{
    operate_type operate = 1; // 1 byte - Operation type: 0 = Invalid operation, 1 = Query, 2 = Set
    uint32 func_table = 2; // Function table
    bool find_watch_switch = 3; // 1 byte - Find Watch switch: true = On, false = Off
    bool find_watch_support = 4; // Whether Find Watch is supported
}
```

### Field Reference

#### `protocol_find_phone_watch_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1 byte - Operation type: 0 = Invalid operation, 1 = Query, 2 = Set |
| `find_watch_switch` | `bool` | 1 byte - Find Watch switch: true = On, false = Off |
| `find_watch_flag` | `bool` | 1 byte - Find Watch: 0 = Stop, 1 = Start |
| `find_phone_close_flag` | `bool` | 1 byte - Find Phone Close: 1 = Close |

#### `protocol_find_phone_watch_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1 byte - Operation type: 0 = Invalid operation, 1 = Query, 2 = Set |
| `func_table` | `uint32` | Function table |
| `find_watch_switch` | `bool` | 1 byte - Find Watch switch: true = On, false = Off |
| `find_watch_support` | `bool` | Whether Find Watch is supported |
