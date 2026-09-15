---
docId: ios-offline-music
locale: zh-CN
title: iOS 离线音乐
description: 上传、读取和删除设备上的离线音乐。
platform: iOS
slug: ios/offline-music
order: 133
status: published
version: v2.0
---

# iOS 离线音乐

## 功能说明

上传、读取和删除设备上的离线音乐。

### 使用要点

注明：音乐名称过滤：\* / :  ? \ |

## Swift 示例

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
            // 处理成功。
   } failure: { code, message in
            // 处理错误。
}
```

## 功能表字段

读取 `protocol_function_table` 后检查以下字段：

```protobuf
message function_table {
    bool is_support = 1;//是否支持该能力。
    uint32 cmd_id = 2;//能力对应的指令标识。
}

message protocol_function_table {
    function_table music_file = 42;//音乐文件能力。
}
```

## Protobuf 数据模型

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
