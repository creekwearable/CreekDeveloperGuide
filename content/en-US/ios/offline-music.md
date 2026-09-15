---
docId: ios-offline-music
locale: en-US
title: iOS Offline Music
description: Upload, list, and delete offline music on the device.
platform: iOS
slug: ios/offline-music
order: 133
status: published
version: v2.0
---

# iOS Offline Music

## Overview

Upload, list, and delete offline music on the device.

## Swift example

```swift
CreekInterFace.instance.uploadMusic(musicModel: CreekMusicModel(songName: songName,singer: singer,audioType: .mp3), fileData: fileData) { progress in
             self.infoLabel.text = "progress : \(progress)"
          } uploadSuccess: {
             self.infoLabel.text = "Success"
          } uploadFailure: { code, message in
             self.infoLabel.text = "Failure"
          }
```

```swift
CreekInterFace.instance.getMusicList (page: 1,size: 20){ model in
            
         } failure: { code, message in
            
         }
```

```swift
var operate = protocol_music_file_operate()
var item = protocol_music_file_item()
operate.trackItem.append(item)     
CreekInterFace.instance.delMusicList(model: operate) {
            // Handle success.
   } failure: { code, message in
            // Handle error.
}
```

## Capability-table fields

Check these fields after reading `protocol_function_table`:

```protobuf
message function_table {
    bool is_support = 1;//Whether the capability is supported.
    uint32 cmd_id = 2;//Capability command identifier.
}

message protocol_function_table {
    function_table music_file = 42;//Music-file capability.
}
```

## Protobuf data model

```protobuf
syntax = "proto3";
 
enum operate_music_file_type
{
    INVALID = 0;
    INQUIRE = 1; // query
    DELETE = 3;  // delete
}
 
// One offline-music file item.
message protocol_music_file_item
{
    uint32 track_key = 1;          // track key; 4bytes key,
    bytes song_name = 2;           // song name; max:64 name
    bytes singer = 3;              // singer; max:64
};
 
message protocol_music_file_operate
{
    operate_music_file_type operate = 1; // operate; 1bytes operation type
    uint32 page_index = 2;// current page index used for paged transfer
    uint32 page_num = 3;// records in the current page used for paged transfer
    repeated protocol_music_file_item file_items = 4;
}
 
message protocol_music_file_inquire_reply
{
    operate_music_file_type operate = 1;     // operate; 1bytesoperation type
    uint32 func_table = 2;        // func table; 1bytes capability table
    uint32 music_file_support_max = 3; // Maximum supported offline-music files; 1 byte
    uint32 page_index = 4;// current page index used for paged transfer
    uint32 page_num = 5;// records in the current page used for paged transfer
    uint32 music_totol_size = 6;      // Total music storage in KB; 4 bytes
    uint32 music_remain_size = 7;       // Remaining music storage in KB; 4 bytes
    repeated protocol_music_file_item file_items = 8;// Music files; maximum 50
}
```
