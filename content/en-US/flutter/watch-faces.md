---
docId: flutter-watch-faces
locale: en-US
title: "Flutter Watch Faces"
description: "Query, set, delete, and install watch faces."
platform: Flutter
slug: flutter/watch-faces
order: 7
status: published
version: v2.0
---

# Flutter Watch Faces

Query, set, delete, and install watch faces.

## Dial file deployment server
、The ways to provide dial packs are two-fold:

1. .bin file (pre-generated dial)
2. .zip file (which can be custom combined)

、The server configuration for cloud dial is as follows:

1. The necessary parameters needed by the app to get the dial list from the server are:

   - plate_version: Frame version number
   - device_id: Firmware ID

      Based on these two parameters, you can get the supported dial from the server.

1. Watch plate_version >= server plate_version (condition met)
2. Watch ID = included

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

## Retrieve Current Watch Face on the Watch
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

## Set Watch Face
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

## Delete Watch Face
```dart
sdkManager.delWatchDial(dialNames: ["1"],callBack: (){
  Common.toast(label: 'sync success');
},errCallBack: (e){
  Common.toast(label: 'sync failure');
});
```

## Watch Face Installation（.bin）
```dart
sdkManager.upload(fileName: "res.bin", fileData: byteData.buffer.asUint8List(),success: (){
  print("dial success");
},failure: (c,m){
  print("dial failure");
},progress: (e){
  print("dial progress：$e");
});
```

## Watch Face Installation Precautions
"1. During synchronization, watch faces cannot be installed (SDK will return a failure).

2. During OTA upgrades, watch faces cannot be installed."

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum dial_type {
    DIAL_TYPE_NULL = 0; // Invalid
    DIAL_TYPE_GENERAL = 1; // General cloud dial
    DIAL_TYPE_PHOTO = 2; // Photo dial
    DIAL_TYPE_WALLPAPER = 3; // Wallpaper dial
    DIAL_TYPE_CUSTOM = 4; // Custom dial
    DIAL_TYPE_GENERAL_AOD = 5; // General dial + AOD dial
    DIAL_TYPE_AOD = 6; // Regular AOD dial
}

enum dial_operate_type {
    DIAL_OPERATE_TYPE_INQUIRE = 0; // Inquiry about the currently used dial
    DIAL_OPERATE_TYPE_SET = 1; // Set dial
    DIAL_OPERATE_TYPE_DELETE = 2; // Delete dial
}

message protocol_watch_dial_plate_list_item {
    dial_type dial_type = 1; // Dial type
    uint32 version = 2; // 2bytes Current dial version number
    uint32 dial_size = 3; // 4bytes Size of the current dial
    bytes dial_name = 4; // max:30 Dial name
}

message protocol_watch_dial_plate_operate {
    dial_operate_type operate = 1; // 1bytes Operation type
    repeated bytes dial_name = 2; // max:30 Dial name
    repeated bytes dial_list_sort = 3; // max:30 Dial sorting
}

