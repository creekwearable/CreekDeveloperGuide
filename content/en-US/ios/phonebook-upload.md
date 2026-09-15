---
docId: ios-phonebook-upload
locale: en-US
title: iOS Phonebook Upload
description: Generate and upload a phonebook in the .phone file format.
platform: iOS
slug: ios/phonebook-upload
order: 10
status: published
version: v2.0
---

# iOS Phonebook Upload

## Overview

Generate and upload a phonebook in the .phone file format.

## Swift example

```swift
// succeeded
     CreekInterFace.instance.phoneBookInit();  
     // custom
     CreekInterFace.instance.monitorPhone()
     // enable
     CreekInterFace.instance.checkPhoneBookPermissions { model in
              if !model{
                 }
              }
           }
     CreekInterFace.instance.requestPhoneBookPermissions { model in
                    if model {
                       print("Permissions  Success")
                    }else{
                       print("Permissions  Failure")
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
    function_table phonebook_nonsuport = 39;// Phonebook unsupported flag; supported by default.
}
```
