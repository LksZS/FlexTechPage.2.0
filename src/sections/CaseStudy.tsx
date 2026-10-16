/**
 * Estudo de caso (conteúdo do dialog de portfólio).
 * ---------------------------------------------------------------------------
 * Mostra apenas o que existe: descrição do site atual reescrita em pt-BR,
 * desafio e solução sem métricas. Stack, capturas reais e link público ficam
 * marcados como pendentes quando não foram confirmados — nunca inventados.
 */
import { ArrowUpRight, Info } from 'lucide-react';
import { ButtonLink, WhatsAppLink } from '@/components/Button';
import { ProjectArtwork } from '@/components/visuals/ProjectArtwork';
import { projectDisclosure, type Project } from '@/data/projects';
import { buildCtaMessage, whatsappLinkWithMessage } from '@/lib/whatsapp';
import styles from './CaseStudy.module.css';

type CaseStudyBodyProps = {
  project: Project;
  /** Fecha o dialog antes de navegar (ex.: ir para o contato). */
  onNavigate: () => void;
};

export function CaseStudyBody({ project, onNavigate }: CaseStudyBodyProps) {
  return (
    <div className={styles.body}>
      <p className={styles.kicker}>
        <span className={styles.category}>{project.category}</span>
        {project.concept ? <span className={styles.badge}>Projeto conceito</span> : null}
      </p>

      <h2 id="case-title" className={styles.title}>
        {project.name}
      </h2>

      <div className={styles.media}>
        <ProjectArtwork kind={project.artwork} className={styles.art} />
      </div>

      <div className={styles.blocks}>
        <section className={styles.block}>
          <h3 className={styles.blockTitle}>Desafio</h3>
          <p className={styles.blockText}>{project.challenge}</p>
        </section>

        <section className={styles.block}>
          <h3 className={styles.blockTitle}>Solução</h3>
          <ul className={styles.blockList}>
            {project.solution.map((item) => (
              <li key={item} className={styles.blockItem}>
                <span className={styles.bullet} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.block}>
          <h3 className={styles.blockTitle}>Tecnologias</h3>
          {project.tech.length > 0 ? (
            <ul className={styles.techList}>
              {project.tech.map((tech) => (
                <li key={tech} className={styles.tech}>
                  {tech}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.blockText}>Stack a confirmar com os responsáveis.</p>
          )}
        </section>
      </div>

      <p className={styles.disclosure}>
        <Info size={15} strokeWidth={2} className={styles.disclosureIcon} aria-hidden />
        {projectDisclosure}
      </p>

      <div className={styles.actions}>
        <ButtonLink
          href="#contato"
          onNavigate={onNavigate}
          trailingIcon={<ArrowUpRight size={16} strokeWidth={2.1} aria-hidden />}
          trackLocation="case_study"
        >
          Levar este projeto para o contato
        </ButtonLink>

        {project.link ? (
          <ButtonLink href={project.link} variant="secondary" trackLocation="case_study_externo">
            Ver projeto publicado
          </ButtonLink>
        ) : null}
      </div>

      <div className={styles.people}>
        <span className={styles.peopleLabel}>Prefere ir direto ao WhatsApp?</span>
        <span className={styles.peopleLinks}>
          <WhatsAppLink
            variant="quiet"
            person="lucas"
            trackLocation="case_study"
            href={whatsappLinkWithMessage('lucas', buildCtaMessage(`um projeto como ${project.name}`))}
          >
            Falar com Lucas
          </WhatsAppLink>
          <span className={styles.peopleDivider} aria-hidden="true" />
          <WhatsAppLink
            variant="quiet"
            person="igor"
            trackLocation="case_study"
            href={whatsappLinkWithMessage('igor', buildCtaMessage(`um projeto como ${project.name}`))}
          >
            Falar com Igor
          </WhatsAppLink>
        </span>
      </div>
    </div>
  );
}
