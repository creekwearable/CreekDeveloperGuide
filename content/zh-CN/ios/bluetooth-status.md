---
docId: ios-bluetooth-status
locale: zh-CN
title: iOS 蓝牙状态与重连
description: 读取蓝牙状态并触发 BT 重连。
platform: iOS
slug: ios/bluetooth-status
order: 116
status: published
version: v2.0
---

# iOS 蓝牙状态与重连

## 功能说明

读取蓝牙状态并触发 BT 重连。

### 使用要点

这个在设置里面有一个通道来检查bt配对的情况，，是为了用户可以主动去进行bt配对。具体用法根据实际情况而定。注意：没有取消配对，只有主动去配对，，ios和安卓的配对方式不一样，具体看下方调用方法

## Swift 示例

```swift
///IOS
  // bool ble_pairing_status = 3;//1bytes ios蓝牙配对状态
  // bool bt_pairing_status = 4;//1bytes bt蓝牙配对状态
  // bool bt_connect_status = 5;//1bytes bt蓝牙连接状态
    
            ///获取蓝牙状态
            CreekInterFace.instance.bluetoothStatus { model in
                self.view.hideRemark()
                let json = try? model.jsonString()
                if let str = json{
                    dispatch_main_sync_safe {
                        self.textView.text = str
                    }
                }
            } failure: { code, message in
                self.view.hideRemark()
                self.textView.text = message
            }
            
            ///主动bt配对
            CreekInterFace.instance.firmwareReconnect(reconnect: true, success: {
               
            }, failure: { code, message in
                
            })
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

message protocol_connect_status_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool reconnect_operate = 2; //1bytes 重连操作
}

message protocol_connect_status_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 get_tran_mtu_size = 2;//4bytes 最大传输长度
    bool ble_pairing_status = 3;//1bytes ios蓝牙配对状态
    bool bt_pairing_status = 4;//1bytes bt蓝牙配对状态
    bool bt_connect_status = 5;//1bytes bt蓝牙连接状态
}
```
