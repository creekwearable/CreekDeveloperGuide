---
docId: ios-smart-ai
locale: zh-CN
title: iOS 智能 AI
description: 接入语音助手、AI 课程、睡眠与运动分析等能力。
platform: iOS
slug: ios/smart-ai
order: 9
status: published
version: v2.0
---

# iOS 智能 AI

## 功能说明

接入语音助手、AI 课程、睡眠与运动分析等能力。

### 使用要点

条件：支持AI语音功能的手表，手表必须连接应用

1、点击手表AI语音页面

2、进行语音输入

---

## Swift 示例

```swift
let keyId = "**********"
let publicKey = "**************"

// speechKeyMap：语音识别系统使用微软；需要从 creek 获取密钥。
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

///配置国家，
CreekInterFace.instance.setAiVoiceCountry(countryCode: "US")

///配置城市
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
// langCode：代表模型要回复的语言
///睡眠分析
CreekInterFace.instance.aiAnalysisSleep(sleepModel: SleepModel(),langCode: "en",userId: "1234567") { str in
            print(str)
         } failure: { code, message in
            print(message)
         }
```

```swift
// langCode：代表模型要回复的语言
CreekInterFace.instance.aiAnalysisSport(sportModel: SportModel(), langCode: "en", userId: "1234567", age: 28, gender: .genderFemale) { str in
            print("aiAnalysisSport:\(str)")
         } failure: { code, message in
            print("aiAnalysisSport:\(message)")
}
```

```swift
// goalsModel：这个是用户设置的目标。
CreekInterFace.instance.aiAnalysisActivity(activityModel: ActivityModel(), goalsModel: GoalsModel(), langCode: "en", userId: "123456", height: 178, weight: 65.5) { str in
            print("aiAnalysisActivity:\(str)")
         } failure: { code, message in
            print("aiAnalysisActivity:\(message)")
         }
```

```swift
CreekInterFace.instance.aiDialConfig { model in
            ///pcm 音频数据（date）
            ///转文本
            ///文本转成功之后
            ///
            ////正常.normal
            CreekInterFace.instance.aiDialSendText(text: "我想生成一个小狗", type: .normal)
/////识别错误
//CreekInterFace.instance.aiDialSendText(text: "", type: .error)
///// 网络错误
//CreekInterFace.instance.aiDialSendText(text: "", type: .networkError)
            
         } confirmText: { str in
            ///手表确认文本
            print(str)
            
            ///生成Ai图片
            ///生成完成之后 下发图片数据
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

## 功能表字段

读取 `protocol_function_table` 后检查以下字段：

```protobuf
message function_table {
    bool is_support = 1;//是否支持该能力。
    uint32 cmd_id = 2;//能力对应的指令标识。
}

message protocol_function_table {
    function_table voice_assistant = 10;//语音助手能力。
}
```
