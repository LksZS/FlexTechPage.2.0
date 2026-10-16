import { useEffect, useState } from 'react';

/**
 * Estado reativo de uma media query.
 * Inicia em `false` e sincroniza no efeito — o valor real só existe no cliente,
 * então não há "flash" de estado errado.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;

    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);

    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [query]);

  return matches;
}
