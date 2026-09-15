---
docId: ios-smart-ai
locale: en-US
title: iOS Smart AI
description: Integrate voice assistant, AI courses, sleep analysis, and workout analysis.
platform: iOS
slug: ios/smart-ai
order: 9
status: published
version: v2.0
---

# iOS Smart AI

## Overview

Integrate voice assistant, AI courses, sleep analysis, and workout analysis.

## Swift example

```swift
let keyId = "**********"
let publicKey = "**************"

// speechKeyMap creek get
 let speechKeyMap: [String: String] = [
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
   ]
 CreekInterFace.instance.aiVoiceConfig(keyId: keyId, publicKey: publicKey,speechKeyStringMap: speechKeyMap,defaultRegion: .eastus)

CreekInterFace.instance.setAiVoiceCountry(countryCode: "US")

 CreekInterFace.instance.setAiVoiceCity(cityName: "New York")
```

```swift
CreekInterFace.instance.aiChat(content: "Help me create a 30-minute running session.",userId: "1234567") { str in
            print(str)
         } courseJson: { str in
            print(str)
         } failure: { code, message in
            print(message)
         }
```

```swift
// langCode
CreekInterFace.instance.aiAnalysisSleep(sleepModel: SleepModel(),langCode: "en",userId: "1234567") { str in
            print(str)
         } failure: { code, message in
            print(message)
         }
```

```swift
// langCode
CreekInterFace.instance.aiAnalysisSport(sportModel: SportModel(), langCode: "en", userId: "1234567", age: 28, gender: .genderFemale) { str in
            print("aiAnalysisSport:\(str)")
         } failure: { code, message in
            print("aiAnalysisSport:\(message)")
}
```

```swift
// goalsModel set
CreekInterFace.instance.aiAnalysisActivity(activityModel: ActivityModel(), goalsModel: GoalsModel(), langCode: "en", userId: "123456", height: 178, weight: 65.5) { str in
            print("aiAnalysisActivity:\(str)")
         } failure: { code, message in
            print("aiAnalysisActivity:\(message)")
         }
```

```swift
CreekInterFace.instance.aiDialConfig { model in
            // pcm data date
            // succeeded
            // normal.normal
            CreekInterFace.instance.aiDialSendText(text: "Create a puppy watch face", type: .normal)
// CreekInterFace.instance.aiDialSendText(text: "", type: .error)
// CreekInterFace.instance.aiDialSendText(text: "", type: .networkError)
            
         } confirmText: { str in
            // watch
            print(str)
            
            // Ai
            // data
            if let image = UIImage(named: "Act06_1201_03") {
                if let data = image.pngData() {
                    CreekInterFace.instance.aiDialSendImages(images: [data], type: .normal,dialName: "oneDial")
                }
            }
         }success: {
            print("dial success")
         }failure: { code, message in
            print("dial:\(message)")
         }
```

## Capability-table fields

Check these fields after reading `protocol_function_table`:

```protobuf
message function_table {
    bool is_support = 1;// Whether the capability is supported.
    uint32 cmd_id = 2;// Capability command identifier.
}

message protocol_function_table {
    function_table voice_assistant = 10;// Voice-assistant capability.
}
```
