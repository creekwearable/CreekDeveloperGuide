---
docId: android-route-map
locale: en-US
title: Android Route Map
description: Upload GPX routes and query or delete device routes.
platform: Android
slug: android/route-map
order: 136
status: published
version: v2.0
---

# Android Route Map

Upload GPX routes and query or delete device routes.

### Upload a GPX File

```kotlin
fileDta?.let{
    CreekManager.sInstance.getGPXEncodeUint8List(data = it, geoId = 1234, sportType = sportType.IRUN,model = {
            lat: Double, lng: Double ->
        return@getGPXEncodeUint8List "shanghai"
    }, encode = {
            encodeData: ByteArray ->
        CreekManager.sInstance.upLoadGeo(data = encodeData, geoId = 1234, uploadProgress = { progress: Int ->
            Log.w("upLoadGeo",progress.toString())
        }, uploadSuccess = {
            Log.w("upLoadGeo","success")
        }, uploadFailure = {code, msg ->
            Log.w("upLoadGeo",msg)
        })

    })
}
```

### Get Routes

```kotlin
CreekManager.sInstance.getGeo(model = {
    
}, failure = {
    code, message ->
})
```

### Delete Routes

```kotlin
CreekManager.sInstance.delGeo(listOf(1234), success = {
    
}, failure = {
        code, msg -> 
})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

enum geobin_operate_type
{
    GEOBIN_OPERATE_TYPE_INQUIRE   = 0;// GEOBIN OPERATE TYPE INQUIRE.
    GEOBIN_OPERATE_TYPE_DELETE    = 1;// GEOBIN OPERATE TYPE DELETE.
}

message protocol_geobin_list_item
{
    uint32 geobin_size = 1; // Geobin Size. 4bytes.
    bytes geobin_name = 2;  // Geobin Name. max:30.
}

message protocol_geobin_operate
{
    geobin_operate_type operate = 1; // 1bytes Operation type
    repeated bytes geobin_name = 2; // Geobin Name. max:30.
}

message protocol_geobin_inquire_reply
{
    geobin_operate_type operate = 1; // 1bytes Operation type
    uint32  geobin_num = 2; // Geobin Num. 1bytes.
    repeated protocol_geobin_list_item list_item = 3;// List Item.
    uint32 total_size = 4; // Total Size. 4bytes.
}
```
