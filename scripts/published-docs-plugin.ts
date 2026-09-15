import { readFileSync, readdirSync } from 'node:fs';
import { extname, join, relative, sep } from 'node:path';

const publishedDocsId = 'virtual:published-docs';
const resolvedPublishedDocsId = `\0${publishedDocsId}`;
const requiredLocales = ['zh-CN', 'en-US'] as const;

type PublishedDoc = {
  path: string;
  source: string;
  frontMatter: string;
  docId: string;
  locale: string;
  title: string;
  platform: string;
  slug: string;
  order: string;
  version: string;
};

type NavigationPlatform = {
  id?: unknown;
  labels?: { 'zh-CN'?: unknown; 'en-US'?: unknown };
  order?: unknown;
};

function markdownFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(path);
    return extname(entry.name) === '.md' ? [path] : [];
  });
}

function frontMatterField(frontMatter: string, name: string) {
  const value = frontMatter.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1]?.trim() ?? '';
  if (value.length >= 2) {
    const quote = value[0];
    if ((quote === '"' || quote === "'") && value.at(-1) === quote) {
      return value.slice(1, -1);
    }
  }
  return value;
}

function validateNavigation(contentRoot: string, docs: PublishedDoc[]) {
  const navigationPath = join(contentRoot, 'navigation.json');
  let platforms: NavigationPlatform[] = [];

  try {
    const navigation = JSON.parse(readFileSync(navigationPath, 'utf8')) as { platforms?: unknown };
    if (!Array.isArray(navigation.platforms)) {
      return ['content/navigation.json: platforms must be an array'];
    }
    platforms = navigation.platforms as NavigationPlatform[];
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return [`content/navigation.json: invalid JSON (${message})`];
  }

  const errors: string[] = [];
  const ids = new Set<string>();
  const orders = new Set<number>();

  platforms.forEach((platform, index) => {
    const location = `content/navigation.json platforms[${index}]`;
    if (typeof platform.id !== 'string' || !platform.id.trim()) {
      errors.push(`${location}: id is required`);
      return;
    }
    if (ids.has(platform.id)) errors.push(`${location}: duplicate id ${platform.id}`);
    ids.add(platform.id);

    const order = Number(platform.order);
    if (!Number.isFinite(order)) errors.push(`${location}: order must be a number`);
    else if (orders.has(order)) errors.push(`${location}: duplicate order ${order}`);
    else orders.add(order);

    requiredLocales.forEach((locale) => {
      if (typeof platform.labels?.[locale] !== 'string' || !platform.labels[locale]?.trim()) {
        errors.push(`${location}: labels.${locale} is required`);
      }
    });
  });

  docs.forEach((doc) => {
    if (doc.platform !== 'Overview' && !ids.has(doc.platform)) {
      errors.push(`${doc.path}: platform ${doc.platform} is not registered in content/navigation.json`);
    }
  });

  return errors;
}

function validatePublishedDocs(contentRoot: string, docs: PublishedDoc[]) {
  const errors: string[] = [];
  const requiredFields = ['docId', 'locale', 'title', 'platform', 'slug', 'order', 'version'] as const;

  docs.forEach((doc) => {
    requiredFields.forEach((name) => {
      if (!doc[name]) errors.push(`${doc.path}: missing ${name}`);
    });
    if (!requiredLocales.includes(doc.locale as (typeof requiredLocales)[number])) {
      errors.push(`${doc.path}: locale must be zh-CN or en-US`);
    }
    if (!Number.isFinite(Number(doc.order))) {
      errors.push(`${doc.path}: order must be a number`);
    }
  });

  const byDocument = new Map<string, PublishedDoc[]>();
  docs.forEach((doc) => byDocument.set(doc.docId, [...(byDocument.get(doc.docId) ?? []), doc]));

  byDocument.forEach((translations, docId) => {
    requiredLocales.forEach((locale) => {
      const matches = translations.filter((doc) => doc.locale === locale);
      if (matches.length !== 1) {
        errors.push(`${docId}: expected exactly one published ${locale} document, found ${matches.length}`);
      }
    });

    const reference = translations[0];
    if (!reference) return;
    (['platform', 'slug', 'version'] as const).forEach((name) => {
      if (translations.some((doc) => doc[name] !== reference[name])) {
        errors.push(`${docId}: translations must use the same ${name}`);
      }
    });
    if (translations.some((doc) => Number(doc.order) !== Number(reference.order))) {
      errors.push(`${docId}: translations must use the same order`);
    }
  });

  requiredLocales.forEach((locale) => {
    const overviews = docs.filter((doc) => doc.locale === locale && doc.platform === 'Overview');
    if (overviews.length !== 1) {
      errors.push(`expected exactly one published ${locale} Overview document, found ${overviews.length}`);
    }
  });

  errors.push(...validateNavigation(contentRoot, docs));

  if (errors.length > 0) {
    throw new Error(`Published Markdown validation failed:\n- ${errors.join('\n- ')}`);
  }
}

export function publishedDocsPlugin(contentRoot: string) {
  return {
    name: 'creek-published-docs',
    resolveId(id: string) {
      return id === publishedDocsId ? resolvedPublishedDocsId : undefined;
    },
    load(id: string) {
      if (id !== resolvedPublishedDocsId) return undefined;

      const sources: PublishedDoc[] = markdownFiles(contentRoot).flatMap((path) => {
        const source = readFileSync(path, 'utf8');
        const frontMatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
        if (!/^status:\s*published\s*$/m.test(frontMatter)) return [];

        const contentPath = relative(contentRoot, path).split(sep).join('/');
        return [{
          path: `../../content/${contentPath}`,
          source,
          frontMatter,
          docId: frontMatterField(frontMatter, 'docId'),
          locale: frontMatterField(frontMatter, 'locale'),
          title: frontMatterField(frontMatter, 'title'),
          platform: frontMatterField(frontMatter, 'platform'),
          slug: frontMatterField(frontMatter, 'slug'),
          order: frontMatterField(frontMatter, 'order'),
          version: frontMatterField(frontMatter, 'version'),
        }];
      });

      validatePublishedDocs(contentRoot, sources);

      return `export default ${JSON.stringify(sources.map(({ path, source }) => ({ path, source })))};`;
    },
  };
}
