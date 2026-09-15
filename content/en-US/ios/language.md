---
docId: ios-language
locale: en-US
title: iOS Language
description: Read supported device languages and change the active language.
platform: iOS
slug: ios/language
order: 104
status: published
version: v2.0
---

# iOS Language

## Overview

Read supported device languages and change the active language.

## Swift example

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

## Protobuf data model

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;// query
    SET = 2;// set
}

enum language
{
    LANG_INVALID = 0;// invalid
    CHINESE = 1;// CHINESE
    ENGLISH = 2;// ENGLISH
    GERMAN = 3;// GERMAN
    SPANISH = 4;// SPANISH
    ITALIAN = 5;// ITALIAN
    JAPANESE = 6;// day
    RUSSIAN = 7;// RUSSIAN
    PORTUGUESE = 8;// PORTUGUESE
    FRENCH = 9;// FRENCH
    KOREAN = 10;// KOREAN
    POLISH = 11;// POLISH
    CZECH = 12;// CZECH
    SLOVAK = 13;// SLOVAK
    HUNGARIAN = 14;// HUNGARIAN
    GREEK = 15;// GREEK
    LITHUANIAN = 16;// LITHUANIAN
    LATVIAN = 17;// LATVIAN
    ESTONIAN = 18;// ESTONIAN
    BULGARIAN = 19;// BULGARIAN
    MALAY = 20;// MALAY
    INDONESIAN = 21;// INDONESIAN
    THAILAND = 22;// THAILAND
    VIETNAMESE = 23;// VIETNAMESE
    HEBREW = 24;// HEBREW
    DEVANAGARI = 25;// DEVANAGARI
    TURKEY = 26;// TURKEY
    ROMANIAN = 27;// ROMANIAN
    DUTCH = 28;// DUTCH
    UKRAINIAN = 29;// UKRAINIAN
    ARABIC = 30;// ARABIC
    FARSI = 31;// FARSI
    TRAD_CHINESE = 32;// TRAD CHINESE
    SWEDEN = 33;// SWEDEN
    BURMESE = 34;// BURMESE
    KHMER = 35;// height
    BENGALI = 36;// BENGALI
    SLOVENE = 37;// SLOVENE
    HRVATSKI = 38;// HRVATSKI
}

message protocol_language_operate
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    language cur_language = 2;     // cur language; 1bytes set 0x01 0x02 ...
}

message protocol_language_inquire_reply
{
    operate_type operate = 1; // operate; 1bytesoperation type 0 invalid 1 query 2 set
    language cur_language = 2;
    bool chinese_support = 3;   // chinese support; 1bytes
    bool english_support = 4;   // english support; 1bytes
    bool german_support = 5;   // german support; 1bytes
    bool spanish_support = 6;   // spanish support; 1bytes
    bool italian_support = 7;   // italian support; 1bytes
    bool janpanese_support = 8;   // janpanese support; 1bytes day
    bool russian_support = 9;   // russian support; 1bytes
    bool portuguese_support = 10;   // portuguese support; 1bytes
    bool french_support = 11;   // french support; 1bytes
    bool korean_support = 12;   // korean support; 1bytes
    bool polish_support = 13;   // polish support; 1bytes
    bool czech_support = 14;   // czech support; 1bytes
    bool slovak_support = 15;   // slovak support; 1bytes
    bool Hungarian_support = 16;   // Hungarian support; 1bytes
    bool greek_support = 17;   // greek support; 1bytes
    bool lithuanian_support = 18;   // lithuanian support; 1bytes
    bool latvian_support = 19;   // latvian support; 1bytes
    bool estonian_support = 20;   // estonian support; 1bytes
    bool bulgarian_support = 21;   // bulgarian support; 1bytes
    bool malay_support = 22;    // malay support; 1bytes
    bool indonesian_support = 23;// indonesian support; 1bytes
    bool thai_support = 24;// thai support; 1bytes
    bool vietnamese_support = 25;// vietnamese support; 1bytes
    bool hebrew_support = 26;// hebrew support; 1bytes
    bool devanagari_support = 27;// devanagari support; 1bytes
    bool turkey_support = 28;// turkey support; 1bytes
    bool romanian_support = 29;// romanian support; 1bytes
    bool dutch_support = 30;// dutch support; 1bytes
    bool ukrainian_support = 31;// ukrainian support; 1bytes
    bool arabic_support = 32;// arabic support; 1bytes
    bool farsi_support = 33;// farsi support; 1bytes
    bool trad_chinese_support = 34;// trad chinese support; 1bytes
    bool sweden_support = 35;// sweden support; 1bytes
    bool burmese_support = 36;// burmese support; 1bytes
    bool khmer_support = 37;// khmer support; 1bytesheight
    bool bengali_support = 38;// bengali support; 1bytes
    bool slovene_support = 39;// slovene support; 1bytes
    bool hrvatski_support = 40;// hrvatski support; 1bytes
}
```
