---
docId: flutter-route-map
locale: zh-CN
title: "Flutter 路线地图"
description: "上传 GPX 数据并管理已保存路线。"
platform: Flutter
slug: flutter/route-map
order: 137
status: published
version: v2.0
---

# Flutter 路线地图

上传 GPX 数据并管理已保存路线。

## 上传 GPX 文件
```dart
///geoId: unique identifier of the route
Uint8List data = await sdkManager.getGPXEncodeUint8List(sportType: 0,data: datas!, geoId: 3, address: (lat,lon) async{
  return "London";
});

sdkManager.upLoadGeo(data,geoId: 3,success: (){
  Common.toast(label: S.of(Get.context!).upload_successful);
  progress = 100;
  DateTime dateTime2 = DateTime.now();
  timeLen =  dateTime2.difference(dateTime).inSeconds;
  update();
},failure: (c,m){
  SmartDialog.dismiss();
  Common.toast(label: S.of(Get.context!).upload_failure);
},progress: (e){
  SmartDialog.dismiss();
  progress = e;
  update();
});
```

## 获取路线
```dart
sdkManager.getGeo(callBack: (e) {
  SmartDialog.dismiss();
}, errCallBack: (e) {
  SmartDialog.dismiss();
});
```

## 删除路线
```dart
protocol_geobin_operate operate = protocol_geobin_operate();
protocol_geobin_list_item item =  protocol_geobin_list_item();
item.geobinId = Int64(3);
operate.geobinItems.add(item);
sdkManager.delGeo(operate: operate,callBack: (){

},errCallBack: (e){

});
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum geobin_operate_type
{
    GEOBIN_OPERATE_TYPE_INQUIRE   = 0; // 查询轨迹列表
    GEOBIN_OPERATE_TYPE_DELETE    = 1; // 删除指定轨迹
}

message protocol_geobin_list_item
{
    uint32 geobin_size = 1; // 4bytes 当前轨迹geobin文件所占大小
    bytes geobin_name = 2; // max:30 geobin轨迹名字
}

message protocol_geobin_operate
{
    geobin_operate_type operate = 1; // 1bytes 操作类型
    repeated bytes geobin_name = 2;  // max: 30 characters: Geobin name
}

message protocol_geobin_inquire_reply
{
    geobin_operate_type operate = 1; // 1bytes 操作类型
    uint32 geobin_num = 2; // 4bytes 轨迹geobin文件的总个数
    repeated protocol_geobin_list_item list_item = 3; // geobin轨迹列表
    uint32 total_size = 4; // 4bytes geobin所占的总大小（单位：bytes）
}
```

### 字段说明

#### `protocol_geobin_list_item`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `geobin_size` | `uint32` | 4bytes 当前轨迹geobin文件所占大小 |
| `geobin_name` | `bytes` | max:30 geobin轨迹名字 |

#### `protocol_geobin_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `geobin_operate_type` | 1bytes 操作类型 |
| `geobin_name` | `repeated bytes` | max: 30 characters: Geobin name |

#### `protocol_geobin_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `geobin_operate_type` | 1bytes 操作类型 |
| `geobin_num` | `uint32` | 4bytes 轨迹geobin文件的总个数 |
| `list_item` | `repeated protocol_geobin_list_item` | geobin轨迹列表 |
| `total_size` | `uint32` | 4bytes geobin所占的总大小（单位：bytes） |

### 枚举值

#### `geobin_operate_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `GEOBIN_OPERATE_TYPE_INQUIRE` | `0` | 查询轨迹列表 |
| `GEOBIN_OPERATE_TYPE_DELETE` | `1` | 删除指定轨迹 |
