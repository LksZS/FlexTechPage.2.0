/**
 * Registro único do GSAP.
 * ---------------------------------------------------------------------------
 * Plugins precisam ser registrados antes do uso — sem isso eles falham em
 * silêncio. Este módulo é importado uma única vez no entry (`main.tsx`), então
 * nenhum componente precisa se preocupar com isso (nem duplicar o registro no
 * Strict Mode).
 *
 * GSAP é o único motor de animação do projeto: não há Framer Motion, AOS,
 * anime.js ou loops concorrentes. CSS transitions cobrem apenas microfeedback
 * de ponteiro (hover/press/focus), que é onde elas são mais baratas.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

gsap.defaults({
  ease: 'power3.out',
  duration: 0.56,
  overwrite: 'auto',
});

ScrollTrigger.config({
  // callbacks só disparam dentro do range do trigger (menos trabalho por frame)
  limitCallbacks: true,
  // evita refresh em cascata quando a URL/barra do Safari mobile oscila
  ignoreMobileResize: true,
});

export { gsap, ScrollTrigger, useGSAP };
