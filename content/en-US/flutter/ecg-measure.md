---
docId: flutter-ecg-measure
locale: en-US
title: "Flutter ECG Measurement"
description: "Start ECG measurement and synchronize ECG records."
platform: Flutter
slug: flutter/ecg-measure
order: 18
status: published
version: v2.0
---

# Flutter ECG Measurement

Start ECG measurement and synchronize ECG records.

## SDK Usage

```dart
protocol_ecg_measure_operate? _lastOperate;
sdkManager.ecgMeasureStart(
  measureType: ecg_measure_type.ECG_MEASURE_PRE_START,
  onResult: (protocol_ecg_measure_operate reply) {
    _lastOperate = reply;
    state.value =
        'phase=${reply.record.phase} '
        'Bottom electrode=${reply.record.bottomElectrodeFit} '
        'Side electrode=${reply.record.sideElectrodeFit} '
        'Real-time heart rate=${reply.record.realtimeHr} '
        'Average heart rate=${reply.record.avgHr} '
        'Status code=${ecgStatusDescription(reply.record.status)}';
  },
  success: () {
    state.value = "Measurement complete";
    final reply = _lastOperate ?? protocol_ecg_measure_operate();
    update();
  },
  failure: (error) {

  },
);

sdkManager.ecgMeasureEnd();

sdkManager.ecgMeasureInquire(successResult: (protocol_ecg_measure_operate reply) {
  _lastOperate = reply;
}, errCallBack: (error) {
});
```

## Protobuf Data Model

```protobuf
enum tran_direction_type {
    WATCH_TRAN = 0; // Operation originated from the watch.
    APP_TRAN = 1; // Operation originated from the application.
}
```

```protobuf
// measurement phase
enum ecg_phase {
  ECG_PHASE_WAITING      = 0;  // waiting for measurement (dual-electrode detection; maximum 20 seconds)
  ECG_PHASE_MEASURING    = 1; // Measurement in progress; the first event marks the official start.
  ECG_PHASE_COMPLETE     = 2;  // measurement completed normally after 30 seconds.
  ECG_PHASE_INTERRUPTED  = 3;  // measurement interrupted; measurement ends and returns to the waiting screen with the applicable termination reason.
  ECG_PHASE_WAIT_TIMEOUT = 4;  // measurement did not start within 5 minutes; exit the feature after the timeout.
}

// App
enum ecg_measure_type {
  ECG_MEASURE_INVALID      = 0; // invalid.
  ECG_MEASURE_PRE_START    = 1;  // pre-start.
  ECG_MEASURE_END         = 2;  // stop measurement.
  ECG_MEASURE_INQUIRE      = 3;  // query current state.
}

// heart-rhythm stability
enum ecg_rhythm_result {
  ECG_RHYTHM_NORMAL             = 0;  // normal heart rhythm.
  ECG_RHYTHM_SUSPECTED_ABNORMAL = 1;  // suspected abnormal heart rhythm.
  ECG_RHYTHM_UNDETERMINED       = 2;  // undetermined heart rhythm.
}

// status code
enum ecg_status {
  ECG_STATUS_UNSPECIFIED       = 0;  // unspecified state, default value.
  ECG_STATUS_SUCCESS           = 1;  // measurement successful.
  ECG_STATUS_FINGER_LOST       = 2;  // finger left the side electrode.
  ECG_STATUS_POOR_SIGNAL       = 3;  // poor signal.
  ECG_STATUS_MOTION_ARTIFACT   = 4;  // motion artifact.
  ECG_STATUS_DEVICE_EXCEPTION  = 5;  // device exception.
  ECG_STATUS_WAIT_TIMEOUT      = 6;  // wait timeout.
  ECG_STATUS_LOW_BATTERY       = 7;  // low battery.
  ECG_STATUS_APP_STOP          = 8;  // stopped by the application.
  ECG_STATUS_NOT_WORN          = 9;  // not worn.
  ECG_STATUS_PROGRESS          = 10; // measurement in progress.
  ECG_STATUS_FAIL              = 11; // measurement failed.
}

// time
message ecg_measure_time {
  uint32 year  = 1; // Year.
  uint32 month = 2; // Month.
  uint32 day   = 3; // Day.
  uint32 hour   = 4; // Hour.
  uint32 minute = 5; // Minute.
  uint32 second = 6; // Second.
}

// single measurement data
message ecg_measure_record {
  ecg_measure_time time = 1;  // Time.
  ecg_phase phase = 2; // current phase.
  bool bottom_electrode_fit = 3;  // whether the bottom electrode touches the wrist.
  bool side_electrode_fit   = 4;  // whether a finger touches the side electrode.
  uint32 realtime_hr = 5;        // real-time heart rate; valid range: approximately 40–210 bpm; updates every second starting at about the fifth second.
  uint32 avg_hr = 6;                    // average heart rate for this measurement, in bpm.
  ecg_rhythm_result rhythm_result = 7; // stability.
  ecg_status status = 8;      // status.
}

message protocol_ecg_measure_operate {
  tran_direction_type tran_type = 1; // Origin of this operation.
  ecg_measure_type measure_type = 2; // operation type.
  ecg_measure_record record = 3;       // current measurement.
}
```

