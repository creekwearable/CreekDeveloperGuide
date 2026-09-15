---
docId: flutter-send-command
locale: en-US
title: "Flutter Send Command"
description: "Send an explicitly supplied hexadecimal SDK command."
platform: Flutter
slug: flutter/send-command
order: 139
status: published
version: v2.0
---

# Flutter Send Command

Send an explicitly supplied hexadecimal SDK command.

## SDK Usage

```dart
String hexString = '1020'; // 1020 is only an example command
sdkManager.sendCommand(
    sourceText: hexString,
    sendSuccess: (success) {

      }, sendFailure: (fail) {

    });
```
