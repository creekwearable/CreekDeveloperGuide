---
docId: flutter-data-monitoring
locale: zh-CN
title: "Flutter 数据监听"
description: "监听蓝牙、连接状态、固件事件与系统蓝牙变化。"
platform: Flutter
slug: flutter/data-monitoring
order: 5
status: published
version: v2.0
---

# Flutter 数据监听

监听蓝牙、连接状态、固件事件与系统蓝牙变化。

建议在应用初始化阶段统一注册监听，避免页面重复注册或遗漏状态变化。

## 蓝牙开关状态监听
```dart
sdkManager.blueOnStateListen((e){
  Common.toast(label: "blue state:${e.toString()}");

});
```

## 连接状态
```dart
sdkManager.listenDeviceState = (state,deviceName) async{
   Global.connectionStatus = state;

};
```

## 固件事件通知
```dart
sdkManager.noticeUpdateListen((e){

});
```

1. 当 `event_id = EVENT_ID_MUSIC_CONTROL` 时

| event_key | Explanation |
|-|-|
| 0 | Play |
| 1 | Pause |
| 2 | Previous Track |
| 3 | Next Track |
| 4 | Increase Volume |
| 5 | Decrease Volume |

2. 当 `event_id = EVENT_ID_FINE_PHONE` 时

| event_key | Explanation |
|-|-|
| 0 | Start |
| 1 | End |
| N | Ring for N 秒 |

3. 当 `event_id = EVENT_ID_SYNC_DATA` 时

| event_key | 说明 |
|-|-|
| 0 |  Request Weather |
| 0x01 | Update Alarm Information |
| 0x02 | Update Wrist Raise to Wake |
| 0x03 | Update Do Not Disturb Settings |
| 0x04 | Update Ringtone Settings |
| 0x05 | Update Motion Recognition |
| 0x06 | Update 睡眠 |
| 0x07 | Update Exercise Records |
| 0x08 | Sync Health Data |
| 0x09 | Notification Ping |
| 0x0a | Update Women's Health |
| 0x0b | Update Voice Assistant Language |
| 0x0c | Update Alexa idle status |
| 0x0d | Update Alexa alarm report |
| 0x0e | Update Alexa reminder event |
| 0x0f | Update battery change |
| 0x10 | Notify app of message update (dynamic message) |
| 0x11 | Notify to ignore device popup |
| 0x12 | Update workout prescription data |
| 0x13 | Update hydration reminder |
| 0x14 | Update map coordinates |
| 0x15 | Update Bluetooth status |
| 0x16 | Update MTU change |
| 0x17 | Update preference settings |

2. 当 `event_id = EVENT_ID_FINE_WATCH` 时

| event_key | Explanation |
|-|-|
| 0 | End |

## 系统蓝牙监听
```dart
/// Bluetooth global connection exception events that require user intervention
/// *************************************
/// User needs to manually unpair from Bluetooth management page (iOS)
/// 1. Peer removed pairing information
///    This error typically occurs when connecting to an iOS device, indicating that the iOS device cannot encrypt the connection with the Bluetooth device, resulting in a connection timeout (iOS).
/// 2. didFailToConnectPeripheral: Failed to encrypt the connection, the connection has timed out unexpectedly
///    This error occurs on Android phones when there is a communication error, and the user needs to manually restart the app and toggle the system Bluetooth (Android).
/// 3. android.permission.BLUETOOTH_PRIVILEGED
/// *************************************

/// Additional event listener
/// When actively connected to a device and heart rate push is in the enabled state, a forced disconnection is triggered to prompt the user to turn off the watch's heart rate push
/// 4. The watch turned on heart rate push, forcing disconnection

sdkManager.exceptionListen(connectExceptionListen: (e){

});
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum event_id {
    EVENT_ID_NULL = 0; // 未指定事件 ID。
    EVENT_ID_MUSIC_CONTROL = 1; // 音乐控制
    EVENT_ID_FIND_PHONE = 2; // Find phone
    EVENT_ID_SYNC_DATA = 3; // 通知更新数据
    EVENT_ID_FIND_WATCH = 4; // Find watch
    EVENT_ID_VOLUME_CHANGE = 5; // 音量变化(alexa需要)
}

message protocol_notice_update_operate {
    event_id event_id = 1; // 1bytes 事件id
    uint32 event_key = 2; // 1bytes 具体事件键值
    uint32 event_value = 3; // 具体事件数值
}
```

### 字段说明

#### `protocol_notice_update_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `event_id` | `event_id` | 1bytes 事件id |
| `event_key` | `uint32` | 1bytes 具体事件键值 |
| `event_value` | `uint32` | 具体事件数值 |

### 枚举值

#### `event_id`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `EVENT_ID_NULL` | `0` | 未指定事件 ID。 |
| `EVENT_ID_MUSIC_CONTROL` | `1` | 音乐控制 |
| `EVENT_ID_FIND_PHONE` | `2` | Find phone |
| `EVENT_ID_SYNC_DATA` | `3` | 通知更新数据 |
| `EVENT_ID_FIND_WATCH` | `4` | Find watch |
| `EVENT_ID_VOLUME_CHANGE` | `5` | 音量变化(alexa需要) |
