/**
 * HeroStage — composição visual da primeira dobra.
 * ---------------------------------------------------------------------------
 * Geometria derivada do símbolo: planos angulares sobrepostos, módulos
 * conectados e profundidade em camadas. SVG + transform (nada de cena 3D):
 * leve, nítido em qualquer DPI e barato de compor.
 *
 * Movimento:
 *  - entrada única coordenada (camadas em stagger curto);
 *  - parallax de ponteiro de pequena amplitude, só em `(hover) and (pointer: fine)`;
 *  - parallax de scroll de pequena amplitude, só no desktop;
 *  - nada disso existe com `prefers-reduced-motion`.
 */
import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { media, prefersReducedMotion } from '@/lib/media';
import { distance, duration, ease, stagger } from '@/motion/tokens';
import { DevPanel } from './DevPanel';
import { DataPanel } from './DataPanel';
import { FlowPanel } from './FlowPanel';
import { cx } from '@/lib/cx';
import styles from './HeroStage.module.css';

type HeroStageProps = {
  /** Atraso da entrada, para casar com a timeline do hero. */
  delay?: number;
  className?: string;
};

const LAYERS = ['[data-layer="dev"]', '[data-layer="data"]', '[data-layer="flow"]'] as const;

export function HeroStage({ delay = 0.28, className }: HeroStageProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) return;

      const layers = LAYERS.map((selector) => root.querySelector<HTMLElement>(selector)).filter(
        (layer): layer is HTMLElement => layer !== null,
      );
      const planes = root.querySelector<HTMLElement>('[data-planes]');

      // Entrada: uma vez, sem bloquear cliques (nada de overlay ou preloader).
      gsap.fromTo(
        layers,
        { y: 54, opacity: 0, scale: 0.965 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: duration.scene,
          ease: ease.out,
          stagger: stagger.relaxed,
          delay,
          clearProps: 'transform,opacity,willChange',
        },
      );

      if (planes) {
        gsap.fromTo(
          planes,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: duration.scene * 1.2, ease: ease.outSoft, delay: delay * 0.6, clearProps: 'transform,opacity' },
        );
      }

      // Parallax responsivo: só onde faz sentido (e nunca nos dois eixos no mobile).
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: media.desktop,
          fine: media.finePointer,
          motionOk: media.motionOk,
        },
        (context) => {
          const { desktop, fine, motionOk } = context.conditions as {
            desktop: boolean;
            fine: boolean;
            motionOk: boolean;
          };
          if (!motionOk) return;

          // Scroll: amplitude pequena, sem pin e sem hijacking.
          if (desktop) {
            gsap.to(layers[1] ?? root, {
              y: -distance.parallax * 1.6,
              ease: ease.none,
              scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.6 },
            });
            gsap.to(layers[0] ?? root, {
              y: distance.parallax,
              ease: ease.none,
              scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.6 },
            });
            gsap.to(planes ?? root, {
              y: distance.parallax * 2.1,
              ease: ease.none,
              scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.8 },
            });
          }

          // Ponteiro: quickTo (uma função por propriedade, sem listener pesado).
          if (fine && desktop) {
            const tweens = layers.map((layer, index) => {
              const factor = [0.55, 1, 1.45][index] ?? 1;
              return {
                x: gsap.quickTo(layer, 'x', { duration: 0.7, ease: ease.outSoft }),
                y: gsap.quickTo(layer, 'y', { duration: 0.7, ease: ease.outSoft }),
                factor,
              };
            });

            const onPointerMove = (event: PointerEvent) => {
              if (event.pointerType !== 'mouse') return;
              const rect = root.getBoundingClientRect();
              const nx = (event.clientX - rect.left) / rect.width - 0.5;
              const ny = (event.clientY - rect.top) / rect.height - 0.5;
              tweens.forEach((tween) => {
                tween.x(nx * distance.parallaxPointer * tween.factor);
                tween.y(ny * distance.parallaxPointer * tween.factor * 0.7);
              });
            };

            const onPointerLeave = () => {
              tweens.forEach((tween) => {
                tween.x(0);
                tween.y(0);
              });
            };

            root.addEventListener('pointermove', onPointerMove, { passive: true });
            root.addEventListener('pointerleave', onPointerLeave, { passive: true });

            return () => {
              root.removeEventListener('pointermove', onPointerMove);
              root.removeEventListener('pointerleave', onPointerLeave);
            };
          }

          return undefined;
        },
      );

      // Garantia: se nenhum gatilho foi criado, nada pode ficar invisível.
      if (ScrollTrigger.getAll().length === 0) {
        gsap.set([...layers, planes].filter(Boolean), { clearProps: 'all' });
      }
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={cx(styles.stage, className)} aria-hidden="true">
      <div className={styles.glow} data-planes="">
        <BackdropPlanes className={styles.planes} />
      </div>

      <div className={styles.layer} data-layer="dev">
        <div className={cx(styles.layerInner, styles.tiltLeft)}>
          <DevPanel />
        </div>
      </div>

      <div className={styles.layer} data-layer="data">
        <div className={cx(styles.layerInner, styles.tiltRight)}>
          <DataPanel />
        </div>
      </div>

      <div className={styles.layer} data-layer="flow">
        <div className={cx(styles.layerInner, styles.tiltLeftSoft)}>
          <FlowPanel />
        </div>
      </div>
    </div>
  );
}

/** Planos angulares de fundo — profundidade sem peso. */
function BackdropPlanes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 620 600" className={className} focusable="false">
      <defs>
        <pattern id="hero-dots" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="1.4" cy="1.4" r="1.1" fill="rgba(219,195,255,.22)" />
        </pattern>
        <linearGradient id="hero-plane" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(144,19,254,.16)" />
          <stop offset="1" stopColor="rgba(144,19,254,0)" />
        </linearGradient>
      </defs>

      <rect width="620" height="600" fill="url(#hero-dots)" opacity="0.5" />

      <polygon
        points="42,132 300,44 566,146 300,238"
        fill="url(#hero-plane)"
        stroke="rgba(219,195,255,.14)"
        strokeWidth="1"
      />
      <polygon
        points="96,336 356,248 600,346 340,442"
        fill="none"
        stroke="rgba(219,195,255,.1)"
        strokeWidth="1"
      />
      <polygon
        points="404,66 552,118 486,190 372,140"
        fill="rgba(189,77,255,.07)"
        stroke="rgba(212,173,255,.2)"
        strokeWidth="1"
      />

      {/* módulos conectados */}
      <path
        d="M300 44v194M300 238 340 442M566 146 600 346M42 132 96 336"
        stroke="rgba(212,173,255,.14)"
        strokeWidth="1"
        strokeDasharray="3 6"
      />
      <circle cx="300" cy="238" r="3" fill="rgba(212,173,255,.5)" />
      <circle cx="566" cy="146" r="2.4" fill="rgba(189,77,255,.55)" />
      <circle cx="96" cy="336" r="2.4" fill="rgba(212,173,255,.35)" />
    </svg>
  );
}
