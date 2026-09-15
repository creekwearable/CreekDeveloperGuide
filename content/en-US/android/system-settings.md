---
docId: android-system-settings
locale: en-US
title: Android System Settings
description: Perform restart, shutdown, factory-reset, and other system operations.
platform: Android
slug: android/system-settings
order: 142
status: published
version: v2.0
---

# Android System Settings

Perform restart, shutdown, factory-reset, and other system operations.

```kotlin
type ：
1 Restart operation 
2 Shut down operation 
3 Restore factory settings  
4 Clear bt information
CreekManager.sInstance.setSystem(type = 4, success = {

}, failure = {
    c,m ->
})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

message protocol_system_operate
{
    bool restart = 1;// Restart.
    bool power_off = 2;// Power Off.
}
```
