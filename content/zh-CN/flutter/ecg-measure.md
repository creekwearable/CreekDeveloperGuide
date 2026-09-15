---
docId: flutter-ecg-measure
locale: zh-CN
title: "Flutter ECG 测量"
description: "启动 ECG 测量并同步 ECG 记录。"
platform: Flutter
slug: flutter/ecg-measure
order: 18
status: published
version: v2.0
---

# Flutter ECG 测量

启动 ECG 测量并同步 ECG 记录。

## 接口示例

```dart
protocol_ecg_measure_operate? _lastOperate;
sdkManager.ecgMeasureStart(
  measureType: ecg_measure_type.ECG_MEASURE_PRE_START,
  onResult: (protocol_ecg_measure_operate reply) {
    _lastOperate = reply;
    state.value =
        'phase=${reply.record.phase} '
        '底电极=${reply.record.bottomElectrodeFit} '
        '侧电极=${reply.record.sideElectrodeFit} '
        '实时心率=${reply.record.realtimeHr} '
        '平均心率=${reply.record.avgHr} '
        '状态码=${ecgStatusDescription(reply.record.status)}';
  },
  success: () {
    state.value = "测量完成";
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

## Protobuf 数据模型

```protobuf
enum tran_direction_type {
    WATCH_TRAN = 0; // 操作由手表发起。
    APP_TRAN = 1; // 操作由应用发起。
}
```

```protobuf
// 测量阶段
enum ecg_phase {
  ECG_PHASE_WAITING      = 0;  // 测量等待（双电极识别，最长20秒钟）
  ECG_PHASE_MEASURING    = 1; // 正在测量，本阶段的第一条事件表示正式开始。
  ECG_PHASE_COMPLETE     = 2;  // 测满30秒，正常完成
  ECG_PHASE_INTERRUPTED  = 3;  // 测量中被终止。接收停止指令后结束测量，进入测量等待页面，并显示不同的终止原因
  ECG_PHASE_WAIT_TIMEOUT = 4;  // 等待满5分钟未正式开始，上报后退出功能
}

// App操作
enum ecg_measure_type {
  ECG_MEASURE_INVALID      = 0; // 无效
  ECG_MEASURE_PRE_START    = 1;  // 预开始
  ECG_MEASURE_END         = 2;  // 停止测量
  ECG_MEASURE_INQUIRE      = 3;  // 查询当前状态
}

// 心跳节律稳定度
enum ecg_rhythm_result {
  ECG_RHYTHM_NORMAL             = 0;  // 心跳节律正常
  ECG_RHYTHM_SUSPECTED_ABNORMAL = 1;  // 疑似心跳节律异常
  ECG_RHYTHM_UNDETERMINED       = 2;  // 无法确定心跳节律
}

// 状态码
enum ecg_status {
  ECG_STATUS_UNSPECIFIED       = 0;  // 未定义状态，默认值
  ECG_STATUS_SUCCESS           = 1;  // 测量成功
  ECG_STATUS_FINGER_LOST       = 2;  // 手指离开侧边电极
  ECG_STATUS_POOR_SIGNAL       = 3;  // 信号差
  ECG_STATUS_MOTION_ARTIFACT   = 4;  // 设备异动
  ECG_STATUS_DEVICE_EXCEPTION  = 5;  // 设备异常
  ECG_STATUS_WAIT_TIMEOUT      = 6;  // 等待超时
  ECG_STATUS_LOW_BATTERY       = 7;  // 电量不足
  ECG_STATUS_APP_STOP          = 8;  // 主动停止
  ECG_STATUS_NOT_WORN          = 9;  // 未佩戴
  ECG_STATUS_PROGRESS          = 10; // 测量进行中
  ECG_STATUS_FAIL              = 11; // 测量失败
}

// 设备本地时间戳
message ecg_measure_time {
  uint32 year  = 1; // 年份。
  uint32 month = 2; // 月份。
  uint32 day   = 3; // 日期。
  uint32 hour   = 4; // 小时。
  uint32 minute = 5; // 分钟。
  uint32 second = 6; // 秒。
}

