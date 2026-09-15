---
docId: flutter-offline-music
locale: en-US
title: "Flutter Offline Music"
description: "Upload, list, and delete offline music files."
platform: Flutter
slug: flutter/offline-music
order: 135
status: published
version: v2.0
---

# Flutter Offline Music

Upload, list, and delete offline music files.

## Upload music
```dart
sdkManager.uploadMusic(CreekMusicModel(songName: albumName == "" ? fileName.split(".").first : albumName, singer: trackArtistName == "" ? fileName.split(".").first:trackArtistName, audioType: AudioType.mp3), datas!.buffer.asUint8List(),success: (){
  Common.toast(label: S.of(Get.context!).upload_successful);
  progress = 100;
  DateTime dateTime2 = DateTime.now();
  update();
  getMusic();
},failure: (c,m){
  SmartDialog.dismiss();
  Common.toast(label: S.of(Get.context!).upload_failure);
},progress: (e){
  SmartDialog.dismiss();
  progress = e;
  update();
});
```

## Get music
```dart
sdkManager.getMusicList(callBack: (e){
  items = e.fileItems;
  update();
});
```

## Del music
```dart
sdkManager.delMusicList(items:[items[index]],callBack: (){
  return run(true);
},errCallBack: (m){
  return run(false);
});
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum operate_music_file_type
{
    INVALID = 0; // Invalid or unspecified value.
    INQUIRE = 1; // Query
    DELETE = 3;  // Delete
}

// Music data sub-item
message protocol_music_file_item
{
    uint32 track_key = 1;          // 4 bytes: Reserved key, currently unused
    bytes song_name = 2;           // max: 64 characters: Song name
    bytes singer = 3;              // max: 64 characters: Singer name
};

message protocol_music_file_operate
{
    operate_music_file_type operate = 1; // 1 byte: Operation type
    uint32 page_index = 2; // Current page number, used for segmented transmission
    uint32 page_num = 3; // Number of items in the current page, used for segmented transmission
    repeated protocol_music_file_item file_items = 4; // Music-file entries.
}

message protocol_music_file_inquire_reply
{
    operate_music_file_type operate = 1;     // 1 byte: Operation type
    uint32 func_table = 2;        // 1 byte: Function table
    uint32 music_file_support_max = 3; // 1 byte: Maximum number of supported songs
    uint32 page_index = 4; // Current page number, used for segmented transmission
    uint32 page_num = 5; // Number of items in the current page, used for segmented transmission
    uint32 music_totol_size = 6;      // 4 bytes: Total space in KB
    uint32 music_remain_size = 7;       // 4 bytes: Remaining space in KB
    repeated protocol_music_file_item file_items = 8; // max: 50
}
```

### Field Reference

#### `protocol_music_file_item`

| Field | Type | Description |
| --- | --- | --- |
| `track_key` | `uint32` | 4 bytes: Reserved key, currently unused |
| `song_name` | `bytes` | max: 64 characters: Song name |
| `singer` | `bytes` | max: 64 characters: Singer name |

#### `protocol_music_file_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_music_file_type` | 1 byte: Operation type |
| `page_index` | `uint32` | Current page number, used for segmented transmission |
| `page_num` | `uint32` | Number of items in the current page, used for segmented transmission |
| `file_items` | `repeated protocol_music_file_item` | Music-file entries. |

#### `protocol_music_file_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_music_file_type` | 1 byte: Operation type |
| `func_table` | `uint32` | 1 byte: Function table |
| `music_file_support_max` | `uint32` | 1 byte: Maximum number of supported songs |
| `page_index` | `uint32` | Current page number, used for segmented transmission |
| `page_num` | `uint32` | Number of items in the current page, used for segmented transmission |
| `music_totol_size` | `uint32` | 4 bytes: Total space in KB |
| `music_remain_size` | `uint32` | 4 bytes: Remaining space in KB |
| `file_items` | `repeated protocol_music_file_item` | max: 50 |

### Enum Values

#### `operate_music_file_type`

| Value | Number | Description |
| --- | --- | --- |
| `INVALID` | `0` | Invalid or unspecified value. |
| `INQUIRE` | `1` | Query |
| `DELETE` | `3` | Delete |
