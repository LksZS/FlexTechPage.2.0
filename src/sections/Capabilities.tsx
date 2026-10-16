/**
 * Faixa de competências — marquee lento.
 * ---------------------------------------------------------------------------
 * WCAG 2.2.2 (Pause, Stop, Hide): movimento > 5s precisa de controle. Aqui o
 * marquee pausa no hover/foco, tem um botão pausar/retomar e fica estático com
 * `prefers-reduced-motion` (a lista continua visível e rolável, só não desfila).
 * Sem marcas de clientes: apenas competências declaradas.
 *
 * Loop sem emenda: duas metades idênticas, cada uma com a sequência repetida
 * para cobrir viewports largos; a trilha desloca exatamente uma metade.
 */
import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { capabilities } from '@/data/capabilities';
import { cx } from '@/lib/cx';
import styles from './Capabilities.module.css';

export function Capabilities() {
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const paused = userPaused || hoverPaused;

  const renderItems = (suffix: string, hidden: boolean) => (
    <ul className={styles.list} aria-hidden={hidden ? true : undefined}>
      {[0, 1].flatMap((pass) =>
        capabilities.map((capability) => (
          <li className={styles.item} key={`${capability.id}-${suffix}-${pass}`}>
            <span className={styles.label}>{capability.label}</span>
            <span className={styles.glyph} aria-hidden="true" />
          </li>
        )),
      )}
    </ul>
  );

  return (
    <section className={styles.band} aria-label="Competências da FlexTech">
      <div className={styles.edgeTop} aria-hidden="true" />

      <div className={styles.control}>
        <button
          type="button"
          className={styles.controlButton}
          onClick={() => setUserPaused((value) => !value)}
          aria-pressed={userPaused}
        >
          {userPaused ? <Play size={13} strokeWidth={2.2} aria-hidden /> : <Pause size={13} strokeWidth={2.2} aria-hidden />}
          <span>{userPaused ? 'Retomar' : 'Pausar'}</span>
        </button>
      </div>

      <div
        className={cx(styles.track, paused && styles.trackPaused)}
        onMouseEnter={() => setHoverPaused(true)}
        onMouseLeave={() => setHoverPaused(false)}
        onFocusCapture={() => setHoverPaused(true)}
        onBlurCapture={() => setHoverPaused(false)}
      >
        {renderItems('a', false)}
        {renderItems('b', true)}
      </div>

      <div className={styles.edgeBottom} aria-hidden="true" />
    </section>
  );
}
