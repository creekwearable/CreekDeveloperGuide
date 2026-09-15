---
docId: flutter-system-settings
locale: en-US
title: "Flutter System Settings"
description: "Restart, shut down, reset, or clear Bluetooth information."
platform: Flutter
slug: flutter/system-settings
order: 129
status: published
version: v2.0
---

# Flutter System Settings

Restart, shut down, reset, or clear Bluetooth information.

## SDK Usage

```dart
// type ：
// 1 Restart operation
// 2 Shut down operation
// 3 Restore factory settings
// 4 Clear bt information
sdkManager.setSystem(type: 1,callBack: (){

},errCallBack: (e){

});
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

message protocol_system_operate {
    bool restart = 1; // Restart operation
    bool power_off = 2; // Power off operation
}
```

### Field Reference

#### `protocol_system_operate`

| Field | Type | Description |
| --- | --- | --- |
| `restart` | `bool` | Restart operation |
| `power_off` | `bool` | Power off operation |
