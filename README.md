# Creek Developer Guide

Creek SDK 开发者文档门户，包含公开文档阅读站和 Markdown 内容管理后台。

## 添加文档

每篇文档分别保存中文和英文两个 Markdown 文件，目录结构如下：

- `content/zh-CN/<platform>/`
- `content/en-US/<platform>/`

同一篇文档的中英文文件使用相同的 `docId`、`platform`、`slug` 和 `order`，通过 `locale` 区分语言：

文档需要包含 front matter：

    ---
    docId: android-getting-started
    locale: zh-CN
    title: Android 快速开始
    description: 文档说明
    platform: Android
    slug: android/getting-started
    order: 1
    status: published
    version: v2.0
    ---

后台新建文档时会同时生成中英文文件，并可在“中文 / English”之间切换编辑。站点构建时会自动发现 `content` 目录中的 Markdown 文件。后台中的“下载 .md”可以生成标准文件；连接 GitHub 后，“发布”操作可进一步改为提交到仓库。

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

项目支持将 GitHub 作为内容和版本仓库。公开站和管理后台需要部署到支持应用运行时的平台；如果只保留纯静态公开文档，也可以另行生成 GitHub Pages 版本。
