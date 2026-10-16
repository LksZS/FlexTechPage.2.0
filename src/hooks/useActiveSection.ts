import { useEffect, useState } from 'react';
import { headerOffset } from '@/lib/scroll';

/**
 * Seção ativa para o `aria-current` da navegação.
 * Leitura barata: um listener passivo + um rAF por quadro (sem layout thrash —
 * todas as leituras de `getBoundingClientRect` acontecem no mesmo quadro).
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    const compute = () => {
      frame = 0;
      const threshold = headerOffset() + 32;
      let current: string | null = null;

      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top - threshold <= 0) current = id;
      }

      const doc = document.documentElement;
      const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 8;
      if (atBottom) current = ids[ids.length - 1] ?? current;

      setActive((previous) => (previous === current ? previous : current));
    };

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);

  return active;
}
