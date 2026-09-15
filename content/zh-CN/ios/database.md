---
docId: ios-database
locale: zh-CN
title: iOS 数据库查询与操作
description: 设置数据库用户并查询 SDK 保存的健康数据。
platform: iOS
slug: ios/database
order: 14
status: published
version: v2.0
---

# iOS 数据库查询与操作

## 功能说明

SDK 会在本地数据库中保存同步后的健康数据。查询前请先设置当前业务用户 ID，避免不同账号的数据混用。日期参数使用 `YYYY-MM-DD` 格式。

## 设置数据库用户

```swift
// 设置当前用户
CreekInterFace.instance.setDBUser(12345663)

// 清除当前用户
CreekInterFace.instance.setDBUser(nil)
```

## 按日期查询健康数据

```swift
let startTime = "2023-08-01"
let endTime = "2023-08-03"

CreekInterFace.instance.getActivityNewTimeData(startTime: startTime, endTime: endTime) { model in }
CreekInterFace.instance.getSleepNewTimeData(startTime: startTime, endTime: endTime) { model in }
CreekInterFace.instance.getHeartRateNewTimeData(startTime: startTime, endTime: endTime) { model in }
CreekInterFace.instance.getStressNewTimeData(startTime: startTime, endTime: endTime) { model in }
CreekInterFace.instance.getNoiseNewTimeData(startTime: startTime, endTime: endTime) { model in }
CreekInterFace.instance.getSpoNewTimeData(startTime: startTime, endTime: endTime) { model in }
CreekInterFace.instance.getSpoSecondNewTimeData(startTime: startTime, endTime: endTime) { model in }
CreekInterFace.instance.getHrvNewTimeData(startTime: startTime, endTime: endTime) { model in }
CreekInterFace.instance.getRespiratoryNewTimeData(startTime: startTime, endTime: endTime) { model in }
CreekInterFace.instance.getActivityLevelNewTimeData(startTime: startTime, endTime: endTime) { model in }
```

## 运动记录

```swift
// 获取全部运动记录
CreekInterFace.instance.getSportRecord(nil) { model in }

// 只获取跑步记录
CreekInterFace.instance.getSportRecord(.ORUN) { model in }

// 按日期查询运动记录
CreekInterFace.instance.getSportTimeData(
    startTime: "2023-08-01",
    endTime: "2023-08-03",
    nil
) { model in }

// 按记录 ID 删除
CreekInterFace.instance.delSportRecord(id: 1) { model in }

// 按设备地址和开始时间删除
CreekInterFace.instance.delSportRecordWithMac(
    mac: mac,
    startTime: startTime
) { model in }
```

## 自动识别运动

```swift
CreekInterFace.instance.getUnconfirmedAutoSport { model in
    // 展示尚未确认的自动识别运动
}

CreekInterFace.instance.editSport(sportModel: model) { model in
    // 保存用户确认或修改后的运动记录
}
```

## 查询未上传数据

每个方法返回对应类型中尚未标记为已上传的记录。

```swift
CreekInterFace.instance.getActivityUploadStatus { model in }
CreekInterFace.instance.getHeartRateUploadStatus { model in }
CreekInterFace.instance.getStressUploadStatus { model in }
CreekInterFace.instance.getSpoUploadStatus { model in }
CreekInterFace.instance.getSpoSecondUploadStatus { model in }
CreekInterFace.instance.getNoiseUploadStatus(model: { model in })
CreekInterFace.instance.getSportUploadStatus { model in }
CreekInterFace.instance.getHrvUploadStatus { model in }
CreekInterFace.instance.getSleepUploadDays { model in }
CreekInterFace.instance.getRespiratoryUploadStatus { model in }
CreekInterFace.instance.getActivityLevelUploadStatus { model in }
```

## 标记为已上传

确认业务服务器已经接收数据后，再更新本地上传状态。

```swift
CreekInterFace.instance.updateDBUploadStatus(.activity)
```
