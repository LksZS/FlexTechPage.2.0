# FlexTech — Site institucional 2.0

Site institucional de página única (pt-BR) da **FlexTech**: desenvolvimento web, aplicações
mobile, BI, Power Platform, UX/UI e automações. O objetivo da página é explicar o valor da
FlexTech e tornar trivial iniciar um projeto — a conversa continua no WhatsApp, com a pessoa
escolhida por quem visita o site.

> Estado: implementação completa e funcional (React + Vite + TypeScript). Veja
> `docs/TEST-REPORT.md` para o que foi executado de verdade e as limitações conhecidas, e
> `docs/CONTENT-APPROVAL.md` para o que ainda depende de aprovação dos responsáveis.

---

## Como rodar

```bash
npm install        # dependências
npm run dev        # ambiente de desenvolvimento (http://localhost:5173)
npm run build      # type-check (tsc -b) + build de produção em dist/
npm run preview    # serve o build de produção (http://localhost:4173)
npm run typecheck  # apenas TypeScript
npm run audit:links# build SSR + auditoria de links, âncoras e referências de a11y
npm run og:image   # regenera public/og.png e public/apple-touch-icon.png (sem dependências)
```

Requisitos: Node 20+ (desenvolvido e testado em Node 22).

---

## Stack e por quê

| Camada | Escolha | Motivo |
| --- | --- | --- |
| UI | React 19 + TypeScript estrito | tipagem completa, sem `any`; `tsc -b` no pipeline |
| Build | Vite 7 | dev server rápido, code-splitting e assets otimizados |
| Estilo | CSS Modules + tokens em `src/styles/tokens.css` | escopo por componente, um único vocabulário de design |
| Animação | GSAP 3 + ScrollTrigger + `@gsap/react` | um único motor de animação, como pedido |
| Scroll | Lenis (apenas desktop + ponteiro fino) | aprimoramento progressivo; mobile usa scroll nativo |
| Ícones | `lucide-react` (glifos utilitários) + SVGs autorais em `src/components/Icon.tsx` | marca e diagramas de serviço seguem a geometria angular |
| Fontes | Space Grotesk Variable + Inter Variable (WOFF2 locais, `public/fonts/`) | sem requisição a CDN, `font-display: swap`, preload no `index.html` |

Decisões deliberadas:

- **Sem Next.js / sem WebGL / sem Lottie.** Nada aqui se beneficia de um runtime maior; o
  visual é SVG + CSS + GSAP, leve e previsível em iPhone.
- **Um chunk separado para animação** (`motion`): GSAP/Lenis mudam pouco e ficam cacheáveis.
- **Sem biblioteca de componentes/UI kit.** Cada superfície segue o sistema de tokens.
- **Sem trackers.** Eventos de analytics estão preparados (`src/lib/analytics.ts`) mas não
  enviam nada até existir uma definição de privacidade/consentimento.

## Estrutura

```
src/
  App.tsx                  composição da página + reveals globais
  main.tsx                 bootstrap (registra GSAP uma única vez)
  entry-server.tsx         render p/ validação (auditoria) — não usado em produção
  config/site.ts           contatos, marca, navegação, CTAs, SEO  ← fonte única
  data/                    conteúdo editorial tipado (serviços, projetos, processo, faq)
  lib/                     gsap, scroll, media queries, whatsapp, analytics, cx
  motion/                  tokens de movimento + sistema de reveals (ScrollTrigger.batch)
  hooks/                   focus trap, scroll lock, reduced motion, smooth scroll, seção ativa…
  components/              Button, Brand, MaskLine, Dialog, SectionHeading, ícones
  components/visuals/      painéis SVG do hero, artes do portfólio
  layout/                  Header, Footer, barra mobile de CTA
  sections/                Hero, Capabilities, Services, Work, Process, About, Investment, Faq, Contact
  styles/                  tokens.css, global.css, fonts.css
scripts/                   build-og.mjs (PNG sem dependências), audit-links.mjs
docs/                      CONTENT-APPROVAL.md, TEST-REPORT.md
public/                    fontes, favicon/OG gerados, brand/LEIA-ME.txt
```

## Sistema de design

- **Tokens** (`src/styles/tokens.css`): cores, tipografia fluida (`clamp()`), espaçamento,
  raios, sombras, durações e easings. Contrastes verificados para WCAG AA:
  texto `#f6f3ff` sobre `#08070c` = 18.4:1; texto secundário `#b6afc5` = 9.5:1;
  acento `#d4adff` = 10.7:1 (links/eyebrows); `#9013fe` nunca como texto corrido (3.5:1) —
  só em superfícies, onde branco sobre o gradiente primário passa de 4.7:1.
