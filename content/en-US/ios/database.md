---
docId: ios-database
locale: en-US
title: iOS Database Queries and Operations
description: Set the database user and query health records stored by the SDK.
platform: iOS
slug: ios/database
order: 14
status: published
version: v2.0
---

# iOS Database Queries and Operations

## Overview

The SDK stores synchronized health data in a local database. Set the current business user ID before querying to keep records from different accounts separate. Date parameters use the `YYYY-MM-DD` format.

## Set the database user

```swift
// Set the current user.
CreekInterFace.instance.setDBUser(12345663)

// Clear the current user.
CreekInterFace.instance.setDBUser(nil)
```

## Query health data by date

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

## Workout records

```swift
// Retrieve all workout records.
CreekInterFace.instance.getSportRecord(nil) { model in }

// Retrieve running records only.
CreekInterFace.instance.getSportRecord(.ORUN) { model in }

// Query workout records by date.
CreekInterFace.instance.getSportTimeData(
    startTime: "2023-08-01",
    endTime: "2023-08-03",
    nil
) { model in }

// Delete a record by its ID.
CreekInterFace.instance.delSportRecord(id: 1) { model in }

// Delete a record by device address and start time.
CreekInterFace.instance.delSportRecordWithMac(
    mac: mac,
    startTime: startTime
) { model in }
```

## Automatically recognized workouts

```swift
CreekInterFace.instance.getUnconfirmedAutoSport { model in
    // Present workouts that still need user confirmation.
}

CreekInterFace.instance.editSport(sportModel: model) { model in
    // Save the workout after the user confirms or edits it.
}
```

## Query records that have not been uploaded

Each method returns records of the corresponding type that have not yet been marked as uploaded.

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

## Mark records as uploaded

Update the local upload status only after the business server has accepted the records.

```swift
CreekInterFace.instance.updateDBUploadStatus(.activity)
```
