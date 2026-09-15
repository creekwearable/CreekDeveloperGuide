---
docId: ios-health-snapshot
locale: en-US
title: iOS Health Snapshot
description: Configure and retrieve health-snapshot measurements.
platform: iOS
slug: ios/health-snapshot
order: 131
status: published
version: v2.0
---

# iOS Health Snapshot

## Overview

Configure and retrieve health-snapshot measurements.

## Swift example

```swift
CreekInterFace.instance.getHealthSnapshotList (page: 1,size: 20){ model in
            
         } failure: { code, message in
            
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
    function_table health_snap = 52;//Health-snapshot capability.
}
```

## Protobuf data model

```protobuf
syntax = "proto3";
 
enum operate_health_snap_type
{
    INVALID = 0;
    INQUIRE = 1; // query
}
 
message protocol_health_snap_item
{
    uint32 year = 1;
    uint32 month = 2;
    uint32 day = 3;
    uint32 hour = 4;
    uint32 minute = 5;
    uint32 second = 6;
    uint32 hr_value = 7;
    uint32 spo2_value = 8;
    uint32 hrv_value = 9;
    uint32 rr_value = 10; // respiratory rate
    uint32 stress_value = 11;
};
 
message protocol_health_snap_operate
{
    operate_health_snap_type operate = 1; // operate; 1bytes operation type
    uint32 page_index = 2;// current page index used for paged transfer
    uint32 page_num = 3;// records in the current page used for paged transfer
}
 
message protocol_health_snap_inquire_reply
{
    operate_health_snap_type operate = 1;     // operate; 1bytesoperation type
    uint32 func_table = 2;        // func table; 1bytes capability table
    uint32 snap_record_support_max = 3; // Maximum supported health-snapshot records; 1 byte
    uint32 page_index = 4;// current page index used for paged transfer
    uint32 page_num = 5;// records in the current page used for paged transfer
    repeated protocol_health_snap_item snap_items = 6;
}
```
