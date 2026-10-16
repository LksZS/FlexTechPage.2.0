/**
 * Reveals de scroll — utilitário compartilhado.
 * ---------------------------------------------------------------------------
 * Padrão: `ScrollTrigger.batch` (menos triggers, stagger natural por lote) com
 * estado inicial aplicado por `gsap.set`. Todo o CSS autoral permanece visível:
 * o estado "escondido" só existe depois que o GSAP confirma que criou os
 * triggers. Se algo falhar, limpamos os inline styles e o conteúdo aparece.
 *
 * Com `prefers-reduced-motion` nada é criado — os elementos já estão visíveis
 * no CSS, então não há "teleporte" nem perda de informação.
 *
 * Deve ser chamado dentro de `useGSAP({ scope })`: o revert de tweens e
 * ScrollTriggers no unmount é responsabilidade do contexto do React, o que
 * evita contextos aninhados e acúmulo de instâncias no Strict Mode.
 */
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/media';
import { distance, duration, ease, stagger } from './tokens';

export type RevealVariant = 'up' | 'fade' | 'left' | 'right' | 'scale';

const VARIANTS: Record<RevealVariant, { from: gsap.TweenVars; to: gsap.TweenVars }> = {
  up: { from: { y: distance.reveal, opacity: 0 }, to: { y: 0, opacity: 1 } },
  fade: { from: { opacity: 0 }, to: { opacity: 1 } },
  left: { from: { x: -distance.reveal, opacity: 0 }, to: { x: 0, opacity: 1 } },
  right: { from: { x: distance.reveal, opacity: 0 }, to: { x: 0, opacity: 1 } },
  scale: { from: { scale: 0.974, opacity: 0 }, to: { scale: 1, opacity: 1 } },
};

export const REVEAL_SELECTOR = '[data-reveal]';

export function initReveals(root: Element | null): void {
  if (!root || prefersReducedMotion()) return;

  const targets = Array.from(root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
  if (targets.length === 0) return;

  try {
    const variants = Object.entries(VARIANTS) as [RevealVariant, (typeof VARIANTS)[RevealVariant]][];

    for (const [variant, { from, to }] of variants) {
      const group = targets.filter((el) => (el.dataset.reveal || 'up') === variant);
      if (group.length === 0) continue;

      // Estado inicial só é aplicado aqui, com o motor já carregado.
      gsap.set(group, from);

      ScrollTrigger.batch(group, {
        start: 'top 92%',
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            ...to,
            duration: duration.enter,
            ease: ease.out,
            stagger: stagger.short,
            overwrite: true,
            clearProps: 'transform,willChange',
          });
        },
      });
    }

    // Rede de segurança: se nenhum trigger foi criado, nada revelaria o
    // conteúdo — devolvemos os elementos ao estado definido no CSS.
    if (ScrollTrigger.getAll().length === 0) {
      gsap.set(targets, { clearProps: 'all' });
    }
  } catch (error) {
    console.warn('[FlexTech] reveals desativados por segurança:', error);
    gsap.set(targets, { clearProps: 'all' });
  }
}

/**
 * Revela um grupo específico (ex.: itens de um grid que muda depois da
 * montagem), sem depender do atributo `data-reveal`.
 */
export function revealOnce(elements: Element[], options?: { delay?: number }): void {
  if (elements.length === 0 || prefersReducedMotion()) return;
  try {
    gsap.from(elements, {
      y: distance.nudge,
      opacity: 0,
      duration: duration.base,
      ease: ease.outSoft,
      stagger: stagger.tight,
      delay: options?.delay ?? 0,
      clearProps: 'transform,opacity,willChange',
    });
  } catch (error) {
    console.warn('[FlexTech] revealOnce falhou:', error);
    gsap.set(elements, { clearProps: 'all' });
  }
}
