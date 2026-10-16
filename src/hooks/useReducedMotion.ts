import { useMediaQuery } from './useMediaQuery';
import { media } from '@/lib/media';

/** `prefers-reduced-motion: reduce` reativo (o usuário pode trocar sem recarregar). */
export function useReducedMotion(): boolean {
  return useMediaQuery(media.reducedMotion);
}

/** Dispositivo com hover real e ponteiro fino (mouse/trackpad). */
export function useFinePointer(): boolean {
  return useMediaQuery(media.finePointer);
}

/** Viewport de desktop (>= 64rem). */
export function useIsDesktop(): boolean {
  return useMediaQuery(media.desktop);
}
