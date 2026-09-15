---
docId: ios-route-maps
locale: en-US
title: iOS Route Maps
description: Upload GPX routes and list or delete routes on the device.
platform: iOS
slug: ios/route-maps
order: 136
status: published
version: v2.0
---

# iOS Route Maps

## Overview

Upload GPX routes and list or delete routes on the device.

## Swift example

```swift
// geoId is the route identifier.

        
          CreekInterFace.instance.getGPXEncodeUint8List(data: fileData, geoId: 1234,sportType: .IRUN) { lat, lon in
             return "shengzheng"
          } encode: { model in
             self.view.hideRemark()
             CreekInterFace.instance.upLoadGeo(data: model, geoId: 1234) { progress in
                self.infoLabel.text = "progress : \(progress)"
             } uploadSuccess: {
                self.infoLabel.text = "Success"
             } uploadFailure: { code, message in
                self.infoLabel.text = "Failure"
             }
          }
```

```swift
CreekInterFace.instance.getGeo { model in
            // Handle result.
         } failure: { code, message in
            // Handle error.
         }
```

```swift
CreekInterFace.instance.delGeo(geoIds: [1234]) {
             // Handle success.
          } failure: { code, message in
             // Handle error.
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
    function_table geobin = 56;//Route-track capability.
}
```

## Protobuf data model

```protobuf
syntax = "proto3";

enum geobin_operate_type
{
    GEOBIN_OPERATE_TYPE_INQUIRE   = 0;// query list
    GEOBIN_OPERATE_TYPE_DELETE    = 1;// delete
}

message protocol_geobin_list_item
{
    uint32 geobin_size = 1; // geobin size; 4bytes geobin
    bytes geobin_name = 2;  // geobin name; max:30 geobin
}

message protocol_geobin_operate
{
    geobin_operate_type operate = 1; // operate; 1bytes operation type
    repeated bytes geobin_name = 2; // geobin name; max:30 geobin
}

message protocol_geobin_inquire_reply
{
    geobin_operate_type operate = 1; // operate; 1bytes operation type
    uint32  geobin_num = 2; // geobin num; 1bytes geobin
    repeated protocol_geobin_list_item list_item = 3;// geobin list
    uint32 total_size = 4; // total size; 4bytes geobin
}
```
