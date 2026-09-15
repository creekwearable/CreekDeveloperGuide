---
docId: flutter-sport-edit
locale: en-US
title: "Flutter Sport Record Editing"
description: "Edit a supported SDK sport record after confirming suitability."
platform: Flutter
slug: flutter/sport-edit
order: 141
status: published
version: v2.0
---

# Flutter Sport Record Editing

Edit a supported SDK sport record after confirming suitability.

## SDK Usage

Use the CreekSportModel object returned by the SDK to modify the values you want to edit, and then pass the original object back in.

```dart
bool isbool = await sdkManager.editSport(CreekSportModel());
```
