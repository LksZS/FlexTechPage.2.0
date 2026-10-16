/**
 * Barra inferior mobile — atalho permanente para o contato.
 * ---------------------------------------------------------------------------
 *  - Aparece depois do hero e some quando a seção de contato está na tela
 *    (não cobre campos nem foco do formulário);
 *  - Respeita `env(safe-area-inset-bottom)`;
 *  - O body recebe padding equivalente no mobile, então nada fica encoberto;
 *  - Fora de cena: `inert` — sai da ordem de foco e da árvore de acessibilidade;
 *  - Sem pop-up, sem escassez falsa: é um atalho, não uma interrupção.
 */
import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AnchorLink } from '@/components/AnchorLink';
import { cta } from '@/config/site';
import { trackCta } from '@/lib/analytics';
import { cx } from '@/lib/cx';
import styles from './MobileCtaBar.module.css';

export function MobileCtaBar() {
  const [scrolled, setScrolled] = useState(false);
  const [contactInView, setContactInView] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > window.innerHeight * 0.55);
    };

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    const contact = document.getElementById('contato');
    let observer: IntersectionObserver | undefined;
    if (contact && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => setContactInView(entry?.isIntersecting ?? false),
        { rootMargin: '-8% 0px -8% 0px' },
      );
      observer.observe(contact);
    }

    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      observer?.disconnect();
    };
  }, []);

  const visible = scrolled && !contactInView;

  return (
    <div className={cx(styles.bar, visible && styles.barVisible)} inert={!visible}>
      <div className={styles.inner}>
        <AnchorLink
          href="#contato"
          className={styles.button}
          onClick={() => trackCta('mobile_bar', cta.primary)}
        >
          <span>{cta.primary}</span>
          <ArrowUpRight size={17} strokeWidth={2.1} aria-hidden />
        </AnchorLink>
        <span className={styles.hint}>Sem formulário longo: a conversa vai para o WhatsApp.</span>
      </div>
    </div>
  );
}
