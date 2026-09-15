'use client';

/* External documentation images cannot use next/image without a fixed host and dimensions. */
/* eslint-disable @next/next/no-img-element */

import { Children, isValidElement, type ReactNode } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = { source: string };

function nodeText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) return nodeText(node.props.children);
  return '';
}

export function MarkdownView({ source }: Props) {
  const isEnglish = /^locale:\s*en-US$/m.test(source);
  const codeLabel = isEnglish ? 'Code example' : '代码示例';
  const body = source.replace(/^---\r?\n[\s\S]*?\r?\n---\s*/, '');

  const components: Components = {
    h2({ children }) {
      const title = nodeText(children);
      return <h2 id={title}>{children}</h2>;
    },
    code({ className, children }) {
      return <code className={className || 'inline-code'}>{children}</code>;
    },
    pre({ children }) {
      const codeChild = Children.toArray(children).find((child) => isValidElement(child));
      const className = isValidElement<{ className?: string }>(codeChild) ? codeChild.props.className : '';
      const language = className?.match(/language-([^\s]+)/)?.[1] ?? 'code';
      return (
        <div className="md-code">
          <div><span>{language}</span><span>{codeLabel}</span></div>
          <pre>{children}</pre>
        </div>
      );
    },
    a({ href, children }) {
      const external = Boolean(href?.startsWith('http://') || href?.startsWith('https://'));
      return <a href={href} rel={external ? 'noreferrer' : undefined} target={external ? '_blank' : undefined}>{children}</a>;
    },
    img({ src, alt }) {
      return <img alt={alt ?? ''} loading="lazy" src={typeof src === 'string' ? src : undefined} />;
    },
    table({ children }) {
      return <div className="md-table-wrap"><table>{children}</table></div>;
    },
  };

  return (
    <article className="markdown-body">
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
    </article>
  );
}
