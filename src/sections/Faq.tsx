/**
 * FAQ — accordion acessível.
 * ---------------------------------------------------------------------------
 * Padrão de disclosure: botão com `aria-expanded`/`aria-controls`, painel
 * `role="region"` nomeado pelo botão. A abertura anima `grid-template-rows`
 * (0fr → 1fr): sem medição de altura em JS e sem animar `height` diretamente.
 * Conteúdo recolhido sai da árvore de acessibilidade via `visibility`.
 */
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { faq } from '@/data/faq';
import { cx } from '@/lib/cx';
import styles from './Faq.module.css';

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(faq[0]?.id ?? null);

  return (
    <section id="faq" className="section section--flush-top" aria-labelledby="faq-title">
      <div className="container container--narrow">
        <SectionHeading
          index="05"
          eyebrow="Dúvidas frequentes"
          title={<span id="faq-title">Antes de começar, o essencial.</span>}
          narrow
        />

        <div className={styles.list}>
          {faq.map((item) => {
            const open = openId === item.id;
            return (
              <div key={item.id} className={cx(styles.item, open && styles.itemOpen)}>
                <h3 className={styles.heading}>
                  <button
                    type="button"
                    id={`faq-trigger-${item.id}`}
                    className={styles.trigger}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${item.id}`}
                    onClick={() => setOpenId(open ? null : item.id)}
                  >
                    <span className={styles.question}>{item.question}</span>
                    <span className={styles.icon} aria-hidden="true">
                      <Plus size={16} strokeWidth={2} />
                    </span>
                  </button>
                </h3>

                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${item.id}`}
                  className={styles.panelWrap}
                  data-open={open ? 'true' : 'false'}
                >
                  <div className={styles.panelInner}>
                    <p className={styles.answer}>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
