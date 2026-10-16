import { useEffect } from 'react';
import { setScrollLocked } from '@/lib/scroll';

/**
 * Trava a rolagem do body enquanto um overlay está aberto e destrava no
 * fechamento — inclusive se o componente desmontar com o overlay aberto.
 * Também pausa o Lenis, para que ele não continue interpolando por baixo.
 */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    setScrollLocked(true);
    return () => setScrollLocked(false);
  }, [locked]);
}
