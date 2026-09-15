---
docId: android-cardio-fitness
locale: zh-CN
title: Android 有氧适能
description: 读取并设置最大摄氧量等有氧适能数据。
platform: Android
slug: android/cardio-fitness
order: 147
status: published
version: v2.0
---

# Android 有氧适能

读取并设置最大摄氧量等有氧适能数据。

```kotlin
CreekManager.sInstance.getCardioFitness({ model ->
    responseText.value = model.toString()
}, failure = { _, m ->
    responseText.value = m
})

var  operate =  CardioFitness.protocol_cardio_fitness_operate()
var vo2max =  CardioFitness.cardio_fitness_vo2max_data()
vo2max.vo2MaxValue = 40
vo2max.unixTime = Instant.now().epochSecond.toInt()
operate.vo2MaxBest = vo2max
CreekManager.sInstance.setCardioFitness(model = operate, success = {
    responseText.value = "success"
}, failure = {_, m ->
    responseText.value = m
})
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";

enum cardio_fitness_level
{
    CF_LEVEL_NULL = 0;//空
    CF_LEVEL_LOW = 1; // 低
    CF_LEVEL_LOW_MID = 2;   // 偏低
    CF_LEVEL_MEDUIM = 3;    // 中等
    CF_LEVEL_GOOD = 4;      // 良好
    CF_LEVEL_EXCELLENT = 5; // 优秀
}

message cardio_fitness_score
{
    uint32 five_km = 1;
    uint32 ten_km = 2;
    uint32 half_marathon = 3;
    uint32 marathon = 4;
}

message cardio_fitness_vo2max_data
{
    uint32 vo2max_value = 1; //实际值乘以10，10倍
    uint32 unix_time = 2;
    cardio_fitness_level level = 3;
}

message protocol_cardio_fitness_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    cardio_fitness_vo2max_data vo2max_best = 2;//最佳 VO2 max 记录
    repeated cardio_fitness_vo2max_data vo2max_history = 3;//历次 VO2 max 测量记录，包含时间戳
    cardio_fitness_score score_best = 4;//马拉松预测成绩
}

message protocol_cardio_fitness_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 func_table = 2;//1bytes 功能表
    cardio_fitness_vo2max_data vo2max_best = 3;//最佳 VO2 max 记录
    repeated cardio_fitness_vo2max_data vo2max_history = 4;//历次 VO2 max 测量记录，包含时间戳
    cardio_fitness_score score_predict = 5;//马拉松预测成绩
}
```
