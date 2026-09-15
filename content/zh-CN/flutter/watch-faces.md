---
docId: flutter-watch-faces
locale: zh-CN
title: "Flutter 表盘与安装"
description: "查询、设置、删除并安装表盘。"
platform: Flutter
slug: flutter/watch-faces
order: 7
status: published
version: v2.0
---

# Flutter 表盘与安装

查询、设置、删除并安装表盘。

云端表盘列表通常按 `plate_version` 与 `device_id` 筛选。健康同步或 OTA 进行中不能安装表盘。

## 表盘文件部署服务
一、The ways to provide dial packs are two-fold:

1. `.bin` 文件（预先生成的表盘）
2. `.zip` 文件（可自定义组合）

二、The server configuration for cloud dial is as follows:

1. 从服务器获取表盘列表需要以下参数：

   - `plate_version`：框架版本号。
   - `device_id`：固件 ID。

      服务器会根据这两个参数返回支持的表盘。

1. 手表 `plate_version >=` 服务器 `plate_version`。
2. 手表 ID 在支持范围内。

```dart
//How to get plate_version?
sdkManager.getWatchDial(callBack: (e){
  e.plateVersion

},errCallBack: (e){

});

 ///How to get the watch ID?
sdkManager.getDeviceInfo(callBack: (e) {
  e.deviceId

}, errCallBack: (e) {

});
```

## 获取手表当前表盘
```dart
sdkManager.getWatchDial(callBack: (e){
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
},errCallBack: (e){
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});
```

## 设置表盘
```dart
/// Before setting the watch face, you need to retrieve the available watch faces
/// Assuming you get watch face names like ["1", "2", "3"]
/// If you want to set the watch face to "2"
sdkManager.setWatchDial(dialNames: ["1"],callBack: (){
  Common.toast(label: 'sync success');
},errCallBack: (e){
  Common.toast(label: 'sync failure');
});
```

## 删除表盘
```dart
sdkManager.delWatchDial(dialNames: ["1"],callBack: (){
  Common.toast(label: 'sync success');
},errCallBack: (e){
  Common.toast(label: 'sync failure');
});
```

## 安装 `.bin` 表盘
```dart
sdkManager.upload(fileName: "res.bin", fileData: byteData.buffer.asUint8List(),success: (){
  print("dial success");
},failure: (c,m){
  print("dial failure");
},progress: (e){
  print("dial progress：$e");
});
```

## 表盘安装注意事项
1. 数据同步期间不能安装表盘，否则 SDK 会返回失败。

2. OTA 升级期间不能安装表盘。

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum dial_type {
    DIAL_TYPE_NULL = 0; // 无效
    DIAL_TYPE_GENERAL = 1; // 普通云表盘
    DIAL_TYPE_PHOTO = 2; // 照片表盘
    DIAL_TYPE_WALLPAPER = 3; // 壁纸表盘
    DIAL_TYPE_CUSTOM = 4; // 自定义表盘
    DIAL_TYPE_GENERAL_AOD = 5; // 普通表盘+息屏表盘
    DIAL_TYPE_AOD = 6; // 常规息屏表盘
}

enum dial_operate_type {
    DIAL_OPERATE_TYPE_INQUIRE = 0; // 查询正在使用表盘
    DIAL_OPERATE_TYPE_SET = 1; // 设置表盘
    DIAL_OPERATE_TYPE_DELETE = 2; // 删除表盘
}

message protocol_watch_dial_plate_list_item {
    dial_type dial_type = 1; // 表盘类型
    uint32 version = 2; // 2bytes 当前表盘版本号
    uint32 dial_size = 3; // 4bytes 当前表盘所占大小
    bytes dial_name = 4; // max:30 表盘名字
}

message protocol_watch_dial_plate_operate {
    dial_operate_type operate = 1; // 1bytes 操作类型
    repeated bytes dial_name = 2; // max:30 表盘名字
    repeated bytes dial_list_sort = 3; // max:30 表盘排序
}

