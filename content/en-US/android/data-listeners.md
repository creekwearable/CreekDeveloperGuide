---
docId: android-data-listeners
locale: en-US
title: Android Data Listeners
description: Listen for firmware notifications, system Bluetooth state, and firmware logs.
platform: Android
slug: android/data-listeners
order: 5
status: published
version: v2.0
---

# Android Data Listeners

Listen for firmware notifications, system Bluetooth state, and firmware logs.

## Firmware Notifications

```kotlin
CreekManager.sInstance.noticeUpdateListen {
    Log.w("123456", it.toString())
}
```

### `EVENT_ID_MUSIC_CONTROL`

| event_key | Description |
|-|-|
| 0 | Play |
| 1 | Pause |
| 2 | Previous track |
| 3 | Next track |
| 4 | Increase volume |
| 5 | Decrease volume |
| 6 | Adjust volume(event_value) |

### `EVENT_ID_FINE_PHONE`

| event_key | Description |
|-|-|
| 0 | Start |
| 1 | End |
| N | Ring for a fixed durationNSecond |

### `EVENT_ID_SYNC_DATA`

| event_key | Description |
|-|-|
| 0 | Request weather data |
| 0x01 | Update alarm information |
| 0x02 | Update raise-to-wake |
| 0x03 | Update Do Not Disturb settings |
| 0x04 | Update ringtone settings |
| 0x05 | Update automatic workout recognition |
| 0x06 | Update sleep data |
| 0x07 | Update workout records |
| 0x08 | Synchronize health data |
| 0x09 | Send a ping notification |
| 0x0a | Update women-health settings |
| 0x0b | Update voice-assistant language |
| 0x0c | Report Alexa idle state |
| 0x0d | Report Alexa alarms |
| 0x0e | Report Alexa reminder events |
| 0x0f | Update battery state |
| 0x10 | Update dynamic-message data |
| 0x11 | Dismiss the device dialog |
| 0x12 | Update workout-prescription data |
| 0x13 | Update Water Assistant |
| 0x14 | Update map coordinates |
| 0x15 | Update BT state |
| 0x16 | Update the negotiated MTU |
| 0x17 | Update preferences |

### `EVENT_ID_FINE_WATCH`

| event_key | Description |
|-|-|
| 0 | End |

### `EVENT_ID_CONTROL_CAMERA`

| event_key | Description |
|-|-|
| 0 | Take a photo |

## System Bluetooth Listener

```kotlin
CreekManager.sInstance.exceptionListen {
    
   }
```

## Firmware Log Reports

```kotlin
CreekManager.sInstance.eventReportListen { 
    
}
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

enum event_id
{
    EVENT_ID_NULL = 0;
    EVENT_ID_MUSIC_CONTROL = 1;// Music control
    EVENT_ID_FINE_PHONE = 2; // EVENT ID FINE PHONE.
    EVENT_ID_SYNC_DATA = 3;// EVENT ID SYNC DATA.
    EVENT_ID_FINE_WATCH = 4;// Find watch
    EVENT_ID_VOLUME_CHANGE = 5;// EVENT ID VOLUME CHANGE.
}

message protocol_notice_update_operate
{
    event_id event_id = 1; // Event Id. 1bytes.
    uint32 event_key = 2; // Event Key. 1bytes.
    uint32 event_value = 3;// Event Value.
}
```
