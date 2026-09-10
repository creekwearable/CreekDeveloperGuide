'use client';

import { useEffect, useMemo, useState } from 'react';
import { DocRecord } from '../lib/docs';
import { MarkdownView } from './MarkdownView';

const copy = {
  'zh-CN': {
    guide: '开发指南', overview: '概览', search: '搜索中文文档...',
    install: '安装 SDK', permission: '权限配置', docs: '文档',
    updated: '最后更新：2026-09-09', copy: '复制 Markdown', copied: '✓ 已复制',
    helpful: '这篇文档对你有帮助吗？', feedback: '你的反馈将帮助我们改进开发者体验。',
    yes: '有帮助', improve: '需要改进', back: '← 返回概览',
    next: '下一篇', nextDoc: '设备连接 →', onPage: '本页内容',
    issue: '发现问题？', submit: '提交反馈 ↗', language: '中文',
  },
  'en-US': {
    guide: 'Developer Guide', overview: 'Overview', search: 'Search English docs...',
    install: 'Install SDK', permission: 'Permissions', docs: 'Docs',
    updated: 'Last updated: Sep 9, 2026', copy: 'Copy Markdown', copied: '✓ Copied',
    helpful: 'Was this page helpful?', feedback: 'Your feedback helps us improve the developer experience.',
    yes: 'Yes', improve: 'Needs improvement', back: '← Back to overview',
    next: 'Next', nextDoc: 'Device connection →', onPage: 'On this page',
    issue: 'Found an issue?', submit: 'Send feedback ↗', language: 'English',
  },
} as const;

type DocsReaderProps = {
  allDocs: DocRecord[];
  locale: 'zh-CN' | 'en-US';
  staticBasePath?: string;
};

export function DocsReader({ allDocs, locale, staticBasePath }: DocsReaderProps) {
  const docs = useMemo(
    () => allDocs.filter((doc) => doc.locale === locale && doc.status === 'published'),
    [allDocs, locale]
  );
  const overview = docs.find((doc) => doc.platform === 'Overview') ?? docs[0];
  const [current, setCurrent] = useState<DocRecord>(overview);
  const [copied, setCopied] = useState(false);
  const labels = copy[locale];
  const otherLocale = locale === 'zh-CN' ? 'en-US' : 'zh-CN';
  const otherLanguage = locale === 'zh-CN' ? 'English' : '中文';

  function docsHref(targetLocale: 'zh-CN' | 'en-US', platform: string) {
    const params = new URLSearchParams({ platform });
    if (staticBasePath !== undefined) {
      params.set('lang', targetLocale);
      return `${staticBasePath}/?${params.toString()}`;
    }
    return `/${targetLocale}/docs?${params.toString()}`;
  }

  useEffect(() => {
    const platform = new URLSearchParams(window.location.search).get('platform');
    const match = docs.find((doc) => doc.platform.toLowerCase() === platform?.toLowerCase());
    // Hydration starts from the overview; synchronize the selected query after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrent(match ?? overview);
  }, [docs, overview]);

  const sections = useMemo(
    () => current.source.split('\n').filter((line) => line.startsWith('## ')).map((line) => line.slice(3)),
    [current]
  );

  function choose(doc: DocRecord) {
    setCurrent(doc);
    window.history.replaceState(null, '', docsHref(locale, doc.platform));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function copyMarkdown() {
    await navigator.clipboard.writeText(current.source);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <main className="reader-shell">
      <header className="topbar reader-topbar">
        <a className="brand" href={docsHref(locale, 'Overview')}><span className="brand-mark">C</span><span>Creek Developer</span></a>
        <button className="search" type="button"><span className="search-icon">⌕</span><span>{labels.search}</span><kbd>⌘ K</kbd></button>
        <nav className="top-actions">
          <button type="button">v2.0 ⌄</button>
          <a className="language-switch" href={docsHref(otherLocale, current.platform)}>
            {labels.language} · {otherLanguage}
          </a>
          <a href="https://github.com/creekwearable/CreekDeveloperGuide">GitHub ↗</a>
        </nav>
      </header>
      <aside className="reader-sidebar">
        <div className="sidebar-title"><span>▣</span> {labels.guide}</div>
        <a className={'reader-home ' + (current.platform === 'Overview' ? 'active' : '')} href={docsHref(locale, 'Overview')} onClick={(event) => { event.preventDefault(); choose(overview); }}>⌂　{labels.overview}</a>
        {['Android', 'iOS', 'Flutter', 'HarmonyOS'].map((platform) => (
          <div className="reader-group" key={platform}>
            <b>{platform}</b>
            {docs.filter((doc) => doc.platform === platform).map((doc) => (
              <button className={doc.path === current.path ? 'active' : ''} onClick={() => choose(doc)} key={doc.path}>
                {doc.title.replace(platform + ' ', '')}
              </button>
            ))}
            <button type="button">{labels.install}</button>
            <button type="button">{labels.permission}</button>
          </div>
        ))}
      </aside>
      <section className="reader-main">
        <div className="breadcrumb"><a href={docsHref(locale, 'Overview')}>{labels.docs}</a><span>/</span><span>{current.platform}</span><span>/</span><b>{current.title}</b></div>
        <div className="reader-meta">
          <span className="version-tag">{current.version}</span>
          <span>{labels.updated}</span>
          <span className="doc-locale-badge">{locale === 'zh-CN' ? '中文文档' : 'English docs'}</span>
          <button onClick={copyMarkdown} type="button">{copied ? labels.copied : labels.copy}</button>
        </div>
        <MarkdownView source={current.source} />
        <div className="doc-feedback"><div><b>{labels.helpful}</b><span>{labels.feedback}</span></div><button type="button">{labels.yes}</button><button type="button">{labels.improve}</button></div>
        <div className="doc-pagination"><a href={docsHref(locale, 'Overview')} onClick={(event) => { event.preventDefault(); choose(overview); }}>{labels.back}</a><a href="#next"><span>{labels.next}</span><b>{labels.nextDoc}</b></a></div>
      </section>
      <aside className="reader-toc">
        <b>{labels.onPage}</b>
        {sections.map((section) => <a href={'#' + section} key={section}>{section}</a>)}
        <div><span>{labels.issue}</span><a href="#feedback">{labels.submit}</a></div>
      </aside>
    </main>
  );
}
