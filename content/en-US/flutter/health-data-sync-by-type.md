---
docId: flutter-health-data-sync-by-type
locale: en-US
title: "Flutter Health Data Synchronization by Type"
description: "Synchronize one selected category of health data."
platform: Flutter
slug: flutter/health-data-sync-by-type
order: 4
status: published
version: v2.0
---

# Flutter Health Data Synchronization by Type

Synchronize one selected category of health data.

## SDK Usage

```dart
sdkManager.syncHealthType(sync_type.SYNC_ACTIVITY,success: (){
  Common.toast(label: 'sync success');
},failure: (){
  Common.toast(label: 'sync failure');
},progress: (e){
  print("sync progress:$e");
});
```
