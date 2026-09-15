---
docId: ios-signal-strength
locale: en-US
title: iOS Signal Strength
description: Read the current Bluetooth RSSI value.
platform: iOS
slug: ios/signal-strength
order: 145
status: published
version: v2.0
---

# iOS Signal Strength

## Overview

Read the current Bluetooth RSSI value.

## Swift example

```swift
CreekInterFace.instance.readRssi { model in
            self.view.hideRemark()
            self.textView.text = "\(model)"
         }
```
