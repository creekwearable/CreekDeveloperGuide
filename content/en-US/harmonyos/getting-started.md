---
docId: harmonyos-getting-started
locale: en-US
title: HarmonyOS Quick Start
description: Integrate the Creek SDK into a HarmonyOS project.
platform: HarmonyOS
slug: harmonyos/getting-started
order: 1
status: published
version: v2.0
---

# HarmonyOS Quick Start

This guide explains how to install the Creek SDK in an ArkTS project.

## Requirements

- DevEco Studio 5.0+
- HarmonyOS API 9+
- ArkTS

## Install the SDK

    ohpm install @creek/sdk

## Initialize

    Creek.initialize({
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_API_KEY'
    })
