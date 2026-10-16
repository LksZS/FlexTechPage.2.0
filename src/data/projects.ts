/**
 * Portfólio.
 * ---------------------------------------------------------------------------
 * Os cinco projetos abaixo vêm do site atual (flex-tech.base44.app). Eles são
 * tratados como **conteúdo existente a validar**, não como comprovação
 * automática de clientes, stack ou resultados:
 *
 *  - `link` é `null` em todos: não há URL pública confirmada. Cada card abre um
 *    estudo de caso acessível com o conteúdo disponível.
 *  - `tech` fica vazio até os responsáveis confirmarem a stack.
 *  - `artwork` é uma composição SVG autoral e **ilustrativa** — as capturas
 *    reais não puderam ser baixadas neste ambiente (host de mídia bloqueado).
 *  - `concept: true` marca explicitamente "Projeto conceito" na interface.
 *  - Nenhuma métrica, depoimento, cliente ou prazo é afirmado.
 *
 * Tudo o que precisa de aprovação está listado em docs/CONTENT-APPROVAL.md.
 */

export type ProjectArtwork = 'cafe' | 'dashboard' | 'xr' | 'restaurant' | 'beauty';

export type Project = {
  id: string;
  name: string;
  category: string;
  /** Uma frase — usada no card. */
  summary: string;
  challenge: string;
  solution: readonly string[];
  /** Stack confirmada. Vazia enquanto não houver validação dos responsáveis. */
  tech: readonly string[];
  /** URL pública real do projeto, quando existir. */
  link: string | null;
  /** Projeto conceitual/autoral, não um cliente entregue. */
  concept: boolean;
  artwork: ProjectArtwork;
  /** Proporção da arte (evita CLS: o container reserva o espaço). */
  aspect: 'wide' | 'tall';
};

export const projects: readonly Project[] = [
  {
    id: 'bodrn',
    name: 'BODR/N',
    category: 'Branding & E-commerce',
    summary: 'Café artesanal — landing page escura com identidade sensorial.',
    challenge:
      'Apresentar uma marca de café especial com identidade própria e conduzir o visitante até o pedido sem perder o tom sensorial da torra artesanal.',
    solution: [
      'Página escura com hierarquia tipográfica forte e pouquíssimos elementos por dobra.',
      'Seções de origem e torra construídas como narrativa, não como lista de features.',
      'Galeria de produto e chamada de compra posicionadas nos pontos de decisão.',
    ],
    tech: [],
    link: null,
    concept: false,
    artwork: 'cafe',
    aspect: 'wide',
  },
  {
    id: 'lucra',
    name: 'Lucra',
    category: 'BI & Analytics',
    summary: 'Dashboard de vendas com leitura executiva de receita e margem.',
    challenge:
      'Dados de vendas espalhados em planilhas, sem uma leitura executiva rápida de receita, lucro e margem.',
    solution: [
      'Painel com KPIs de receita, lucro, margem e pedidos no topo da leitura.',
      'Gráficos de evolução e distribuição por categoria e região.',
      'Filtros de período para acompanhar o mês sem refazer relatório manual.',
    ],
    tech: [],
    link: null,
    concept: false,
    artwork: 'dashboard',
    aspect: 'wide',
  },
  {
    id: 'auraverse',
    name: 'Auraverse',
    category: 'Experiência imersiva',
    summary: 'Metaverso & XR — estudo de ambientes e avatares para marcas.',
    challenge:
      'Explorar como uma marca pode ocupar um ambiente digital imersivo sem sacrificar clareza de navegação e leitura.',
    solution: [
      'Conceito de plataforma com ambientes em realidade estendida.',
      'Direção de arte de superfícies, luz e avatares.',
      'Estudo de navegação e pontos de interação dentro do ambiente.',
    ],
    tech: [],
    link: null,
    concept: true,
    artwork: 'xr',
    aspect: 'tall',
  },
  {
    id: 'kaze',
    name: 'Kaze',
    category: 'Landing page & Branding',
    summary: 'Restaurante premium — site atmosférico e minimalista.',
    challenge:
      'Transmitir a experiência de um omakase — poucos lugares, menu do dia, atmosfera — em um site que precisava ser silencioso e elegante.',
    solution: [
      'Composição minimalista, com tipografia grande e muito espaço vazio.',
      'Cardápio e reserva colocados na primeira dobra de decisão.',
      'Paleta e fotografia tratadas para sustentar o tom fine dining.',
    ],
    tech: [],
    link: null,
    concept: false,
    artwork: 'restaurant',
    aspect: 'wide',
  },
  {
    id: 'lavinia',
    name: 'Lavínia Lopes',
    category: 'Web design & Agendamento',
    summary: 'Studio de beleza — site clean com galeria e agendamento.',
    challenge:
      'Um studio de beleza precisava de presença digital refinada e de um caminho simples e direto para agendar um horário.',
    solution: [
      'Site clean, com identidade visual e galeria de trabalhos em destaque.',
      'Fluxo curto de agendamento, sem cadastro obrigatório.',
      'Layout mobile-first, já que a maior parte dos acessos vem do celular.',
    ],
    tech: [],
    link: null,
    concept: false,
    artwork: 'beauty',
    aspect: 'tall',
  },
] as const;

/**
 * Texto exibido dentro do estudo de caso. Deixa explícito o que ainda depende
 * de validação, em vez de insinuar resultados que não foram confirmados.
 */
export const projectDisclosure =
  'Imagem ilustrativa. Capturas reais, link público, stack e resultados deste projeto aguardam validação dos responsáveis.';
