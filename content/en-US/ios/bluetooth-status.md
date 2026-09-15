---
docId: ios-bluetooth-status
locale: en-US
title: iOS Bluetooth Status and Reconnection
description: Read Bluetooth state and trigger BT reconnection.
platform: iOS
slug: ios/bluetooth-status
order: 116
status: published
version: v2.0
---

# iOS Bluetooth Status and Reconnection

## Overview

Read Bluetooth state and trigger BT reconnection.

## Swift example

```swift
// iOS pairing state is available in ble_pairing_status.
  // bool ble_pairing_status = 3; // BLE pairing state on iOS
  // bool bt_pairing_status = 4;  // Classic-Bluetooth pairing state
  // bool bt_connect_status = 5;  // Classic-Bluetooth connection state
    
            // Get Bluetooth status.
            CreekInterFace.instance.bluetoothStatus { model in
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
            
            // Reconnect classic Bluetooth.
            CreekInterFace.instance.firmwareReconnect(reconnect: true, success: {
               
            }, failure: { code, message in
                
            })
```

## Protobuf data model

```protobuf
syntax = "proto3";

message protocol_connect_status_operate
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    bool reconnect_operate = 2; // reconnect operate; 1bytes
}

message protocol_connect_status_inquire_reply
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    uint32 get_tran_mtu_size = 2;// get tran mtu size; 4bytes maximum
    bool ble_pairing_status = 3;// BLE pairing state on iOS; 1 byte
    bool bt_pairing_status = 4;// Classic-Bluetooth pairing state; 1 byte
    bool bt_connect_status = 5;// Classic-Bluetooth connection state; 1 byte
}
```
