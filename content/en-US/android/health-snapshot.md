---
docId: android-health-snapshot
locale: en-US
title: Android Health Snapshot
description: Read and configure health-snapshot measurements.
platform: Android
slug: android/health-snapshot
order: 131
status: published
version: v2.0
---

# Android Health Snapshot

Read and configure health-snapshot measurements.

```kotlin
CreekManager.sInstance.getHealthSnapshotList(page = 1, size = 20, model = {
    
}, failure = {
    code, message ->  
})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";
 
enum operate_health_snap_type
{
    INVALID = 0;
    INQUIRE = 1; // Query
}
 
message protocol_health_snap_item
{
    uint32 year = 1;
    uint32 month = 2;
    uint32 day = 3;
    uint32 hour = 4;
    uint32 minute = 5;
    uint32 second = 6;
    uint32 hr_value = 7;
    uint32 spo2_value = 8;
    uint32 hrv_value = 9;
    uint32 rr_value = 10; // respiratory rate
    uint32 stress_value = 11;
};
 
message protocol_health_snap_operate
{
    operate_health_snap_type operate = 1; // 1bytes Operation type
    uint32 page_index = 2;// Current page index for paged transfer.
    uint32 page_num = 3;// Number of records in the current transfer page.
}
 
message protocol_health_snap_inquire_reply
{
    operate_health_snap_type operate = 1;     // 1bytesOperation type
    uint32 func_table = 2;        // 1bytes Function table
    uint32 snap_record_support_max = 3; // Number of snap record support max. 1bytes.
    uint32 page_index = 4;// Current page index for paged transfer.
    uint32 page_num = 5;// Number of records in the current transfer page.
    repeated protocol_health_snap_item snap_items = 6;
}
```

### `func_table` Bit Definitions

| Bit | Description |
| - | - |
| 0 | Whether all-day schedule repeat settings are supported all_day_type |
| 1 | Whether custom schedule repeat types are supported repeat_custom & custom_type |

| Bit | Description |
| - | - |
| 1 | Whether supportedOffAlarm |
| 3 | Whether supportedTake a photo |
