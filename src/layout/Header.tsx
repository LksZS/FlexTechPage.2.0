/**
 * Header sticky + navegação.
 * ---------------------------------------------------------------------------
 *  - Fundo legível sempre; blur apenas no desktop com ponteiro fino e só depois
 *    do primeiro scroll (uma única superfície com `backdrop-filter` no site).
 *  - Menu mobile: disclosure (`aria-expanded`/`aria-controls`), `inert` quando
 *    fechado, trap de foco, Escape fecha, scroll travado com compensação de
 *    scrollbar, foco devolvido ao botão.
 *  - Seção ativa marcada com `aria-current` **e** com um marcador visual
 *    (nunca só cor).
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Brand } from '@/components/Brand';
import { ButtonLink } from '@/components/Button';
import { AnchorLink } from '@/components/AnchorLink';
import { InstagramGlyph, WhatsAppGlyph } from '@/components/Icon';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useScrollLock } from '@/hooks/useScrollLock';
import { media, onMediaChange } from '@/lib/media';
import { trackCta } from '@/lib/analytics';
import { company, cta, nav, people } from '@/config/site';
import { cx } from '@/lib/cx';
import styles from './Header.module.css';

const NAV_IDS = nav.map((item) => item.id);

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(NAV_IDS);

  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const restoreFocus = useCallback(() => toggleRef.current, []);

  useScrollLock(menuOpen);
  useFocusTrap({
    active: menuOpen,
    containerRef: panelRef,
    onEscape: closeMenu,
    restoreFocusTo: restoreFocus,
  });

  // Estado de scroll (fundo do header) — listener passivo + 1 rAF por quadro.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);
    };
    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Cresceu para desktop → fecha o menu (evita painel preso em viewport larga).
  useEffect(
    () =>
      onMediaChange(media.tabletUp, (isTabletUp) => {
        if (isTabletUp) setMenuOpen(false);
      }),
    [],
  );

  return (
    <header
      id="header"
      className={cx(styles.header, scrolled && styles.headerScrolled)}
      data-scrolled={scrolled ? 'true' : 'false'}
    >
      <div className={cx('container', styles.inner)}>
        <AnchorLink
          href="#topo"
          className={styles.brandLink}
          aria-label="FlexTech — voltar ao início"
          onNavigate={closeMenu}
        >
          <Brand />
        </AnchorLink>

        <nav className={styles.nav} aria-label="Seções do site">
          <ul className={styles.navList}>
            {nav.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <AnchorLink
                    href={item.href}
                    className={cx(styles.navLink, isActive && styles.navLinkActive)}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {item.label}
                    <span className={styles.navMarker} aria-hidden="true" />
                  </AnchorLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <ButtonLink
            href="#contato"
            className={styles.headerCta}
            trailingIcon={<ArrowUpRight size={16} strokeWidth={2.1} aria-hidden />}
            onClick={() => trackCta('header', cta.primary)}
          >
            {cta.primary}
          </ButtonLink>

          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuOpen((open) => !open)}
            data-open={menuOpen ? 'true' : 'false'}
          >
            <span className={styles.burger} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        ref={panelRef}
        className={styles.panel}
        data-open={menuOpen ? 'true' : 'false'}
        inert={!menuOpen}
      >
        <nav aria-label="Seções do site (menu)">
          <ul className={styles.panelList}>
            {nav.map((item, index) => (
              <li key={item.id}>
                <AnchorLink
                  href={item.href}
                  className={styles.panelLink}
                  onNavigate={closeMenu}
                  aria-current={activeSection === item.id ? 'true' : undefined}
                >
                  <span className={styles.panelIndex}>0{index + 1}</span>
                  {item.label}
                </AnchorLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.panelFoot}>
          <ButtonLink
            href="#contato"
            size="lg"
            block
            onNavigate={closeMenu}
            trailingIcon={<ArrowUpRight size={17} strokeWidth={2.1} aria-hidden />}
            onClick={() => trackCta('menu_mobile', cta.primary)}
          >
            {cta.primary}
          </ButtonLink>

          <ul className={styles.panelContacts}>
            <li>
              <a
                className={styles.panelContact}
                href={people.lucas.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCta('menu_mobile', 'whatsapp_lucas')}
              >
                <WhatsAppGlyph width={17} height={17} />
                <span>Lucas</span>
                <span className={styles.panelContactValue}>{people.lucas.phoneLabel}</span>
              </a>
            </li>
            <li>
              <a
                className={styles.panelContact}
                href={people.igor.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCta('menu_mobile', 'whatsapp_igor')}
              >
                <WhatsAppGlyph width={17} height={17} />
                <span>Igor</span>
                <span className={styles.panelContactValue}>{people.igor.phoneLabel}</span>
              </a>
            </li>
            <li>
              <a
                className={styles.panelContact}
                href={company.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCta('menu_mobile', 'instagram')}
              >
                <InstagramGlyph width={17} height={17} />
                <span>Instagram</span>
                <span className={styles.panelContactValue}>{company.instagramHandle}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

