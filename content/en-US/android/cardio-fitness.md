---
docId: android-cardio-fitness
locale: en-US
title: Android Cardio Fitness
description: Read and configure cardio-fitness data such as VO2 max.
platform: Android
slug: android/cardio-fitness
order: 147
status: published
version: v2.0
---

# Android Cardio Fitness

Read and configure cardio-fitness data such as VO2 max.

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

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

enum cardio_fitness_level
{
    CF_LEVEL_NULL = 0;// CF LEVEL NULL.
    CF_LEVEL_LOW = 1; // CF LEVEL LOW.
    CF_LEVEL_LOW_MID = 2;   // CF LEVEL LOW MID.
    CF_LEVEL_MEDUIM = 3;    // CF LEVEL MEDUIM.
    CF_LEVEL_GOOD = 4;      // CF LEVEL GOOD.
    CF_LEVEL_EXCELLENT = 5; // CF LEVEL EXCELLENT.
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
    uint32 vo2max_value = 1; // Vo2max Value.
    uint32 unix_time = 2;
    cardio_fitness_level level = 3;
}

message protocol_cardio_fitness_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    cardio_fitness_vo2max_data vo2max_best = 2;// Best VO2 max record.
    repeated cardio_fitness_vo2max_data vo2max_history = 3;// Historical VO2 max measurements with timestamps.
    cardio_fitness_score score_best = 4;// Predicted race times.
}

message protocol_cardio_fitness_inquire_reply
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    uint32 func_table = 2;// 1bytes Function table
    cardio_fitness_vo2max_data vo2max_best = 3;// Best VO2 max record.
    repeated cardio_fitness_vo2max_data vo2max_history = 4;// Historical VO2 max measurements with timestamps.
    cardio_fitness_score score_predict = 5;// Predicted race times.
}
```
