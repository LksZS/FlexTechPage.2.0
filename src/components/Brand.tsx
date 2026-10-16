/**
 * Marca — lockup (símbolo + wordmark).
 * ---------------------------------------------------------------------------
 * O asset oficial do logotipo não pôde ser baixado neste ambiente
 * (host de mídia bloqueado). Enquanto `brand.officialLogoSrc` for `null`,
 * renderizamos o monograma geométrico autoral + wordmark tipográfico.
 * Colocar o arquivo em `public/brand/logo.png` e preencher o campo no config
 * troca o render por um `<img>` com largura/altura explícitas (sem CLS).
 */
import { brand } from '@/config/site';
import { cx } from '@/lib/cx';
import { BrandMark } from './Icon';
import styles from './Brand.module.css';

type BrandProps = {
  /** Esconde o wordmark (útil em espaços estreitos). */
  markOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export function Brand({ markOnly = false, size = 'md', className }: BrandProps) {
  if (brand.officialLogoSrc) {
    return (
      <img
        className={cx(styles.official, className)}
        src={brand.officialLogoSrc}
        alt={brand.officialLogoAlt}
        width={brand.officialLogoWidth}
        height={brand.officialLogoHeight}
        decoding="async"
      />
    );
  }

  return (
    <span className={cx(styles.brand, styles[`brand--${size}`], className)}>
      <BrandMark className={styles.mark} />
      {markOnly ? null : <span className={styles.wordmark}>{brand.wordmark}</span>}
    </span>
  );
}
