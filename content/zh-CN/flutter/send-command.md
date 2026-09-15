---
docId: flutter-send-command
locale: zh-CN
title: "Flutter 发送命令"
description: "通过 SDK 发送明确提供的十六进制命令。"
platform: Flutter
slug: flutter/send-command
order: 139
status: published
version: v2.0
---

# Flutter 发送命令

通过 SDK 发送明确提供的十六进制命令。

该接口仅用于已确认的十六进制指令。调用前请确认指令适用于当前设备与固件版本。

## 接口示例

```dart
String hexString = '1020'; // 1020 只是一个指令示例
sdkManager.sendCommand(
    sourceText: hexString,
    sendSuccess: (success) {

      }, sendFailure: (fail) {

    });
```
