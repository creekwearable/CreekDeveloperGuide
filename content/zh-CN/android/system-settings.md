---
docId: android-system-settings
locale: zh-CN
title: Android 系统设置
description: 执行重启、关机、恢复出厂设置等系统操作。
platform: Android
slug: android/system-settings
order: 142
status: published
version: v2.0
---

# Android 系统设置

执行重启、关机、恢复出厂设置等系统操作。

```kotlin
type ：
1 Restart operation 
2 Shut down operation 
3 Restore factory settings  
4 Clear bt information
CreekManager.sInstance.setSystem(type = 4, success = {

}, failure = {
    c,m ->
})
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";

message protocol_system_operate
{
    bool restart = 1;//重启操作
    bool power_off = 2;//关机操作
}
```
