/**
 * Investimento — sem tabela de preços não confirmada.
 * ---------------------------------------------------------------------------
 * O site anterior publicava valores, prazos e promessas de suporte/SLA que não
 * foram aprovados para esta versão. Aqui explicamos como o investimento é
 * definido e apontamos para a conversa. Nada de promessa comercial inventada.
 */
import { ArrowUpRight } from 'lucide-react';
import { ButtonLink } from '@/components/Button';
import { cta } from '@/config/site';
import styles from './Investment.module.css';

const factors = [
  'Tamanho e complexidade do produto',
  'Integrações e sistemas envolvidos',
  'Divisão em fases de entrega',
  'Manutenção e evolução depois do lançamento',
];

export function Investment() {
  return (
    <section id="investimento" className="section section--flush-top" aria-labelledby="investimento-title">
      <div className="container container--narrow">
        <div className={styles.panel} data-reveal="fade">
          <p className={styles.eyebrow}>Investimento</p>

          <h2 id="investimento-title" className={styles.title}>
            Cada projeto tem um próximo passo. Vamos encontrar o seu.
          </h2>

          <p className={styles.text}>
            Não publicamos tabela de preços: o investimento depende do escopo — e escopo se define em
            conversa, não em chute. Depois da descoberta, você recebe uma proposta com valores, fases e
            o que está incluído em cada uma.
          </p>

          <ul className={styles.factors}>
            {factors.map((factor) => (
              <li key={factor} className={styles.factor}>
                <span className={styles.factorMark} aria-hidden="true" />
                {factor}
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <ButtonLink
              href="#contato"
              size="lg"
              trackLocation="investimento"
              trailingIcon={<ArrowUpRight size={18} strokeWidth={2.1} aria-hidden />}
            >
              {cta.investment}
            </ButtonLink>
          </div>

          <p className={styles.note}>
            Prazos, suporte e manutenção são definidos na proposta — não prometemos o que ainda não foi
            combinado com você.
          </p>
        </div>
      </div>
    </section>
  );
}
