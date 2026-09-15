---
docId: ios-data-listeners
locale: en-US
title: iOS Data Listeners
description: Listen for firmware notifications, system Bluetooth state, and device log events.
platform: iOS
slug: ios/data-listeners
order: 5
status: published
version: v2.0
---

# iOS Data Listeners

## Overview

Use global callbacks to receive device capability notifications, Bluetooth exceptions that require user action, and firmware log events.

## Firmware capability notifications

```swift
CreekInterFace.instance.noticeUpdateListen { model in
    switch model.eventId {
    case .EVENT_ID_MUSIC_CONTROL:
        print("Music event: \(model.eventKey), value: \(model.eventValue)")
    case .EVENT_ID_SYNC_DATA:
        print("Synchronization event: \(model.eventKey)")
    default:
        break
    }
}
```

### EVENT_ID_MUSIC_CONTROL

| `event_key` | Meaning |
|---:|---|
| 0 | Play |
| 1 | Pause |
| 2 | Previous track |
| 3 | Next track |
| 4 | Increase volume |
| 5 | Decrease volume |
| 6 | Set volume; read the value from `event_value` |

### EVENT_ID_FINE_PHONE

| `event_key` | Meaning |
|---:|---|
| 0 | Start finding the phone |
| 1 | Stop finding the phone |
| N | Ring the phone for N seconds |

### EVENT_ID_SYNC_DATA

| `event_key` | Meaning |
|---:|---|
| 0x00 | Request weather data |
| 0x01 | Refresh alarm information |
| 0x02 | Refresh raise-to-wake settings |
| 0x03 | Refresh DND settings |
| 0x04 | Refresh ringtone settings |
| 0x05 | Refresh automatic workout-recognition settings |
| 0x06 | Refresh sleep data |
| 0x07 | Refresh workout records |
| 0x08 | Synchronize health data |
| 0x09 | Ping notification |
| 0x0A | Refresh women's-health data |
| 0x0B | Refresh the voice-assistant language |
| 0x0C | Report Alexa idle state |
| 0x0D | Report an Alexa alarm |
| 0x0E | Report an Alexa reminder event |
| 0x0F | Report a battery-level change |
| 0x10 | Notify a dynamic-message update |
| 0x11 | Suppress the device dialog |
| 0x12 | Report workout-prescription data |
| 0x13 | Refresh hydration-assistant data |
| 0x14 | Refresh map coordinates |
| 0x15 | Refresh classic-Bluetooth state |
| 0x16 | Report an MTU change |
| 0x17 | Refresh preference settings |

### Other events

| `event_id` | `event_key` | Meaning |
|---|---:|---|
| `EVENT_ID_FINE_WATCH` | 0 | Stop finding the watch |
| `EVENT_ID_VOLUME_CHANGE` | N | Current volume value |
| `EVENT_ID_CONTROL_CAMERA` | 0 | Trigger the iOS camera shutter |
| `EVENT_ID_LOG_CONTROL` | 0 | No operation |
| `EVENT_ID_LOG_CONTROL` | 1 | Standard log |
| `EVENT_ID_LOG_CONTROL` | 2 | Reset log |
| `EVENT_ID_LOG_CONTROL` | 3 | Core-dump binary log |

## Bluetooth exception listener

```swift
CreekInterFace.instance.exceptionListen { message in
    if message.contains("Peer removed pairing information") {
        // Ask the user to remove the old pairing in iOS Bluetooth settings.
    }

    if message.contains("The watch turned on heart rate push") {
        // Ask the user to disable heart-rate streaming and reconnect.
    }
}
```

## Firmware log events

```swift
CreekInterFace.instance.eventReportListen { model in
    print(model.eventId ?? "")
    print(model.subId ?? "")
    print(model.time ?? "")
    print(model.message ?? "")
}
```

## Protobuf data model

```protobuf
syntax = "proto3";

enum event_id
{
    EVENT_ID_NULL = 0;//No event
    EVENT_ID_MUSIC_CONTROL = 1;//Music control
    EVENT_ID_FINE_PHONE = 2;//Find phone
    EVENT_ID_SYNC_DATA = 3;//Synchronize or refresh data
    EVENT_ID_FINE_WATCH = 4;//Find watch
    EVENT_ID_VOLUME_CHANGE = 5;//Volume change
    EVENT_ID_CONTROL_CAMERA = 6;//Camera control
    EVENT_ID_LOG_CONTROL = 7;//Log-transfer notification
}

message protocol_notice_update_operate
{
    event_id event_id = 1;//Event type
    uint32 event_key = 2;//Operation within the selected event
    uint32 event_value = 3;//Numeric value carried by the event
}

message protocol_event_report
{
    string event_id = 1;//Event ID
    string event_sub_id = 2;//Event sub-ID
    string event_time = 3;//Event timestamp
    string event_message = 4;//Event payload
}
```
