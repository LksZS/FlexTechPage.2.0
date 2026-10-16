/**
 * Política de movimento em nível de página.
 * ---------------------------------------------------------------------------
 *  - Pausa o trabalho contínuo quando a aba fica oculta (economia real de
 *    bateria/CPU no iPhone e em desktop).
 *  - Recalcula as medições do ScrollTrigger **uma vez** depois que as fontes e
 *    as imagens terminam de carregar — nunca em loop, o que causaria jank.
 *  - Kill switch de movimento reduzido: se o usuário ativar a preferência com a
 *    página já aberta, matamos tweens/gatilhos e devolvemos tudo ao estado do
 *    CSS (nada fica invisível). Reativar o movimento pede um reload — comportamento
 *    conservador e documentado.
 */
import { useEffect } from 'react';
import { ScrollTrigger, gsap } from '@/lib/gsap';
import { media, onMediaChange } from '@/lib/media';

export function usePageMotion(): void {
  // Aba oculta → pausa a timeline global (o ticker continua, então Lenis e
  // ScrollTrigger seguem sincronizados ao voltar).
  useEffect(() => {
    const onVisibilityChange = () => {
      gsap.globalTimeline.paused(document.hidden);
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      gsap.globalTimeline.paused(false);
    };
  }, []);

  // Um único refresh após fontes/imagens. O debounce protege contra múltiplos
  // eventos disparando medições repetidas.
  useEffect(() => {
    let timer = 0;

    const refreshOnce = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 180);
    };

    if (document.readyState === 'complete') {
      refreshOnce();
    } else {
      window.addEventListener('load', refreshOnce, { once: true });
    }

    if ('fonts' in document) {
      document.fonts.ready.then(refreshOnce).catch(() => {
        /* defensivo: fonts.ready não rejeita nos navegadores suportados */
      });
    }

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', refreshOnce);
    };
  }, []);

  // prefers-reduced-motion ligado com a página aberta.
  useEffect(
    () =>
      onMediaChange(media.reducedMotion, (reduced) => {
        if (!reduced) return;

        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        gsap.globalTimeline.clear();
        gsap.globalTimeline.paused(false);

        document
          .querySelectorAll<HTMLElement>('[data-reveal], [data-mask-inner]')
          .forEach((el) => gsap.set(el, { clearProps: 'all' }));
      }),
    [],
  );
}
