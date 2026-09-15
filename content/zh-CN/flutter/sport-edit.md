---
docId: flutter-sport-edit
locale: zh-CN
title: "Flutter 运动数据编辑"
description: "在确认适用场景后编辑 SDK 返回的运动记录。"
platform: Flutter
slug: flutter/sport-edit
order: 141
status: published
version: v2.0
---

# Flutter 运动数据编辑

在确认适用场景后编辑 SDK 返回的运动记录。

此能力需要在使用前确认当前项目与数据类型是否适用。请修改 SDK 返回的原始 `CreekSportModel`，再将同一对象回传。

## 接口示例

使用 SDK 返回的 `CreekSportModel` 对象修改需要编辑的值，再将同一个原始对象传回 SDK。

```dart
bool isbool = await sdkManager.editSport(CreekSportModel());
```
