/**
 * DataPanel — dashboard de BI estilizado (módulo "dados").
 * Os gráficos são formas ilustrativas: nenhum número real de cliente é exibido.
 * A linha do gráfico tem draw-on executado uma única vez ao entrar em cena.
 */
import { useRef, type SVGProps } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/media';
import { duration, ease } from '@/motion/tokens';
import panel from './Panel.module.css';

const HEIGHTS = [34, 52, 44, 68, 58, 82, 74, 96, 88];
const BAR_W = 16;
const BAR_GAP = 21;
const BASE_X = 24;
const BASE_Y = 206;

const barX = (index: number) => BASE_X + index * (BAR_W + BAR_GAP);
const barCenter = (index: number) => barX(index) + BAR_W / 2;
const barTop = (index: number) => BASE_Y - HEIGHTS[index] - 10;

const LINE_POINTS = HEIGHTS.map((_, index) => `${barCenter(index)},${barTop(index)}`).join(' ');
const AREA_PATH = `M ${barCenter(0)} ${BASE_Y - 4} L ${LINE_POINTS.split(' ')
  .map((point) => point.replace(',', ' '))
  .join(' L ')} L ${barCenter(HEIGHTS.length - 1)} ${BASE_Y - 4} Z`;

export function DataPanel(props: SVGProps<SVGSVGElement>) {
  const rootRef = useRef<SVGSVGElement>(null);

  // Draw-on da linha do gráfico: uma vez, ao entrar em cena.
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) return;

      const line = root.querySelector<SVGPolylineElement>('[data-chart-line]');
      const area = root.querySelector<SVGPathElement>('[data-chart-area]');
      const points = root.querySelectorAll<SVGCircleElement>('[data-chart-point]');
      if (!line) return;

      try {
        const length = line.getTotalLength();

        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        gsap.set([area, points], { autoAlpha: 0 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root, start: 'top 88%', once: true },
        })
          .to(line, {
            strokeDashoffset: 0,
            duration: duration.scene,
            ease: ease.inOut,
            clearProps: 'strokeDasharray,strokeDashoffset',
          })
          .to(area, { autoAlpha: 1, duration: duration.enter, ease: ease.outSoft }, '-=0.45')
          .to(points, { autoAlpha: 1, duration: 0.3, stagger: 0.035, ease: ease.outSoft }, '-=0.5');

        if (ScrollTrigger.getAll().length === 0) {
          tl.progress(1);
          gsap.set([line, area, points], { clearProps: 'all' });
        }
      } catch (error) {
        console.warn('[FlexTech] DataPanel: draw-on desativado:', error);
        gsap.set(root.querySelectorAll('[data-chart-line],[data-chart-area],[data-chart-point]'), {
          clearProps: 'all',
        });
      }
    },
    { scope: rootRef },
  );

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 360 236"
      className={panel.panel}
      role="img"
      aria-label="Módulo de dados: dashboard com indicadores e gráfico"
      {...props}
    >
      <defs>
        <linearGradient id="bi-bg" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#181429" />
          <stop offset="1" stopColor="#0f0e17" />
        </linearGradient>
        <linearGradient id="bi-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#7d10e8" />
          <stop offset="1" stopColor="#bd4dff" />
        </linearGradient>
        <linearGradient id="bi-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(189,77,255,.34)" />
          <stop offset="1" stopColor="rgba(189,77,255,0)" />
        </linearGradient>
      </defs>

      <rect width="360" height="236" fill="url(#bi-bg)" />

      {/* chrome */}
      <rect width="360" height="27" fill="rgba(246,243,255,.035)" />
      <path d="M0 27h360" stroke="rgba(219,195,255,.14)" strokeWidth="1" />
      <rect x="13" y="11.5" width="58" height="4" rx="2" fill="#8f86a3" />
      <rect x="256" y="7.5" width="42" height="12" rx="3" fill="rgba(246,243,255,.05)" stroke="rgba(219,195,255,.14)" />
      <rect x="263" y="12.5" width="22" height="2.4" rx="1.2" fill="#6d6580" />
      <rect x="306" y="7.5" width="41" height="12" rx="3" fill="rgba(144,19,254,.2)" stroke="rgba(212,173,255,.26)" />
      <rect x="313" y="12.5" width="20" height="2.4" rx="1.2" fill="#d4adff" />

      {/* KPIs */}
      {[0, 1, 2].map((tile) => {
        const x = 13 + tile * 114;
        return (
          <g key={tile}>
            <rect x={x} y="40" width="106" height="46" rx="5" fill="rgba(246,243,255,.035)" stroke="rgba(219,195,255,.12)" />
            <rect x={x + 11} y="51" width="34" height="3" rx="1.5" fill="#6d6580" />
            <rect x={x + 11} y="62" width={tile === 1 ? 44 : 56} height="8" rx="2" fill="#ece6fa" opacity="0.9" />
            <polygon
              points={`${x + 11},79 ${x + 16},73 ${x + 21},79`}
              fill={tile === 2 ? '#8f86a3' : '#bd4dff'}
              opacity="0.85"
            />
            <rect x={x + 25} y="75.5" width="24" height="3" rx="1.5" fill="rgba(219,195,255,.3)" />
          </g>
        );
      })}

      {/* gráfico */}
      <rect x="13" y="98" width="334" height="124" rx="6" fill="rgba(246,243,255,.02)" stroke="rgba(219,195,255,.1)" />
      {[124, 150, 176, 202].map((y) => (
        <path key={y} d={`M24 ${y}h312`} stroke="rgba(219,195,255,.07)" strokeWidth="1" />
      ))}

      {HEIGHTS.map((height, index) => (
        <rect
          key={`bar-${index}`}
          x={barX(index)}
          y={BASE_Y - height}
          width={BAR_W}
          height={height}
          rx="2"
          fill={index >= HEIGHTS.length - 2 ? 'url(#bi-bar)' : 'rgba(219,195,255,.17)'}
        />
      ))}

      <path data-chart-area="" d={AREA_PATH} fill="url(#bi-area)" />
      <polyline
        data-chart-line=""
        points={LINE_POINTS}
        fill="none"
        stroke="#d4adff"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.92"
      />
      {HEIGHTS.map((_, index) => (
        <circle
          key={`pt-${index}`}
          data-chart-point=""
          cx={barCenter(index)}
          cy={barTop(index)}
          r="2"
          fill="#0f0e17"
          stroke="#d4adff"
          strokeWidth="1.2"
        />
      ))}
    </svg>
  );
}
