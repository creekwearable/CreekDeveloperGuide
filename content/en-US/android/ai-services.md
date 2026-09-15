---
docId: android-ai-services
locale: en-US
title: Android AI Services
description: Integrate voice assistant, AI-generated courses, and AI health-analysis capabilities.
platform: Android
slug: android/ai-services
order: 9
status: published
version: v2.0
---

# Android AI Services

Integrate voice assistant, AI-generated courses, and AI health-analysis capabilities.

## AiVoice assistant

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

```kotlin
CreekManager.sInstance.aiAnalysisSleep(sleepModel = SleepModel(), langCode = "en", userId = "1234567", replyMessage = {
    model: String ->
      println(model)
}, failure = { c,m ->
    println(m)
})
```

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

```kotlin
CreekManager.sInstance.aiDialConfig(
                voiceData = {
                    pcmData ->

                    CreekManager.sInstance.aiDialSendText("I want to generate a puppy", type = VoiceDialType.normal)

                },
                confirmText = {
                    text ->
                    println(text)

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
