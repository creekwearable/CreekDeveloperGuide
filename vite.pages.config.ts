import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

const pagesRoot = fileURLToPath(new URL('./pages', import.meta.url));
const publicRoot = fileURLToPath(new URL('./public', import.meta.url));

export default defineConfig({
  root: pagesRoot,
  base: '/CreekDeveloperGuide/',
  publicDir: publicRoot,
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [react()],
  build: {
    outDir: '../pages-dist',
    emptyOutDir: true,
  },
});
