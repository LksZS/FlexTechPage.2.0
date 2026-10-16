/**
 * Botões e CTAs.
 * ---------------------------------------------------------------------------
 * Um único CTA primário consistente em toda a página. Microfeedback de 120–180ms,
 * hover com deslocamento mínimo e glow via `opacity` de pseudo-elemento
 * (nunca animando `box-shadow`, que repinta a cada quadro).
 * Efeitos de ponteiro só existem em `(hover: hover) and (pointer: fine)`.
 */
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { WhatsAppGlyph } from './Icon';
import { cx } from '@/lib/cx';
import { scrollToTarget } from '@/lib/scroll';
import { trackCta, trackWhatsAppClick } from '@/lib/analytics';
import type { PersonId } from '@/config/site';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'quiet';
export type ButtonSize = 'md' | 'lg';

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Ocupa a largura disponível (útil no mobile e em formulários). */
  block?: boolean;
  icon?: ReactNode;
  /** Ícone à direita (seta). Desliza no hover. */
  trailingIcon?: ReactNode;
  /** Onde o clique aconteceu — alimenta o evento `cta_click`. */
  trackLocation?: string;
  /** Callback antes de navegar (ex.: fechar o menu mobile). */
  onNavigate?: () => void;
  className?: string;
  children: ReactNode;
};

function classes(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  block?: boolean,
  className?: string,
): string {
  return cx(
    styles.btn,
    styles[`btn--${variant}`],
    size === 'lg' && styles['btn--lg'],
    block && styles['btn--block'],
    className,
  );
}

type ButtonProps = CommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

export function Button({
  variant = 'primary',
  size = 'md',
  block,
  icon,
  trailingIcon,
  trackLocation,
  className,
  children,
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={classes(variant, size, block, className)}
      onClick={(event) => {
        if (trackLocation) {
          trackCta(trackLocation, typeof children === 'string' ? children : variant);
        }
        onClick?.(event);
      }}
      {...rest}
    >
      {icon ? <span className={styles.btn__icon}>{icon}</span> : null}
      <span className={styles.btn__label}>{children}</span>
      {trailingIcon ? <span className={styles.btn__trailing}>{trailingIcon}</span> : null}
    </button>
  );
}

type AnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | keyof CommonProps> & { href: string };


/** Link com aparência de botão (externo ou âncora). */
export function ButtonLink({
  variant = 'primary',
  size = 'md',
  block,
  icon,
  trailingIcon,
  trackLocation,
  onNavigate,
  className,
  children,
  href,
  onClick,
  ...rest
}: AnchorProps) {
  const isAnchor = href.startsWith('#');
  const isExternal = /^https?:\/\//.test(href);

  return (
    <a
      className={classes(variant, size, block, className)}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onClick={(event) => {
        if (trackLocation) {
          trackCta(trackLocation, typeof children === 'string' ? children : variant);
        }
        onClick?.(event);
        // Âncoras passam pelo controlador de scroll (Lenis ou nativo).
        if (isAnchor && !event.defaultPrevented) {
          event.preventDefault();
          if (onNavigate) {
            onNavigate();
            // idem AnchorLink: espera o overlay destravar o scroll
            window.requestAnimationFrame(() => window.requestAnimationFrame(() => scrollToTarget(href)));
          } else {
            scrollToTarget(href);
          }
        } else {
          onNavigate?.();
        }
      }}
      {...rest}
    >
      {icon ? <span className={styles.btn__icon}>{icon}</span> : null}
      <span className={styles.btn__label}>{children}</span>
      {trailingIcon ? <span className={styles.btn__trailing}>{trailingIcon}</span> : null}
    </a>
  );
}

type WhatsAppLinkProps = Omit<CommonProps, 'icon' | 'variant'> & {
  href: string;
  person?: PersonId | 'none';
  variant?: ButtonVariant;
};

/** CTA que abre o WhatsApp. Sempre com `rel="noopener"` e tracking próprio. */
export function WhatsAppLink({
  href,
  person = 'none',
  variant = 'primary',
  size = 'md',
  block,
  trailingIcon,
  trackLocation = 'whatsapp',
  className,
  children,
  ...rest
}: WhatsAppLinkProps) {
  return (
    <a
      className={classes(variant, size, block, className)}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(person, trackLocation)}
      {...rest}
    >
      <span className={styles.btn__icon}>
        <WhatsAppGlyph width={18} height={18} />
      </span>
      <span className={styles.btn__label}>{children}</span>
      {trailingIcon ? <span className={styles.btn__trailing}>{trailingIcon}</span> : null}
    </a>
  );
}
