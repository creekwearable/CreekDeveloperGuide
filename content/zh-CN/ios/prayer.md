---
docId: ios-prayer
locale: zh-CN
title: iOS 朝拜
description: 读取和设置朝拜相关数据。
platform: iOS
slug: ios/prayer
order: 148
status: published
version: v2.0
---

# iOS 朝拜

## 功能说明

读取和设置朝拜相关数据。

## Swift 示例

```swift
///获取
         CreekInterFace.instance.getPrayer{model in
            self.view.hideRemark()
            let json = try? model.jsonString()
            if let str = json{
               dispatch_main_sync_safe {
                  self.textView.text = str
               }
            }
         } failure: { code, message in
            self.view.hideRemark()
            self.textView.text = message
         }
         
         ///设置
          let operate = protocol_prayer_operate()
         
         CreekInterFace.instance.setPrayer(model: operate) {
            self.view.hideRemark()
            self.textView.text = "success"
         } failure: { code, message in
            self.view.hideRemark()
            self.textView.text = message
         }
         break
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;//查询
    SET = 2;//设置
}

message prayer_time
{
    uint32 hour                    = 1; //1bytes
    uint32 minute                  = 2; //1bytes
};

message prayer_data
{
    prayer_time fajr_time           = 1; //晨礼时间
    prayer_time sunrise_time        = 2; //日出时间
    prayer_time dhuhr_time          = 3; //晌礼时间
    prayer_time asr_time            = 4; //晡礼时间
    prayer_time maghrib_time        = 5; //昏礼时间
    prayer_time isha_time           = 6; //宵礼时间
    uint32 date                     = 7; //4bytes 伊斯兰历日期
};

message protocol_prayer
{
    repeated prayer_data data        = 1; //max:3 3天的祷告数据
    bytes city_name                  = 2; //max:64 城市名
    uint32 room_angle                = 3; //2bytes 天房位置，偏向角度
    uint32 updated_time              = 4; //4bytes 最近同步的伊斯兰历时间
};

message protocol_prayer_operate
{
    operate_type operate                  = 1; //操作类型 0：无效操作 1：查询 2：设置
    protocol_prayer prayer                = 2;
}

message protocol_prayer_inquire_reply
{
    operate_type operate                  = 1; //操作类型 0：无效操作 1：查询 2：设置
    protocol_prayer prayer                = 2;
}
```
