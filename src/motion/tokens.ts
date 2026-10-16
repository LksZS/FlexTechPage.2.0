/**
 * Tokens de movimento (espelham `styles/tokens.css`).
 * Durações e easings em um só lugar para que GSAP e CSS não divirjam.
 */

export const duration = {
  instant: 0.12, // microfeedback de clique/press
  fast: 0.18, // hover, foco, ícones
  base: 0.26, // troca de estado (menu, accordion)
  enter: 0.48, // entrada de elemento
  enterSlow: 0.68, // entrada de blocos grandes
  scene: 0.9, // composição do hero
} as const;

export const stagger = {
  tight: 0.045,
  short: 0.07,
  relaxed: 0.11,
} as const;

export const ease = {
  out: 'power3.out',
  outSoft: 'power2.out',
  outExpo: 'expo.out',
  inOut: 'power2.inOut',
  none: 'none',
} as const;

/** Amplitudes pequenas: movimento como profundidade, não como espetáculo. */
export const distance = {
  nudge: 8,
  reveal: 26,
  revealLg: 44,
  parallax: 18,
  parallaxPointer: 12,
} as const;
