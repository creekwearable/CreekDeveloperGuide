---
docId: ios-heart-rate-zones
locale: zh-CN
title: iOS 心率区间
description: 设置运动使用的心率区间。
platform: iOS
slug: ios/heart-rate-zones
order: 119
status: published
version: v2.0
---

# iOS 心率区间

## 功能说明

设置运动使用的心率区间。

## Swift 示例

```swift
var data =  protocol_exercise_heart_rate_zone()
            data.zone1 = 133
            data.zone2 = 144
            data.zone3 = 155
            data.zone4 = 166
            data.zone5 = 177
            data.zone6 = 190
            CreekInterFace.instance.setSportHeartRate(model: data) {
                self.view.hideRemark()
                self.textView.text = "success"
            } failure: { code, message in
                self.view.hideRemark()
                self.textView.text = message
            }
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";
enum heart_rate_zone_mode
{
    HR_MAX_MODE = 0;//最大心率模式
    RESERVE_HR_MODE = 1;//储备心率模式
}
/*心率区间*/
message protocol_exercise_heart_rate_zone
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    //app返回的是最大心率区间
    uint32 zone1 = 2;//1bytes 心率区间1
    uint32 zone2 = 3;//1bytes 心率区间2
    uint32 zone3 = 4;//1bytes 心率区间3
    uint32 zone4 = 5;//1bytes 心率区间4
    uint32 zone5 = 6;//1bytes 心率区间5
    uint32 zone6 = 7;//1bytes 心率区间6
    heart_rate_zone_mode hr_mode = 8;//心率区间模式
    uint32 reserve_hr = 9;//储备心率值
    //心率区间1 zone1~zone2
    //心率区间2 zone2~zone3
    //心率区间3 zone3~zone4
    //心率区间4 zone4~zone5
    //心率区间5 zone5~zone6
}
message protocol_exercise_heart_rate_zone_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    //查询返回的是储备心率区间
    uint32 zone1 = 2;//1bytes 心率区间1
    uint32 zone2 = 3;//1bytes 心率区间2
    uint32 zone3 = 4;//1bytes 心率区间3
    uint32 zone4 = 5;//1bytes 心率区间4
    uint32 zone5 = 6;//1bytes 心率区间5
    uint32 zone6 = 7;//1bytes 心率区间6
    heart_rate_zone_mode hr_mode = 8;//心率区间模式
    uint32 func_table = 9;//功能表
    //心率区间1 zone1~zone2
    //心率区间2 zone2~zone3
    //心率区间3 zone3~zone4
    //心率区间4 zone4~zone5
    //心率区间5 zone5~zone6
}
```
