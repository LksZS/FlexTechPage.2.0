/**
 * SectionHeading — cabeçalho editorial de seção.
 * Eyebrow + índice + título com revelação em máscara + texto de apoio.
 * No desktop usa assimetria controlada (título à esquerda, apoio à direita).
 */
import type { ElementType, ReactNode } from 'react';
import { MaskLine } from './MaskLine';
import { cx } from '@/lib/cx';
import styles from './SectionHeading.module.css';

type SectionHeadingProps = {
  title: ReactNode;
  eyebrow?: string;
  index?: string;
  lead?: ReactNode;
  as?: 'h2' | 'h3';
  /** Conteúdo extra na coluna da direita (CTA, legenda, ficha). */
  aside?: ReactNode;
  align?: 'start' | 'center';
  narrow?: boolean;
  className?: string;
  id?: string;
};

export function SectionHeading({
  title,
  eyebrow,
  index,
  lead,
  as = 'h2',
  aside,
  align = 'start',
  narrow = false,
  className,
  id,
}: SectionHeadingProps) {
  const Tag = as as ElementType;
  const hasSide = Boolean(lead || aside);

  return (
    <div
      className={cx(
        styles.head,
        hasSide && align === 'start' && styles.headSplit,
        align === 'center' && styles.headCenter,
        narrow && styles.headNarrow,
        className,
      )}
      id={id}
    >
      <div className={styles.main}>
        {eyebrow || index ? (
          <p className={styles.meta} data-reveal="fade">
            {index ? <span className={styles.index}>{index}</span> : null}
            {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
          </p>
        ) : null}

        <Tag className={styles.title}>
          <MaskLine>{title}</MaskLine>
        </Tag>
      </div>

      {hasSide ? (
        <div className={styles.side} data-reveal>
          {lead ? <p className={styles.lead}>{lead}</p> : null}
          {aside}
        </div>
      ) : null}
    </div>
  );
}
