'use client';

import { useMemo, useState } from 'react';
import { MarkdownView } from '../components/MarkdownView';
import { createDocSource, DocRecord, parseDoc } from '../lib/docs';

const rawModules = import.meta.glob('../../content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const initialDocs = Object.entries(rawModules)
  .map(([path, source]) => parseDoc(path, source))
  .sort((a, b) => Number(b.locale === 'zh-CN') - Number(a.locale === 'zh-CN') || a.platform.localeCompare(b.platform) || a.order - b.order);

const firstChineseDoc = initialDocs.find((doc) => doc.locale === 'zh-CN') ?? initialDocs[0];

const menu = [
  ['▦', '内容管理'],
  ['☷', '目录管理'],
  ['◇', '素材管理'],
  ['↻', '发布记录'],
];

export default function AdminPage() {
  const [docs, setDocs] = useState<DocRecord[]>(initialDocs);
  const [selectedPath, setSelectedPath] = useState(firstChineseDoc?.path ?? '');
  const [source, setSource] = useState(firstChineseDoc?.source ?? '');
  const [activeLocale, setActiveLocale] = useState<'zh-CN' | 'en-US'>('zh-CN');
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const [notice, setNotice] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [query, setQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState('内容管理');

  const selected = docs.find((doc) => doc.path === selectedPath);
  const filteredDocs = useMemo(
    () => docs.filter((doc) => doc.locale === activeLocale && (doc.title.toLowerCase().includes(query.toLowerCase()) || doc.platform.toLowerCase().includes(query.toLowerCase()))),
    [docs, query, activeLocale]
  );

  function selectDoc(doc: DocRecord) {
    setSelectedPath(doc.path);
    setSource(doc.source);
    setActiveLocale(doc.locale);
    setMode('edit');
  }

  function switchLanguage(locale: 'zh-CN' | 'en-US') {
    if (!selected) return;
    const counterpart = docs.find((doc) => doc.docId === selected.docId && doc.locale === locale);
    if (counterpart) selectDoc(counterpart);
  }

  function flash(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2600);
  }

  function saveDraft() {
    setDocs((current) => current.map((doc) => doc.path === selectedPath ? { ...parseDoc(doc.path, source), status: 'draft' } : doc));
    flash('草稿已保存到当前预览');
  }

  function publish() {
    const updated = source.replace(/^status:\s*.+$/m, 'status: published');
    setSource(updated);
    setDocs((current) => current.map((doc) => doc.path === selectedPath ? parseDoc(doc.path, updated) : doc));
    flash('已生成发布内容；连接 GitHub 后将自动提交');
  }

  function downloadMarkdown() {
    const slug = selected?.slug.split('/').pop() || 'document';
    const url = URL.createObjectURL(new Blob([source], { type: 'text/markdown;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = slug + '.md';
    link.click();
    URL.revokeObjectURL(url);
    flash('Markdown 文件已下载');
  }

  function moveDoc(doc: DocRecord, direction: -1 | 1) {
    const samePlatform = docs.filter((item) => item.platform === doc.platform && item.locale === doc.locale);
    const index = samePlatform.findIndex((item) => item.path === doc.path);
    const target = samePlatform[index + direction];
    if (!target) return;
    setDocs((current) => current.map((item) => {
      if (item.path === doc.path) return { ...item, order: target.order };
      if (item.path === target.path) return { ...item, order: doc.order };
      return item;
    }));
    flash('目录顺序已调整');
  }

  function createDocument(form: FormData) {
    const title = String(form.get('title') || '未命名文档');
    const platform = String(form.get('platform') || 'Android');
    const slugPart = String(form.get('slug') || 'new-document').replace(/^\/+|\/+$/g, '');
    const slug = platform.toLowerCase() + '/' + slugPart;
    const docId = platform.toLowerCase() + '-' + slugPart;
    const order = docs.filter((doc) => doc.platform === platform && doc.locale === 'zh-CN').length + 1;
    const description = String(form.get('description') || '');
    const zhMetadata = {
      docId,
      locale: 'zh-CN' as const,
      title,
      description,
      platform,
      slug,
      order,
      status: 'draft' as const,
      version: 'v2.0',
    };
    const englishTitle = String(form.get('englishTitle') || title + ' (English)');
    const enMetadata = { ...zhMetadata, locale: 'en-US' as const, title: englishTitle, description: '', status: 'draft' as const };
    const zhSource = createDocSource(zhMetadata, '# ' + title + '\n\n在这里开始编写中文文档内容。');
    const enSource = createDocSource(enMetadata, '# ' + englishTitle + '\n\nStart writing the English document here.');
    const zhPath = '../../content/zh-CN/' + slug + '.md';
    const enPath = '../../content/en-US/' + slug + '.md';
    const zhRecord = parseDoc(zhPath, zhSource);
    const enRecord = parseDoc(enPath, enSource);
    setDocs((current) => [...current, zhRecord, enRecord]);
    setSelectedPath(zhPath);
    setSource(zhSource);
    setActiveLocale('zh-CN');
    setShowCreate(false);
    setMode('edit');
    flash('中英文文档已同时创建为草稿');
  }

  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <a className="brand" href="/"><span className="brand-mark">C</span><span>Creek Developer</span></a>
        <span className="admin-label">内容管理后台</span>
        <div className="admin-top-actions">
          <span className="sync-state"><i /> GitHub 待连接</span>
          <a href="/">查看网站 ↗</a>
          <span className="avatar">HY</span>
        </div>
      </header>

      <aside className="admin-nav">
        <div className="workspace"><span>C</span><div><b>Creek 文档</b><small>developer-guide</small></div><em>⌄</em></div>
        <nav>
          <small>工作区</small>
          {menu.map(([icon, label]) => (
            <button className={activeMenu === label ? 'active' : ''} onClick={() => setActiveMenu(label)} key={label}>
              <span>{icon}</span>{label}
              {label === '内容管理' && <em>{new Set(docs.map((doc) => doc.docId)).size}</em>}
            </button>
          ))}
        </nav>
        <div className="admin-help"><b>需要帮助？</b><span>查看内容管理说明和 GitHub 配置指南。</span><button type="button">查看指南</button></div>
      </aside>

      <section className="admin-main">
        <div className="admin-heading">
          <div><span>文档内容</span><h1>{activeMenu}</h1><p>使用 Markdown 编写、组织并发布开发者文档。</p></div>
          <button className="new-doc" type="button" onClick={() => setShowCreate(true)}>＋ 新建文档</button>
        </div>

        <div className="repo-banner">
          <span className="repo-icon">⌘</span>
          <div><b>连接 GitHub 后即可自动发布</b><p>当前是可交互预览。配置仓库后，“发布”会提交 Markdown 并触发网站更新。</p></div>
          <button type="button" onClick={() => flash('下一步需要提供 GitHub 仓库地址')}>配置 GitHub</button>
          <button className="banner-close" type="button">×</button>
        </div>

        <div className="content-manager">
          <aside className="doc-tree">
            <div className="tree-toolbar">
              <label><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索文档" /></label>
              <button type="button" title="新建目录">＋</button>
            </div>
            <div className="tree-language-filter" aria-label="文档语言">
              <button className={activeLocale === 'zh-CN' ? 'active' : ''} onClick={() => switchLanguage('zh-CN')} type="button">中文</button>
              <button className={activeLocale === 'en-US' ? 'active' : ''} onClick={() => switchLanguage('en-US')} type="button">English</button>
            </div>
            <div className="tree-scroll">
              {['Overview', 'Android', 'iOS', 'Flutter', 'HarmonyOS'].map((platform) => {
                const platformDocs = filteredDocs.filter((doc) => doc.platform === platform).sort((a, b) => a.order - b.order);
                return (
                  <div className="tree-group" key={platform}>
                    <div className="tree-folder"><span>⌄</span><b>{platform}</b><small>{platformDocs.length}</small></div>
                    {platformDocs.map((doc) => (
                      <button className={doc.path === selectedPath ? 'selected' : ''} onClick={() => selectDoc(doc)} key={doc.path}>
                        <span className="file-icon">▤</span>
                        <span><b>{doc.title.replace(platform + ' ', '')}</b><small>/{doc.slug}</small></span>
                        <i className={doc.status}>{doc.status === 'published' ? '已发布' : '草稿'}</i>
                        <span className="reorder">
                          <em onClick={(event) => { event.stopPropagation(); moveDoc(doc, -1); }}>↑</em>
                          <em onClick={(event) => { event.stopPropagation(); moveDoc(doc, 1); }}>↓</em>
                        </span>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </aside>

          <section className="editor-panel">
            <div className="editor-bar">
              <div className="editor-tabs">
                <button className={mode === 'edit' ? 'active' : ''} onClick={() => setMode('edit')} type="button">编辑</button>
                <button className={mode === 'preview' ? 'active' : ''} onClick={() => setMode('preview')} type="button">预览</button>
              </div>
              <div className="translation-state">
                <span>{activeLocale === 'zh-CN' ? '正在编辑中文' : 'Editing English'}</span>
                <i>{docs.some((doc) => doc.docId === selected?.docId && doc.locale !== activeLocale) ? '双语已关联' : '缺少翻译'}</i>
              </div>
              <div className="editor-actions">
                <button type="button" onClick={downloadMarkdown}>下载 .md</button>
                <button type="button" onClick={saveDraft}>保存草稿</button>
                <button className="publish-button" type="button" onClick={publish}>发布 <span>⌄</span></button>
              </div>
            </div>
            <div className="document-meta">
              <div><span>{selected?.platform || '文档'} / {selected?.title || '未命名'} · {activeLocale}</span><b>{selected?.title || '请选择文档'}</b></div>
              <span className={'status-pill ' + (selected?.status || 'draft')}>{selected?.status === 'published' ? '● 已发布' : '● 草稿'}</span>
            </div>
            {mode === 'edit' ? (
              <div className="markdown-editor">
                <div className="format-bar"><span>H1</span><b>B</b><i>I</i><span>↗</span><span>“ ”</span><span>&lt;/&gt;</span><span>• 列表</span><span>▧ 图片</span><em>Markdown</em></div>
                <textarea aria-label="Markdown 内容" spellCheck={false} value={source} onChange={(event) => setSource(event.target.value)} />
              </div>
            ) : (
              <div className="preview-pane"><MarkdownView source={source} /></div>
            )}
            <div className="editor-status"><span>✓ 自动保存已开启</span><span>{source.split(/\s+/).filter(Boolean).length} 字 · UTF-8 · Markdown</span></div>
          </section>
        </div>
      </section>

      {showCreate && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setShowCreate(false)}>
          <form className="create-modal" onSubmit={(event) => { event.preventDefault(); createDocument(new FormData(event.currentTarget)); }} onMouseDown={(event) => event.stopPropagation()}>
            <div><span className="modal-icon">＋</span><span><h2>新建 Markdown 文档</h2><p>保存后将按照目录生成标准 .md 文件。</p></span><button type="button" onClick={() => setShowCreate(false)}>×</button></div>
            <label>文档标题<input name="title" required placeholder="例如：设备连接" autoFocus /></label>
            <label>英文标题<input name="englishTitle" placeholder="例如：Device Connection" /></label>
            <div className="form-row">
              <label>所属平台<select name="platform"><option>Android</option><option>iOS</option><option>Flutter</option><option>HarmonyOS</option></select></label>
              <label>文档地址<input name="slug" required placeholder="device-connection" /></label>
            </div>
            <label>简短描述<input name="description" placeholder="这篇文档主要介绍……" /></label>
            <small>将同时生成：content/zh-CN/android/... 和 content/en-US/android/...</small>
            <footer><button type="button" onClick={() => setShowCreate(false)}>取消</button><button className="publish-button" type="submit">创建文档</button></footer>
          </form>
        </div>
      )}

      {notice && <div className="toast">✓ {notice}</div>}
    </main>
  );
}
