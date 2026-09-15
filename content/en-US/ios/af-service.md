---
docId: ios-af-service
locale: en-US
title: iOS AF Service Switch
description: Read and configure the custom atrial-fibrillation service switch.
platform: iOS
slug: ios/af-service
order: 149
status: published
version: v2.0
---

# iOS AF Service Switch

## Overview

Read and configure the custom atrial-fibrillation service switch.

## Swift example

```swift
// Get the AF service switch.
         CreekInterFace.instance.getAfServer{ model in
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
         
         // Set the AF service switch.
         var operate = protocol_custom_yuwell_af_operate()
         operate.afSwitch = .switchOn
         CreekInterFace.instance.setAfServer(model: operate) {
            self.view.hideRemark()
            self.textView.text = "success"
         } failure: { code, message in
            self.view.hideRemark()
            self.textView.text = message
         }
```

## Protobuf data model

```protobuf
syntax = "proto3";

message protocol_custom_yuwell_af_operate 
{ 
   operate_type operate = 1;     // operation type
   switch_type switch = 2;       // switch
}
message protocol_custom_yuwell_af_inquire_reply
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    switch_type
     switch = 2;   // switch
}
```
