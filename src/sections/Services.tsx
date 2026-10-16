/**
 * Serviços — grid editorial com proporções variadas.
 * Os dois cards de destaque carregam uma demonstração visual pequena e
 * relevante (o editor e o fluxo de automação do hero, reutilizados). Nenhum
 * loop contínuo concorre pela atenção: o único loop existente pausa fora da
 * viewport e some com movimento reduzido.
 */
import { AnchorLink } from '@/components/AnchorLink';
import { SectionHeading } from '@/components/SectionHeading';
import { serviceIcons } from '@/components/Icon';
import { DevPanel } from '@/components/visuals/DevPanel';
import { FlowPanel } from '@/components/visuals/FlowPanel';
import { services } from '@/data/services';
import { cx } from '@/lib/cx';
import styles from './Services.module.css';

export function Services() {
  return (
    <section id="servicos" className="section" aria-labelledby="servicos-title">
      <div className="container">
        <SectionHeading
          index="01"
          eyebrow="Serviços"
          title={<span id="servicos-title">Tecnologia sob medida para o que seu negócio precisa.</span>}
          lead="Do site institucional ao sistema que sustenta a operação. A ferramenta é escolhida pelo problema — nunca pelo hype."
          aside={
            <p className={styles.asideNote}>
              Não sabe por onde começar?{' '}
              <AnchorLink href="#contato" className={styles.asideLink}>
                Conte o cenário e a gente indica o caminho
              </AnchorLink>
              .
            </p>
          }
        />

        <div className={styles.grid}>
          {services.map((service) => {
            const Icon = serviceIcons[service.visual];
            return (
              <article
                key={service.id}
                className={cx(styles.card, service.featured && styles.cardFeatured)}
                data-reveal="up"
              >
                <header className={styles.cardHead}>
                  <span className={styles.cardIndex}>{service.index}</span>
                  <Icon className={styles.cardIcon} width={30} height={30} />
                </header>

                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardText}>{service.description}</p>

                {service.visual === 'web' ? <DevPanel className={styles.cardVisual} /> : null}
                {service.visual === 'flow' ? <FlowPanel className={styles.cardVisual} /> : null}

                <ul className={styles.cardList}>
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className={styles.cardItem}>
                      <span className={styles.bullet} aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
