# Relatório de testes — o que foi executado de verdade

Data: 2026-10-16 · Ambiente: sandbox Linux (Node v22.22.3, npm 10.9.8) · Branch
`arena/73d57be9-flextechpage-2-0`.

**Regra deste relatório:** só entra aqui o que realmente rodou. O que não pôde ser executado
neste ambiente está listado como limitação, com o motivo e o que fazer para cobrir depois.

---

## 1. Testes executados (com resultado)

| # | Teste | Comando | Resultado |
| --- | --- | --- | --- |
| 1 | Instalação de dependências | `npm install` | OK — 75 pacotes, sem warnings de peer deps |
| 2 | Verificação de tipos (todo o projeto, modo build) | `npx tsc -b` | **OK — 0 erros** com `strict`, `noUnusedLocals`, `noUncheckedIndexedAccess` |
| 3 | Build de produção | `npm run build` | OK — `index.js` 308.95 kB (96.08 gzip) · `motion.js` 141.73 kB (53.54 gzip) · `index.css` 54.66 kB (10.60 gzip) · `index.html` 4.49 kB (1.58 gzip) |
| 4 | Smoke test de render (SSR) | `npm run build:ssr` + render | OK — 104.5 kB de HTML renderizados sem exceção (toda a árvore de componentes monta) |
| 5 | Auditoria de links/âncoras/a11y | `npm run audit:links` | **OK** — 48 hrefs verificados; 0 âncoras quebradas; 0 hrefs vazios/`javascript:`; links externos restritos aos contatos oficiais (incl. `wa.me` com mensagem); todos os `aria-controls`/`aria-labelledby`/`for` resolvem; exatamente 1 `<h1>`; conteúdos essenciais presentes |
| 6 | Servidor de desenvolvimento | `npm run dev` + `curl` | OK — `/`, `/src/main.tsx`, `/src/App.tsx`, `/src/styles/global.css` e `/fonts/*.woff2` respondem 200 |
| 7 | Geração de assets de marca | `npm run og:image` | OK — `public/og.png` (1200×630, PNG válido verificado por assinatura/bytes) e `apple-touch-icon.png` (180×180) |
| 8 | Verificação estática de contraste | cálculo manual (ver abaixo) | OK para AA nos pares usados (tabela abaixo) |

### Contrastes verificados (razão contra o fundo de uso)

| Par | Uso | Razão |
| --- | --- | --- |
| `#f6f3ff` sobre `#08070c` | texto principal | 18.4:1 (AAA) |
| `#b6afc5` sobre `#08070c` / `#111018` | texto secundário | 9.5:1 / 8.9:1 (AAA) |
| `#d4adff` sobre `#08070c` | links, eyebrows | 10.7:1 (AAA) |
| branco sobre gradiente `#9c1cff→#7d10e8` | botão primário | 4.77–5.2:1 (AA) |
| branco sobre `#8511ea` (hover) | botão primário hover | 5.87:1 (AA) |
| gradiente de texto `#f0e7ff→#c9a3f5` | destaque do H1 | ≥ 9.6:1 (AAA) |
| `#9013fe` sobre `#08070c` | **não usado como texto** | 3.5:1 → apenas superfícies/marcadores |

### Revisões estáticas realizadas (código lido, não “testado em browser”)

- Animações restritas a `transform`/`opacity`; sem animar `blur`, `box-shadow` ou `height`
  (accordion usa `grid-template-rows`; sombras/luzes são camadas pré-pintadas com `opacity`).
- Sem `will-change` generalizado (apenas hero, sob `hover:fine` + `prefers-reduced-motion:
  no-preference`), sem `translateZ(0)` de brincadeira.
- Um único rAF para scroll suave (ticker GSAP + Lenis `autoRaf:false`), `lagSmoothing(0)`,
  `lenis.on('scroll', ScrollTrigger.update)`, limpeza completa em unmount.
- `prefers-reduced-motion`: backstop global em CSS + tiers em JS (sem parallax/marquee/pins/
  smooth scroll; entradas viram fades curtos; marquee vira lista estática com controle de pausa).
