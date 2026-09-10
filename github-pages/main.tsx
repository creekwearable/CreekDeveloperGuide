/// <reference types="vite/client" />

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../app/globals.css';
import { DocsReader } from '../app/components/DocsReader';
import { parseDoc } from '../app/lib/docs';
import publishedSources from 'virtual:published-docs';

const params = new URLSearchParams(window.location.search);
const locale = params.get('lang') === 'en-US' ? 'en-US' : 'zh-CN';
const staticBasePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const publishedDocs = publishedSources.map(({ path, source }) => parseDoc(path, source));

document.documentElement.lang = locale;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DocsReader allDocs={publishedDocs} locale={locale} staticBasePath={staticBasePath} />
  </StrictMode>
);
