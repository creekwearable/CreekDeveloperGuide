---
docId: ios-world-clock
locale: zh-CN
title: iOS 世界时钟
description: 读取和设置世界时钟城市列表。
platform: iOS
slug: ios/world-clock
order: 122
status: published
version: v2.0
---

# iOS 世界时钟

## 功能说明

读取和设置世界时钟城市列表。

## Swift 示例

```swift
///获取
CreekInterFace.instance.getWorldTime { model in
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
    var data =  protocol_world_time_operate()
             var item = protocol_world_time_item()
            item.cityName =  "shenzheng".data(using: .utf8)!
            item.offestMin = 120
            data.worldTimeItem.append(item)
            CreekInterFace.instance.setWorldTime(model: data) {
                self.view.hideRemark()
                self.textView.text = "success"
            } failure: { code, message in
                self.view.hideRemark()
                self.textView.text = message
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
    function_table world_time = 12;//世界时钟能力。
}
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

message protocol_world_time_item
{
    int32 offest_min = 1; //4bytes 偏移分钟
    bytes city_name = 2; //max:32 城市名称
    int32 custom_min = 3; //4bytes 自定义时差值分钟，用于展示
}

message protocol_world_time_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    repeated protocol_world_time_item world_time_item = 2;//世界时间
}

message protocol_world_time_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 word_time_support_max = 2; //1bytes 世界时间支持显示最大数量
    repeated protocol_world_time_item world_time_item = 3;//世界时间
    uint32 func_table = 4;//1bytes 功能表
}
```
