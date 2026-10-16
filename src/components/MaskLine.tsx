/**
 * MaskLine — revelação de linha com máscara.
 * ---------------------------------------------------------------------------
 * O texto fica dentro de um bloco com `overflow: hidden` e sobe de `yPercent`
 * (compositor-only). O conteúdo existe no HTML e é visível por padrão no CSS:
 * o estado "abaixo da máscara" só é aplicado pelo GSAP, e qualquer falha devolve
 * os estilos inline (`clearProps`) para que nada fique invisível.
 */
import { useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/media';
import { ease } from '@/motion/tokens';
import { cx } from '@/lib/cx';
import styles from './MaskLine.module.css';

type MaskLineProps = {
  children: ReactNode;
  /** Atraso dentro da timeline (em segundos). */
  delay?: number;
  className?: string;
  /** Revela no scroll (padrão). `false` revela na montagem. */
  onScroll?: boolean;
  /**
   * `true` quando uma timeline pai (ex.: hero) controla a revelação.
   * O elemento continua marcado com `data-mask-inner` para ser selecionado.
   */
  manual?: boolean;
};

export function MaskLine({
  children,
  delay = 0,
  className,
  onScroll = true,
  manual = false,
}: MaskLineProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || manual || prefersReducedMotion()) return;

      const inner = root.firstElementChild;
      if (!(inner instanceof HTMLElement)) return;

      try {
        gsap.fromTo(
          inner,
          { yPercent: 112 },
          {
            yPercent: 0,
            duration: 0.82,
            ease: ease.outExpo,
            delay,
            clearProps: 'transform,willChange',
            ...(onScroll
              ? {
                  scrollTrigger: {
                    trigger: root,
                    start: 'top 90%',
                    once: true,
                  },
                }
              : {}),
          },
        );

        // Se o motor não criou gatilho algum, o texto ficaria escondido.
        if (onScroll && ScrollTrigger.getAll().length === 0) {
          gsap.set(inner, { clearProps: 'all' });
        }
      } catch (error) {
        console.warn('[FlexTech] MaskLine desativado por segurança:', error);
        gsap.set(inner, { clearProps: 'all' });
      }
    },
    { scope: ref, dependencies: [manual, onScroll, delay] },
  );

  return (
    <span className={cx(styles.mask, className)} ref={ref}>
      <span className={styles.inner} data-mask-inner="">
        {children}
      </span>
    </span>
  );
}
