---
docId: flutter-device-connection
locale: en-US
title: "Flutter Device Connection"
description: "Scan, connect, bind, switch, and unbind devices."
platform: Flutter
slug: flutter/device-connection
order: 2
status: published
version: v2.0
---

# Flutter Device Connection

Scan, connect, bind, switch, and unbind devices.

## Device Connection (Scan and Connect): First, scan for available devices before establishing a connection. After successfully connecting, it is mandatory to bind the device. The connection is considered established only when the device is successfully bound. If the binding process fails, it is necessary to actively disconnect the connection.
```dart
///scan
sdkManager.scan((element) {
  if (element != null && element.isNotEmpty) {
    final uniqueDevices = element.toSet().toList();
    listDevice = uniqueDevices;
    listDevice?.sort((a, b) => (b.rssi ?? 0).compareTo(a.rssi ?? 0));
    searchDeviceList.clear();
    listDevice?.forEach((e) {
      searchDeviceList.add(e);
      searchDeviceListTemp = List.from(searchDeviceList);
    });
  }
  update();
}, endScan: () async {
  update();
});

 ///Connecting
sdkManager.connect(blueDevice.device!,connectStateListen: (e){

});
```

## Scan to Connect (Scan the QR Code on the smartwatch)
```dart
// The QR code on the smartwatch follows a standard format：
// https://app.cheyfit.com/#/code/caB8?mac=F4:4E:FD:34:56:D9&device_id=3021
// Extracting the MAC Address: Decode the QR code to reveal the MAC address, which is initially presented as F4:4E:FD:34:56:D9. Reverse the order to obtain the final address to be transmitted, which is D9:56:34:FD:4E:F4.

sdkManager.scanConnect("D9:56:34:FD:4E:F4",scanBack: (e){
  sdkManager.connect(e.device!,connectStateListen: (e){
     if(e){
       sdkManager.bindingDevice(bind_method.BIND_NORMAL,success: (){
         print("Success");
       },failure: (){
         print("Failure");
       });
     }
  });
},failure: (){

});
```

## Switching Devices, Manual Connection (Must be a bound device).
```dart
sdkManager.inTransitionDevice(device,connectStateListen: (e){

});
```

## Device Binding
```dart
///Direct Binding
sdkManager.bindingDevice(
    bind_method.BIND_NORMAL,
    success: () {
      Common.toast(label: 'Binding successful');
    },
    failure: () {
      Common.toast(label: 'Binding failed');
    });

///Pairing Code Binding
// Step 1 (Obtaining Code)
sdkManager.bindingDevice(bind_method.BIND_PAIRING_CODE,success: (){

},failure: (){

});
// Step 2 (Entering Code)
sdkManager.bindingDevice(bind_method.BIND_PAIRING_CODE,pairCode: utf8.encode("1234").toList(),success: (){

},failure: (){

});
```

## Unbinding Device
```dart
sdkManager.bindingDevice(
    bind_method.BIND_REMOVE,
    deviceId: Global.blueDeviceInfo!.device!.id!.id,
    success: () {
      Common.toast(label: 'Unbinding successfully');
      Global.blueDeviceInfo = null;
    },
    failure: () {
      Common.toast(label: 'Unbinding failed');
    });
```

## Retrieve Bound Devices
```dart
List<BlueDeviceInfo> bindList = await sdkManager.getBindDevice();
```

## stop scan
```dart
sdkManager.stopScan();
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum bind_method
{
    BIND_ENCRYPTED = 0;// Authorization code verification
    BIND_NORMAL = 1;// Direct binding
    BIND_REMOVE = 2;// Unbind
    BIND_PAIRING_CODE = 3;// Pairing code binding
}

enum bind_flag
{
    BIND_FLAG_REQUEST = 0;// Request to bind
    BIND_FLAG_FAILED = 1;// Binding failed
    BIND_FLAG_SUCCESS = 2;// Binding successful
    BIND_FLAG_BOUND = 3;// Already bound
    BIND_FLAG_SAVE_DATA = 4;// Save data
}

enum bind_phone_type
{
    ANDROID = 0;// Android
    IOS = 1;// iOS phone
}

message protocol_bind_operate
{
    bind_method bind_method = 1;// Binding method
    bind_flag bind_flag = 2;// Binding flag
    bind_phone_type bind_phone = 3;// Binding phone model
}

message protocol_bind_reply
{
    bind_method bind_method = 1;// Binding method
    bind_flag bind_flag = 2;// Binding flag
    bytes competent_data = 3;// Authorization code
    bytes pairing_code = 4;// Pairing code
}
```

### Field Reference

#### `protocol_bind_operate`

| Field | Type | Description |
| --- | --- | --- |
| `bind_method` | `bind_method` | Binding method |
| `bind_flag` | `bind_flag` | Binding flag |
| `bind_phone` | `bind_phone_type` | Binding phone model |

#### `protocol_bind_reply`

| Field | Type | Description |
| --- | --- | --- |
| `bind_method` | `bind_method` | Binding method |
| `bind_flag` | `bind_flag` | Binding flag |
| `competent_data` | `bytes` | Authorization code |
| `pairing_code` | `bytes` | Pairing code |

### Enum Values

#### `bind_method`

| Value | Number | Description |
| --- | --- | --- |
| `BIND_ENCRYPTED` | `0` | Authorization code verification |
| `BIND_NORMAL` | `1` | Direct binding |
| `BIND_REMOVE` | `2` | Unbind |
| `BIND_PAIRING_CODE` | `3` | Pairing code binding |

#### `bind_flag`

| Value | Number | Description |
| --- | --- | --- |
| `BIND_FLAG_REQUEST` | `0` | Request to bind |
| `BIND_FLAG_FAILED` | `1` | Binding failed |
| `BIND_FLAG_SUCCESS` | `2` | Binding successful |
| `BIND_FLAG_BOUND` | `3` | Already bound |
| `BIND_FLAG_SAVE_DATA` | `4` | Save data |

#### `bind_phone_type`

| Value | Number | Description |
| --- | --- | --- |
| `ANDROID` | `0` | Android |
| `IOS` | `1` | iOS phone |
