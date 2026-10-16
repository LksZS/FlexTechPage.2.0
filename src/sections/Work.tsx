/**
 * Portfólio — "Ideias que ganharam forma."
 * ---------------------------------------------------------------------------
 * Cada item abre um estudo de caso acessível (dialog) com desafio, solução e o
 * que ainda depende de validação. Não há link externo inventado: quando não
 * existe URL confirmada, o estudo de caso é o destino — e isso fica explícito.
 * Desktop: linhas editoriais alternadas com hover discreto. Mobile: cards
 * verticais. Sem scroll horizontal forçado e sem hijacking.
 */
import { useCallback, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { Dialog } from '@/components/Dialog';
import { ProjectArtwork } from '@/components/visuals/ProjectArtwork';
import { projects } from '@/data/projects';
import { trackProjectOpen } from '@/lib/analytics';
import { cx } from '@/lib/cx';
import { CaseStudyBody } from './CaseStudy';
import { CtaBand } from './CtaBand';
import styles from './Work.module.css';

export function Work() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openProject = projects.find((project) => project.id === openId) ?? null;

  // Estável: o focus trap do dialog não re-executa a cada render do Work.
  const closeCase = useCallback(() => setOpenId(null), []);

  return (
    <section id="projetos" className="section" aria-labelledby="projetos-title">
      <div className="container">
        <SectionHeading
          index="02"
          eyebrow="Portfólio"
          title={<span id="projetos-title">Ideias que ganharam forma.</span>}
          lead="Uma amostra do que já construímos. Cada item abre um estudo de caso com desafio, solução — e o que ainda está em validação com os responsáveis."
        />

        <ul className={styles.list}>
          {projects.map((project, index) => (
            <li key={project.id} className={cx(styles.row, index % 2 === 1 && styles.rowFlip)}>
              <button
                type="button"
                className={styles.card}
                onClick={() => {
                  trackProjectOpen(project.id, 'work');
                  setOpenId(project.id);
                }}
                aria-haspopup="dialog"
                aria-expanded={openProject?.id === project.id}
                data-reveal="scale"
              >
                <span className={styles.media}>
                  <ProjectArtwork kind={project.artwork} className={styles.art} />
                  <span className={styles.mediaEdge} aria-hidden="true" />
                  {project.concept ? <span className={styles.badge}>Projeto conceito</span> : null}
                </span>

                <span className={styles.meta}>
                  <span className={styles.metaTop}>
                    <span className={styles.index}>0{index + 1}</span>
                    <span className={styles.category}>{project.category}</span>
                  </span>
                  <span className={styles.name}>{project.name}</span>
                  <span className={styles.summary}>{project.summary}</span>
                  <span className={styles.ctaRow}>
                    <span className={styles.ctaLabel}>Ver estudo de caso</span>
                    <ArrowUpRight size={16} strokeWidth={2} className={styles.ctaIcon} aria-hidden />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <CtaBand />

      <Dialog open={openProject !== null} onClose={closeCase} labelledBy="case-title" size="lg">
        {openProject ? <CaseStudyBody project={openProject} onNavigate={closeCase} /> : null}
      </Dialog>
    </section>
  );
}
