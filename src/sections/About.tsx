/**
 * Sobre — quem atende, desenha e entrega.
 * ---------------------------------------------------------------------------
 * Sem cargos, biografias, experiências ou fotos inventadas: apenas nomes e
 * canais reais. Como não há retratos autorizados, usamos monogramas
 * tipográficos — composição, não fotografia fictícia.
 */
import { InstagramGlyph, WhatsAppGlyph, BrandMark } from '@/components/Icon';
import { SectionHeading } from '@/components/SectionHeading';
import { Phone } from 'lucide-react';
import { company, people, type PersonId } from '@/config/site';
import { trackCta } from '@/lib/analytics';
import styles from './About.module.css';

const personIds: PersonId[] = ['lucas', 'igor'];

export function About() {
  return (
    <section id="sobre" className="section" aria-labelledby="sobre-title">
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow="Sobre"
          title={<span id="sobre-title">Quem atende, desenha e entrega.</span>}
          lead="A FlexTech é próxima por escolha: você conversa direto com as pessoas responsáveis pelo projeto, do primeiro insight à evolução."
        />

        <div className={styles.grid}>
          {personIds.map((id) => {
            const person = people[id];
            return (
              <article key={id} className={styles.card} data-reveal="up">
                <span className={styles.monogram} aria-hidden="true">
                  {person.initials}
                </span>

                <h3 className={styles.name}>{person.name}</h3>

                <ul className={styles.links}>
                  <li>
                    <a
                      className={styles.link}
                      href={person.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackCta('sobre', `whatsapp_${id}`)}
                    >
                      <WhatsAppGlyph width={17} height={17} />
                      <span>WhatsApp</span>
                      <span className={styles.linkValue}>{person.phoneLabel}</span>
                    </a>
                  </li>
                  <li>
                    <a className={styles.link} href={person.phoneHref}>
                      <Phone size={16} strokeWidth={1.8} aria-hidden />
                      <span>Ligar</span>
                      <span className={styles.linkValue}>{person.phoneLabel}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className={styles.link}
                      href={person.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackCta('sobre', `instagram_${id}`)}
                    >
                      <InstagramGlyph width={17} height={17} />
                      <span>Instagram</span>
                      <span className={styles.linkValue}>{person.instagramHandle}</span>
                    </a>
                  </li>
                </ul>
              </article>
            );
          })}

          <article className={styles.card} data-reveal="up">
            <BrandMark className={styles.brandMark} />

            <h3 className={styles.name}>{company.name}</h3>
            <p className={styles.cardText}>
              Tecnologia com identidade própria: planos angulares, luz violeta controlada e foco no
              resultado do negócio. Acompanhe os bastidores dos projetos no Instagram.
            </p>

            <ul className={styles.links}>
              <li>
                <a
                  className={styles.link}
                  href={company.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCta('sobre', 'instagram_flextech')}
                >
                  <InstagramGlyph width={17} height={17} />
                  <span>Instagram da FlexTech</span>
                  <span className={styles.linkValue}>{company.instagramHandle}</span>
                </a>
              </li>
            </ul>
          </article>
        </div>

        <ul className={styles.principles} data-reveal="fade">
          <li>
            <strong>Conversa direta.</strong> Sem intermediários entre você e quem executa.
          </li>
          <li>
            <strong>Escopo claro.</strong> O que entra, o que fica para depois e por quê.
          </li>
          <li>
            <strong>Entrega que continua.</strong> O projeto nasce pronto para evoluir.
          </li>
        </ul>
      </div>
    </section>
  );
}
