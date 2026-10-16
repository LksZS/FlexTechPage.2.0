/**
 * Controle de scroll — um único ponto de acesso.
 * ---------------------------------------------------------------------------
 * Lenis (quando ativo) e scroll nativo (padrão no mobile / movimento reduzido)
 * são expostos pela mesma API. Componentes nunca falam com o Lenis diretamente,
 * o que evita dois loops de rAF e âncoras que "brigam" com o smooth scroll.
 */
import type Lenis from 'lenis';
import { prefersReducedMotion } from '@/lib/media';

let lenis: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null): void {
  lenis = instance;
}

export function isSmoothScrollActive(): boolean {
  return lenis !== null;
}

/** Altura real do header sticky + respiro, em px. */
export function headerOffset(): number {
  const header = document.getElementById('header');
  const height = header?.getBoundingClientRect().height ?? 72;
  return Math.round(height + 16);
}

/**
 * Rola até um alvo (seletor, elemento ou âncora `#id`).
 * Com Lenis ativo, usa `scrollTo` + offset do header; sem Lenis, usa o
 * comportamento nativo (que já respeita `scroll-padding-top` do CSS).
 */
export function scrollToTarget(
  target: string | Element,
  options?: { offset?: number; focus?: boolean },
): void {
  const element =
    typeof target === 'string' ? document.querySelector<HTMLElement>(target) : (target as HTMLElement);

  if (!element) return;

  const offset = options?.offset ?? -headerOffset();

  if (lenis) {
    lenis.scrollTo(element, { offset, duration: prefersReducedMotion() ? 0 : 1.05 });
  } else {
    element.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    });
  }

  if (options?.focus) {
    // Mantém o teclado no contexto certo depois da rolagem.
    window.setTimeout(() => {
      if (element.getAttribute('tabindex') === null) element.setAttribute('tabindex', '-1');
      element.focus({ preventScroll: true });
    }, prefersReducedMotion() ? 0 : 700);
  }
}

/**
 * Travamento de scroll para menu/diálogo (também pausa o Lenis).
 * Compensa a largura da scrollbar para que travar não cause deslocamento
 * lateral (CLS) — em mobile a scrollbar é overlay e a compensação é zero.
 */
export function setScrollLocked(locked: boolean): void {
  const root = document.documentElement;

  if (locked) {
    if (!root.classList.contains('scroll-locked')) {
      const scrollbarWidth = window.innerWidth - root.clientWidth;
      if (scrollbarWidth > 0) root.style.paddingRight = `${scrollbarWidth}px`;
      root.classList.add('scroll-locked');
    }
    lenis?.stop();
    return;
  }

  if (root.classList.contains('scroll-locked')) {
    root.classList.remove('scroll-locked');
    root.style.paddingRight = '';
  }
  lenis?.start();
}
