/**
 * Lenis como melhoria progressiva.
 * ---------------------------------------------------------------------------
 * Regras seguidas à risca (ver skills `gsap-web` / `scrolltrigger-lenis`):
 *
 *  1. **Um único loop.** `autoRaf: false` e o ticker do GSAP dirigindo o Lenis
 *     (`lenis.raf(time * 1000)` — o ticker entrega segundos, o Lenis quer
 *     milissegundos). Nunca há um `requestAnimationFrame` próprio aqui.
 *  2. **ScrollTrigger sincronizado** via `lenis.on('scroll', ScrollTrigger.update)`.
 *  3. **`gsap.ticker.lagSmoothing(0)`** para não haver "catch-up" em quadros pesados.
 *  4. **Sem `scrollerProxy`** — o Lenis rola o documento real.
 *  5. **Cleanup completo** (`ticker.remove` + `lenis.destroy`) — nada empilha no
 *     Strict Mode nem entre navegações.
 *  6. **Só desktop com ponteiro fino e sem movimento reduzido.** No mobile o
 *     scroll nativo é preservado: não interceptamos gestos de toque.
 */
import { useEffect } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger, gsap } from '@/lib/gsap';
import { media, onMediaChange, shouldSmoothScroll } from '@/lib/media';
import { headerOffset, setLenisInstance } from '@/lib/scroll';

export function useSmoothScroll(): void {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let raf: ((time: number) => void) | null = null;
    const disposers: Array<() => void> = [];

    const teardown = () => {
      if (raf) {
        gsap.ticker.remove(raf);
        raf = null;
      }
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
      setLenisInstance(null);
      // Restaura o comportamento padrão do ticker.
      gsap.ticker.lagSmoothing(500, 33);
    };

    const setup = () => {
      if (lenis || !shouldSmoothScroll()) return;

      lenis = new Lenis({
        autoRaf: false, // o ticker do GSAP é o único loop
        smoothWheel: true,
        duration: 1.05,
        wheelMultiplier: 0.92,
        touchMultiplier: 1,
        respectReducedMotion: true,
        gestureOrientation: 'vertical',
      });

      lenis.on('scroll', ScrollTrigger.update);

      raf = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      setLenisInstance(lenis);

      // O offset do header pode mudar (fonte carregada, resize): recalcula.
      ScrollTrigger.refresh();
    };

    setup();

    // Reage a mudança de viewport e a troca da preferência de movimento:
    // abaixo do desktop (ou sem ponteiro fino) voltamos ao scroll nativo.
    const sync = (ok: boolean) => (ok ? setup() : teardown());
    disposers.push(onMediaChange(media.desktop, sync));
    disposers.push(onMediaChange(media.finePointer, sync));
    disposers.push(
      onMediaChange(media.reducedMotion, (reduced) => {
        if (reduced) teardown();
        else setup();
      }),
    );

    return () => {
      disposers.forEach((dispose) => dispose());
      teardown();
    };
  }, []);
}

/** Expõe o offset do header para componentes que montam links de âncora. */
export { headerOffset };
