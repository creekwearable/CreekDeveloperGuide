---
docId: flutter-logs
locale: en-US
title: "Flutter Log Operations"
description: "Retrieve SDK and firmware logs and inspect retained files."
platform: Flutter
slug: flutter/logs
order: 13
status: published
version: v2.0
---

# Flutter Log Operations

Retrieve SDK and firmware logs and inspect retained files.

## Retrieve Firmware and  SDK Logs
```dart
SmartDialog.showLoading();
sdkManager.getFirmwareLogPath((e){
  Share.shareXFiles([XFile(e ?? "")], subject: "log").then((value) {
    SmartDialog.dismiss();
  }, onError: (e) {
    SmartDialog.dismiss();
  });
});
```

## Check file retention data for 7 days
Note: It is necessary to manually inspect the files each time

```dart
sdkManager.checkLogFile();
```
