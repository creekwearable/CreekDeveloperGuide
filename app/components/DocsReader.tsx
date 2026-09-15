'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { DocRecord, DocsNavigation } from '../lib/docs';
import { MarkdownView } from './MarkdownView';

const copy = {
  'zh-CN': {
    guide: '开发指南', overview: '概览', search: '搜索中文文档...', docs: '文档',
    updated: '最后更新：2026-09-09', copy: '复制 Markdown', copied: '✓ 已复制',
    helpful: '这篇文档对你有帮助吗？', feedback: '你的反馈将帮助我们改进开发者体验。',
    yes: '有帮助', improve: '需要改进', previous: '上一篇', next: '下一篇',
    onPage: '本页内容', issue: '发现问题？', submit: '提交反馈 ↗', language: '中文',
    empty: '当前语言暂时没有已发布的文档。', noResults: '没有匹配的文档', clearSearch: '清除搜索',
  },
  'en-US': {
    guide: 'Developer Guide', overview: 'Overview', search: 'Search English docs...', docs: 'Docs',
    updated: 'Last updated: Sep 9, 2026', copy: 'Copy Markdown', copied: '✓ Copied',
    helpful: 'Was this page helpful?', feedback: 'Your feedback helps us improve the developer experience.',
    yes: 'Yes', improve: 'Needs improvement', previous: 'Previous', next: 'Next',
    onPage: 'On this page', issue: 'Found an issue?', submit: 'Send feedback ↗', language: 'English',
    empty: 'There are no published documents in this language yet.', noResults: 'No matching documents', clearSearch: 'Clear search',
  },
} as const;

type DocsReaderProps = {
  allDocs: DocRecord[];
  locale: 'zh-CN' | 'en-US';
  navigation: DocsNavigation;
  staticBasePath?: string;
};

function compareDocs(a: DocRecord, b: DocRecord) {
  return a.order - b.order || a.docId.localeCompare(b.docId) || a.title.localeCompare(b.title);
}

function docLabel(doc: DocRecord) {
  const platformPrefix = `${doc.platform} `;
  return doc.title.startsWith(platformPrefix) ? doc.title.slice(platformPrefix.length) : doc.title;
}

function headingLabel(line: string) {
  return line.slice(3)
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .trim();
}

