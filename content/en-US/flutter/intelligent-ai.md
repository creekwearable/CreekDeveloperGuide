---
docId: flutter-intelligent-ai
locale: en-US
title: "Flutter Intelligent AI"
description: "Integrate AI voice interaction and AI-generated workout courses."
platform: Flutter
slug: flutter/intelligent-ai
order: 9
status: published
version: v2.0
---

# Flutter Intelligent AI

Integrate AI voice interaction and AI-generated workout courses.

## AI Voice Assistant
Conditions: A watch that supports AI voice function, and the watch must be connected to the app

1. Click the watch AI voice page

2. Perform voice input

| Interaction | Example | Function command | Response type |
| --- | --- | --- | --- |
| General conversation | A non-functional voice conversation | — | `normal` |
| Functional request | How is the weather in Shenzhen today? | Weather | `normal` |
| Functional request | Set an alarm for 8:00 AM | Alarm | `normal` |
| Functional request | Create a meeting tomorrow at 9:00 AM | Schedule | `normal` |
| Functional request | Start running | Workout | `normal` |

```dart
String keyId = "**********"
String publicKey = "**************"
AzureRegionType defaultRegion = AzureRegionType.eastasia;

// speechKeyMap:The speech recognition system uses Microsoft; the key needs to be obtained from creek.
 Map<String, String> speechKeyMap = {
             "eastasia":
                 "********************",
             "centralindia":
                 "********************",
             "westeurope":
                 "********************",
             "uaenorth":
                 "********************",
             "brazilsouth":
                 "********************",
             "southafricanorth":
                 "********************",
             "southeastasia":
                 "********************",
             "eastus":
                 "********************"
  }
sdkManager.aiVoiceConfig(keyId: keyId, publicKey: publicKey, speechKeyMap: speechKeyMap, defaultRegion: defaultRegion);

/// Configure city:
/// Set the city for AI voice service.
sdkManager.setAiVoiceCity(cityName: "Shanghai");
```

## Ai-generated courses
```dart
sdkManager.aiChat(content: "Ayúdame a crear una sesión de carrera de 30 minutos.",threadId: "",userId: "12345", onMessageDone: (e){
   print("❤️❤️reply:${e}");
 },onCourse: (e){
   print("😑😑onCourse:${e}");
 },onFailure: (e){
   print("❌❌onFailure:${e}");
 });
}
```
