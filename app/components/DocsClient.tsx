'use client';

import { parseDoc } from '../lib/docs';
import type { DocsNavigation } from '../lib/docs';
import { DocsReader } from './DocsReader';
import navigation from '../../content/navigation.json';

const rawModules = import.meta.glob('../../content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const allDocs = Object.entries(rawModules).map(([path, source]) => parseDoc(path, source));

export function DocsClient({ locale }: { locale: 'zh-CN' | 'en-US' }) {
  return <DocsReader allDocs={allDocs} locale={locale} navigation={navigation as DocsNavigation} />;
}
