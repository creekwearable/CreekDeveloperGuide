---
docId: android-offline-music
locale: en-US
title: Android Offline Music
description: Upload, query, and delete offline music on the device.
platform: Android
slug: android/offline-music
order: 133
status: published
version: v2.0
---

# Android Offline Music

Upload, query, and delete offline music on the device.

### Upload Music

```kotlin
fileDta?.let {
    CreekManager.sInstance.uploadMusic(musicModel = CreekMusicModel(songName = songName, singer = singer,), fileData = it, uploadProgress = { progress: Int ->
      Log.w("uploadMusic",progress.toString())
    }, uploadSuccess = {
        Log.w("uploadMusic","success")
    }, uploadFailure = {code, msg ->
        Log.w("uploadMusic",msg)
    })
}
```

### Get Music

```kotlin
CreekManager.sInstance.getMusicList(page = 1, size = 20, model = {
    
}, failure = {
    code, message ->
})
```

### Delete Music

```kotlin
var operate = Music.protocol_music_file_operate()
var item =  Music.protocol_music_file_item()
operate.trackItemList.add(item)
CreekManager.sInstance.delMusicList(model = operate, success = {
    
}, failure = {
    code, message ->
})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";
 
enum operate_music_file_type
{
    INVALID = 0;
    INQUIRE = 1; // Query
    DELETE = 3;  // Delete
}
 

message protocol_music_file_item
{
    uint32 track_key = 1;          // Track Key. 4bytes.
    bytes song_name = 2;           // Song Name. max:64.
    bytes singer = 3;              // Singer. max:64.
};
 
message protocol_music_file_operate
{
    operate_music_file_type operate = 1; // 1bytes Operation type
    uint32 page_index = 2;// Current page index for paged transfer.
    uint32 page_num = 3;// Number of records in the current transfer page.
    repeated protocol_music_file_item file_items = 4;
}
 
message protocol_music_file_inquire_reply
{
    operate_music_file_type operate = 1;     // 1bytesOperation type
    uint32 func_table = 2;        // 1bytes Function table
    uint32 music_file_support_max = 3; // Number of music file support max. 1bytes.
    uint32 page_index = 4;// Current page index for paged transfer.
    uint32 page_num = 5;// Number of records in the current transfer page.
    uint32 music_totol_size = 6;      // Music Totol Size. 4bytes.
    uint32 music_remain_size = 7;       // Music Remain Size. 4bytes.
    repeated protocol_music_file_item file_items = 8;// File Items.
}
```
