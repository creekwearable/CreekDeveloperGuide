import { readFileSync, readdirSync } from 'node:fs';
import { extname, join, relative, sep } from 'node:path';

const publishedDocsId = 'virtual:published-docs';
const resolvedPublishedDocsId = `\0${publishedDocsId}`;

function markdownFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(path);
    return extname(entry.name) === '.md' ? [path] : [];
  });
}

export function publishedDocsPlugin(contentRoot: string) {
  return {
    name: 'creek-published-docs',
    resolveId(id: string) {
      return id === publishedDocsId ? resolvedPublishedDocsId : undefined;
    },
    load(id: string) {
      if (id !== resolvedPublishedDocsId) return undefined;

      const sources = markdownFiles(contentRoot).flatMap((path) => {
        const source = readFileSync(path, 'utf8');
        const frontMatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
        if (!/^status:\s*published\s*$/m.test(frontMatter)) return [];

        const contentPath = relative(contentRoot, path).split(sep).join('/');
        return [{ path: `../../content/${contentPath}`, source }];
      });

      return `export default ${JSON.stringify(sources)};`;
    },
  };
}
