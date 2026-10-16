/**
 * DevPanel — editor de código estilizado (módulo "desenvolvimento").
 * SVG puro, sem texto real: as linhas de código são blocos, o que mantém a
 * composição legível em qualquer escala e sem custo de fonte extra.
 */
import type { SVGProps } from 'react';
import panel from './Panel.module.css';

type Segment = { w: number; c: string };
type Line = { indent: number; segs: Segment[] };

const C = {
  keyword: '#bd4dff',
  fn: '#d9cdf2',
  string: '#9d8fc4',
  plain: '#6d6580',
  dim: '#4b4459',
  accent: '#d4adff',
};

const LINES: Line[] = [
  { indent: 0, segs: [{ w: 34, c: C.keyword }, { w: 52, c: C.fn }, { w: 18, c: C.plain }] },
  { indent: 1, segs: [{ w: 26, c: C.keyword }, { w: 62, c: C.string }] },
  { indent: 1, segs: [{ w: 40, c: C.plain }, { w: 24, c: C.accent }, { w: 46, c: C.dim }] },
  { indent: 2, segs: [{ w: 30, c: C.fn }, { w: 54, c: C.string }] },
  { indent: 2, segs: [{ w: 22, c: C.plain }, { w: 34, c: C.keyword }, { w: 28, c: C.dim }] },
  { indent: 1, segs: [{ w: 46, c: C.fn }, { w: 20, c: C.plain }] },
  { indent: 0, segs: [{ w: 16, c: C.plain }] },
  { indent: 0, segs: [{ w: 38, c: C.keyword }, { w: 44, c: C.fn }, { w: 26, c: C.string }] },
  { indent: 1, segs: [{ w: 58, c: C.dim }, { w: 22, c: C.accent }] },
  { indent: 1, segs: [{ w: 30, c: C.plain }, { w: 40, c: C.string }] },
  { indent: 0, segs: [{ w: 16, c: C.plain }] },
];

export function DevPanel(props: SVGProps<SVGSVGElement>) {
  const top = 42;
  const rowHeight = 12.5;

  return (
    <svg viewBox="0 0 340 218" className={panel.panel} role="img" aria-label="Módulo de desenvolvimento: editor de código" {...props}>
      <defs>
        <linearGradient id="dev-bg" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#171426" />
          <stop offset="1" stopColor="#0f0e17" />
        </linearGradient>
      </defs>

      <rect width="340" height="218" fill="url(#dev-bg)" />

      {/* chrome da janela */}
      <rect width="340" height="27" fill="rgba(246,243,255,.035)" />
      <path d="M0 27h340" stroke="rgba(219,195,255,.14)" strokeWidth="1" />
      <rect x="13" y="11" width="5" height="5" fill="#4b4459" />
      <rect x="23" y="11" width="5" height="5" fill="#4b4459" />
      <rect x="33" y="11" width="5" height="5" fill="#6d5a8c" />
      <rect x="52" y="6.5" width="82" height="14" rx="3" fill="rgba(144,19,254,.16)" stroke="rgba(212,173,255,.22)" />
      <rect x="61" y="12.5" width="46" height="2.4" rx="1.2" fill="#a294c4" />
      <rect x="142" y="6.5" width="62" height="14" rx="3" fill="rgba(246,243,255,.03)" />
      <rect x="150" y="12.5" width="34" height="2.4" rx="1.2" fill="#5b5468" />

      {/* gutter */}
      <path d="M30 27v191" stroke="rgba(219,195,255,.09)" strokeWidth="1" />
      {LINES.map((_, index) => (
        <rect key={`n-${index}`} x="13" y={top + index * rowHeight + 3} width="7" height="2.2" rx="1.1" fill="rgba(246,243,255,.16)" />
      ))}

      {/* código */}
      {LINES.map((line, index) => {
        let x = 40 + line.indent * 15;
        return (
          <g key={`l-${index}`}>
            {line.segs.map((segment, segmentIndex) => {
              const rect = (
                <rect
                  key={`${index}-${segmentIndex}`}
                  x={x}
                  y={top + index * rowHeight}
                  width={segment.w}
                  height="4.4"
                  rx="2.2"
                  fill={segment.c}
                  opacity={segment.c === C.dim ? 0.75 : 0.92}
                />
              );
              x += segment.w + 7;
              return rect;
            })}
          </g>
        );
      })}

      {/* cursor */}
      <rect className={panel.caret} x="70" y={top + 10 * rowHeight - 1.5} width="1.8" height="8" fill={C.accent} />

      {/* barra de status */}
      <rect y="196" width="340" height="22" fill="rgba(246,243,255,.028)" />
      <path d="M0 196h340" stroke="rgba(219,195,255,.12)" strokeWidth="1" />
      <rect x="13" y="204" width="38" height="5" rx="2.5" fill="rgba(189,77,255,.5)" />
      <rect x="59" y="204" width="26" height="5" rx="2.5" fill="rgba(246,243,255,.16)" />
      <rect x="286" y="204" width="41" height="5" rx="2.5" fill="rgba(246,243,255,.12)" />
    </svg>
  );
}
