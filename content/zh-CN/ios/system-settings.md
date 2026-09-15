---
docId: ios-system-settings
locale: zh-CN
title: iOS 系统设置
description: 执行重启、关机、恢复出厂、清除配对等系统操作。
platform: iOS
slug: ios/system-settings
order: 142
status: published
version: v2.0
---

# iOS 系统设置

## 功能说明

`setSystem(type:)` 的 `type` 取值如下：

| `type` | 操作 |
|---:|---|
| 1 | 重启设备 |
| 2 | 关闭设备 |
| 3 | 恢复出厂设置 |
| 4 | 清除经典蓝牙配对信息 |
| 5 | 进入飞行模式 |

## Swift 示例

```swift
// 清除经典蓝牙配对信息。
CreekInterFace.instance.setSystem(type: 4) {
    // 处理成功。
} failure: { code, message in
    // 处理错误。
}
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

message protocol_system_operate
{
    bool restart = 1;//是否重启设备
    bool power_off = 2;//是否关闭设备
}
```
