---
docId: flutter-file-upload-errors
locale: en-US
title: "Flutter File Upload Error Codes"
description: "Interpret errors returned during file transfer."
platform: Flutter
slug: flutter/file-upload-errors
order: 12
status: published
version: v2.0
---

# Flutter File Upload Error Codes

Interpret errors returned during file transfer.

## SDK Usage

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

## Protobuf Data Model

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
  CommonErrorCode code = 1; // Error code.
  string message = 2; // Human-readable error message.
}
```

### Field Reference

#### `CommonError`

| Field | Type | Description |
| --- | --- | --- |
| `code` | `CommonErrorCode` | Error code. |
| `message` | `string` | Human-readable error message. |

### Enum Values

#### `CommonErrorCode`

| Value | Number | Description |
| --- | --- | --- |
| `COMMON_UNKNOWN` | `0` | Unknown error |
| `COMMON_IN_PROGRESS` | `1` | Operation in progress |
| `COMMON_CANCELED` | `2` | Operation canceled |
| `COMMON_TIMEOUT` | `3` | Timeout |
| `COMMON_NOT_WORN` | `4` | Not worn |
| `COMMON_FAILED` | `5` | Operation failed |
| `COMMON_INTERNAL_ERROR` | `6` | Internal error |
