---
docId: android-world-clock
locale: en-US
title: Android World Clock
description: Read and configure the world-clock list.
platform: Android
slug: android/world-clock
order: 122
status: published
version: v2.0
---

# Android World Clock

Read and configure the world-clock list.

```kotlin
// /Get
CreekManager.sInstance.getWorldTime({ model: Wordtime.protocol_world_time_inquire_reply ->
    textView.text = model.toString()
}, failure = { _, m ->
    textView.text = m
})

// /Set
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

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

message protocol_world_time_item
{
    int32 offest_min = 1; // Offest Min. 4bytes.
    bytes city_name = 2; // max:32 City name
    int32 custom_min = 3; // Custom Min. 4bytes.
}

message protocol_world_time_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    repeated protocol_world_time_item world_time_item = 2;// World Time Item.
}

message protocol_world_time_inquire_reply
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    uint32 word_time_support_max = 2; // Number of word time support max. 1bytes.
    repeated protocol_world_time_item world_time_item = 3;// World Time Item.
    uint32 func_table = 4;// 1bytes Function table
}
```

### `func_table` Bit Definitions

| Bit | Description |
| - | - |
| 0 | Whether a custom time-zone offset in minutes is supported, Used for display |
