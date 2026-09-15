---
docId: ios-language
locale: zh-CN
title: iOS 语言
description: 读取设备支持的语言并切换当前语言。
platform: iOS
slug: ios/language
order: 104
status: published
version: v2.0
---

# iOS 语言

## 功能说明

读取设备支持的语言并切换当前语言。

## Swift 示例

```swift
CreekInterFace.instance.getLanguage { model in
                self.view.hideRemark()
                let json = try? model.jsonString()
                if let str = json{
                    dispatch_main_sync_safe {
                        self.textView.text = str
                    }
                }
            } failure: { code, message in
                self.view.hideRemark()
                self.textView.text = message
            }
            
  CreekInterFace.instance.setLanguage(type: .japanese) {
                self.view.hideRemark()
                self.textView.text = "success"
            } failure: { code, message in
                self.view.hideRemark()
                self.textView.text = message
            }
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;//查询
    SET = 2;//设置
}

enum language
{
    LANG_INVALID = 0;//无效
    CHINESE = 1;//中文
    ENGLISH = 2;//英语
    GERMAN = 3;//德语
    SPANISH = 4;//西班牙语
    ITALIAN = 5;//意大利语
    JAPANESE = 6;//日语
    RUSSIAN = 7;//俄罗斯语
    PORTUGUESE = 8;//葡萄牙语
    FRENCH = 9;//法语
    KOREAN = 10;//韩语
    POLISH = 11;//波兰语
    CZECH = 12;//捷克语
    SLOVAK = 13;//斯洛伐克语
    HUNGARIAN = 14;//匈牙利语
    GREEK = 15;//希腊语
    LITHUANIAN = 16;//立陶宛语
    LATVIAN = 17;//拉脱维亚语
    ESTONIAN = 18;//爱沙尼亚语
    BULGARIAN = 19;//保加利亚语
    MALAY = 20;//马来语
    INDONESIAN = 21;//印尼语
    THAILAND = 22;//泰国
    VIETNAMESE = 23;//越南语
    HEBREW = 24;//希伯来语
    DEVANAGARI = 25;//天城文
    TURKEY = 26;//土耳其语
    ROMANIAN = 27;//罗马尼亚语
    DUTCH = 28;//荷兰语
    UKRAINIAN = 29;//乌克兰语
    ARABIC = 30;//阿拉伯语
    FARSI = 31;//波斯语
    TRAD_CHINESE = 32;//中文繁体
    SWEDEN = 33;//瑞典
    BURMESE = 34;//缅甸语
    KHMER = 35;//高棉语
    BENGALI = 36;//孟加拉语
    SLOVENE = 37;//斯洛文尼亚
    HRVATSKI = 38;//克罗地亚
}

message protocol_language_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    language cur_language = 2;     //1bytes 设置语言，0x01中文 0x02英语...
}

message protocol_language_inquire_reply
{
    operate_type operate = 1; //1bytes操作类型 0：无效操作 1：查询 2：设置
    language cur_language = 2;
    bool chinese_support = 3;   //1bytes 中文
    bool english_support = 4;   //1bytes 英语
    bool german_support = 5;   //1bytes 德语
    bool spanish_support = 6;   //1bytes 西班牙语
    bool italian_support = 7;   //1bytes 意大利语
    bool janpanese_support = 8;   //1bytes 日语
    bool russian_support = 9;   //1bytes 俄罗斯语
    bool portuguese_support = 10;   //1bytes 葡萄牙语
    bool french_support = 11;   //1bytes 法语
    bool korean_support = 12;   //1bytes 韩语
    bool polish_support = 13;   //1bytes 波兰语
    bool czech_support = 14;   //1bytes 捷克语
    bool slovak_support = 15;   //1bytes 斯洛伐克语
    bool Hungarian_support = 16;   //1bytes 匈牙利语
    bool greek_support = 17;   //1bytes 希腊语
    bool lithuanian_support = 18;   //1bytes 立陶宛语
    bool latvian_support = 19;   //1bytes 拉脱维亚语
    bool estonian_support = 20;   //1bytes 爱沙尼亚语
    bool bulgarian_support = 21;   //1bytes 保加利亚语
    bool malay_support = 22;    //1bytes 马来语
    bool indonesian_support = 23;//1bytes 印尼语
    bool thai_support = 24;//1bytes 泰语
    bool vietnamese_support = 25;//1bytes 越南语
    bool hebrew_support = 26;//1bytes 希伯来语
    bool devanagari_support = 27;//1bytes 天城文
    bool turkey_support = 28;//1bytes 土耳其语
    bool romanian_support = 29;//1bytes 罗马尼亚语
    bool dutch_support = 30;//1bytes 荷兰语
    bool ukrainian_support = 31;//1bytes 乌克兰语
    bool arabic_support = 32;//1bytes 阿拉伯语
    bool farsi_support = 33;//1bytes 波斯语
    bool trad_chinese_support = 34;//1bytes 中文繁体
    bool sweden_support = 35;//1bytes 瑞典
    bool burmese_support = 36;//1bytes 缅甸
    bool khmer_support = 37;//1bytes高棉语
    bool bengali_support = 38;//1bytes孟加拉语
    bool slovene_support = 39;//1bytes斯洛文尼亚
    bool hrvatski_support = 40;//1bytes克罗地亚
}
```
