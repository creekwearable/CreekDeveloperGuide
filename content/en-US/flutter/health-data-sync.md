---
docId: flutter-health-data-sync
locale: en-US
title: "Flutter Health Data Synchronization"
description: "Synchronize all health records from the connected device."
platform: Flutter
slug: flutter/health-data-sync
order: 3
status: published
version: v2.0
---

# Flutter Health Data Synchronization

Synchronize all health records from the connected device.

## SDK Usage

```dart
sdkManager.sync(success: (){
  Common.toast(label: 'sync success');
},failure: (){
  Common.toast(label: 'sync failure');
},progress: (e){
  print("sync progress:$e");
});
```
