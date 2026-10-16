/**
 * Chamada intermediária — logo depois do portfólio.
 * Um único CTA primário, levando ao contato (onde a pessoa é escolhida).
 */
import { ArrowUpRight } from 'lucide-react';
import { ButtonLink } from '@/components/Button';
import { cta, people } from '@/config/site';
import styles from './CtaBand.module.css';

export function CtaBand() {
  return (
    <div className={styles.wrap}>
      <div className={styles.band} data-reveal="fade">
        <div className={styles.copy}>
          <h2 className={styles.title}>Seu projeto pode ser o próximo.</h2>
          <p className={styles.text}>
            O portfólio mostra o caminho. O próximo passo é uma conversa sobre o seu cenário —
            sem formulário longo e sem compromisso.
          </p>
        </div>

        <div className={styles.side}>
          <ButtonLink
            href="#contato"
            size="lg"
            trackLocation="cta_band"
            trailingIcon={<ArrowUpRight size={18} strokeWidth={2.1} aria-hidden />}
          >
            {cta.afterWork}
          </ButtonLink>
          <p className={styles.note}>
            No contato, você escolhe falar com <strong>{people.lucas.firstName}</strong> ou{' '}
            <strong>{people.igor.firstName}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
