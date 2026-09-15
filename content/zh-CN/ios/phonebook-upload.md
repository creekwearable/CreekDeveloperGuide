---
docId: ios-phonebook-upload
locale: zh-CN
title: iOS 电话本上传
description: 生成并上传 .phone 格式的电话本文件。
platform: iOS
slug: ios/phonebook-upload
order: 10
status: published
version: v2.0
---

# iOS 电话本上传

## 功能说明

生成并上传 .phone 格式的电话本文件。

### 使用要点

权限申请：（andriod）

NSContactsUsageDescription(IOS)

## Swift 示例

```swift
///初始化电话本（内部会有策略，每次连接设备成功的时候会去检查一次）
     CreekInterFace.instance.phoneBookInit();  
     ///主动调用检查是否需要同步电话本（可以定在前后台切换的时候去调用）策略自定义
     CreekInterFace.instance.monitorPhone()
     ////检查权限是否开启
     CreekInterFace.instance.checkPhoneBookPermissions { model in
              if !model{
                 }
              }
           }
     ///请求权限
     CreekInterFace.instance.requestPhoneBookPermissions { model in
                    if model {
                       print("Permissions  Success")
                    }else{
                       print("Permissions  Failure")
                    }
```

## 功能表字段

读取 `protocol_function_table` 后检查以下字段：

```protobuf
message function_table {
    bool is_support = 1;//是否支持该能力。
    uint32 cmd_id = 2;//能力对应的指令标识。
}

message protocol_function_table {
    function_table phonebook_nonsuport = 39;//电话本不支持标志，默认支持。
}
```
