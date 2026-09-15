---
docId: android-route-map
locale: zh-CN
title: Android 路线地图
description: 上传 GPX 路线并查询或删除设备路线。
platform: Android
slug: android/route-map
order: 136
status: published
version: v2.0
---

# Android 路线地图

上传 GPX 路线并查询或删除设备路线。

### 上传GPX文件

```kotlin
fileDta?.let{
    CreekManager.sInstance.getGPXEncodeUint8List(data = it, geoId = 1234, sportType = sportType.IRUN,model = {
            lat: Double, lng: Double ->
        return@getGPXEncodeUint8List "shanghai"
    }, encode = {
            encodeData: ByteArray ->
        CreekManager.sInstance.upLoadGeo(data = encodeData, geoId = 1234, uploadProgress = { progress: Int ->
            Log.w("upLoadGeo",progress.toString())
        }, uploadSuccess = {
            Log.w("upLoadGeo","success")
        }, uploadFailure = {code, msg ->
            Log.w("upLoadGeo",msg)
        })

    })
}
```

### 获取路线

```kotlin
CreekManager.sInstance.getGeo(model = {
    
}, failure = {
    code, message ->
})
```

### 删除路线

```kotlin
CreekManager.sInstance.delGeo(listOf(1234), success = {
    
}, failure = {
        code, msg -> 
})
```

---

## 数据模型

### Protobuf 定义

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
