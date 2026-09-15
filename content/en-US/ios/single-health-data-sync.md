---
docId: ios-single-health-data-sync
locale: en-US
title: iOS Single-Type Health Data Sync
description: Synchronize one selected category of health data.
platform: iOS
slug: ios/single-health-data-sync
order: 4
status: published
version: v2.0
---

# iOS Single-Type Health Data Sync

## Overview

Synchronize one selected category of health data.

## Swift example

```swift
CreekInterFace.instance.syncHealthType(type: .syncActivity) { progress in
            self.textView.text = "progress\(progress)"
         } syncSuccess: {
            self.view.hideRemark()
            self.textView.text = "success"
         } syncFailure: {
            self.view.hideRemark()
            self.textView.text = "failure"
         }
```
