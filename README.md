# Creek Developer Guide

Creek SDK 开发者文档门户，包含公开文档阅读站和 Markdown 内容管理后台。

## 文档目录模型

目录分为“语言 → 平台 → 功能文档”。每个平台可以有任意数量的功能，每个功能单独使用一个 Markdown 文件：

    content/
    ├── zh-CN/
    │   ├── android/
    │   │   ├── getting-started.md
    │   │   ├── device-connection.md
    │   │   ├── alarm.md
    │   │   └── user-information.md
    │   ├── ios/
    │   ├── flutter/
    │   └── harmonyos/
    └── en-US/
        ├── android/
        ├── ios/
        ├── flutter/
        └── harmonyos/

例如，Android 的“设备连接”需要创建一对文件：

- `content/zh-CN/android/device-connection.md`
- `content/en-US/android/device-connection.md`

同一功能的中英文文件使用相同的 `docId`、`platform`、`slug`、`order` 和 `version`，通过 `locale` 区分语言。`docId` 是功能文档的唯一标识，也用于网址和语言切换。

文档需要包含 front matter：

    ---
    docId: android-device-connection
    locale: zh-CN
    title: Android 设备连接
    description: Android 设备扫描、连接和断开说明。
    platform: Android
    slug: android/device-connection
    order: 2
    status: published
    version: v2.0
    ---

    # Android 设备连接

    在这里编写功能说明。

同一平台的文档会按照 `order` 从小到大显示。新增功能时只需增加中英文 Markdown 文件，不需要修改页面代码，也不需要在 `content/navigation.json` 中登记功能；`navigation.json` 只控制平台名称和排列顺序。

功能文档需要保持自包含：如果示例调用依赖某个 Protobuf model，应把完整的数据模型、字段注释、枚举值和相关功能位表直接写在当前 Markdown 中，不在公开页面链接内部飞书文档。面向客户的页面无需展示 `main_id`、协议头和 App/BLE 传输方向。中英文文件中的协议标识符、字段名和数值必须完全一致，只翻译说明文字与代码注释。

`status: draft` 不会出现在公开网站；中英文都改为 `status: published` 后才会发布。构建会检查已发布文档是否中英文成对、字段是否一致，避免只发布一种语言。

站点构建时会自动发现 `content` 目录中的 Markdown 文件。每篇功能文档都有独立网址，例如：

    ?lang=zh-CN&platform=Android&doc=android-device-connection

旧的 `?platform=Android` 地址仍然可用，会打开 Android 下排序最靠前的文档。内部人员直接在 GitHub 中新增或编辑对应的 Markdown 文件，提交到 `main` 分支后，GitHub Pages 会自动重新发布公开文档。

## 页面

- /：自动进入中文文档概览
- /docs：自动进入中文文档概览
- /zh-CN/docs：中文文档阅读页
- /en-US/docs：英文文档阅读页
- /admin：Markdown 内容管理后台

## 本地运行

    npm install
    npm run dev

## 发布

公开文档使用 GitHub Pages，发布地址为：

- https://creekwearable.github.io/CreekDeveloperGuide/

GitHub Actions 会在 `main` 分支内容更新后自动执行 `npm run build:pages` 并发布 `pages-dist`。本地可使用以下命令检查静态版本：

    npm run build:pages
    npm run preview:pages

推荐流程是先在本地添加并检查中英文 Markdown，确认目录、内容和语言切换都正确，再提交到 GitHub 发布。

`/admin` 后台不会包含在 GitHub Pages 中；内部编辑入口就是 GitHub 仓库本身。
