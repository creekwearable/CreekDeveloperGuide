---
docId: flutter-intelligent-ai
locale: zh-CN
title: "Flutter 智能 AI"
description: "接入 AI 语音交互与 AI 生成运动课程。"
platform: Flutter
slug: flutter/intelligent-ai
order: 9
status: published
version: v2.0
---

# Flutter 智能 AI

接入 AI 语音交互与 AI 生成运动课程。

设备需要支持 AI 语音能力并保持连接。应用负责接收语音结果，并根据业务返回普通回答或功能指令。

## AI 语音助手
条件：手表支持 AI 语音功能，且已与应用连接。

1. 在手表上进入 AI 语音页面。

2. 进行语音输入。

| 交互类型 | 示例 | 功能指令 | 响应类型 |
| --- | --- | --- | --- |
| 普通对话 | 非功能类语音对话 | — | `normal` |
| 功能对话 | 深圳今天天气怎么样？ | 天气指令 | `normal` |
| 功能对话 | 帮我设置早上 8 点的起床闹钟 | 闹钟指令 | `normal` |
| 功能对话 | 帮我创建明天 9 点的会议日程 | 日程指令 | `normal` |
| 功能对话 | 开始跑步 | 运动指令 | `normal` |

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

## AI 生成课程
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
