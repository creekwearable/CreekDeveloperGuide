import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import { publishedDocsPlugin } from './scripts/published-docs-plugin';

const pagesRoot = fileURLToPath(new URL('./github-pages', import.meta.url));
const publicRoot = fileURLToPath(new URL('./public', import.meta.url));
const contentRoot = fileURLToPath(new URL('./content', import.meta.url));

export default defineConfig({
  root: pagesRoot,
  base: '/CreekDeveloperGuide/',
  publicDir: publicRoot,
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [publishedDocsPlugin(contentRoot), react()],
  build: {
    outDir: '../pages-dist',
    emptyOutDir: true,
  },
});
