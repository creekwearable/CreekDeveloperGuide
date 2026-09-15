---
docId: ios-shortcut-keys
locale: en-US
title: iOS Shortcut Keys
description: Read and configure crown or button shortcut actions.
platform: iOS
slug: ios/shortcut-keys
order: 110
status: published
version: v2.0
---

# iOS Shortcut Keys

## Overview

Read and configure crown or button shortcut actions.

## Swift example

```swift
// Get shortcut-key settings.
CreekInterFace.instance.getHotKey { model in
                
            } failure: { code, message in
                
            }
            
            
// Set shortcut-key settings.
var operate = protocol_button_crown_operate()
operate.pauseWorkout = true
operate.longType = .pressTypeSos

CreekInterFace.instance.setHotKey(model: operate) {
    // Handle success
} failure: { code, message in
    // Handle failure
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
    function_table button_crown = 19;//Button-shortcut capability.
}
```

## Protobuf data model

```protobuf
syntax = "proto3";

enum long_2s_press_type
{
    PRESS_TYPE_NULL = 0;
    PRESS_TYPE_SOS = 1;
    PRESS_TYPE_WORKOUT = 2;
    PRESS_TYPE_ALEXA = 3;
    PRESS_TYPE_RESTART = 4;// PRESS TYPE RESTART
}

message protocol_button_crown_operate
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    long_2s_press_type long_type = 2;// long type; 1bytes 2s
    bool pause_workout = 3;// pause workout; 1bytes set button
}

message protocol_button_crown_inquire_reply
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    long_2s_press_type long_type = 2;// long type; 1bytes 2s
    bool pause_workout = 3;// pause workout; 1bytes set button
    uint32 func_table = 4;// func table; 1bytes capability table
}
```
