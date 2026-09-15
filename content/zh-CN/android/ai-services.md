---
docId: android-ai-services
locale: zh-CN
title: Android 智能 AI
description: 接入语音助手、AI 课程与健康分析等智能能力。
platform: Android
slug: android/ai-services
order: 9
status: published
version: v2.0
---

# Android 智能 AI

接入语音助手、AI 课程与健康分析等智能能力。

## Ai语音助手

条件：支持AI语音功能的手表，手表必须连接应用

1、点击手表AI语音页面

2、进行语音输入

---

```kotlin
val keyId = "*********"
val publicKey = "***********"

   val speechKeyMap: Map<String, String> = mapOf(
    "eastasia" to
            "***************",
    "centralindia" to
            "***************",
    "westeurope" to
            "***************",
    "uaenorth" to
            "***************",
    "brazilsouth" to
            "***************",
    "southafricanorth" to
            "***************",
    "southeastasia" to
            "***************",
    "eastus" to
            "***************"
)

CreekManager.sInstance.aiVoiceConfig(keyId = keyId, publicKey = publicKey, speechKeyStringMap = speechKeyMap, defaultRegion = AzureRegionType.EASTUS)
CreekManager.sInstance.setAiVoiceCountry(countryCode = "US")
CreekManager.sInstance.setAiVoiceCity(cityName = "New York")
```

## Ai生成课程

```kotlin
CreekManager.sInstance.aiChat(content = "Help me create a 30-minute running session", userId = "1234567", replyMessage = {
    model: String ->
    println(model)
}, courseJson = {
    model: String ->
    println(model)
}, failure = {
    c,m ->
    println(m)
})
```

## AI睡眠分析

```kotlin
CreekManager.sInstance.aiAnalysisSleep(sleepModel = SleepModel(), langCode = "en", userId = "1234567", replyMessage = {
    model: String ->
      println(model)
}, failure = { c,m ->
    println(m)
})
```

## AI运动分析

```kotlin
CreekManager.sInstance.aiAnalysisSport(
    sportModel = SportModel(), langCode = "en", userId = "1234567", age = 28,
    gender = Enums.gender_type.GENDER_FEMALE, replyMessage = {
            model: String ->
        println(model)
    }, failure = {c,m ->
        println(m)
    })
```

## AI活动分析

```kotlin
CreekManager.sInstance.aiAnalysisActivity(
    activityModel = ActivityModel(), goalsModel = GoalsModel(), langCode = "en",
    userId = "1234567", height = 178, weight = 65.5, replyMessage = {
        model: String ->
    println(model)
}, failure = {c,m ->
    println(m)
})
```

## AI表盘（定制功能）

```kotlin
CreekManager.sInstance.aiDialConfig(
                voiceData = {
                    pcmData ->
                    ///pcm 音频数据（date）
                    ///转文本
                    ///文本转成功之后
                    CreekManager.sInstance.aiDialSendText("我想生成一个小狗", type = VoiceDialType.normal)
//                    ///识别错误
//                    CreekManager.sInstance.aiDialSendText("我想生成一个小狗", type = VoiceDialType.error)
//                    /// 网络错误
//                    CreekManager.sInstance.aiDialSendText("我想生成一个小狗", type = VoiceDialType.networkError)

                },
                confirmText = {
                    text ->
                    println(text)
                    //生成Ai图片
                    ///生成完成之后 下发图片数据
                    val bitmap = BitmapFactory.decodeResource(this.resources, R.drawable.fun061101_03)
                    val outputStream = ByteArrayOutputStream()
                    bitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream)
                    val imageData = outputStream.toByteArray()
                    val images: List<ByteArray> = listOf(imageData)
                   CreekManager.sInstance.aiDialSendImages(images = images, type = VoiceDialType.normal, dialName = "twoDial");

                }, success = {
                   println("dial success")

                }, failure = {
                    c,m ->
                  println("dial $m")
                }
            )
```
