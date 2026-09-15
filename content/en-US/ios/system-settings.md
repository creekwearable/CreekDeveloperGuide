---
docId: ios-system-settings
locale: en-US
title: iOS System Settings
description: Perform restart, shutdown, factory reset, pairing-data removal, and related system operations.
platform: iOS
slug: ios/system-settings
order: 142
status: published
version: v2.0
---

# iOS System Settings

## Overview

The `type` argument of `setSystem(type:)` accepts these values:

| `type` | Operation |
|---:|---|
| 1 | Restart the device |
| 2 | Power off the device |
| 3 | Restore factory settings |
| 4 | Clear classic-Bluetooth pairing information |
| 5 | Enter airplane mode |

## Swift example

```swift
// Clear classic-Bluetooth pairing information.
CreekInterFace.instance.setSystem(type: 4) {
    // Handle success.
} failure: { code, message in
    // Handle error.
}
```

## Protobuf data model

```protobuf
syntax = "proto3";

message protocol_system_operate
{
    bool restart = 1;//Whether to restart the device
    bool power_off = 2;//Whether to power off the device
}
```
