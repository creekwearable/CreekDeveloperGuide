---
docId: ios-health-data-sync
locale: en-US
title: iOS Health Data Sync
description: Synchronize all health data stored on the device and handle progress and results.
platform: iOS
slug: ios/health-data-sync
order: 3
status: published
version: v2.0
---

# iOS Health Data Sync

## Overview

Synchronize all health data stored on the device and handle progress and results.

## Swift example

```swift
CreekInterFace.instance.sync { progress in
                print("sync \(progress)")
            } syncSuccess: {
                print("syncSuccess")
            } syncFailure: {
                print("syncFailure")
            }
```