- **Geometria da marca**: planos angulares empilhados (metal / violeta / grafite) com
  conectores e um ponto de luz. O **símbolo oficial não foi redesenhado**: sem acesso ao
  arquivo original (host de mídia bloqueado), o site renderiza um monograma geométrico
  autoral e documentado. Para ativar o logotipo oficial basta soltar o arquivo em
  `public/brand/logo.png` e apontar `brand.officialLogoSrc` em `src/config/site.ts`
  (instruções em `public/brand/LEIA-ME.txt`).
- **Superfície assinatura** `.notched`: cantos chanfrados com costura metálica, usada com
  parcimônia (cards de serviço em destaque, faixa de CTA, painel de investimento).
- **Glassmorphism controlado**: um único `backdrop-filter` (header desktop, só com ponteiro
  fino e após rolar), com fallback opaco via `@supports` e `prefers-reduced-transparency`.

## Movimento

- Entradas de 400–700 ms, microinterações de 120–200 ms, stagger curto; easing consistente.
- Reveals com `ScrollTrigger.batch()` (um observador para muitos elementos), `once`.
- Parallax de amplitude pequena no hero (scroll + ponteiro), desligado no mobile.
- Um único rAF: Lenis com `autoRaf: false` acionado pelo ticker do GSAP +
  `lenis.on('scroll', ScrollTrigger.update)`; `lagSmoothing(0)`.
- `prefers-reduced-motion`: sem parallax/marquee/smooth scroll; entradas viram fades curtos;
  marquee vira lista estática; há botão pausar/retomar (WCAG 2.2.2).
- Texto essencial nunca depende de JS: todo conteúdo está no HTML e é legível sem animação.
- Nenhum pin longo; `position: fixed` (header, barra mobile, dialogs) fora de ancestrais
  transformados.

## Acessibilidade e responsividade

- HTML semântico, um único `<h1>`, hierarquia correta, skip-link, alvos ≥ 44 px.
- Menu mobile com focus trap, Escape, trava de scroll e retorno de foco; `inert` fechado.
- Accordion (FAQ) com `aria-expanded`/`aria-controls` e painel `role="region"`.
- Estudo de caso e nota de privacidade em `role="dialog"` + `aria-modal`.
- Foco visível consistente (`:focus-visible`), sinais nunca só por cor.
- Layout testado conceitualmente em 320 → 1920 px; mobile é coluna vertical simples.
- Campos de formulário com fonte ≥ 16 px (sem zoom automático no iOS) e safe areas
  (`viewport-fit=cover`, `env(safe-area-inset-*)`).

## Conversão

- CTA primário consistente (“Quero tirar meu projeto do papel”) no hero, após o portfólio e
  no encerramento; barra inferior compacta no mobile levando ao contato.
- Fluxo de contato em 4 passos: tipo de projeto → descrição opcional → escolher **Lucas ou
  Igor** → abrir o WhatsApp com mensagem pré-preenchida (`encodeURIComponent`).
- Nada é simulado: sem envio, CRM, auto-resposta ou storage. A mensagem é montada no
  navegador e a conversa continua no WhatsApp.

## SEO

- `index.html`: title, description, canonical (trocar pelo domínio real), robots,
  Open Graph + Twitter Card com `og.png` (1200×630) e JSON-LD `Organization` contendo
  apenas dados reais (sem CNPJ/endereço/e-mail, que não foram informados).

## Referências consultadas

- `iart-ai/web-animation-skills` (MIT) — clonado e usado como guia de práticas GSAP/Lenis,
  acessibilidade e performance. Não é uma biblioteca: nada dele é importado no bundle.
- `motionsites.ai/sections` — consultado como taxonomia de seções. Os assets de movimento do
  site não são inspecionáveis neste ambiente; **todo o código e arte deste repositório é
  original**, sem cópia de composições de terceiros.
- `21st.dev/community/components` — listado no briefing, **inacessível neste ambiente**
  (erro de assinatura do proxy de fetch). Nenhuma linha veio dali; as alternativas foram
  criadas dentro do sistema de design da FlexTech.
- Site anterior (`flex-tech.base44.app`) — texto lido como referência de conteúdo; preços,
  depoimentos e promessas não aprovados foram removidos (ver `docs/CONTENT-APPROVAL.md`).

## Licenças

- Código do site: mesmo licenciamento do repositório.
- Fontes: Space Grotesk e Inter (SIL Open Font License 1.1) — arquivos de licença em
  `public/fonts/`.
