---
docId: ios-route-maps
locale: zh-CN
title: iOS 路线地图
description: 上传 GPX 路线并读取或删除设备路线。
platform: iOS
slug: ios/route-maps
order: 136
status: published
version: v2.0
---

# iOS 路线地图

## 功能说明

上传 GPX 路线并读取或删除设备路线。

## Swift 示例

```swift
///geoId: 路线的唯一标识 生成规则必须大于32位

        
          CreekInterFace.instance.getGPXEncodeUint8List(data: fileData, geoId: 1234,sportType: .IRUN) { lat, lon in
             return "shengzheng"
          } encode: { model in
             self.view.hideRemark()
             CreekInterFace.instance.upLoadGeo(data: model, geoId: 1234) { progress in
                self.infoLabel.text = "progress : \(progress)"
             } uploadSuccess: {
                self.infoLabel.text = "Success"
             } uploadFailure: { code, message in
                self.infoLabel.text = "Failure"
             }
          }
```

```swift
CreekInterFace.instance.getGeo { model in
            // 处理返回结果。
         } failure: { code, message in
            // 处理错误。
         }
```

```swift
CreekInterFace.instance.delGeo(geoIds: [1234]) {
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
    function_table geobin = 56;//轨迹数据能力。
}
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum geobin_operate_type
{
    GEOBIN_OPERATE_TYPE_INQUIRE   = 0;//查询轨迹列表
    GEOBIN_OPERATE_TYPE_DELETE    = 1;//删除指定轨迹
}

message protocol_geobin_list_item
{
    uint32 geobin_size = 1; //4bytes 当前轨迹geobin文件所占大小
    bytes geobin_name = 2;  //max:30 geobin轨迹名字
}

message protocol_geobin_operate
{
    geobin_operate_type operate = 1; //1bytes 操作类型
    repeated bytes geobin_name = 2; //max:30 geobin名字
}

message protocol_geobin_inquire_reply
{
    geobin_operate_type operate = 1; //1bytes 操作类型
    uint32  geobin_num = 2; //1bytes 轨迹geobin文件的总个数
    repeated protocol_geobin_list_item list_item = 3;//geobin轨迹列表
    uint32 total_size = 4; //4bytes geobin所占的总大小
}
```
