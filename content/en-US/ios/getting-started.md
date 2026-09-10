---
docId: ios-getting-started
locale: en-US
title: iOS Quick Start
description: Install and initialize the Creek SDK in an iOS project.
platform: iOS
slug: ios/getting-started
order: 1
status: published
version: v2.0
---

# iOS Quick Start

This guide explains how to integrate the Creek SDK into a Swift project.

## Requirements

- Xcode 16+
- Swift 5.9+
- iOS 12.0+

## Install the SDK

Add Creek SDK through Swift Package Manager.

    .package(
        url: "https://github.com/creek/creek-ios.git",
        from: "2.0.0"
    )

## Initialize

    Creek.initialize(
        appId: "YOUR_APP_ID",
        apiKey: "YOUR_API_KEY"
    )