message protocol_watch_dial_plate_inquire_reply {
    dial_operate_type operate = 1; // 1bytes Operation type
    uint32 formula_mode = 2; // 1bytes Calculation method 0: Memory size calculation 1: Count calculation
    uint32 plate_version = 3; // 1bytes Framework version number
    uint32 cloud_plate_num = 4; // 1bytes Total number of cloud dials
    uint32 user_cloud_plate_num = 5; // 1bytes Number of cloud dials already in use
    uint32 photo_plate_num = 6; // 1bytes Photo dial total number
    uint32 user_photo_plate_num = 7; // 1bytes Number of photo dials already in use
    uint32 wallpaper_plate_num = 8; // 1bytes Total number of wallpaper dials
    uint32 user_wallpaper_plate_num = 9; // 1bytes Number of wallpaper dials already in use
    repeated protocol_watch_dial_plate_list_item list_item = 10; // Watch-face entries.
    uint32 total_size = 11; // 4bytes Total size of the dial
    uint32 user_cloud_size = 12; // 4bytes Cloud dial usage space in bytes
    uint32 user_photo_size = 13; // 4bytes Photo dial usage space in bytes
    bytes now_show_plate_name = 14; // max:30 Currently displayed dial name
    uint32 enable_compress = 15; // 1bytes Compression type, 0 means no compression, 4 means using LZ4 compression
    uint32 func_table = 16; // Function table
    uint32 plate_photo_pic_support_num = 17; // 1bytes Number of photos supported by photo dial
    uint32 all_plate_support_max = 18; // 1bytes Maximum number of supported dials for all dials
}
```

### Field Reference

#### `protocol_watch_dial_plate_list_item`

| Field | Type | Description |
| --- | --- | --- |
| `dial_type` | `dial_type` | Dial type |
| `version` | `uint32` | 2bytes Current dial version number |
| `dial_size` | `uint32` | 4bytes Size of the current dial |
| `dial_name` | `bytes` | max:30 Dial name |

#### `protocol_watch_dial_plate_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `dial_operate_type` | 1bytes Operation type |
| `dial_name` | `repeated bytes` | max:30 Dial name |
| `dial_list_sort` | `repeated bytes` | max:30 Dial sorting |

#### `protocol_watch_dial_plate_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `dial_operate_type` | 1bytes Operation type |
| `formula_mode` | `uint32` | 1bytes Calculation method 0: Memory size calculation 1: Count calculation |
| `plate_version` | `uint32` | 1bytes Framework version number |
| `cloud_plate_num` | `uint32` | 1bytes Total number of cloud dials |
| `user_cloud_plate_num` | `uint32` | 1bytes Number of cloud dials already in use |
| `photo_plate_num` | `uint32` | 1bytes Photo dial total number |
| `user_photo_plate_num` | `uint32` | 1bytes Number of photo dials already in use |
| `wallpaper_plate_num` | `uint32` | 1bytes Total number of wallpaper dials |
| `user_wallpaper_plate_num` | `uint32` | 1bytes Number of wallpaper dials already in use |
| `list_item` | `repeated protocol_watch_dial_plate_list_item` | Watch-face entries. |
| `total_size` | `uint32` | 4bytes Total size of the dial |
| `user_cloud_size` | `uint32` | 4bytes Cloud dial usage space in bytes |
| `user_photo_size` | `uint32` | 4bytes Photo dial usage space in bytes |
| `now_show_plate_name` | `bytes` | max:30 Currently displayed dial name |
| `enable_compress` | `uint32` | 1bytes Compression type, 0 means no compression, 4 means using LZ4 compression |
| `func_table` | `uint32` | Function table |
| `plate_photo_pic_support_num` | `uint32` | 1bytes Number of photos supported by photo dial |
| `all_plate_support_max` | `uint32` | 1bytes Maximum number of supported dials for all dials |

### Enum Values

#### `dial_type`

| Value | Number | Description |
| --- | --- | --- |
| `DIAL_TYPE_NULL` | `0` | Invalid |
| `DIAL_TYPE_GENERAL` | `1` | General cloud dial |
| `DIAL_TYPE_PHOTO` | `2` | Photo dial |
| `DIAL_TYPE_WALLPAPER` | `3` | Wallpaper dial |
| `DIAL_TYPE_CUSTOM` | `4` | Custom dial |
| `DIAL_TYPE_GENERAL_AOD` | `5` | General dial + AOD dial |
| `DIAL_TYPE_AOD` | `6` | Regular AOD dial |

#### `dial_operate_type`

| Value | Number | Description |
| --- | --- | --- |
| `DIAL_OPERATE_TYPE_INQUIRE` | `0` | Inquiry about the currently used dial |
| `DIAL_OPERATE_TYPE_SET` | `1` | Set dial |
| `DIAL_OPERATE_TYPE_DELETE` | `2` | Delete dial |

### `func_table` Capability Bits

| Bit | Description |
| - | - |
| 0 | Supports watch-face ordering through `dial_list_sort`. |