- Foco: skip-link, ordem de foco, focus trap (menu e dialogs), `inert` em painéis fechados,
  retorno de foco ao gatilho, `:focus-visible` consistente.
- Alvos de toque ≥ 44 px no header/menu/FAQ/chips; inputs com fonte ≥ 16 px.
- Sem overflow horizontal por construção (`#root { overflow-x: clip }` + máscaras/clip-path);
  safe areas aplicadas em header e barra mobile.
- Fontes: dois WOFF2 variáveis locais, `font-display: swap`, preload no HTML, sem CDN.

---

## 2. O que NÃO pôde ser executado neste ambiente (limitações reais)

| Teste pretendido | Motivo | Como cobrir depois |
| --- | --- | --- |
| Lighthouse mobile (LCP/INP/CLS laboratoriais) | **Não há Chrome/Chromium no sandbox** e o download de browsers (Playwright/Puppeteer) está bloqueado pela rede | Rodar `npx lighthouse https://<dominio> --preset=desktop/mobile` em máquina com Chrome; metas: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 |
| Inspeção de console em browser real | idem | Abrir DevTools → Console nos breakpoints 320/375/390/430/768/1024/1440/1920 |
| Profiling de scroll/animações (frames, long tasks) | idem | DevTools → Performance: rolar a página e medir; procurar tarefas > 50 ms |
| Testes de teclado e leitor de tela em browser | idem | Percorrer com Tab/Shift+Tab/Enter/Escape; VoiceOver/NVDA no menu, FAQ e dialogs |
| Testes de `prefers-reduced-motion` em browser | idem | DevTools → Rendering → Emulate prefers-reduced-motion |
| **Safari/iPhone real** | sem dispositivo físico no sandbox | Testar em iPhone real (scroll, safe areas, barra de CTA, abertura do WhatsApp, `100svh`) |
| Métricas de campo (CrUX/RUM) | site ainda não publicado | Field data só existe após tráfego real; laboratório ≠ campo |

> Nenhuma afirmação de performance de campo é feita neste documento. Os números de bundle do
> item 1.3 são de laboratório (tamanho de artefato), não de experiência medida.

---

## 3. Checklist para validação visual no preview (navegador humano)

1. Primeira dobra carrega com texto legível imediatamente (sem preloader, sem FOIT longo).
2. Entrada coordenada do hero (~1 s) não impede clicar nos CTAs enquanto anima.
3. Header fixo ganha fundo legível ao rolar; indicador da seção ativa acompanha.
4. Menu mobile: abre/fecha com foco preso, Escape fecha, foco volta ao botão, body travado.
5. Marquee de competências: pausa no hover e no botão; some o movimento com reduced-motion.
6. Cards de serviço: hover apenas com mouse; sem loops competindo na viewport.
7. Portfólio: cada card abre o estudo de caso; “Projeto conceito” visível no Auraverse;
   disclosure de imagem ilustrativa presente; foco preso no dialog e volta ao card.
8. Processo: linha de progresso acompanha o scroll no desktop; mobile é sequência simples.
9. FAQ: accordion anima abertura/fechamento; `aria-expanded` correto.
10. Contato: escolher tipo + pessoa habilita o CTA; sem escolher mostra mensagem de erro;
    ao enviar abre o WhatsApp com a mensagem preenchida (nova aba) e confirma em aria-live.
11. Mobile: barra inferior aparece após o hero, some na seção de contato, respeita safe area
    e não cobre o conteúdo do rodapé.
12. Zoom de 200%: sem overflow horizontal e sem perda de conteúdo.

---

## 4. Riscos conhecidos (monitorar)

- O chunk principal inclui React DOM (~300 kB cru / 96 kB gzip). Se o LCP de campo reclamar,
  considerar `react-dom` streaming/SSG futuro ou reduzir dependências de ícones.
- O indicador de seção ativa e o header usam listeners de scroll passivos com rAF; em
  dispositivos muito lentos pode haver 1 frame de atraso no destaque (cosmético).
- `:has()` é usado para o anel de foco dos chips de formulário (baseline 2023). Em browsers
  antigos o anel não aparece no chip (o foco ainda funciona e o estado é visível pelo fundo).
