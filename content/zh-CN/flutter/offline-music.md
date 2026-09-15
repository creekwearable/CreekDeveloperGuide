---
docId: flutter-offline-music
locale: zh-CN
title: "Flutter 离线音乐"
description: "上传、查询并删除离线音乐文件。"
platform: Flutter
slug: flutter/offline-music
order: 135
status: published
version: v2.0
---

# Flutter 离线音乐

上传、查询并删除离线音乐文件。

## 上传音乐
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

## 获取音乐
```dart
sdkManager.getMusicList(callBack: (e){
  items = e.fileItems;
  update();
});
```

## 删除音乐
```dart
sdkManager.delMusicList(items:[items[index]],callBack: (){
  return run(true);
},errCallBack: (m){
  return run(false);
});
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum operate_music_file_type
{
    INVALID = 0; // 无效或未指定的值。
    INQUIRE = 1; // 查询
    DELETE = 3; // 删除
}

// Music data sub-item
message protocol_music_file_item
{
    uint32 track_key = 1; // 4bytes 预留key,暂时不用
    bytes song_name = 2; // max:64 歌曲名称
    bytes singer = 3; // max:64 演唱者
};

message protocol_music_file_operate
{
    operate_music_file_type operate = 1; // 1bytes 操作类型
    uint32 page_index = 2; // 当前多少页，用于分段传输。
    uint32 page_num = 3; // 当前页传输多少条数据，用于分段传输。
    repeated protocol_music_file_item file_items = 4; // 音乐文件列表项。
}

message protocol_music_file_inquire_reply
{
    operate_music_file_type operate = 1; // 1bytes操作类型
    uint32 func_table = 2; // 1bytes 功能表
    uint32 music_file_support_max = 3; // 1bytes 歌曲支持最大数量
    uint32 page_index = 4; // 当前多少页，用于分段传输。
    uint32 page_num = 5; // 当前页传输多少条数据，用于分段传输。
    uint32 music_totol_size = 6; // 4bytes 总空间 单位为KB
    uint32 music_remain_size = 7; // 4bytes 剩余空间 单位为KB
    repeated protocol_music_file_item file_items = 8; // max: 暂定50
}
```

### 字段说明

#### `protocol_music_file_item`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `track_key` | `uint32` | 4bytes 预留key,暂时不用 |
| `song_name` | `bytes` | max:64 歌曲名称 |
| `singer` | `bytes` | max:64 演唱者 |

#### `protocol_music_file_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_music_file_type` | 1bytes 操作类型 |
| `page_index` | `uint32` | 当前多少页，用于分段传输。 |
| `page_num` | `uint32` | 当前页传输多少条数据，用于分段传输。 |
| `file_items` | `repeated protocol_music_file_item` | 音乐文件列表项。 |

#### `protocol_music_file_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_music_file_type` | 1bytes操作类型 |
| `func_table` | `uint32` | 1bytes 功能表 |
| `music_file_support_max` | `uint32` | 1bytes 歌曲支持最大数量 |
| `page_index` | `uint32` | 当前多少页，用于分段传输。 |
| `page_num` | `uint32` | 当前页传输多少条数据，用于分段传输。 |
| `music_totol_size` | `uint32` | 4bytes 总空间 单位为KB |
| `music_remain_size` | `uint32` | 4bytes 剩余空间 单位为KB |
| `file_items` | `repeated protocol_music_file_item` | max: 暂定50 |

### 枚举值

#### `operate_music_file_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `INVALID` | `0` | 无效或未指定的值。 |
| `INQUIRE` | `1` | 查询 |
| `DELETE` | `3` | 删除 |
