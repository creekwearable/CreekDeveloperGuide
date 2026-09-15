---
docId: android-watch-faces
locale: zh-CN
title: Android 表盘管理
description: 查询、设置、删除和安装设备表盘。
platform: Android
slug: android/watch-faces
order: 7
status: published
version: v2.0
---

# Android 表盘管理

查询、设置、删除和安装设备表盘。

## 表盘文件部署服务器

表盘包提供方式有两种： 1、.bin文件（生成好的表盘）

                                           2、.zip文件（可以自定义组合）

服务器配置云表盘：

     1、app获取服务器表盘列表需要的必要参数-》

         plate_version：框架版本号

         device_id ：固件ID

     根据这两个参数从服务器获取支持的表盘

   2、条件规则-》

       1、  手表plate_version >=  服务器 plate_version （满足条件）

        2、手表ID   = 包含

## 获取当前手表表盘

```kotlin
CreekManager.sInstance.getWatchDial({ model: Watchdial.protocol_watch_dial_plate_inquire_reply ->
    
}, failure = { _, m ->
    
})
```

## 设置表盘

```kotlin
var model = Watchdial.protocol_watch_dial_plate_operate()
model.addDialName(ByteString.copyFrom("1".toByteArray()))
CreekManager.sInstance.setWatchDial(model = model, {
   
}, failure = { _, m ->
    
})
```

## 删除表盘

```kotlin
var model = Watchdial.protocol_watch_dial_plate_operate()
model.addDialName(ByteString.copyFrom("1".toByteArray()))
CreekManager.sInstance.delWatchDial(model = model, {
   
}, failure = { _, m ->
   
})
```

## 表盘安装（.bin）

```kotlin
CreekManager.sInstance.upload(
    "res.bin",
    decimalArray,
    uploadProgress = { progress ->
        print(progress)
    },
    uploadSuccess = {},
    uploadFailure = { c, m -> })
```

## 表盘安装注意事项

1、在同步中的时候，表盘不能安装，（SDK会返回失败）

2、在OTA升级的时候，表盘不能安装

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";

enum dial_type
{
    DIAL_TYPE_NULL          = 0;//无效
    DIAL_TYPE_GENERAL       = 1;//普通云表盘
    DIAL_TYPE_PHOTO         = 2;//照片表盘
    DIAL_TYPE_WALLPAPER     = 3;//壁纸表盘
    DIAL_TYPE_CUSTOM        = 4;//自定义表盘
    DIAL_TYPE_GENERAL_AOD   = 5;//普通表盘+息屏表盘
    DIAL_TYPE_AOD           = 6;//常规息屏表盘
}

enum dial_operate_type
{
    DIAL_OPERATE_TYPE_INQUIRE   = 0;//查询正在使用表盘
    DIAL_OPERATE_TYPE_SET       = 1;//设置表盘
    DIAL_OPERATE_TYPE_DELETE    = 2;//删除表盘
}

message protocol_watch_dial_plate_list_item
{
    dial_type dial_type = 1;//表盘类型
    uint32 version = 2;//2bytes 当前表盘版本号 
    uint32 dial_size = 3;//4bytes 当前表盘所占大小 
    bytes dial_name = 4; //max:30 表盘名字
}

message protocol_watch_dial_plate_operate
{
    dial_operate_type operate = 1; //1bytes 操作类型 
    repeated bytes dial_name = 2; //max:30 表盘名字
    repeated bytes dial_list_sort = 3; //max:30 表盘排序
}

message protocol_watch_dial_plate_inquire_reply
{
    dial_operate_type operate = 1; //1bytes 操作类型 
    uint32  formula_mode = 2;//1bytes 计算方式 0：内存大小计算 1：按个数计算
    uint32  plate_version = 3;//1bytes 框架版本号
    uint32  cloud_plate_num = 4;//1bytes 云表盘的总个数
    uint32  user_cloud_plate_num = 5;//1bytes 云端表盘的已经使用个数
    uint32  photo_plate_num = 6;//1bytes 照片表盘
    uint32  user_photo_plate_num = 7;//1bytes 照片表盘的已经使用个数
    uint32  wallpaper_plate_num = 8;//1bytes 壁纸表盘的总个数
    uint32  user_wallpaper_plate_num = 9;//1bytes 壁纸表盘的已经使用个数
    repeated protocol_watch_dial_plate_list_item list_item = 10;
    uint32 total_size = 11;//4bytes 表盘所占的总大小
    uint32 user_cloud_size = 12; //4bytes  云端表盘使用空间  单位byte
    uint32 user_photo_size = 13; //4bytes  相册表盘使用空间  单位byte
    bytes now_show_plate_name = 14; //max:30 //当前显示的表盘名字
    uint32 enable_compress = 15;//1bytes 压缩类型，0代表不压缩，4代表使用LZ4的压缩方式
    uint32 func_table = 16;//功能表
    uint32 plate_photo_pic_support_num = 17;//1bytes 照片表盘支持相片个数
    uint32 all_plate_support_max = 18;//1bytes 所有表盘支持最大个数
}
```

### `func_table` 位说明

| bit位 | 说明 |
|-|-|
| 0 | 是否支持表盘排序，对应字段dial_list_sort  |
