/**
 * Processo — "Do primeiro insight à entrega."
 * ---------------------------------------------------------------------------
 * Desktop: título fixo (sticky, não pin) à esquerda e linha de progresso
 * acompanhando o scroll (scrub em `scaleY` — compositor-only). Cada etapa
 * acende o próprio marcador quando a linha passa por ela.
 * Mobile: sequência vertical natural, sem trechos fixados.
 * Sem `prefers-reduced-motion`: linha completa e marcadores acesos.
 */
import { useRef } from 'react';
import { SectionHeading } from '@/components/SectionHeading';
import { processSteps } from '@/data/process';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/media';
import { ease } from '@/motion/tokens';
import styles from './Process.module.css';

export function Process() {
  const listRef = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const list = listRef.current;
      if (!list || prefersReducedMotion()) return;

      const fill = list.querySelector<HTMLElement>('[data-progress-fill]');
      const steps = Array.from(list.querySelectorAll<HTMLElement>('[data-step]'));

      try {
        if (fill) {
          gsap.fromTo(
            fill,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: ease.none,
              scrollTrigger: {
                trigger: list,
                start: 'top 72%',
                end: 'bottom 62%',
                scrub: 0.5,
              },
            },
          );
        }

        steps.forEach((step) => {
          ScrollTrigger.create({
            trigger: step,
            start: 'top 64%',
            onEnter: () => step.setAttribute('data-active', 'true'),
            onLeaveBack: () => step.removeAttribute('data-active'),
          });
        });

        if (ScrollTrigger.getAll().length === 0 && fill) {
          gsap.set(fill, { clearProps: 'all' });
        }
      } catch (error) {
        console.warn('[FlexTech] linha de progresso desativada:', error);
        if (fill) gsap.set(fill, { clearProps: 'all' });
        steps.forEach((step) => step.setAttribute('data-active', 'true'));
      }
    },
    { scope: listRef },
  );

  return (
    <section id="processo" className="section section--flush-top" aria-labelledby="processo-title">
      <div className={styles.shell}>
        <div className={styles.side}>
          <SectionHeading
            index="03"
            eyebrow="Processo"
            title={<span id="processo-title">Do primeiro insight à entrega.</span>}
            lead="Cinco etapas com papéis claros: o que você faz em cada uma e o que recebe no fim dela. Prazos são fechados na proposta, junto com o escopo."
            className={styles.heading}
          />
        </div>

        <ol className={styles.steps} ref={listRef}>
          <span className={styles.line} aria-hidden="true">
            <span className={styles.lineFill} data-progress-fill="" />
          </span>

          {processSteps.map((step) => (
            <li key={step.id} className={styles.step} data-step="">
              <span className={styles.node} aria-hidden="true">
                <span className={styles.nodeIndex}>{step.index}</span>
              </span>

              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.description}</p>

                <dl className={styles.stepMeta}>
                  <div className={styles.metaRow}>
                    <dt>Você participa</dt>
                    <dd>{step.youDo}</dd>
                  </div>
                  <div className={styles.metaRow}>
                    <dt>Você recebe</dt>
                    <dd>{step.youGet}</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