### Field Reference

#### `ecg_measure_time`

| Field | Type | Description |
| --- | --- | --- |
| `year` | `uint32` | Year. |
| `month` | `uint32` | Month. |
| `day` | `uint32` | Day. |
| `hour` | `uint32` | Hour. |
| `minute` | `uint32` | Minute. |
| `second` | `uint32` | Second. |

#### `ecg_measure_record`

| Field | Type | Description |
| --- | --- | --- |
| `time` | `ecg_measure_time` | Time. |
| `phase` | `ecg_phase` | current phase. |
| `bottom_electrode_fit` | `bool` | whether the bottom electrode touches the wrist. |
| `side_electrode_fit` | `bool` | whether a finger touches the side electrode. |
| `realtime_hr` | `uint32` | real-time heart rate; valid range: approximately 40–210 bpm; updates every second starting at about the fifth second. |
| `avg_hr` | `uint32` | average heart rate for this measurement, in bpm. |
| `rhythm_result` | `ecg_rhythm_result` | stability. |
| `status` | `ecg_status` | status. |

#### `protocol_ecg_measure_operate`

| Field | Type | Description |
| --- | --- | --- |
| `tran_type` | `tran_direction_type` | Origin of this operation. |
| `measure_type` | `ecg_measure_type` | operation type. |
| `record` | `ecg_measure_record` | current measurement. |

### Enum Values

#### `tran_direction_type`

| Value | Number | Description |
| --- | --- | --- |
| `WATCH_TRAN` | `0` | Operation originated from the watch. |
| `APP_TRAN` | `1` | Operation originated from the application. |

#### `ecg_phase`

| Value | Number | Description |
| --- | --- | --- |
| `ECG_PHASE_WAITING` | `0` | waiting for measurement (dual-electrode detection; maximum 20 seconds) |
| `ECG_PHASE_MEASURING` | `1` | Measurement in progress; the first event marks the official start. |
| `ECG_PHASE_COMPLETE` | `2` | measurement completed normally after 30 seconds. |
| `ECG_PHASE_INTERRUPTED` | `3` | measurement interrupted; measurement ends and returns to the waiting screen with the applicable termination reason. |
| `ECG_PHASE_WAIT_TIMEOUT` | `4` | measurement did not start within 5 minutes; exit the feature after the timeout. |

#### `ecg_measure_type`

| Value | Number | Description |
| --- | --- | --- |
| `ECG_MEASURE_INVALID` | `0` | invalid. |
| `ECG_MEASURE_PRE_START` | `1` | pre-start. |
| `ECG_MEASURE_END` | `2` | stop measurement. |
| `ECG_MEASURE_INQUIRE` | `3` | query current state. |

#### `ecg_rhythm_result`

| Value | Number | Description |
| --- | --- | --- |
| `ECG_RHYTHM_NORMAL` | `0` | normal heart rhythm. |
| `ECG_RHYTHM_SUSPECTED_ABNORMAL` | `1` | suspected abnormal heart rhythm. |
| `ECG_RHYTHM_UNDETERMINED` | `2` | undetermined heart rhythm. |

#### `ecg_status`

| Value | Number | Description |
| --- | --- | --- |
| `ECG_STATUS_UNSPECIFIED` | `0` | unspecified state, default value. |
| `ECG_STATUS_SUCCESS` | `1` | measurement successful. |
| `ECG_STATUS_FINGER_LOST` | `2` | finger left the side electrode. |
| `ECG_STATUS_POOR_SIGNAL` | `3` | poor signal. |
| `ECG_STATUS_MOTION_ARTIFACT` | `4` | motion artifact. |
| `ECG_STATUS_DEVICE_EXCEPTION` | `5` | device exception. |
| `ECG_STATUS_WAIT_TIMEOUT` | `6` | wait timeout. |
| `ECG_STATUS_LOW_BATTERY` | `7` | low battery. |
| `ECG_STATUS_APP_STOP` | `8` | stopped by the application. |
| `ECG_STATUS_NOT_WORN` | `9` | not worn. |
| `ECG_STATUS_PROGRESS` | `10` | measurement in progress. |
| `ECG_STATUS_FAIL` | `11` | measurement failed. |
