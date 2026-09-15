---
docId: ios-volume
locale: en-US
title: iOS Volume
description: Read and configure device ringtone volume.
platform: iOS
slug: ios/volume
order: 141
status: published
version: v2.0
---

# iOS Volume

## Overview

Read and configure device ringtone volume.

## Swift example

The source SDK guide does not provide a confirmed Swift example for this capability. The data model below is included without inferring an API signature.

## Protobuf data model

```protobuf
syntax = "proto3";

message protocol_volume_adjust_operate
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    uint32 ringtone_volume = 2;// ringtone volume
}

message protocol_volume_adjust_inquire_reply
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    uint32 func_table = 2;// func table; 1bytes capability table
    uint32 ringtone_volume = 3;// ringtone volume
}
```
