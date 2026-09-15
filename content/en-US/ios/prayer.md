---
docId: ios-prayer
locale: en-US
title: iOS Prayer
description: Read and configure prayer-related data.
platform: iOS
slug: ios/prayer
order: 148
status: published
version: v2.0
---

# iOS Prayer

## Overview

Read and configure prayer-related data.

## Swift example

```swift
// Get prayer settings.
         CreekInterFace.instance.getPrayer{model in
            self.view.hideRemark()
            let json = try? model.jsonString()
            if let str = json{
               dispatch_main_sync_safe {
                  self.textView.text = str
               }
            }
         } failure: { code, message in
            self.view.hideRemark()
            self.textView.text = message
         }
         
         // Set prayer settings.
          let operate = protocol_prayer_operate()
         
         CreekInterFace.instance.setPrayer(model: operate) {
            self.view.hideRemark()
            self.textView.text = "success"
         } failure: { code, message in
            self.view.hideRemark()
            self.textView.text = message
         }
         break
```

## Protobuf data model

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;// query
    SET = 2;// set
}

message prayer_time
{
    uint32 hour                    = 1; // hour; 1bytes
    uint32 minute                  = 2; // minute; 1bytes
};

message prayer_data
{
    prayer_time fajr_time           = 1; // time
    prayer_time sunrise_time        = 2; // day time
    prayer_time dhuhr_time          = 3; // time
    prayer_time asr_time            = 4; // time
    prayer_time maghrib_time        = 5; // time
    prayer_time isha_time           = 6; // time
    uint32 date                     = 7; // date; 4bytes day
};

message protocol_prayer
{
    repeated prayer_data data        = 1; // Prayer data for up to three days
    bytes city_name                  = 2; // City name; maximum 64 bytes
    uint32 room_angle                = 3; // Qibla direction angle; 2 bytes
    uint32 updated_time              = 4; // Last update timestamp; 4 bytes
};

message protocol_prayer_operate
{
    operate_type operate                  = 1; // operation type 0 invalid 1 query 2 set
    protocol_prayer prayer                = 2;
}

message protocol_prayer_inquire_reply
{
    operate_type operate                  = 1; // operation type 0 invalid 1 query 2 set
    protocol_prayer prayer                = 2;
}
```
