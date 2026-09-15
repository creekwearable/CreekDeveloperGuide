---
docId: ios-world-clock
locale: en-US
title: iOS World Clock
description: Read and configure the world-clock city list.
platform: iOS
slug: ios/world-clock
order: 122
status: published
version: v2.0
---

# iOS World Clock

## Overview

Read and configure the world-clock city list.

## Swift example

```swift
// Get world clocks.
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
  // Set world clocks.
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

## Capability-table fields

Check these fields after reading `protocol_function_table`:

```protobuf
message function_table {
    bool is_support = 1;//Whether the capability is supported.
    uint32 cmd_id = 2;//Capability command identifier.
}

message protocol_function_table {
    function_table world_time = 12;//World-clock capability.
}
```

## Protobuf data model

```protobuf
syntax = "proto3";

message protocol_world_time_item
{
    int32 offest_min = 1; // offest min; 4bytes minute
    bytes city_name = 2; // city name; max:32 name
    int32 custom_min = 3; // custom min; 4bytes custom valueminute
}

message protocol_world_time_operate
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    repeated protocol_world_time_item world_time_item = 2;// time
}

message protocol_world_time_inquire_reply
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    uint32 word_time_support_max = 2; // Maximum supported world-clock entries; 1 byte
    repeated protocol_world_time_item world_time_item = 3;// time
    uint32 func_table = 4;// func table; 1bytes capability table
}
```