message protocol_watch_dial_plate_inquire_reply {
    dial_operate_type operate = 1; // 1bytes 操作类型
    uint32 formula_mode = 2; // 1bytes 计算方式 0：内存大小计算 1：按个数计算
    uint32 plate_version = 3; // 1bytes 框架版本号
    uint32 cloud_plate_num = 4; // 1bytes 云表盘的总个数
    uint32 user_cloud_plate_num = 5; // 1bytes 云端表盘的已经使用个数
    uint32 photo_plate_num = 6; // 1bytes 照片表盘
    uint32 user_photo_plate_num = 7; // 1bytes 照片表盘的已经使用个数
    uint32 wallpaper_plate_num = 8; // 1bytes 壁纸表盘的总个数
    uint32 user_wallpaper_plate_num = 9; // 1bytes 壁纸表盘的已经使用个数
    repeated protocol_watch_dial_plate_list_item list_item = 10; // 表盘列表项。
    uint32 total_size = 11; // 4bytes 表盘所占的总大小
    uint32 user_cloud_size = 12; // 4bytes  云端表盘使用空间  单位byte
    uint32 user_photo_size = 13; // 4bytes  相册表盘使用空间  单位byte
    bytes now_show_plate_name = 14; // max:30 //当前显示的表盘名字
    uint32 enable_compress = 15; // 1bytes 压缩类型，0代表不压缩，4代表使用LZ4的压缩方式
    uint32 func_table = 16; // 功能表
    uint32 plate_photo_pic_support_num = 17; // 1bytes 照片表盘支持相片个数
    uint32 all_plate_support_max = 18; // 1bytes 所有表盘支持最大个数
}
```

### 字段说明

#### `protocol_watch_dial_plate_list_item`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `dial_type` | `dial_type` | 表盘类型 |
| `version` | `uint32` | 2bytes 当前表盘版本号 |
| `dial_size` | `uint32` | 4bytes 当前表盘所占大小 |
| `dial_name` | `bytes` | max:30 表盘名字 |

#### `protocol_watch_dial_plate_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `dial_operate_type` | 1bytes 操作类型 |
| `dial_name` | `repeated bytes` | max:30 表盘名字 |
| `dial_list_sort` | `repeated bytes` | max:30 表盘排序 |

#### `protocol_watch_dial_plate_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `dial_operate_type` | 1bytes 操作类型 |
| `formula_mode` | `uint32` | 1bytes 计算方式 0：内存大小计算 1：按个数计算 |
| `plate_version` | `uint32` | 1bytes 框架版本号 |
| `cloud_plate_num` | `uint32` | 1bytes 云表盘的总个数 |
| `user_cloud_plate_num` | `uint32` | 1bytes 云端表盘的已经使用个数 |
| `photo_plate_num` | `uint32` | 1bytes 照片表盘 |
| `user_photo_plate_num` | `uint32` | 1bytes 照片表盘的已经使用个数 |
| `wallpaper_plate_num` | `uint32` | 1bytes 壁纸表盘的总个数 |
| `user_wallpaper_plate_num` | `uint32` | 1bytes 壁纸表盘的已经使用个数 |
| `list_item` | `repeated protocol_watch_dial_plate_list_item` | 表盘列表项。 |
| `total_size` | `uint32` | 4bytes 表盘所占的总大小 |
| `user_cloud_size` | `uint32` | 4bytes  云端表盘使用空间  单位byte |
| `user_photo_size` | `uint32` | 4bytes  相册表盘使用空间  单位byte |
| `now_show_plate_name` | `bytes` | max:30 //当前显示的表盘名字 |
| `enable_compress` | `uint32` | 1bytes 压缩类型，0代表不压缩，4代表使用LZ4的压缩方式 |
| `func_table` | `uint32` | 功能表 |
| `plate_photo_pic_support_num` | `uint32` | 1bytes 照片表盘支持相片个数 |
| `all_plate_support_max` | `uint32` | 1bytes 所有表盘支持最大个数 |

### 枚举值

#### `dial_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `DIAL_TYPE_NULL` | `0` | 无效 |
| `DIAL_TYPE_GENERAL` | `1` | 普通云表盘 |
| `DIAL_TYPE_PHOTO` | `2` | 照片表盘 |
| `DIAL_TYPE_WALLPAPER` | `3` | 壁纸表盘 |
| `DIAL_TYPE_CUSTOM` | `4` | 自定义表盘 |
| `DIAL_TYPE_GENERAL_AOD` | `5` | 普通表盘+息屏表盘 |
| `DIAL_TYPE_AOD` | `6` | 常规息屏表盘 |

#### `dial_operate_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `DIAL_OPERATE_TYPE_INQUIRE` | `0` | 查询正在使用表盘 |
| `DIAL_OPERATE_TYPE_SET` | `1` | 设置表盘 |
| `DIAL_OPERATE_TYPE_DELETE` | `2` | 删除表盘 |

### `func_table` 功能位

| bit位 | 说明 |
| - | - |
| 0 | 是否支持表盘排序，对应字段dial_list_sort |
