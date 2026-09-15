---
docId: android-bluetooth-status
locale: en-US
title: Android Bluetooth Status and Reconnection
description: Read Bluetooth status and trigger BT reconnection.
platform: Android
slug: android/bluetooth-status
order: 116
status: published
version: v2.0
---

# Android Bluetooth Status and Reconnection

Read Bluetooth status and trigger BT reconnection.

```kotlin
CreekManager.sInstance.bluetoothStatus({ model: Mtu.protocol_connect_status_inquire_reply ->
    textView.text = model.toString()

}, failure = { _, m ->
    textView.text = m
})

CreekManager.sInstance.androidPair()
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

message protocol_connect_status_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    bool reconnect_operate = 2; // Reconnect Operate. 1bytes.
}

message protocol_connect_status_inquire_reply
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    uint32 get_tran_mtu_size = 2;// Maximum get tran mtu size. 4bytes.
    bool ble_pairing_status = 3;// Ble Pairing Status. 1bytes.
    bool bt_pairing_status = 4;// Bt Pairing Status. 1bytes.
    bool bt_connect_status = 5;// Bt Connect Status. 1bytes.
}
```
