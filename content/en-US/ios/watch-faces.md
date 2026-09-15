---
docId: ios-watch-faces
locale: en-US
title: iOS Watch Face Management
description: Retrieve, set, delete, and install device watch faces.
platform: iOS
slug: ios/watch-faces
order: 7
status: published
version: v2.0
---

# iOS Watch Face Management

## Overview

Retrieve, set, delete, and install device watch faces.

## Swift example

```swift
// plate_version get？
CreekInterFace.instance.getWatchDial { model in
           
     model.plateVersion
                         
 } failure: { code, message in
                            
  }
  
 // watchID get？
 CreekInterFace.instance.getFirmware { model in
    model.deviceID
 }
```

```swift
CreekInterFace.instance.getWatchDial { model in
                // model.nowShowPlateName
                // get name
                
                model.listItem
                         
             } failure: { code, message in
                            
            }
```

```swift
// set get
            // get name ["1","2","3"]
            // watch "2"
            var data =  protocol_watch_dial_plate_operate()
            data.dialName = ["2".data(using: .utf8)!]
            CreekInterFace.instance.setWatchDial(model: data) {
              
            } failure: { code, message in
               
            }
```

```swift
var data =  protocol_watch_dial_plate_operate()
            data.dialName = ["1".data(using: .utf8)!]
            CreekInterFace.instance.delWatchDial(model: data) {
                self.view.hideRemark()
                self.textView.text = "success"
            } failure: { code, message in
                self.view.hideRemark()
                self.textView.text = message
            }
```

```swift
// let fileData:Data
CreekInterFace.instance.upload(fileName: "res.bin", fileData: fileData) { progress in
        print(progress)
 } uploadSuccess: {
        print("uploadSuccess")
 } uploadFailure: { code, message in
        print(message)
 }
```

## Capability-table fields

Check these fields after reading `protocol_function_table`:

```protobuf
message function_table {
    bool is_support = 1;// Whether the capability is supported.
    uint32 cmd_id = 2;// Capability command identifier.
}

message protocol_function_table {
    function_table dial_plate_nonsuport = 50;// Watch-face unsupported flag; interpret the value returned by firmware.
}
```

## Protobuf data model

```protobuf
syntax = "proto3";

enum dial_type
{
    DIAL_TYPE_NULL          = 0;// invalid
    DIAL_TYPE_GENERAL       = 1;// DIAL TYPE GENERAL
    DIAL_TYPE_PHOTO         = 2;// DIAL TYPE PHOTO
    DIAL_TYPE_WALLPAPER     = 3;// DIAL TYPE WALLPAPER
    DIAL_TYPE_CUSTOM        = 4;// custom
    DIAL_TYPE_GENERAL_AOD   = 5;// DIAL TYPE GENERAL AOD
    DIAL_TYPE_AOD           = 6;// DIAL TYPE AOD
}

enum dial_operate_type
{
    DIAL_OPERATE_TYPE_INQUIRE   = 0;// query
    DIAL_OPERATE_TYPE_SET       = 1;// set
    DIAL_OPERATE_TYPE_DELETE    = 2;// delete
}

message protocol_watch_dial_plate_list_item
{
    dial_type dial_type = 1;// Watch-face type
    uint32 version = 2;// Watch-face version
    uint32 dial_size = 3;// Watch-face file size in bytes
    bytes dial_name = 4; // Watch-face name, up to 30 bytes
}

message protocol_watch_dial_plate_operate
{
    dial_operate_type operate = 1; // Watch-face operation
    repeated bytes dial_name = 2; // Watch-face names, each up to 30 bytes
    repeated bytes dial_list_sort = 3; // Names in the desired display order, each up to 30 bytes
}

message protocol_watch_dial_plate_inquire_reply
{
    dial_operate_type operate = 1; // Watch-face operation
    uint32  formula_mode = 2;// Formula mode reported by the device
    uint32  plate_version = 3;// Watch-face resource version
    uint32  cloud_plate_num = 4;// Number of bundled cloud watch faces
    uint32  user_cloud_plate_num = 5;// Number of user-installed cloud watch faces
    uint32  photo_plate_num = 6;// Number of bundled photo watch faces
    uint32  user_photo_plate_num = 7;// Number of user-created photo watch faces
    uint32  wallpaper_plate_num = 8;// Number of bundled wallpaper watch faces
    uint32  user_wallpaper_plate_num = 9;// Number of user-created wallpaper watch faces
    repeated protocol_watch_dial_plate_list_item list_item = 10;// Installed watch-face entries
    uint32 total_size = 11;// Total storage used by watch faces, in bytes
    uint32 user_cloud_size = 12; // Storage used by user cloud watch faces, in bytes
    uint32 user_photo_size = 13; // Storage used by user photo watch faces, in bytes
    bytes now_show_plate_name = 14; // Name of the currently displayed watch face, up to 30 bytes
    uint32 enable_compress = 15;// Compression mode; value 4 indicates LZ4
    uint32 func_table = 16;// Watch-face capability bit field
    uint32 plate_photo_pic_support_num = 17;// Maximum number of images supported by a photo watch face
    uint32 all_plate_support_max = 18;// Maximum supported watch faces; 1 byte
}
```
