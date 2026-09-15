---
docId: android-watch-faces
locale: en-US
title: Android Watch Face Management
description: Query, select, delete, and install watch faces.
platform: Android
slug: android/watch-faces
order: 7
status: published
version: v2.0
---

# Android Watch Face Management

Query, select, delete, and install watch faces.

device_id : FirmwareID

## Get the Current Watch Face

```kotlin
CreekManager.sInstance.getWatchDial({ model: Watchdial.protocol_watch_dial_plate_inquire_reply ->
    
}, failure = { _, m ->
    
})
```

## Set a Watch Face

```kotlin
var model = Watchdial.protocol_watch_dial_plate_operate()
model.addDialName(ByteString.copyFrom("1".toByteArray()))
CreekManager.sInstance.setWatchDial(model = model, {
   
}, failure = { _, m ->
    
})
```

## Delete a Watch Face

```kotlin
var model = Watchdial.protocol_watch_dial_plate_operate()
model.addDialName(ByteString.copyFrom("1".toByteArray()))
CreekManager.sInstance.delWatchDial(model = model, {
   
}, failure = { _, m ->
   
})
```

## Install a Watch Face (.bin)

```kotlin
CreekManager.sInstance.upload(
    "res.bin",
    decimalArray,
    uploadProgress = { progress ->
        print(progress)
    },
    uploadSuccess = {},
    uploadFailure = { c, m -> })
```

## Installation Notes

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

enum dial_type
{
    DIAL_TYPE_NULL          = 0;// Invalid
    DIAL_TYPE_GENERAL       = 1;// DIAL TYPE GENERAL.
    DIAL_TYPE_PHOTO         = 2;// DIAL TYPE PHOTO.
    DIAL_TYPE_WALLPAPER     = 3;// DIAL TYPE WALLPAPER.
    DIAL_TYPE_CUSTOM        = 4;// DIAL TYPE CUSTOM.
    DIAL_TYPE_GENERAL_AOD   = 5;// DIAL TYPE GENERAL AOD.
    DIAL_TYPE_AOD           = 6;// DIAL TYPE AOD.
}

enum dial_operate_type
{
    DIAL_OPERATE_TYPE_INQUIRE   = 0;// DIAL OPERATE TYPE INQUIRE.
    DIAL_OPERATE_TYPE_SET       = 1;// DIAL OPERATE TYPE SET.
    DIAL_OPERATE_TYPE_DELETE    = 2;// DIAL OPERATE TYPE DELETE.
}

message protocol_watch_dial_plate_list_item
{
    dial_type dial_type = 1;// Dial Type.
    uint32 version = 2;// Version. 2bytes.
    uint32 dial_size = 3;// Dial Size. 4bytes.
    bytes dial_name = 4; // Dial Name. max:30.
}

message protocol_watch_dial_plate_operate
{
    dial_operate_type operate = 1; // 1bytes Operation type
    repeated bytes dial_name = 2; // Dial Name. max:30.
    repeated bytes dial_list_sort = 3; // Dial List Sort. max:30.
}

message protocol_watch_dial_plate_inquire_reply
{
    dial_operate_type operate = 1; // 1bytes Operation type
    uint32  formula_mode = 2;// Formula Mode. 1bytes.
    uint32  plate_version = 3;// Plate Version. 1bytes.
    uint32  cloud_plate_num = 4;// Cloud Plate Num. 1bytes.
    uint32  user_cloud_plate_num = 5;// User Cloud Plate Num. 1bytes.
    uint32  photo_plate_num = 6;// Photo Plate Num. 1bytes.
    uint32  user_photo_plate_num = 7;// User Photo Plate Num. 1bytes.
    uint32  wallpaper_plate_num = 8;// Wallpaper Plate Num. 1bytes.
    uint32  user_wallpaper_plate_num = 9;// User Wallpaper Plate Num. 1bytes.
    repeated protocol_watch_dial_plate_list_item list_item = 10;
    uint32 total_size = 11;// Total Size. 4bytes.
    uint32 user_cloud_size = 12; // User Cloud Size. 4bytes.
    uint32 user_photo_size = 13; // User Photo Size. 4bytes.
    bytes now_show_plate_name = 14; // Now Show Plate Name. max:30.
    uint32 enable_compress = 15;// Enable Compress. 1bytes.
    uint32 func_table = 16;// Function table
    uint32 plate_photo_pic_support_num = 17;// Plate Photo Pic Support Num. 1bytes.
    uint32 all_plate_support_max = 18;// Maximum all plate support max. 1bytes.
}
```

### `func_table` Bit Definitions

| Bit | Description |
| - | - |
| 0 | Whether watch-face ordering is supported, Related field dial_list_sort |
