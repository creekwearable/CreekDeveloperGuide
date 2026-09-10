/// <reference types="vite/client" />

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../app/globals.css';
import { DocsClient } from '../app/components/DocsClient';

const params = new URLSearchParams(window.location.search);
const locale = params.get('lang') === 'en-US' ? 'en-US' : 'zh-CN';
const staticBasePath = import.meta.env.BASE_URL.replace(/\/$/, '');

document.documentElement.lang = locale;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DocsClient locale={locale} staticBasePath={staticBasePath} />
  </StrictMode>
);
