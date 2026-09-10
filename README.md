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

站点构建时会自动发现 `content` 目录中的 Markdown 文件。内部人员直接在 GitHub 中新增或编辑对应的 Markdown 文件，提交到 `main` 分支后，GitHub Pages 会自动重新发布公开文档。

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

`/admin` 后台不会包含在 GitHub Pages 中；内部编辑入口就是 GitHub 仓库本身。
