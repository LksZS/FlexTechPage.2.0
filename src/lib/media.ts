/**
 * Detecção de capacidades — sem user-agent sniffing.
 * Decisões conservadoras baseadas em media queries (o que o dispositivo
 * declara suportar/preferir) e não em suposições sobre o aparelho.
 */

export const media = {
  reducedMotion: '(prefers-reduced-motion: reduce)',
  motionOk: '(prefers-reduced-motion: no-preference)',
  /** Ponteiro preciso + hover real: mouse, trackpad. Exclui toque. */
  finePointer: '(hover: hover) and (pointer: fine)',
  coarsePointer: '(hover: none), (pointer: coarse)',
  tabletUp: '(min-width: 48rem)',
  desktop: '(min-width: 64rem)',
  wide: '(min-width: 90rem)',
} as const;

export function matches(query: string): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia(query).matches;
}

export function onMediaChange(query: string, handler: (matches: boolean) => void): () => void {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {};
  const mql = window.matchMedia(query);
  const listener = (event: MediaQueryListEvent) => handler(event.matches);
  mql.addEventListener('change', listener);
  handler(mql.matches);
  return () => mql.removeEventListener('change', listener);
}

export const prefersReducedMotion = (): boolean => matches(media.reducedMotion);
export const hasFinePointer = (): boolean => matches(media.finePointer);
export const isDesktop = (): boolean => matches(media.desktop);

/**
 * Lenis é melhoria progressiva:
 *  - desktop (>= 64rem) e ponteiro fino  → roda (scroll de roda suavizado);
 *  - mobile/touch                        → scroll nativo preservado (padrão);
 *  - prefers-reduced-motion              → nunca instancia.
 * Assim não interceptamos gestos de toque nem criamos um segundo loop de rAF.
 */
export const shouldSmoothScroll = (): boolean =>
  !prefersReducedMotion() && hasFinePointer() && isDesktop();
