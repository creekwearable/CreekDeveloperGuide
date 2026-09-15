---
docId: flutter-system-settings
locale: zh-CN
title: "Flutter 系统设置"
description: "执行重启、关机、恢复出厂或清除蓝牙信息。"
platform: Flutter
slug: flutter/system-settings
order: 129
status: published
version: v2.0
---

# Flutter 系统设置

执行重启、关机、恢复出厂或清除蓝牙信息。

## 接口示例

```dart
// type ：
// 1 Restart operation
// 2 Shut down operation
// 3 Restore factory settings
// 4 Clear bt information
sdkManager.setSystem(type: 1,callBack: (){

},errCallBack: (e){

});
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

message protocol_system_operate {
    bool restart = 1; // 重启操作
    bool power_off = 2; // 关机操作
}
```

### 字段说明

#### `protocol_system_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `restart` | `bool` | 重启操作 |
| `power_off` | `bool` | 关机操作 |
