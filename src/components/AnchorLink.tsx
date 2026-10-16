/**
 * AnchorLink — link interno que passa pelo controlador de scroll.
 * Mantém o `href` real (funciona sem JS) e delega a rolagem para
 * `scrollToTarget`, que usa Lenis quando ativo e scroll nativo caso contrário.
 */
import type { AnchorHTMLAttributes, ReactNode } from 'react';

import { scrollToTarget } from '@/lib/scroll';

type AnchorLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  children: ReactNode;
  /** Callback antes de rolar (ex.: fechar o menu mobile). */
  onNavigate?: () => void;
  /** Move o foco para a seção depois da rolagem (navegação por teclado). */
  focusTarget?: boolean;
};

export function AnchorLink({
  href,
  children,
  onNavigate,
  focusTarget = false,
  onClick,
  ...rest
}: AnchorLinkProps) {
  return (
    <a
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        // Clique com modificador ou botão do meio: comportamento nativo.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;

        event.preventDefault();

        const go = () => scrollToTarget(href, focusTarget ? { focus: true } : undefined);

        if (onNavigate) {
          // Fecha o overlay primeiro: o destravamento do scroll acontece em um
          // efeito passivo, então a rolagem entra dois quadros depois.
          onNavigate();
          window.requestAnimationFrame(() => window.requestAnimationFrame(go));
        } else {
          go();
        }
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