// 单次测量数据
message ecg_measure_record {
  ecg_measure_time time = 1;  // 开始时间
  ecg_phase phase = 2; // 当前阶段
  bool bottom_electrode_fit = 3;  // 底电极是否贴腕
  bool side_electrode_fit   = 4;  // 侧边电极是否有手指接触
  uint32 realtime_hr = 5;        // 实时心率；有效约40–210；约第5秒起每秒更新
  uint32 avg_hr = 6;                    // 本次平均心率 bpm
  ecg_rhythm_result rhythm_result = 7; // 稳定度
  ecg_status status = 8;      // 状态
}

message protocol_ecg_measure_operate {
  tran_direction_type tran_type = 1; // 本次操作的发起方。
  ecg_measure_type measure_type = 2; // 操作类型
  ecg_measure_record record = 3;       // 当前测量
}
```

### 字段说明

#### `ecg_measure_time`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `year` | `uint32` | 年份。 |
| `month` | `uint32` | 月份。 |
| `day` | `uint32` | 日期。 |
| `hour` | `uint32` | 小时。 |
| `minute` | `uint32` | 分钟。 |
| `second` | `uint32` | 秒。 |

#### `ecg_measure_record`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `time` | `ecg_measure_time` | 开始时间 |
| `phase` | `ecg_phase` | 当前阶段 |
| `bottom_electrode_fit` | `bool` | 底电极是否贴腕 |
| `side_electrode_fit` | `bool` | 侧边电极是否有手指接触 |
| `realtime_hr` | `uint32` | 实时心率；有效约40–210；约第5秒起每秒更新 |
| `avg_hr` | `uint32` | 本次平均心率 bpm |
| `rhythm_result` | `ecg_rhythm_result` | 稳定度 |
| `status` | `ecg_status` | 状态 |

#### `protocol_ecg_measure_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `tran_type` | `tran_direction_type` | 本次操作的发起方。 |
| `measure_type` | `ecg_measure_type` | 操作类型 |
| `record` | `ecg_measure_record` | 当前测量 |

### 枚举值

#### `tran_direction_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `WATCH_TRAN` | `0` | 操作由手表发起。 |
| `APP_TRAN` | `1` | 操作由应用发起。 |

#### `ecg_phase`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `ECG_PHASE_WAITING` | `0` | 测量等待（双电极识别，最长20秒钟） |
| `ECG_PHASE_MEASURING` | `1` | 正在测量，本阶段的第一条事件表示正式开始。 |
| `ECG_PHASE_COMPLETE` | `2` | 测满30秒，正常完成 |
| `ECG_PHASE_INTERRUPTED` | `3` | 测量中被终止。接收停止指令后结束测量，进入测量等待页面，并显示不同的终止原因 |
| `ECG_PHASE_WAIT_TIMEOUT` | `4` | 等待满5分钟未正式开始，上报后退出功能 |

#### `ecg_measure_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `ECG_MEASURE_INVALID` | `0` | 无效 |
| `ECG_MEASURE_PRE_START` | `1` | 预开始 |
| `ECG_MEASURE_END` | `2` | 停止测量 |
| `ECG_MEASURE_INQUIRE` | `3` | 查询当前状态 |

#### `ecg_rhythm_result`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `ECG_RHYTHM_NORMAL` | `0` | 心跳节律正常 |
| `ECG_RHYTHM_SUSPECTED_ABNORMAL` | `1` | 疑似心跳节律异常 |
| `ECG_RHYTHM_UNDETERMINED` | `2` | 无法确定心跳节律 |

#### `ecg_status`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `ECG_STATUS_UNSPECIFIED` | `0` | 未定义状态，默认值 |
| `ECG_STATUS_SUCCESS` | `1` | 测量成功 |
| `ECG_STATUS_FINGER_LOST` | `2` | 手指离开侧边电极 |
| `ECG_STATUS_POOR_SIGNAL` | `3` | 信号差 |
| `ECG_STATUS_MOTION_ARTIFACT` | `4` | 设备异动 |
| `ECG_STATUS_DEVICE_EXCEPTION` | `5` | 设备异常 |
| `ECG_STATUS_WAIT_TIMEOUT` | `6` | 等待超时 |
| `ECG_STATUS_LOW_BATTERY` | `7` | 电量不足 |
| `ECG_STATUS_APP_STOP` | `8` | 主动停止 |
| `ECG_STATUS_NOT_WORN` | `9` | 未佩戴 |
| `ECG_STATUS_PROGRESS` | `10` | 测量进行中 |
| `ECG_STATUS_FAIL` | `11` | 测量失败 |
