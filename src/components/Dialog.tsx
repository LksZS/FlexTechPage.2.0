/**
 * Dialog acessível (estudos de caso, privacidade).
 * ---------------------------------------------------------------------------
 *  - portal no `document.body` (fora de qualquer contexto de recorte/stacking);
 *  - `role="dialog"` + `aria-modal`, foco preso, Escape fecha, clique no fundo fecha;
 *  - scroll do fundo travado (com compensação de scrollbar) e o painel rolando
 *    nativamente com `data-lenis-prevent` (o Lenis não intercepta o gesto);
 *  - foco devolvido ao gatilho no fechamento.
 * A animação é só de entrada (opacity + deslocamento curto): fechar é imediato,
 * o que evita prender o usuário esperando transição para sair de um modal.
 */
import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useScrollLock } from '@/hooks/useScrollLock';
import { cx } from '@/lib/cx';
import styles from './Dialog.module.css';

type DialogProps = {
  open: boolean;
  onClose: () => void;
  /** id do elemento que nomeia o diálogo (título). */
  labelledBy: string;
  children: ReactNode;
  size?: 'md' | 'lg';
  closeLabel?: string;
};

export function Dialog({
  open,
  onClose,
  labelledBy,
  children,
  size = 'md',
  closeLabel = 'Fechar',
}: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useScrollLock(open);
  useFocusTrap({ active: open, containerRef: panelRef, onEscape: onClose });

  // Zera o scroll interno do painel a cada abertura.
  useEffect(() => {
    if (open && panelRef.current) panelRef.current.scrollTop = 0;
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={cx(styles.panel, size === 'lg' && styles.panelLg)}
        data-lenis-prevent
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label={closeLabel}>
          <X size={18} strokeWidth={2} aria-hidden />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
