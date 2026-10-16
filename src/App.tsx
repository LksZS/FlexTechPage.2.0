/**
 * App — composição da landing page.
 * ---------------------------------------------------------------------------
 * Uma única página, seções âncoradas. O GSAP é registrado uma vez em
 * `main.tsx`; aqui só entram o smooth scroll progressivo, a política de
 * movimento e os reveals compartilhados (um único escopo para todo o site).
 */
import { useRef } from 'react';
import { Header } from '@/layout/Header';
import { Footer } from '@/layout/Footer';
import { MobileCtaBar } from '@/layout/MobileCtaBar';
import { Hero } from '@/sections/Hero';
import { Capabilities } from '@/sections/Capabilities';
import { Services } from '@/sections/Services';
import { Work } from '@/sections/Work';
import { Process } from '@/sections/Process';
import { About } from '@/sections/About';
import { Investment } from '@/sections/Investment';
import { Faq } from '@/sections/Faq';
import { Contact } from '@/sections/Contact';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { usePageMotion } from '@/hooks/usePageMotion';
import { initReveals } from '@/motion/reveal';
import { useGSAP } from '@/lib/gsap';

export function App() {
  const rootRef = useRef<HTMLDivElement>(null);

  useSmoothScroll();
  usePageMotion();

  useGSAP(
    () => {
      initReveals(rootRef.current);
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef}>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo">
        <Hero />
        <Capabilities />
        <Services />
        <Work />
        <Process />
        <About />
        <Investment />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <MobileCtaBar />
    </div>
  );
}
