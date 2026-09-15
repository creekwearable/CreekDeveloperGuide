---
docId: ios-getting-started
locale: en-US
title: iOS Quick Start
description: Initialize the iOS Creek SDK, then verify device authorization after a custom automatic connection.
platform: iOS
slug: ios/getting-started
order: 1
status: published
version: v2.0
---

# iOS Quick Start

## Initialize the SDK

```swift
CreekInterFace.instance.setupInit{
    cancelAutoConnect:/// Automatic connection is enabled by default; .cancel disables it
    CreekInterFace.instance.initSDK()
}
```

## Verify Device Authorization

If you implement your own automatic connection flow, verify after connecting that the watch is not bound to another phone. If authorization fails, remove the device or rebind it according to your product flow.

```swift
CreekInterFace.instance.authorizationVerificationDevice {
    print("Succeeded")
} failure: {
    print("Failed")
} authorizationFailure: {
    print("Verification failed")
}
```
