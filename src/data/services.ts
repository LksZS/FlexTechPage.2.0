/**
 * Serviços.
 * Copy revisada em português do Brasil (o site anterior usava pt-PT em vários
 * trechos: "utilizadores", "planos", "equipa"). Nenhum número, prazo ou
 * promessa comercial é afirmado aqui — isso vive na proposta.
 */

export type ServiceVisual = 'web' | 'mobile' | 'bi' | 'power' | 'ux' | 'flow';

export type Service = {
  id: string;
  index: string;
  title: string;
  description: string;
  /** Pontos curtos e verificáveis — sem superlativos nem métricas inventadas. */
  bullets: readonly string[];
  visual: ServiceVisual;
  /** Destaque no grid (ocupa mais colunas no desktop). */
  featured?: boolean;
};

export const services: readonly Service[] = [
  {
    id: 'desenvolvimento-web',
    index: '01',
    title: 'Desenvolvimento Web',
    description:
      'Sites, plataformas e sistemas rápidos, responsivos e preparados para evoluir.',
    bullets: [
      'Institucional, landing page e sistemas sob medida',
      'Performance e SEO técnico desde a base',
      'Painéis e áreas restritas quando o projeto pede',
    ],
    visual: 'web',
    featured: true,
  },
  {
    id: 'aplicacoes-mobile',
    index: '02',
    title: 'Aplicações Mobile',
    description:
      'Experiências para dispositivos móveis com foco em usabilidade e consistência.',
    bullets: [
      'Interfaces pensadas para toque e leitura em movimento',
      'Um produto coeso entre Android e iOS',
      'Integração com os sistemas que você já usa',
    ],
    visual: 'mobile',
  },
  {
    id: 'business-intelligence',
    index: '03',
    title: 'Business Intelligence',
    description: 'Dashboards que tornam os dados mais claros para apoiar decisões.',
    bullets: [
      'Indicadores organizados por área e por decisão',
      'Conexão com planilhas, bancos e APIs',
      'Leitura clara em tela grande e no celular',
    ],
    visual: 'bi',
  },
  {
    id: 'power-platform',
    index: '04',
    title: 'Power Platform',
    description: 'Aplicações e fluxos com Power Apps, Power Automate e Power BI.',
    bullets: [
      'Apps internos para operações do dia a dia',
      'Aprovações, alertas e rotinas automáticas',
      'Relatórios ligados às mesmas fontes de dados',
    ],
    visual: 'power',
  },
  {
    id: 'ux-ui-design',
    index: '05',
    title: 'UX/UI Design',
    description: 'Interfaces que equilibram identidade, clareza e facilidade de uso.',
    bullets: [
      'Arquitetura de informação e fluxos',
      'Design system com tokens e componentes',
      'Acessibilidade como parte do desenho',
    ],
    visual: 'ux',
  },
  {
    id: 'automacoes-integracoes',
    index: '06',
    title: 'Automações e integrações',
    description: 'Conexão entre ferramentas e redução de tarefas repetitivas.',
    bullets: [
      'APIs, webhooks e rotinas agendadas',
      'Dados sincronizados entre sistemas',
      'Menos retrabalho manual no operacional',
    ],
    visual: 'flow',
    featured: true,
  },
] as const;
