---
docId: flutter-route-map
locale: en-US
title: "Flutter Route Map"
description: "Upload GPX data and manage stored routes."
platform: Flutter
slug: flutter/route-map
order: 137
status: published
version: v2.0
---

# Flutter Route Map

Upload GPX data and manage stored routes.

## Upload GPX file
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

## Get route
```dart
sdkManager.getGeo(callBack: (e) {
  SmartDialog.dismiss();
}, errCallBack: (e) {
  SmartDialog.dismiss();
});
```

## Del route
```dart
protocol_geobin_operate operate = protocol_geobin_operate();
protocol_geobin_list_item item =  protocol_geobin_list_item();
item.geobinId = Int64(3);
operate.geobinItems.add(item);
sdkManager.delGeo(operate: operate,callBack: (){

},errCallBack: (e){

});
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum geobin_operate_type
{
    GEOBIN_OPERATE_TYPE_INQUIRE   = 0; // Query the trajectory list
    GEOBIN_OPERATE_TYPE_DELETE    = 1; // Delete the specified trajectory
}

message protocol_geobin_list_item
{
    uint32 geobin_size = 1; // 4 bytes: The size of the current geobin trajectory file
    bytes geobin_name = 2;  // max: 30 characters: Name of the geobin trajectory
}

message protocol_geobin_operate
{
    geobin_operate_type operate = 1; // 1 byte: Operation type
    repeated bytes geobin_name = 2;  // max: 30 characters: Geobin name
}

message protocol_geobin_inquire_reply
{
    geobin_operate_type operate = 1; // 1 byte: Operation type
    uint32 geobin_num = 2; // 1 byte: The total number of geobin trajectory files
    repeated protocol_geobin_list_item list_item = 3; // Geobin trajectory list
    uint32 total_size = 4; // 4 bytes: Total size occupied by geobins
}
```

### Field Reference

#### `protocol_geobin_list_item`

| Field | Type | Description |
| --- | --- | --- |
| `geobin_size` | `uint32` | 4 bytes: The size of the current geobin trajectory file |
| `geobin_name` | `bytes` | max: 30 characters: Name of the geobin trajectory |

#### `protocol_geobin_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `geobin_operate_type` | 1 byte: Operation type |
| `geobin_name` | `repeated bytes` | max: 30 characters: Geobin name |

#### `protocol_geobin_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `geobin_operate_type` | 1 byte: Operation type |
| `geobin_num` | `uint32` | 1 byte: The total number of geobin trajectory files |
| `list_item` | `repeated protocol_geobin_list_item` | Geobin trajectory list |
| `total_size` | `uint32` | 4 bytes: Total size occupied by geobins |

### Enum Values

#### `geobin_operate_type`

| Value | Number | Description |
| --- | --- | --- |
| `GEOBIN_OPERATE_TYPE_INQUIRE` | `0` | Query the trajectory list |
| `GEOBIN_OPERATE_TYPE_DELETE` | `1` | Delete the specified trajectory |
