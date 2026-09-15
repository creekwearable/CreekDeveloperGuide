---
docId: flutter-ephemeris-upload
locale: en-US
title: "Flutter Ephemeris File Upload"
description: "Update ephemeris files in foreground or background mode."
platform: Flutter
slug: flutter/ephemeris-upload
order: 8
status: published
version: v2.0
---

# Flutter Ephemeris File Upload

Update ephemeris files in foreground or background mode.

## SDK Usage

The SDK will ask for GPS positioning data through closure inquiry.

**updateEphemeris – Ephemeris File Update**  
 Parameters:

- **model**: CreekEphemerisManageModel
- **isBackground**: `Bool = false` – whether to run in background mode

**Behavior:**

- When `isBackground == false`: The update runs in the background. If there are other tasks, it will be queued.
- When `isBackground == true`: All other upload tasks are forcefully canceled, and the update runs immediately.

**Notes:**

- When listening for automatic ephemeris updates, set `isBackground = false` so the update runs in the background.
- When the user manually triggers an ephemeris update, set `isBackground = true` so it runs directly in the foreground.

```dart
sdkManager.ephemerisUpdateListen(() {
  print("Ask for GPS data");
  CreekEphemerisManageModel model = CreekEphemerisManageModel(
      isVaild: false, latitude: 22790321, longitude: 113879551, altitude: 10);
  sdkManager.updateEphemeris(model,isBackground: false, () {
    CreekLog.info("Ephemeris update successful.");
  }, (e) {
    CreekLog.info(e);
  });
});

sdkManager.getEphemerisUpdateTime().then((e) {
  if (e.offlineEphemeris.isSupported) {
    CreekLog.info("Supports offline ephemeris");
    if (e.offlineEphemeris.needUpdate) {
      CreekLog.info("Offline ephemeris needs to be updated");
    }
    if (e.offlineEphemeris.updateTime == 0) {
      CreekLog.info("Offline ephemeris has never been updated");
    } else {
      DateTime date = DateTime.fromMillisecondsSinceEpoch(e.offlineEphemeris.updateTime * 1000, isUtc: true);
      CreekLog.info("Last offline ephemeris update time::${date.toString()}");
    }
  }
  if (e.onlineEphemeris.isSupported) {
    CreekLog.info("Supports online ephemeris");
    if (e.onlineEphemeris.needUpdate) {
      CreekLog.info("Online ephemeris needs to be updated");
    }
    if (e.onlineEphemeris.updateTime == 0) {
      CreekLog.info("Online ephemeris has never been updated");
    } else {
      DateTime date = DateTime.fromMillisecondsSinceEpoch(e.offlineEphemeris.updateTime * 1000, isUtc: true);
      CreekLog.info("Last online ephemeris update time::${date.toString()}");
    }
  }
});
```
