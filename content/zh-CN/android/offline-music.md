---
docId: android-offline-music
locale: zh-CN
title: Android 离线音乐
description: 上传、查询和删除设备中的离线音乐。
platform: Android
slug: android/offline-music
order: 133
status: published
version: v2.0
---

# Android 离线音乐

上传、查询和删除设备中的离线音乐。

### 上传音乐

注明：音乐名称过滤：\* / :  ? \ |

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

### 获取音乐

```kotlin
CreekManager.sInstance.getMusicList(page = 1, size = 20, model = {
    
}, failure = {
    code, message ->
})
```

### 删除音乐

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

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";
 
enum operate_music_file_type
{
    INVALID = 0;
    INQUIRE = 1; //查询
    DELETE = 3;  //删除
}
 
//设置音乐数据子项数据
message protocol_music_file_item
{
    uint32 track_key = 1;          //4bytes 预留key,暂时不用
    bytes song_name = 2;           //max:64 歌曲名称
    bytes singer = 3;              //max:64 演唱者 
};
 
message protocol_music_file_operate
{
    operate_music_file_type operate = 1; //1bytes 操作类型 
    uint32 page_index = 2;//当前多少页，用于分段传输。
    uint32 page_num = 3;//当前页传输多少条数据，用于分段传输。
    repeated protocol_music_file_item file_items = 4;
}
 
message protocol_music_file_inquire_reply
{
    operate_music_file_type operate = 1;     //1bytes操作类型
    uint32 func_table = 2;        //1bytes 功能表
    uint32 music_file_support_max = 3; //1bytes 歌曲支持最大数量
    uint32 page_index = 4;//当前多少页，用于分段传输。
    uint32 page_num = 5;//当前页传输多少条数据，用于分段传输。
    uint32 music_totol_size = 6;      //4bytes 总空间 单位为KB
    uint32 music_remain_size = 7;       //4bytes 剩余空间 单位为KB
    repeated protocol_music_file_item file_items = 8;//max: 暂定50
}
```
