---
docId: flutter-firmware-ota
locale: zh-CN
title: "Flutter 固件 OTA 升级"
description: "使用支持的 OTA 流程检查、上传并安装固件包。"
platform: Flutter
slug: flutter/firmware-ota
order: 6
status: published
version: v2.0
---

# Flutter 固件 OTA 升级

使用支持的 OTA 流程检查、上传并安装固件包。

SDK 支持 `.ota`、`.zip` 和后台 OTA 文件管理三种流程。开始升级前检查设备电量与 FLASH 版本；多包升级过程中设备可能重启，重连后需要继续完成剩余步骤。

## 升级方式一：`.ota` 文件
### 文件类型：空升级固件（`.ota`）
说明：

1. 根据设备 ID 从服务器获取固件版本；不同设备 ID 不能混用固件。
2. OTA 有电量限制。电量低于 30% 时仍可检测新版本，但开始升级时会提示电量不足。
3. 服务器需要按 FLASH 版本配置固件。待升级固件与手表 FLASH 版本一致时，可仅配置单固件包；不一致时需配置完整资源包。

### 获取 OTA 文件
当前阶段由我方手动提供 OTA 文件，其中包含以下信息：

版本名称：`v2.6.0`

项目名称：`cw01`

ID：`1018`

FLASH 版本：`203`

固件交付包同时包含完整资源包与单固件包。例如，`cw01_v2.6.0_23101301_res.ota` 是完整资源包，`cw01_v2.6.0_23101301.ota` 是单固件包。

### 配置 OTA 升级
1. 将 `.ota` 文件放置到服务器。
2. 应用根据 FLASH 版本规则决定获取单固件包还是完整资源包。例如：

   - FLASH 版本

     1. 当前手表 FLASH 版本为 203，固件版本为 2.6.0。
     2. 服务器存在 FLASH 203、固件 2.6.1。
     3. 服务器存在 FLASH 204、固件 2.6.1。
   - 情况 1 和 2：仅需升级单固件包。
   - 情况 1 和 3：需升级完整资源包。
3. 调用 SDK 提供的方法将升级包传到手表。

### 执行 `.ota` 升级
```dart
sdkManager.upload(fileName: "test.ota", fileData: byteData.buffer.asUint8List(),success: (){
  print("ota success");
},failure: (c,m){
  print("ota failure");
},progress: (e){
  print("ota progress：$e");
});
```

## 升级方式二：`.zip` 文件
ZIP 升级模式在兼容单包升级的基础上支持分区升级。

ZIP 文件可按需配置单包或多包升级。ZIP 由我方配置后提供，请勿随意修改其中文件。

### 获取当前 OTA 版本
```dart
sdkManager.getOTAUpgradeVersion()
```

### 获取 OTA 资源包状态
`model.totalResource`：当前升级任务的资源包总数。

`model.step`：当前正在执行的步骤序号。

```dart
List<int> fileData = [];
 sdkManager.getOTAUpgradeState("ota.zip", fileData,stateBack: (total,step){
  print("totalResource:$total  step:$step");
},errorBack: (c,m){

});
```

### 上传文件
```dart
sdkManager.upload(fileName: "test.zip", fileData: byteData.buffer.asUint8List(),success: (){
      print("ota success");
},failure: (c,m){
      print("ota failure");
},progress: (e){
      print("ota progress：$e");
});
```

### 执行 OTA 升级
注意：文件上传成功后，当 `model.totalResource == model.step`（例如 3/3）时，表示整个升级流程已完成。

            2. 如果 `model.totalResource` 为 3，手表在每个包升级成功后都会重启。用户停留在升级页面时，手表自动重连成功后应继续触发剩余升级步骤。

## Upgrade method three: (**Backend OTA File Management**)
### 检查固件更新
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

### 开始固件升级
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
