# Conteúdo que precisa de aprovação antes de publicar

Lista objetiva do que **não** foi confirmado pelos responsáveis (Lucas e Igor) e por isso foi
tratado com cautela nesta implementação. Nada abaixo foi inventado para preencher espaço.

## 1. Marca

| Item | Estado | Ação necessária |
| --- | --- | --- |
| Logotipo oficial (`73f9dc3ec_Logo.png` no host de mídia do site anterior) | **Inacessível** no ambiente de build (host bloqueado). O site usa um monograma geométrico autoral como placeholder. | Soltar o arquivo em `public/brand/logo.png` e ajustar `brand.officialLogoSrc/Width/Height` em `src/config/site.ts`. O símbolo oficial **não** foi redesenhado. |
| Favicon / OG / apple-touch-icon | Gerados por script (`npm run og:image`) com a geometria da marca. | Aprovar visualmente ou substituir por artes oficiais. |

## 2. Portfólio (conteúdo do site anterior, reescrito em pt-BR)

Os cinco projetos existem no site atual e foram mantidos como **conteúdo a validar** — não
como prova de cliente/resultado. As imagens são composições SVG **ilustrativas** (as capturas
originais não puderam ser baixadas). Cada estudo de caso declara isso.

| Projeto | Pendências |
| --- | --- |
| BODR/N | Confirmar se pode ser exibido; capturas reais; stack; link público. |
| Lucra | Idem; confirmar quais KPIs/gráficos podem ser mostrados. |
| Auraverse | Já rotulado **“Projeto conceito”** — confirmar o rótulo e se permanece público. |
| Kaze | Confirmar autorização, capturas reais, stack, link. |
| Lavínia Lopes | Confirmar se o agendamento é sistema próprio ou WhatsApp (o texto atual evita afirmar); capturas; link. |
| Todos | Stack vazia no código até confirmação (“Stack a confirmar com os responsáveis.”). |

## 3. Preços, prazos e garantias — **removidos**

O site anterior publicava planos (R$ 990 / R$ 2.490 / sob consulta), “suporte 24/7”,
“SLA garantido”, “entrega em até X dias” e respostas “em até 24 horas”. **Nada disso foi
aprovado para esta versão** e não aparece no site. A seção *Investimento* explica que o valor
depende do escopo e aponta para a conversa; prazos/suporte/manutenção são definidos na
proposta (reforçado no FAQ).

- Decidir se algum valor de referência voltará a ser publicado (só com aprovação explícita).
- Definir o que pode ser prometido de suporte/manutenção pós-entrega.

## 4. Pessoas

- Lucas Souza e Igor Gabriel aparecem **somente com nome e canais reais** (WhatsApp,
  telefone, Instagram). Sem cargos, biografias, experiências, certificações ou retratos.
- Confirmar se querem cargos/funções públicos e, se sim, o texto exato.
- Confirmar os handles do Instagram (`@olucascoder`, `@gabrielsanto`, `@flextechnolog`).

## 5. Depoimentos e métricas — **removidos**

O site anterior exibia depoimentos com fotos de banco de imagens e métricas não comprovadas.
Foram excluídos. Só voltam com autorização por escrito de cada cliente e números verificáveis.

## 6. Dados cadastrais e legais

- Não há CNPJ, endereço físico nem e-mail informados → **não foram criados**.
- A nota de privacidade (rodapé → “Privacidade e dados”) descreve apenas o que é verdade
  hoje: sem cookies/trackers, formulário não envia dados, links saem para plataformas com
  política própria. Revisar o texto com quem responde juridicamente.
- Se um dia houver coleta real de dados, a nota precisa ser atualizada antes.

## 7. SEO e domínio

- `siteUrl` está como `https://flextech.example.com/` (canonical, OG, JSON-LD). **Trocar pelo
  domínio real** antes de publicar e regenerar nada mais é necessário.
- Título/description propostos precisam de aprovação de tom.

## 8. Analytics

- Eventos nomeados e prontos (`src/lib/analytics.ts`), **sem tracker instalado** e sem envio
  de dado pessoal. Definir: qual ferramenta, base legal/consentimento e então ativar.

## 9. Texto novo escrito nesta versão

Todo o copy em pt-BR foi reescrito para este redesign (hero, serviços, processo, investimento,
FAQ, contato, privacidade). Revisão final de tom e precisão técnica recomendada antes do ar.
