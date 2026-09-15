---
docId: flutter-file-upload-errors
locale: zh-CN
title: "Flutter 文件上传错误码"
description: "识别文件传输过程中返回的错误。"
platform: Flutter
slug: flutter/file-upload-errors
order: 12
status: published
version: v2.0
---

# Flutter 文件上传错误码

识别文件传输过程中返回的错误。

## 接口示例

| code | Explanation |
|-|-|
| 0 | Success |
| 1 | SVC handler is missing |
| 2 | SoftDevice has not been enabled |
| 3 | Internal Error |
| 4 | No Memory for operation |
| 5 | Not found |
| 6 | Not supported |
| 7 | Invalid Parameter |
| 8 | Invalid state |
| 9 | Invalid Length |
| 10 | Invalid Flags |
| 11 | Invalid Data |
| 12 | Invalid Data size |
| 13 | Operation timed out |
| 14 | Null Pointer |
| 15 | Forbidden Operation |

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum CommonErrorCode {
  COMMON_UNKNOWN = 0;             // Unknown error
  COMMON_IN_PROGRESS = 1;         // Operation in progress
  COMMON_CANCELED = 2;            // Operation canceled
  COMMON_TIMEOUT = 3;             // Timeout
  COMMON_NOT_WORN = 4;            // Not worn
  COMMON_FAILED = 5;              // Operation failed
  COMMON_INTERNAL_ERROR = 6;      // Internal error
}

message CommonError {
  CommonErrorCode code = 1; // 错误码。
  string message = 2; // 便于阅读的错误信息。
}
```

### 字段说明

#### `CommonError`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `code` | `CommonErrorCode` | 错误码。 |
| `message` | `string` | 便于阅读的错误信息。 |

### 枚举值

#### `CommonErrorCode`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `COMMON_UNKNOWN` | `0` | Unknown error |
| `COMMON_IN_PROGRESS` | `1` | Operation in progress |
| `COMMON_CANCELED` | `2` | Operation canceled |
| `COMMON_TIMEOUT` | `3` | Timeout |
| `COMMON_NOT_WORN` | `4` | Not worn |
| `COMMON_FAILED` | `5` | Operation failed |
| `COMMON_INTERNAL_ERROR` | `6` | Internal error |
