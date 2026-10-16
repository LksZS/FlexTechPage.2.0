/**
 * Hero — primeira dobra.
 * ---------------------------------------------------------------------------
 * Título, proposta de valor e CTAs estão no HTML e visíveis sem JavaScript.
 * Não há preloader: a timeline de entrada roda imediatamente e não bloqueia
 * clique algum (os botões existem e são acionáveis desde o primeiro quadro).
 */
import { useRef } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { MaskLine } from '@/components/MaskLine';
import { ButtonLink } from '@/components/Button';
import { HeroStage } from '@/components/visuals/HeroStage';
import { useGSAP, gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/media';
import { duration, ease, stagger } from '@/motion/tokens';
import { trackCta } from '@/lib/analytics';
import { cta, people } from '@/config/site';
import { cx } from '@/lib/cx';
import styles from './Hero.module.css';

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) return;

      const eyebrow = root.querySelector('[data-hero="eyebrow"]');
      const lines = root.querySelectorAll('[data-hero-title] [data-mask-inner]');
      const lead = root.querySelector('[data-hero="lead"]');
      const actions = root.querySelector('[data-hero="actions"]');
      const trust = root.querySelector('[data-hero="trust"]');

      const targets = [eyebrow, ...lines, lead, actions, trust].filter(
        (el): el is Element => el instanceof Element,
      );
      if (targets.length === 0) return;

      try {
        const tl = gsap.timeline({ defaults: { ease: ease.out } });

        if (eyebrow) {
          tl.from(eyebrow, { y: 14, opacity: 0, duration: duration.enter }, 0);
        }
        if (lines.length) {
          tl.from(
            lines,
            {
              yPercent: 112,
              duration: duration.scene,
              ease: ease.outExpo,
              stagger: stagger.relaxed,
            },
            0.1,
          );
        }
        if (lead) {
          tl.from(lead, { y: 20, opacity: 0, duration: duration.enterSlow }, 0.42);
        }
        if (actions) {
          tl.from(actions, { y: 20, opacity: 0, duration: duration.enterSlow }, 0.52);
        }
        if (trust) {
          tl.from(trust, { y: 14, opacity: 0, duration: duration.enter }, 0.66);
        }
      } catch (error) {
        console.warn('[FlexTech] entrada do hero desativada por segurança:', error);
        gsap.set(targets, { clearProps: 'all' });
      }
    },
    { scope: rootRef },
  );

  return (
    <section id="topo" className={styles.hero} ref={rootRef} aria-labelledby="hero-title">
      <div className={cx('container', styles.inner)}>
        <div className={styles.copy}>
          <p className={styles.eyebrow} data-hero="eyebrow">
            <span>Desenvolvimento</span>
            <span className={styles.dot} aria-hidden="true" />
            <span>Design</span>
            <span className={styles.dot} aria-hidden="true" />
            <span>Automação</span>
          </p>

          <h1 id="hero-title" className={styles.title} data-hero-title="">
            <MaskLine manual>Soluções digitais.</MaskLine>
            <MaskLine manual>
              Possibilidades <span className={styles.accent}>sem limites</span>.
            </MaskLine>
          </h1>

          <p className={styles.lead} data-hero="lead">
            Criamos sites, aplicações e automações que conectam sua empresa ao próximo passo.
          </p>

          <div className={styles.actions} data-hero="actions">
            <ButtonLink
              href="#contato"
              size="lg"
              trailingIcon={<ArrowUpRight size={18} strokeWidth={2.1} aria-hidden />}
              trackLocation="hero"
            >
              {cta.hero}
            </ButtonLink>

            <ButtonLink
              href="#projetos"
              variant="secondary"
              size="lg"
              trailingIcon={<ArrowRight size={18} strokeWidth={2} aria-hidden />}
              onClick={() => trackCta('hero', cta.heroSecondary)}
            >
              {cta.heroSecondary}
            </ButtonLink>
          </div>

          <div className={styles.trust} data-hero="trust">
            <span className={styles.monograms} aria-hidden="true">
              <span className={styles.monogram}>{people.lucas.initials}</span>
              <span className={styles.monogram}>{people.igor.initials}</span>
            </span>
            <p className={styles.trustText}>
              Você fala direto com quem executa o projeto — <strong>Lucas</strong> ou{' '}
              <strong>Igor</strong>, no WhatsApp.
            </p>
          </div>
        </div>

        <div className={styles.visual}>
          <HeroStage delay={0.3} />
        </div>
      </div>

      <p className={styles.hint} aria-hidden="true">
        <span className={styles.hintLabel}>Role para explorar</span>
        <span className={styles.hintLine}>
          <ArrowDown size={14} strokeWidth={2} />
        </span>
      </p>
    </section>
  );
}
