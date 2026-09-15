---
docId: ios-logs
locale: en-US
title: iOS Log Operations
description: Retrieve SDK logs and inspect retained log files.
platform: iOS
slug: ios/logs
order: 13
status: published
version: v2.0
---

# iOS Log Operations

## Overview

Retrieve SDK logs and inspect retained log files.

## Swift example

```swift
 self.view.showRemark(msg: "")
 CreekInterFace.instance.getFirmwareLogPath { path in
        self.view.hideRemark()
       let activityViewController = UIActivityViewController(activityItems: [NSURL(fileURLWithPath: path)], applicationActivities: nil)
        self.present(activityViewController, animated: true, completion: nil)
  }
```

```swift
CreekInterFace.instance.checkLogFile()
```
