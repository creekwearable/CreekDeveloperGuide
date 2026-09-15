---
docId: android-language
locale: en-US
title: Android Language
description: Read supported languages and set the current device language.
platform: Android
slug: android/language
order: 104
status: published
version: v2.0
---

# Android Language

Read supported languages and set the current device language.

```kotlin
CreekManager.sInstance.getLanguage({ model: Language.protocol_language_inquire_reply ->
    textView.text = model.toString()
}, failure = { _, m ->
    textView.text = m
})

CreekManager.sInstance.setLanguage(type = Enums.language.CHINESE, {
    textView.text = "success"
}, failure = { _, m ->
    textView.text = m
})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;// Query
    SET = 2;// Set
}

enum language
{
    LANG_INVALID = 0;// Invalid
    CHINESE = 1;// CHINESE.
    ENGLISH = 2;// ENGLISH.
    GERMAN = 3;// GERMAN.
    SPANISH = 4;// SPANISH.
    ITALIAN = 5;// ITALIAN.
    JAPANESE = 6;// JAPANESE.
    RUSSIAN = 7;// RUSSIAN.
    PORTUGUESE = 8;// PORTUGUESE.
    FRENCH = 9;// FRENCH.
    KOREAN = 10;// KOREAN.
    POLISH = 11;// POLISH.
    CZECH = 12;// CZECH.
    SLOVAK = 13;// SLOVAK.
    HUNGARIAN = 14;// HUNGARIAN.
    GREEK = 15;// GREEK.
    LITHUANIAN = 16;// LITHUANIAN.
    LATVIAN = 17;// LATVIAN.
    ESTONIAN = 18;// ESTONIAN.
    BULGARIAN = 19;// BULGARIAN.
    MALAY = 20;// MALAY.
    INDONESIAN = 21;// INDONESIAN.
    THAILAND = 22;// THAILAND.
    VIETNAMESE = 23;// VIETNAMESE.
    HEBREW = 24;// HEBREW.
    DEVANAGARI = 25;// DEVANAGARI.
    TURKEY = 26;// TURKEY.
    ROMANIAN = 27;// ROMANIAN.
    DUTCH = 28;// DUTCH.
    UKRAINIAN = 29;// UKRAINIAN.
    ARABIC = 30;// ARABIC.
    FARSI = 31;// FARSI.
    TRAD_CHINESE = 32;// TRAD CHINESE.
    SWEDEN = 33;// SWEDEN.
    BURMESE = 34;// BURMESE.
    KHMER = 35;// KHMER.
    BENGALI = 36;// BENGALI.
    SLOVENE = 37;// SLOVENE.
    HRVATSKI = 38;// HRVATSKI.
}

message protocol_language_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    language cur_language = 2;     // Cur Language. 1bytes, 0x01, 0x02.
}

message protocol_language_inquire_reply
{
    operate_type operate = 1; // 1bytesOperation type 0: Invalid operation 1: Query 2: Set
    language cur_language = 2;
    bool chinese_support = 3;   // Chinese Support. 1bytes.
    bool english_support = 4;   // English Support. 1bytes.
    bool german_support = 5;   // German Support. 1bytes.
    bool spanish_support = 6;   // Spanish Support. 1bytes.
    bool italian_support = 7;   // Italian Support. 1bytes.
    bool janpanese_support = 8;   // Janpanese Support. 1bytes.
    bool russian_support = 9;   // Russian Support. 1bytes.
    bool portuguese_support = 10;   // Portuguese Support. 1bytes.
    bool french_support = 11;   // French Support. 1bytes.
    bool korean_support = 12;   // Korean Support. 1bytes.
    bool polish_support = 13;   // Polish Support. 1bytes.
    bool czech_support = 14;   // Czech Support. 1bytes.
    bool slovak_support = 15;   // Slovak Support. 1bytes.
    bool Hungarian_support = 16;   // Hungarian Support. 1bytes.
    bool greek_support = 17;   // Greek Support. 1bytes.
    bool lithuanian_support = 18;   // Lithuanian Support. 1bytes.
    bool latvian_support = 19;   // Latvian Support. 1bytes.
    bool estonian_support = 20;   // Estonian Support. 1bytes.
    bool bulgarian_support = 21;   // Bulgarian Support. 1bytes.
    bool malay_support = 22;    // Malay Support. 1bytes.
    bool indonesian_support = 23;// Indonesian Support. 1bytes.
    bool thai_support = 24;// Thai Support. 1bytes.
    bool vietnamese_support = 25;// Vietnamese Support. 1bytes.
    bool hebrew_support = 26;// Hebrew Support. 1bytes.
    bool devanagari_support = 27;// Devanagari Support. 1bytes.
    bool turkey_support = 28;// Turkey Support. 1bytes.
    bool romanian_support = 29;// Romanian Support. 1bytes.
    bool dutch_support = 30;// Dutch Support. 1bytes.
    bool ukrainian_support = 31;// Ukrainian Support. 1bytes.
    bool arabic_support = 32;// Arabic Support. 1bytes.
    bool farsi_support = 33;// Farsi Support. 1bytes.
    bool trad_chinese_support = 34;// Trad Chinese Support. 1bytes.
    bool sweden_support = 35;// Sweden Support. 1bytes.
    bool burmese_support = 36;// Burmese Support. 1bytes.
    bool khmer_support = 37;// Khmer Support. 1bytes.
    bool bengali_support = 38;// Bengali Support. 1bytes.
    bool slovene_support = 39;// Slovene Support. 1bytes.
    bool hrvatski_support = 40;// Hrvatski Support. 1bytes.
}
```
