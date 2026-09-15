---
docId: android-world-clock
locale: zh-CN
title: Android 世界时钟
description: 读取并设置世界时钟列表。
platform: Android
slug: android/world-clock
order: 122
status: published
version: v2.0
---

# Android 世界时钟

读取并设置世界时钟列表。

```kotlin
///获取
CreekManager.sInstance.getWorldTime({ model: Wordtime.protocol_world_time_inquire_reply ->
    textView.text = model.toString()
}, failure = { _, m ->
    textView.text = m
})

///设置
var model = Wordtime.protocol_world_time_operate()
var item = Wordtime.protocol_world_time_item()
item.cityName = ByteString.copyFrom("shenzheng".toByteArray())
item.offestMin = 120
model.addWorldTimeItem(item)
CreekManager.sInstance.setWorldTime(model = model, {
    textView.text = "success"
}, failure = { _, m ->
    textView.text = m
})
```

---

## 数据模型

### Protobuf 定义

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

### `func_table` 位说明

| bit位 | 说明 |
|-|-|
| 0 | 是否支持自定义时差值分钟，用于展示 |
