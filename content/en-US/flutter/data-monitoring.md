---
docId: flutter-data-monitoring
locale: en-US
title: "Flutter Data Monitoring"
description: "Listen for Bluetooth, connection, firmware-event, and system Bluetooth changes."
platform: Flutter
slug: flutter/data-monitoring
order: 5
status: published
version: v2.0
---

# Flutter Data Monitoring

Listen for Bluetooth, connection, firmware-event, and system Bluetooth changes.

## blueOnStateListen
```dart
sdkManager.blueOnStateListen((e){
  Common.toast(label: "blue state:${e.toString()}");

});
```

## Connection state
```dart
sdkManager.listenDeviceState = (state,deviceName) async{
   Global.connectionStatus = state;

};
```

## Firmware Notification App
```dart
sdkManager.noticeUpdateListen((e){

});
```

1.When event_id = EVENT_ID_MUSIC_CONTROL

| event_key | Explanation |
|-|-|
| 0 | Play |
| 1 | Pause |
| 2 | Previous Track |
| 3 | Next Track |
| 4 | Increase Volume |
| 5 | Decrease Volume |

2.When event_id = EVENT_ID_FINE_PHONE:

| event_key | Explanation |
|-|-|
| 0 | Start |
| 1 | End |
| N | Ring for N seconds |

3.When event_id = EVENT_ID_SYNC_DATA:

| event_key | Description |
|-|-|
| 0 |  Request Weather |
| 0x01 | Update Alarm Information |
| 0x02 | Update Wrist Raise to Wake |
| 0x03 | Update Do Not Disturb Settings |
| 0x04 | Update Ringtone Settings |
| 0x05 | Update Motion Recognition |
| 0x06 | Update Sleep |
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

2.When event_id = EVENT_ID_FINE_WATCH

| event_key | Explanation |
|-|-|
| 0 | End |

## System Bluetooth Listening
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

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum event_id {
    EVENT_ID_NULL = 0; // No event identifier specified.
    EVENT_ID_MUSIC_CONTROL = 1; // Music control
    EVENT_ID_FIND_PHONE = 2; // Find phone
    EVENT_ID_SYNC_DATA = 3; // Notification to update data
    EVENT_ID_FIND_WATCH = 4; // Find watch
    EVENT_ID_VOLUME_CHANGE = 5; // Volume change (for Alexa)
}

message protocol_notice_update_operate {
    event_id event_id = 1; // Event ID (1 byte)
    uint32 event_key = 2; // Specific event key (1 byte)
    uint32 event_value = 3; // Specific event value
}
```

### Field Reference

#### `protocol_notice_update_operate`

| Field | Type | Description |
| --- | --- | --- |
| `event_id` | `event_id` | Event ID (1 byte) |
| `event_key` | `uint32` | Specific event key (1 byte) |
| `event_value` | `uint32` | Specific event value |

### Enum Values

#### `event_id`

| Value | Number | Description |
| --- | --- | --- |
| `EVENT_ID_NULL` | `0` | No event identifier specified. |
| `EVENT_ID_MUSIC_CONTROL` | `1` | Music control |
| `EVENT_ID_FIND_PHONE` | `2` | Find phone |
| `EVENT_ID_SYNC_DATA` | `3` | Notification to update data |
| `EVENT_ID_FIND_WATCH` | `4` | Find watch |
| `EVENT_ID_VOLUME_CHANGE` | `5` | Volume change (for Alexa) |
