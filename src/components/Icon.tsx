/**
 * Ícones autorais da FlexTech.
 * ---------------------------------------------------------------------------
 * Derivados da mesma geometria da marca: planos angulares, módulos conectados e
 * profundidade em camadas. Todos em `currentColor`, `aria-hidden` por padrão e
 * sem filtros/blur (custo de paint zero).
 *
 * Ícones utilitários genéricos (seta, +, –, check, menu) vêm do `lucide-react`
 * (MIT, tree-shakeable). Marcas (Instagram, WhatsApp) não existem mais no
 * lucide v1 — por isso são desenhadas aqui.
 */
import type { ComponentType, SVGProps } from 'react';
import type { ServiceVisual } from '@/data/services';

type IconProps = SVGProps<SVGSVGElement> & { title?: string };

function Base({ title, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/* ------------------------------------------------------------------ marca */

/**
 * Monograma geométrico (placeholder autoral).
 * O logotipo oficial não pôde ser baixado neste ambiente; quando o arquivo
 * original for adicionado em `public/brand/`, `brand.officialLogoSrc` troca o
 * render por um `<img>` — ver `components/Brand.tsx`.
 */
export function BrandMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden focusable="false" {...props}>
      <defs>
        <linearGradient id="ft-metal" x1="6" y1="10" x2="42" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#efe8ff" />
          <stop offset="0.52" stopColor="#b7a8d4" />
          <stop offset="1" stopColor="#6f6683" />
        </linearGradient>
        <linearGradient id="ft-violet" x1="6" y1="20" x2="42" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#bd4dff" />
          <stop offset="1" stopColor="#7d10e8" />
        </linearGradient>
        <linearGradient id="ft-graphite" x1="6" y1="30" x2="42" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2b2438" />
          <stop offset="1" stopColor="#15121f" />
        </linearGradient>
      </defs>

      {/* módulos conectados */}
      <path d="M6 34V14M42 32V12" stroke="rgba(219,195,255,.3)" strokeWidth="1" />

      {/* camadas: profundidade em planos angulares */}
      <polygon
        points="6,34 34,28 42,32 14,38"
        fill="url(#ft-graphite)"
        stroke="rgba(219,195,255,.22)"
        strokeWidth="0.9"
      />
      <polygon
        points="6,24 34,18 42,22 14,28"
        fill="url(#ft-violet)"
        stroke="rgba(246,243,255,.34)"
        strokeWidth="0.9"
      />
      <polygon
        points="6,14 34,8 42,12 14,20"
        fill="url(#ft-metal)"
        stroke="rgba(246,243,255,.5)"
        strokeWidth="0.9"
      />
      {/* ponto de luz discreto */}
      <circle cx="42" cy="12" r="1.5" fill="#d4adff" />
    </svg>
  );
}

/* ------------------------------------------------------------------ glyphs */

export function InstagramGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      aria-hidden
      focusable="false"
      {...props}
    >
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.1" cy="6.9" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" {...props}>
      <path
        d="M12.04 2.6c-5.1 0-9.24 4.14-9.24 9.24 0 1.66.44 3.22 1.2 4.56L2.6 21.4l5.16-1.34a9.2 9.2 0 0 0 4.28 1.06c5.1 0 9.24-4.14 9.24-9.24S17.14 2.6 12.04 2.6Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path
        d="M9.1 7.5c.2-.02.42.02.6.36.2.38.66 1.5.72 1.62.06.12.1.26.02.42-.08.16-.14.24-.26.38-.12.14-.24.3-.34.4-.12.12-.24.26-.1.5.14.24.62 1.02 1.34 1.66.92.82 1.7 1.08 1.94 1.2.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.14 1.14-.2.56-1.16 1.1-1.62 1.14-.42.04-.96.24-3.2-.66-2.68-1.06-4.34-3.86-4.46-4.04-.14-.18-1.06-1.42-1.06-2.7s.66-1.92.9-2.18c.24-.26.52-.32.7-.32Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ------------------------------------------------------------ serviços */

export function IconWeb(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M2.6 5.4h18.8v13.2H2.6z" />
      <path d="M2.6 9.2h18.8" />
      <path d="M6.2 12.6l2.6 2.6-2.6 2.6M11.4 17.8h5" />
    </Base>
  );
}

export function IconMobile(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7 2.6h10v18.8H7z" />
      <path d="M10.4 5.4h3.2" />
      <path d="M10.6 18.6h2.8" />
      <path d="M9.6 9.4h4.8v4.4H9.6z" />
    </Base>
  );
}

export function IconBi(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M2.6 4.2h18.8v15.6H2.6z" />
      <path d="M6.4 16.2v-3.4M10.2 16.2V9.4M14 16.2v-5.2M17.8 16.2V7.6" />
    </Base>
  );
}

export function IconPower(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3.4 3.4h7v7h-7zM13.6 3.4h7v7h-7zM3.4 13.6h7v7h-7z" />
      <path d="M13.6 13.6h7v7h-7z" strokeDasharray="2 2.2" />
      <path d="M10.4 6.9h3.2M6.9 10.4v3.2" />
    </Base>
  );
}

export function IconUx(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3.4 3.4h17.2v17.2H3.4z" />
      <path d="M3.4 15.2l5-4.6 4 3.4 3.2-3 4.8 4.2" />
      <circle cx="9" cy="8.4" r="1.8" />
    </Base>
  );
}

export function IconFlow(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M2.8 4.6h5.4v4.2H2.8zM15.8 4.6h5.4v4.2h-5.4zM9.3 15.2h5.4v4.2H9.3z" />
      <path d="M5.5 8.8v3.4h1.9M18.5 8.8v3.4h-1.9M12 12.2v3" />
    </Base>
  );
}

export const serviceIcons: Record<ServiceVisual, ComponentType<IconProps>> = {
  web: IconWeb,
  mobile: IconMobile,
  bi: IconBi,
  power: IconPower,
  ux: IconUx,
  flow: IconFlow,
};

/* --------------------------------------------------------- decoração */

/** Chanfro angular usado como separador/marcador de seção. */
export function NotchGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden focusable="false" {...props}>
      <path d="M1 15 15 1M15 1H7M15 1v8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
