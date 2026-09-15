---
docId: ios-device-connection
locale: en-US
title: iOS Device Connection
description: Scan, connect, switch, bind, unbind, and retrieve bound devices.
platform: iOS
slug: ios/device-connection
order: 2
status: published
version: v2.0
---

# iOS Device Connection

## Device Connection

Scan for the device before connecting. A connection is complete only after binding succeeds. If binding fails, actively disconnect the device.

```swift
/// Scan
CreekInterFace.instance.scan(timeOut: 15) { data in
    self.devides = data
    self.tableView.reloadData()
} endScan: {
    print("Scan completed")
}

/// Connect
CreekInterFace.instance.connect(id: a.device?.id ?? "") { isBool in
    self.view.hideRemark()
    CreekAlert.alertMsg(exception: isBool ? "connect" : "disconnect")
    if isBool{
        self.connectDeviceID = a.device?.id
    }
    dispatch_main_sync_safe {
        tableView.reloadData()
    }
}
}
```

## External connection (use this method to connect when using your own Bluetooth scan)

```swift
CreekInterFace.instance.externalConnect(id: "941DC185-BAEF-A1EC-2CCA-4275239E8D07") { isBool in
    if isBool{
    }
}
```

## QR-code connection (scan the watch)

QR-code format on the watch:

`https://app.cheyfit.com/#/code/caB8?mac=F4:4E:FD:34:56:D9&device_id=3021`

Extract the MAC address:

`F4:4E:FD:34:56:D9`

Reverse it to obtain the final address to pass in:

`D9:56:34:FD:4E:F4`

```swift
CreekInterFace.instance.scanConnect(id: "D9:56:34:FD:4E:F4") { model in
    CreekInterFace.instance.connect(id: model.device?.id) { connectState in
        CreekInterFace.instance.bindingDevice(bindType: .binNormal, id: nil, code: nil) {
            print("Success")
        } failure: {
            print("Failure")
        }
    } failure: { code, message in

    }
```

## Switch devices or connect manually (the device must be bound)

```swift
CreekInterFace.instance.inTransitionDevice(id: "") { connectState in
    /// connectState true: connection succeeded; false: connection failed
}
```

## Bind a device

Bind directly:

```swift
CreekInterFace.instance.bindingDevice(bindType: .binNormal, id: nil, code: nil) {
    print("Success")
} failure: {
    print("Failure")
}
```

Bind with a verification code:

Step 1: Obtain the verification code (will the watch display a verification prompt?)

```swift
CreekInterFace.instance.bindingDevice(bindType: .bindPairingCode, id: nil, code: nil) {
    ///
} failure: {

}
```

Step 2: Enter the verification code.

`code`: verification code

```swift
CreekInterFace.instance.bindingDevice(bindType: .bindPairingCode, id: nil, code: textField.text) {
    print("Success")
} failure: {
    print("Failure")
}
```

## Unbind a device

```swift
CreekInterFace.instance.bindingDevice(bindType: .bindRemove, id: device.id, code: nil) {
    ///
} failure: {

}
```

## Get previously bound devices

```swift
CreekInterFace.instance.getBindDevice { model in
    model.forEach { device in
        /// lastBind == true indicates the device currently in use
        device.lastBind = true

    }
}
```

---

## Binding Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

enum bind_method
{
    BIND_ENCRYPTED = 0;//Authorization code verification
    BIND_NORMAL = 1;//Direct binding
    BIND_REMOVE = 2;//Unbind
    BIND_PAIRING_CODE = 3;//Pairing code binding
    BIND_CONFIRM = 4;//Confirm binding
}

enum bind_flag
{
    BIND_FLAG_REQUEST = 0;//Indicates a binding request
    BIND_FLAG_FAILED = 1;//Failed
    BIND_FLAG_SUCCESS = 2;//Succeeded
    BIND_FLAG_BOUND = 3;//Bound
    BIND_FLAG_SAVE_DATA = 4;//Save data
    BIND_ACCOUNT = 5;//Bind account information
    BIND_FLAG_NEED_CHARGERING = 6;//Pairing is allowed only while charging; the app prompts the user to charge the device
}

enum bind_phone_type
{
    ANDROID = 0;//Android
    IOS = 1;//iOS phone
}

message protocol_bind_operate
{
    bind_method bind_method = 1;//Binding method
    bind_flag bind_flag = 2;//Binding flag
    bind_phone_type bind_phone = 3;//Phone type used for binding
    bytes userid = 4;//User ID
    bytes accountid = 5;//Account
}

message protocol_bind_reply
{
    bind_method bind_method = 1;//Binding method
    bind_flag bind_flag = 2;//Binding flag 
    bytes competent_data = 3;//Authorization code
    bytes pairing_code = 4;//Pairing code
}
```
