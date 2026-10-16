import { useEffect, type RefObject } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

type FocusTrapOptions = {
  active: boolean;
  containerRef: RefObject<HTMLElement | null>;
  onEscape: () => void;
  /** Elemento que recebe foco na abertura. Padrão: `[data-autofocus]` ou o 1º focável. */
  initialFocus?: () => HTMLElement | null;
  /** Elemento que recebe o foco de volta no fechamento. */
  restoreFocusTo?: () => HTMLElement | null;
};

function visibleFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.offsetParent !== null || el === document.activeElement,
  );
}

/**
 * Trap de foco + Escape para menus e diálogos.
 * Guarda o elemento ativo antes de abrir e devolve o foco no fechamento —
 * o requisito de acessibilidade que mais se esquece em overlays.
 */
export function useFocusTrap({
  active,
  containerRef,
  onEscape,
  initialFocus,
  restoreFocusTo,
}: FocusTrapOptions): void {
  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusInitial = () => {
      const target =
        initialFocus?.() ??
        container.querySelector<HTMLElement>('[data-autofocus]') ??
        visibleFocusable(container)[0] ??
        container;

      target.focus({ preventScroll: true });
    };

    // Dá tempo de o overlay terminar de entrar antes de mover o foco.
    const raf = window.requestAnimationFrame(focusInitial);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        event.stopPropagation();
        onEscape();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = visibleFocusable(container);
      if (focusable.length === 0) {
        event.preventDefault();
        container.focus({ preventScroll: true });
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (current === first || !container.contains(current)) {
          event.preventDefault();
          last.focus({ preventScroll: true });
        }
      } else if (current === last || !container.contains(current)) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    document.addEventListener('keydown', onKeyDown, true);

    return () => {
      window.cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKeyDown, true);

      const restoreTo = restoreFocusTo?.() ?? previouslyFocused;
      if (restoreTo && typeof restoreTo.focus === 'function' && document.contains(restoreTo)) {
        restoreTo.focus({ preventScroll: true });
      }
    };
  }, [active, containerRef, onEscape, initialFocus, restoreFocusTo]);
}
