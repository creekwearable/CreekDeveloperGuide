---
docId: flutter-firmware-ota
locale: en-US
title: "Flutter Firmware OTA Upgrade"
description: "Check, upload, and install firmware packages with the supported OTA flows."
platform: Flutter
slug: flutter/firmware-ota
order: 6
status: published
version: v2.0
---

# Flutter Firmware OTA Upgrade

Check, upload, and install firmware packages with the supported OTA flows.

## Upgrade method one: (.ota file format)
### File Type: Blank Firmware File (.ota)
Explanation:

1. Obtain firmware versions from the server based on the device ID. Different device IDs are not allowed to retrieve firmware versions.
2. OTA has a battery limit. New versions can be detected when the battery is <30%, but upgrading will prompt that the battery is insufficient.
3. Firmware needs to be configured on the server based on the FLASH version. If the firmware to be upgraded is consistent with the watch's firmware FLASH, a single firmware package can be configured on the server. If FLASH is not consistent, the entire resource package needs to be configured.

### Obtaining OTA Files Method
At the current stage, it is provided manually. The information included inside is

Version Name: v2.6.0

Project Name: cw01

ID Number: 1018

Flash Version: 203

The firmware package contains both the complete resource package and the firmware package. For example, cw01_v2.6.0_23101301_res.ota is the complete resource package, and cw01_v2.6.0_23101301.ota is the firmware package.

### Configure OTA Upgrade
1. Place the .ota file on the server.
2. On the app side, determine whether to obtain the firmware package or the complete resource package based on rules (the rules are based on the mentioned FLASH version). For example:

   - FLASH version

     1. The current watch FLASH version is 203, and the firmware version is 2.6.0.
     2. The server has FLASH version 203 and firmware version 2.6.1.
     3. The server has FLASH version 204 and firmware version 2.6.1.
   - Cases 1 and 2: Only the firmware package needs to be upgraded.
   - Cases 1 and 3: The complete resource package needs to be upgraded.
3. Upload to the watch (call the provided SDK method)

### Firmware Upgrade (.ota)
```dart
sdkManager.upload(fileName: "test.ota", fileData: byteData.buffer.asUint8List(),success: (){
  print("ota success");
},failure: (c,m){
  print("ota failure");
},progress: (e){
  print("ota progress：$e");
});
```

## Upgrade method two: (.zip file format)
The zip upgrade mode supports partition upgrade on the premise of being compatible with single package upgrade.

zip file details: You can freely configure single-package and multi-package upgrades. We will configure the zip and give it to you. Do not change the files inside at will.

### Get the current OTA version
```dart
sdkManager.getOTAUpgradeVersion()
```

### Get the current OTA resource package status
model.totalResource ：The total number of resource packages currently upgraded

model.step：The step currently being executed (which step)

```dart
List<int> fileData = [];
 sdkManager.getOTAUpgradeState("ota.zip", fileData,stateBack: (total,step){
  print("totalResource:$total  step:$step");
},errorBack: (c,m){

});
```

### Upload files
```dart
sdkManager.upload(fileName: "test.zip", fileData: byteData.buffer.asUint8List(),success: (){
      print("ota success");
},failure: (c,m){
      print("ota failure");
},progress: (e){
      print("ota progress：$e");
});
```

### OTA upgrade
Note: 1. Judgment of completion of the upgrade process -》When the upload is completed successfully, it is judged that model.totalResource == model.step (3/3),                   which means the upgrade process is completed.

            2. During the upgrade process, if the total number of packages model.totalResource is 3, the watch will restart after each package is uploaded successfully.                    Therefore, when the user stays on the upgrade page, after the watch automatically connects successfully, you need to actively complete this process and                    automatically trigger.。

## Upgrade method three: (**Backend OTA File Management**)
### Check for firmware updates
```dart
sdkManager.queryFirmwareUpdate(
  callBack: (result) {
    if (result.code == 200 && result.hasData() && result.data.firmwareUrl.isNotEmpty) {
      CreekLog.info("${result.data.firmwareVersion}");
    } else {

    }
  },
  errCallBack: (errorMessage) {
    CreekLog.info("errorMessage, $errorMessage");
  }
);
```

### Start the firmware upgrade
```dart
sdkManager.startFirmwareUpdate(
  downProgress: (progress) {
    CreekLog.info("$progress");
  },
  downSuccess: () {

  },
  downFailure: (message) {
    CreekLog.info("$message");
  },
  uploadProgress: (progress) {
    CreekLog.info("$progress");
  },
  uploadSuccess: () {

  },
  uploadFailure: (code, message) {
    CreekLog.info("uploadFailure $code, $message");
  }
);
```