export function DocsReader({ allDocs, locale, navigation, staticBasePath }: DocsReaderProps) {
  const labels = copy[locale];
  const otherLocale = locale === 'zh-CN' ? 'en-US' : 'zh-CN';
  const otherLanguage = locale === 'zh-CN' ? 'English' : '中文';
  const docs = useMemo(
    () => allDocs.filter((doc) => doc.locale === locale && doc.status === 'published').sort(compareDocs),
    [allDocs, locale]
  );
  const platforms = useMemo(
    () => [...navigation.platforms].sort((a, b) => a.order - b.order),
    [navigation]
  );
  const overview = useMemo(
    () => docs.find((doc) => doc.platform === 'Overview') ?? docs[0],
    [docs]
  );
  const docsByPlatform = useMemo(
    () => new Map(platforms.map((platform) => [
      platform.id,
      docs.filter((doc) => doc.platform === platform.id).sort(compareDocs),
    ])),
    [docs, platforms]
  );
  const readingOrder = useMemo(() => {
    const platformDocs = platforms.flatMap((platform) => docsByPlatform.get(platform.id) ?? []);
    return overview ? [overview, ...platformDocs.filter((doc) => doc.path !== overview.path)] : platformDocs;
  }, [docsByPlatform, overview, platforms]);
  const [current, setCurrent] = useState<DocRecord | undefined>(overview);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPlatforms, setExpandedPlatforms] = useState<Set<string>>(
    () => new Set(platforms[0] ? [platforms[0].id] : [])
  );
  const searchInput = useRef<HTMLInputElement>(null);
  const normalizedSearch = searchQuery.trim().toLocaleLowerCase(locale);
  const visibleDocsByPlatform = useMemo(
    () => new Map(platforms.map((platform) => [
      platform.id,
      (docsByPlatform.get(platform.id) ?? []).filter((doc) => !normalizedSearch
        || `${doc.title} ${doc.description}`.toLocaleLowerCase(locale).includes(normalizedSearch)),
    ])),
    [docsByPlatform, locale, normalizedSearch, platforms]
  );

  function docsHref(targetLocale: 'zh-CN' | 'en-US', doc: DocRecord) {
    const params = new URLSearchParams({ platform: doc.platform, doc: doc.docId });
    if (staticBasePath !== undefined) {
      params.set('lang', targetLocale);
      return `${staticBasePath}/?${params.toString()}`;
    }
    return `/${targetLocale}/docs?${params.toString()}`;
  }

  useEffect(() => {
    function syncSelectionFromUrl() {
      const params = new URLSearchParams(window.location.search);
      const requestedDoc = params.get('doc');
      const requestedPlatform = params.get('platform');
      const matchByDoc = requestedDoc
        ? docs.find((doc) => doc.docId === requestedDoc || doc.slug === requestedDoc)
        : undefined;
      const matchByPlatform = requestedPlatform
        ? docs.find((doc) => doc.platform.toLowerCase() === requestedPlatform.toLowerCase())
        : undefined;
      setCurrent(matchByDoc ?? matchByPlatform ?? overview);
    }

    syncSelectionFromUrl();
    window.addEventListener('popstate', syncSelectionFromUrl);
    return () => window.removeEventListener('popstate', syncSelectionFromUrl);
  }, [docs, overview]);

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchInput.current?.focus();
      }
    }

    window.addEventListener('keydown', focusSearch);
    return () => window.removeEventListener('keydown', focusSearch);
  }, []);

  const sections = useMemo(
    () => current?.source.split('\n').filter((line) => line.startsWith('## ')).map(headingLabel) ?? [],
    [current]
  );
  const currentIndex = current ? readingOrder.findIndex((doc) => doc.path === current.path) : -1;
  const previousDoc = currentIndex > 0 ? readingOrder[currentIndex - 1] : undefined;
  const nextDoc = currentIndex >= 0 ? readingOrder[currentIndex + 1] : undefined;
  const translatedDoc = current
    ? allDocs.find((doc) => doc.locale === otherLocale && doc.status === 'published' && doc.docId === current.docId)
      ?? allDocs.find((doc) => doc.locale === otherLocale && doc.status === 'published' && doc.platform === 'Overview')
    : undefined;

  function choose(doc: DocRecord) {
    setCurrent(doc);
    const href = docsHref(locale, doc);
    const target = new URL(href, window.location.href);
    if (target.pathname + target.search !== window.location.pathname + window.location.search) {
      window.history.pushState(null, '', href);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function selectDoc(event: React.MouseEvent<HTMLAnchorElement>, doc: DocRecord) {
    event.preventDefault();
    choose(doc);
  }

  function togglePlatform(platform: string) {
    setExpandedPlatforms((expanded) => {
      const next = new Set(expanded);
      if (next.has(platform)) next.delete(platform);
      else next.add(platform);
      return next;
    });
  }

  async function copyMarkdown() {
    if (!current) return;
    await navigator.clipboard.writeText(current.source);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  if (!current || !overview) {
    return <main className="reader-empty">{labels.empty}</main>;
  }

  return (
    <main className="reader-shell">
      <header className="topbar reader-topbar">
        <a className="brand" href={docsHref(locale, overview)}><span className="brand-mark">C</span><span>Creek Developer</span></a>
        <label className="search">
          <span className="search-icon">⌕</span>
          <input
            aria-label={labels.search}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={labels.search}
            ref={searchInput}
            type="search"
            value={searchQuery}
          />
          {searchQuery ? (
            <button aria-label={labels.clearSearch} onClick={() => setSearchQuery('')} type="button">×</button>
          ) : <kbd>⌘ K</kbd>}
        </label>
        <nav className="top-actions">
          <button type="button">v2.0 ⌄</button>
          {translatedDoc && (
            <a className="language-switch" href={docsHref(otherLocale, translatedDoc)}>
              {labels.language} · {otherLanguage}
            </a>
          )}
          <a href="https://github.com/creekwearable/CreekDeveloperGuide">GitHub ↗</a>
        </nav>
      </header>
      <aside className="reader-sidebar">
        <div className="sidebar-title"><span>▣</span> {labels.guide}</div>
        <a
          className={'reader-home ' + (current.platform === 'Overview' ? 'active' : '')}
          href={docsHref(locale, overview)}
          onClick={(event) => selectDoc(event, overview)}
        >
          ⌂　{labels.overview}
        </a>
        {platforms.map((platform) => {
          const platformDocs = docsByPlatform.get(platform.id) ?? [];
          const visiblePlatformDocs = visibleDocsByPlatform.get(platform.id) ?? [];
          if (platformDocs.length === 0) return null;
          const isExpanded = normalizedSearch
            ? visiblePlatformDocs.length > 0
            : expandedPlatforms.has(platform.id) || current.platform === platform.id;
          return (
            <div className="reader-group" key={platform.id}>
              <button
                aria-expanded={isExpanded}
                className="reader-group-title"
                disabled={Boolean(normalizedSearch)}
                onClick={() => togglePlatform(platform.id)}
                type="button"
              >
                <span className="reader-group-name"><i>{isExpanded ? '⌄' : '›'}</i><b>{platform.labels[locale]}</b></span>
                <small>{platformDocs.length}</small>
              </button>
              <nav aria-label={`${platform.labels[locale]} ${labels.docs}`} hidden={!isExpanded}>
                {visiblePlatformDocs.map((doc) => (
                  <a
                    className={doc.path === current.path ? 'active' : ''}
                    href={docsHref(locale, doc)}
                    onClick={(event) => selectDoc(event, doc)}
                    key={doc.path}
                  >
                    {docLabel(doc)}
                  </a>
                ))}
              </nav>
            </div>
          );
        })}
        {normalizedSearch && [...visibleDocsByPlatform.values()].every((platformDocs) => platformDocs.length === 0) && (
          <p className="reader-search-empty">{labels.noResults}</p>
        )}
      </aside>
      <section className="reader-main">
        <div className="breadcrumb">
          <a href={docsHref(locale, overview)} onClick={(event) => selectDoc(event, overview)}>{labels.docs}</a>
          <span>/</span><span>{current.platform === 'Overview' ? labels.overview : current.platform}</span>
          <span>/</span><b>{current.title}</b>
        </div>
        <div className="reader-meta">
          <span className="version-tag">{current.version}</span>
          <span>{labels.updated}</span>
          <span className="doc-locale-badge">{locale === 'zh-CN' ? '中文文档' : 'English docs'}</span>
          <button onClick={copyMarkdown} type="button">{copied ? labels.copied : labels.copy}</button>
        </div>
        <MarkdownView source={current.source} />
        <div className="doc-feedback"><div><b>{labels.helpful}</b><span>{labels.feedback}</span></div><button type="button">{labels.yes}</button><button type="button">{labels.improve}</button></div>
        <div className="doc-pagination">
          {previousDoc ? (
            <a className="previous-doc" href={docsHref(locale, previousDoc)} onClick={(event) => selectDoc(event, previousDoc)}>
              <span>{labels.previous}</span><b>← {docLabel(previousDoc)}</b>
            </a>
          ) : <span />}
          {nextDoc && (
            <a className="next-doc" href={docsHref(locale, nextDoc)} onClick={(event) => selectDoc(event, nextDoc)}>
              <span>{labels.next}</span><b>{docLabel(nextDoc)} →</b>
            </a>
          )}
        </div>
      </section>
      <aside className="reader-toc">
        <b>{labels.onPage}</b>
        {sections.map((section) => <a href={'#' + section} key={section}>{section}</a>)}
        <div><span>{labels.issue}</span><a href="#feedback">{labels.submit}</a></div>
      </aside>
    </main>
  );
}
