---
docId: flutter-getting-started
locale: en-US
title: Flutter Quick Start
description: Integrate the Creek SDK into a Flutter application.
platform: Flutter
slug: flutter/getting-started
order: 1
status: published
version: v2.0
---

# Flutter Quick Start

The Creek Flutter plugin provides one Dart API over the native Android and iOS SDKs.

## Install the plugin

    dependencies:
      creek_sdk: ^2.0.0

## Initialize

    await CreekSdk.initialize(
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_API_KEY',
    );

## Platform setup

- Declare Bluetooth permissions in the Android project.
- Add the Bluetooth usage description to the iOS project.
