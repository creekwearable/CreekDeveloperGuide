---
docId: android-device-connection
locale: en-US
title: Android Device Connection
description: Scan, connect, switch, bind, unbind, and query previously bound devices.
platform: Android
slug: android/device-connection
order: 2
status: published
version: v2.0
---

# Android Device Connection

Scan, connect, switch, bind, unbind, and query previously bound devices.

## Connect a Device

```kotlin
// /Scan
CreekManager.sInstance.scan(timeOut = 15, devices = { model: List<ScanDeviceModel> ->
    // Handle the device list
    listScanDeviceModel= model.toList()
   // addpter.setDeviceModel(model.toList())
    var addpter = CustomAdapter(this,listScanDeviceModel)
    listView!!.adapter = addpter
} ,endScan = {
  Log.w("endScan","endScan")
})

// /Connect
CreekManager.sInstance.connect(item.device?.id ?: "", connect = {
        connectState: Boolean ->
    if (connectState){
        viewHolder.connectDeviceView.text = "disConnect"
    }
})
```

## External Connection

```kotlin
CreekManager.sInstance.externalConnect(id = "D9:56:34:FD:4E:F4", connect = {
    
})
```

## QR-Code Connection

```kotlin
CreekManager.sInstance.scanConnect(id = "D9:56:34:FD:4E:F4", device = {
    
}, failure = {
    _,_ ->
})
```

## Switch or Manually Connect a Device

```kotlin
CreekManager.sInstance.inTransitionDevice(id = item.device?.id ?: "", inTransitionDevice = {
    _ ->  
})
```

## Bind a Device

```kotlin
// /Direct binding
CreekManager.sInstance.bindingDevice(
    bindType = Enums.bind_method.BIND_NORMAL,
    id = null,
    code = null,
    success = {
        print("Binding success")

    },
    failure = {
        print("Binding failure")
    })
    
// /Verification codeBind

CreekManager.sInstance.bindingDevice(
    bindType = Enums.bind_method.BIND_PAIRING_CODE,
    id = null,
    code = null,
    success = {
        print("Binding success")

    },
    failure = {
        print("Binding failure")
    })

// code: Verification code
CreekManager.sInstance.bindingDevice(
    bindType = Enums.bind_method.BIND_PAIRING_CODE,
    id = null,
    code = editText.text.toString(),
    success = {
        print("Binding success")

    },
    failure = {
        print("Binding failure")
    })
```

## Unbind a Device

```kotlin
CreekManager.sInstance.bindingDevice(
    bindType = Enums.bind_method.BIND_REMOVE,
    id = device.id,
    code = null,
    success = {
       

    },
    failure = {
       
    })
```

## Get Bound Devices

```kotlin
CreekManager.sInstance.getBindDevice {model ->  
    model.forEach(
        action = {

            it.lastBind = true
        }
    )
}
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

enum bind_method
{
    BIND_ENCRYPTED = 0;// BIND ENCRYPTED.
    BIND_NORMAL = 1;// Direct binding
    BIND_REMOVE = 2;// BIND REMOVE.
    BIND_PAIRING_CODE = 3;// Pairing-code binding
}

enum bind_flag
{
    BIND_FLAG_REQUEST = 0;// BIND FLAG REQUEST.
    BIND_FLAG_FAILED = 1;// Failure
    BIND_FLAG_SUCCESS = 2;// Success
    BIND_FLAG_BOUND = 3;// BIND FLAG BOUND.
    BIND_FLAG_SAVE_DATA = 4;// BIND FLAG SAVE DATA.
}

enum bind_phone_type
{
    ANDROID = 0;// ANDROID.
    IOS = 1;// IOSPhone
}

message protocol_bind_operate
{
    bind_method bind_method = 1;// Bind Method.
    bind_flag bind_flag = 2;// Bind Flag.
    bind_phone_type bind_phone = 3;// Bind Phone.
}

message protocol_bind_reply
{
    bind_method bind_method = 1;// Bind Method.
    bind_flag bind_flag = 2;// Bind Flag.
    bytes competent_data = 3;// Competent Data.
    bytes pairing_code = 4;// Pairing Code.
}
```
