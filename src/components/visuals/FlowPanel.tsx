/**
 * FlowPanel — fluxo de automação (módulo "automações e integrações").
 * O ponto que percorre o conector é o único loop contínuo do hero: criado no
 * GSAP, pausado fora da viewport e removido com movimento reduzido.
 */
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/media';
import { ease } from '@/motion/tokens';
import panel from './Panel.module.css';
import type { SVGProps } from 'react';

type Node = { x: number; y: number; w: number; h: number; tone: 'violet' | 'neutral' };

const NODES: Node[] = [
  { x: 12, y: 70, w: 86, h: 40, tone: 'violet' },
  { x: 120, y: 26, w: 86, h: 40, tone: 'neutral' },
  { x: 120, y: 116, w: 86, h: 40, tone: 'neutral' },
  { x: 228, y: 70, w: 80, h: 40, tone: 'violet' },
];

const CONNECTORS = [
  'M98 90 H109 V46 H120',
  'M98 90 H109 V136 H120',
  'M206 46 H217 V90 H228',
  'M206 136 H217 V90 H228',
];

/** Percurso do ponto: gatilho → primeira ação → saída. */
const DOT_PATH: Array<{ x: number; y: number; duration: number }> = [
  { x: 11, y: 0, duration: 0.35 },
  { x: 11, y: -44, duration: 0.45 },
  { x: 108, y: -44, duration: 0.7 },
  { x: 119, y: -44, duration: 0.2 },
  { x: 119, y: 0, duration: 0.45 },
  { x: 130, y: 0, duration: 0.25 },
];

export function FlowPanel(props: SVGProps<SVGSVGElement>) {
  const dotRef = useRef<SVGGElement>(null);
  const rootRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const dot = dotRef.current;
      if (!dot || prefersReducedMotion()) return;

      gsap.timeline({
        repeat: -1,
        repeatDelay: 0.9,
        defaults: { ease: ease.inOut },
        scrollTrigger: {
          trigger: rootRef.current ?? dot,
          start: 'top 96%',
          end: 'bottom 4%',
          // pausa fora da tela: nenhum trabalho contínuo invisível
          toggleActions: 'play pause resume pause',
        },
      })
        .set(dot, { autoAlpha: 0, x: 0, y: 0 })
        .to(dot, { autoAlpha: 1, duration: 0.2 })
        .to(dot, { keyframes: DOT_PATH })
        .to(dot, { autoAlpha: 0, duration: 0.25 });
    },
    { scope: rootRef },
  );

  // Segurança extra: sem gatilho criado, o ponto fica parado e visível.
  useEffect(() => {
    if (ScrollTrigger.getAll().length === 0 && dotRef.current) {
      gsap.set(dotRef.current, { clearProps: 'all' });
    }
  }, []);

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 320 184"
      className={panel.panel}
      role="img"
      aria-label="Módulo de automação: fluxo conectando etapas"
      {...props}
    >
      <defs>
        <linearGradient id="flow-bg" x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#151224" />
          <stop offset="1" stopColor="#0e0d16" />
        </linearGradient>
      </defs>

      <rect width="320" height="184" fill="url(#flow-bg)" />

      <rect width="320" height="24" fill="rgba(246,243,255,.03)" />
      <path d="M0 24h320" stroke="rgba(219,195,255,.13)" strokeWidth="1" />
      <rect x="12" y="9.5" width="42" height="4" rx="2" fill="#8f86a3" />
      <rect x="272" y="7" width="36" height="10" rx="5" fill="rgba(189,77,255,.22)" />
      <circle cx="280" cy="12" r="2.4" fill="#bd4dff" />

      {CONNECTORS.map((connector) => (
        <path
          key={connector}
          d={connector}
          fill="none"
          stroke="rgba(212,173,255,.28)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />
      ))}

      {NODES.map((node) => (
        <g key={`${node.x}-${node.y}`}>
          <rect
            x={node.x}
            y={node.y}
            width={node.w}
            height={node.h}
            rx="5"
            fill={node.tone === 'violet' ? 'rgba(144,19,254,.14)' : 'rgba(246,243,255,.045)'}
            stroke={node.tone === 'violet' ? 'rgba(212,173,255,.34)' : 'rgba(219,195,255,.14)'}
          />
          <rect
            x={node.x + 10}
            y={node.y + 13}
            width="14"
            height="14"
            rx="2"
            fill={node.tone === 'violet' ? 'rgba(189,77,255,.42)' : 'rgba(219,195,255,.16)'}
          />
          <rect x={node.x + 31} y={node.y + 14} width={node.w - 46} height="3.4" rx="1.7" fill="#cbbfe4" opacity="0.75" />
          <rect x={node.x + 31} y={node.y + 23} width={node.w - 58} height="3" rx="1.5" fill="#6d6580" />
        </g>
      ))}

      {/* ponto em trânsito — o grupo externo fixa a origem, o interno é animado
          (evita que o GSAP sobrescreva o atributo transform) */}
      <g transform="translate(98 90)">
        <g ref={dotRef}>
          <circle r="6" fill="rgba(189,77,255,.2)" />
          <circle r="2.6" fill="#e5d3ff" />
        </g>
      </g>
    </svg>
  );
}
