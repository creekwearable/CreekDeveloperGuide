---
docId: android-getting-started
locale: en-US
title: Android Quick Start
description: Install and initialize the Creek SDK in an Android project.
platform: Android
slug: android/getting-started
order: 1
status: published
version: v2.0
---

# Android Quick Start

This guide walks you through installing and initializing the Creek SDK in an Android project.

## Requirements

- Android Studio Ladybug or later
- Kotlin 1.9+
- Android minSdk 21+

## Install the SDK

Add the Creek SDK dependency to your project:

    dependencies {
        implementation("com.creek:sdk:2.0.0")
    }

## Initialize

Initialize the SDK in Application.onCreate:

    Creek.init(
        context = this,
        appId = "YOUR_APP_ID",
        apiKey = "YOUR_API_KEY"
    )

> Never commit production credentials to a client repository.

## Next steps

Continue with the device connection and data synchronization guides.
