---
docId: ios-blood-pressure
locale: en-US
title: iOS Blood Pressure
description: Read blood-pressure records stored on the device.
platform: iOS
slug: ios/blood-pressure
order: 139
status: published
version: v2.0
---

# iOS Blood Pressure

## Overview

Read blood-pressure records stored on the device.

## Swift example

The source SDK guide does not provide a confirmed Swift example for this capability. The data model below is included without inferring an API signature.

## Protobuf data model

```protobuf
syntax = "proto3";
 
enum operate_blood_pressure_type
{
    INVALID = 0;
    INQUIRE = 1; // query
}
 
message protocol_blood_pressure_item
{
    uint32 year = 1;
    uint32 month = 2;
    uint32 day = 3;
    uint32 hour = 4;
    uint32 minute = 5;
    uint32 second = 6;
    uint32 pluse = 7;// pulse
    uint32 spb = 8;// systolic pressure
    uint32 dbp = 9;// diastolic pressure
};
 
message protocol_blood_pressure_operate
{
    operate_blood_pressure_type operate = 1; // operate; 1bytes operation type
    uint32 page_index = 2;// current page index used for paged transfer
    uint32 page_num = 3;// records in the current page used for paged transfer
}
 
message protocol_blood_pressure_inquire_reply
{
    operate_blood_pressure_type operate = 1;     // operate; 1bytesoperation type
    uint32 func_table = 2;        // func table; 1bytes capability table
    uint32 blood_pressure_record_support_max = 3; // Maximum supported blood-pressure records; 1 byte
    uint32 page_index = 4;// current page index used for paged transfer
    uint32 page_num = 5;// records in the current page used for paged transfer
    repeated protocol_blood_pressure_item bp_items = 6;
}
```
