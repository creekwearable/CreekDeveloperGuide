'use client';

import { Fragment } from 'react';

type Props = { source: string };
const fence = String.fromCharCode(96).repeat(3);

function inline(text: string) {
  const parts = text.split(/(\x60[^\x60]+\x60|\*\*[^\*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('\x60') && part.endsWith('\x60')) {
      return <code className="inline-code" key={index}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export function MarkdownView({ source }: Props) {
  const codeLabel = /^locale:\s*en-US$/m.test(source) ? 'Code example' : '代码示例';
  const body = source.replace(/^---[\s\S]*?---\s*/, '');
  const lines = body.split('\n');
  const blocks: React.ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) { index += 1; continue; }

    if (line.startsWith(fence)) {
      const language = line.slice(3) || 'text';
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith(fence)) {
        code.push(lines[index]);
        index += 1;
      }
      blocks.push(
        <div className="md-code" key={'code-' + index}>
          <div><span>{language}</span><span>{codeLabel}</span></div>
          <pre><code>{code.join('\n')}</code></pre>
        </div>
      );
      index += 1;
      continue;
    }

    if (line.startsWith('    ')) {
      const code: string[] = [];
      while (index < lines.length && (lines[index].startsWith('    ') || !lines[index].trim())) {
        code.push(lines[index].startsWith('    ') ? lines[index].slice(4) : '');
        index += 1;
      }
      blocks.push(
        <div className="md-code" key={'code-' + index}>
          <div><span>code</span><span>{codeLabel}</span></div>
          <pre><code>{code.join('\n').trimEnd()}</code></pre>
        </div>
      );
      continue;
    }

    if (line.startsWith('# ')) {
      blocks.push(<h1 key={'h1-' + index}>{inline(line.slice(2))}</h1>);
    } else if (line.startsWith('## ')) {
      const title = line.slice(3);
      blocks.push(<h2 id={title} key={'h2-' + index}>{inline(title)}</h2>);
    } else if (line.startsWith('### ')) {
      blocks.push(<h3 key={'h3-' + index}>{inline(line.slice(4))}</h3>);
    } else if (line.startsWith('> ')) {
      blocks.push(<blockquote key={'quote-' + index}>{inline(line.slice(2))}</blockquote>);
    } else if (line.startsWith('- ')) {
      const items: string[] = [];
      while (index < lines.length && lines[index].startsWith('- ')) {
        items.push(lines[index].slice(2));
        index += 1;
      }
      blocks.push(<ul key={'list-' + index}>{items.map((item) => <li key={item}>{inline(item)}</li>)}</ul>);
      continue;
    } else if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\. /.test(lines[index])) {
        items.push(lines[index].replace(/^\d+\. /, ''));
        index += 1;
      }
      blocks.push(<ol key={'ordered-list-' + index}>{items.map((item) => <li key={item}>{inline(item)}</li>)}</ol>);
      continue;
    } else {
      blocks.push(<p key={'p-' + index}>{inline(line)}</p>);
    }
    index += 1;
  }

  return <article className="markdown-body">{blocks}</article>;
}
