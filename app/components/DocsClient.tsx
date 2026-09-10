'use client';

import { parseDoc } from '../lib/docs';
import { DocsReader } from './DocsReader';

const rawModules = import.meta.glob('../../content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const allDocs = Object.entries(rawModules).map(([path, source]) => parseDoc(path, source));

export function DocsClient({ locale }: { locale: 'zh-CN' | 'en-US' }) {
  return <DocsReader allDocs={allDocs} locale={locale} />;
}
