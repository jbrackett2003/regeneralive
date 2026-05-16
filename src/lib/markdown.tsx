import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Minimal markdown renderer — we control the source content so we don't need
 * a full markdown library. Supports: headings (## ###), paragraphs,
 * bold (**), italics (*), links [text](href), unordered lists, blockquotes (>).
 */

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Order: links first, then bold, italic
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = linkRe.exec(text)) !== null) {
    if (m.index > lastIndex) {
      nodes.push(...renderInlineNonLink(text.slice(lastIndex, m.index), key));
      key += 100;
    }
    const [_, label, href] = m;
    if (href.startsWith("/")) {
      nodes.push(
        <Link key={`l${key++}`} href={href}>
          {label}
        </Link>
      );
    } else {
      nodes.push(
        <a key={`l${key++}`} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      );
    }
    lastIndex = linkRe.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(...renderInlineNonLink(text.slice(lastIndex), key));
  }
  return nodes;
}

function renderInlineNonLink(text: string, baseKey: number): ReactNode[] {
  // bold
  const parts: ReactNode[] = [];
  const boldRe = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  let k = baseKey;
  while ((m = boldRe.exec(text)) !== null) {
    if (m.index > lastIndex)
      parts.push(...renderItalic(text.slice(lastIndex, m.index), k));
    parts.push(<strong key={`b${k++}`}>{m[1]}</strong>);
    lastIndex = boldRe.lastIndex;
    k += 50;
  }
  if (lastIndex < text.length)
    parts.push(...renderItalic(text.slice(lastIndex), k));
  return parts;
}

function renderItalic(text: string, baseKey: number): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /\*([^*]+)\*/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  let k = baseKey;
  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIndex) parts.push(text.slice(lastIndex, m.index));
    parts.push(<em key={`i${k++}`}>{m[1]}</em>);
    lastIndex = re.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export function Markdown({ source }: { source: string }) {
  const blocks: ReactNode[] = [];
  const lines = source.split("\n");
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    // headings
    if (line.startsWith("### ")) {
      blocks.push(<h3 key={key++}>{renderInline(line.slice(4))}</h3>);
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push(<h2 key={key++}>{renderInline(line.slice(3))}</h2>);
      i++;
      continue;
    }
    // unordered list
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      blocks.push(
        <ul key={key++}>
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it)}</li>
          ))}
        </ul>
      );
      continue;
    }
    // blockquote
    if (line.startsWith("> ")) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        buf.push(lines[i].slice(2));
        i++;
      }
      blocks.push(
        <blockquote key={key++}>{renderInline(buf.join(" "))}</blockquote>
      );
      continue;
    }
    // horizontal rule
    if (line.trim() === "---") {
      blocks.push(<hr key={key++} className="my-10 border-ink/10" />);
      i++;
      continue;
    }
    // paragraph (group consecutive non-empty lines)
    const buf: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("- ") &&
      !lines[i].startsWith("> ")
    ) {
      buf.push(lines[i]);
      i++;
    }
    blocks.push(<p key={key++}>{renderInline(buf.join(" "))}</p>);
  }

  return <div className="prose-editorial">{blocks}</div>;
}