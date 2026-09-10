export type DocRecord = {
  path: string;
  docId: string;
  locale: 'zh-CN' | 'en-US';
  title: string;
  description: string;
  platform: string;
  slug: string;
  order: number;
  status: 'draft' | 'published';
  version: string;
  source: string;
};

function field(source: string, name: string) {
  const match = source.match(new RegExp('^' + name + ':\\s*(.+)$', 'm'));
  return match?.[1]?.trim() ?? '';
}

export function parseDoc(path: string, source: string): DocRecord {
  const localeFromPath = path.includes('/en-US/') ? 'en-US' : 'zh-CN';
  return {
    path,
    docId: field(source, 'docId') || field(source, 'slug') || path,
    locale: field(source, 'locale') === 'en-US' ? 'en-US' : localeFromPath,
    title: field(source, 'title') || '未命名文档',
    description: field(source, 'description'),
    platform: field(source, 'platform') || '概览',
    slug: field(source, 'slug') || path.replace(/^.*content\//, '').replace(/\.md$/, ''),
    order: Number(field(source, 'order')) || 99,
    status: field(source, 'status') === 'published' ? 'published' : 'draft',
    version: field(source, 'version') || 'v2.0',
    source,
  };
}

export function createDocSource(doc: Omit<DocRecord, 'path' | 'source'>, body: string) {
  return [
    '---',
    'docId: ' + doc.docId,
    'locale: ' + doc.locale,
    'title: ' + doc.title,
    'description: ' + doc.description,
    'platform: ' + doc.platform,
    'slug: ' + doc.slug,
    'order: ' + doc.order,
    'status: ' + doc.status,
    'version: ' + doc.version,
    '---',
    '',
    body.trim(),
    '',
  ].join('\n');
}
