/**
 * Configuração central do site.
 * ---------------------------------------------------------------------------
 * TODO contato, link externo, rótulo de CTA e metadado de SEO mora aqui.
 * Nenhum componente deve conter telefone, @ de Instagram ou URL de WhatsApp
 * "hard-coded": trocar um número precisa ser uma edição de uma linha só.
 */

export type ContactPerson = {
  /** Identificador estável (usado em analytics e no fluxo de contato). */
  id: 'lucas' | 'igor';
  name: string;
  firstName: string;
  /** Somente dígitos, com código do país. Usado para montar a URL do WhatsApp. */
  whatsappNumber: string;
  /** URL canônica wa.me (usada quando não há mensagem pré-preenchida). */
  whatsappUrl: string;
  /** Telefone formatado para exibição. */
  phoneLabel: string;
  /** href tel: sem espaços nem pontuação. */
  phoneHref: string;
  instagramUrl: string;
  instagramHandle: string;
  /** Monograma tipográfico — não há retratos reais autorizados. */
  initials: string;
};

export const people = {
  lucas: {
    id: 'lucas',
    name: 'Lucas Souza',
    firstName: 'Lucas',
    whatsappNumber: '5511975854678',
    whatsappUrl: 'https://wa.me/5511975854678',
    phoneLabel: '(11) 97585-4678',
    phoneHref: 'tel:+5511975854678',
    instagramUrl: 'https://www.instagram.com/olucascoder/',
    instagramHandle: '@olucascoder',
    initials: 'LS',
  },
  igor: {
    id: 'igor',
    name: 'Igor Gabriel',
    firstName: 'Igor',
    whatsappNumber: '5511978330904',
    whatsappUrl: 'https://wa.me/5511978330904',
    phoneLabel: '(11) 97833-0904',
    phoneHref: 'tel:+5511978330904',
    instagramUrl: 'https://www.instagram.com/gabrielsanto/',
    instagramHandle: '@gabrielsanto',
    initials: 'IG',
  },
} satisfies Record<string, ContactPerson>;

export type PersonId = keyof typeof people;

export const company = {
  name: 'FlexTech',
  legalName: 'FlexTech',
  tagline: 'Soluções digitais. Possibilidades sem limites.',
  summary:
    'Sites, aplicações, dados e automações sob medida — do primeiro insight à evolução contínua.',
  instagramUrl: 'https://www.instagram.com/flextechnolog/',
  instagramHandle: '@flextechnolog',
  /** Ano de fundação: não informado — não inventar. Exibimos apenas o ano atual. */
  foundedYear: null as string | null,
  /** CNPJ/endereço/e-mail corporativo: não informados — não inventar. */
  cnpj: null as string | null,
  address: null as string | null,
  email: null as string | null,
};

/**
 * Marca.
 * O arquivo oficial do logotipo (media.base44.com) não pôde ser baixado neste
 * ambiente. `officialLogoSrc` aceita o caminho do asset original assim que ele
 * for colocado em `public/brand/` — enquanto for `null`, o site renderiza o
 * `BrandMark` (monograma geométrico placeholder, autoral) + wordmark.
 *
 * Para usar o logo oficial:
 *   1. salve o PNG em `public/brand/logo.png` (idealmente também um SVG);
 *   2. troque `officialLogoSrc` para '/brand/logo.png';
 *   3. ajuste `officialLogoRatio` (largura/altura) para evitar CLS.
 */
export const brand = {
  officialLogoSrc: null as string | null,
  officialLogoAlt: 'Logotipo da FlexTech',
  officialLogoWidth: 168,
  officialLogoHeight: 44,
  officialLogoRatio: 168 / 44,
  wordmark: 'FlexTech',
  /** Cor de fundo do PNG oficial, se houver — usado no fallback opaco. */
  markColors: {
    graphite: '#2a2438',
    metal: '#c9b8e6',
    violet: '#9013fe',
    violetBright: '#bd4dff',
  },
};

export type NavItem = { label: string; href: string; id: string };

export const nav: readonly NavItem[] = [
  { label: 'Serviços', href: '#servicos', id: 'servicos' },
  { label: 'Projetos', href: '#projetos', id: 'projetos' },
  { label: 'Processo', href: '#processo', id: 'processo' },
  { label: 'Sobre', href: '#sobre', id: 'sobre' },
  { label: 'Contato', href: '#contato', id: 'contato' },
] as const;

export const cta = {
  primary: 'Vamos conversar',
  hero: 'Quero tirar meu projeto do papel',
  heroSecondary: 'Explorar projetos',
  afterWork: 'Começar meu projeto',
  investment: 'Conversar sobre meu projeto',
  final: 'Abrir conversa no WhatsApp',
  mobileBar: 'Falar no WhatsApp',
} as const;

/** URL pública do site (trocar em produção). Usada em canonical/Open Graph. */
export const siteUrl = 'https://flextech.example.com';

export const seo = {
  title: 'FlexTech — Soluções digitais, possibilidades sem limites',
  titleTemplate: '%s · FlexTech',
  description:
    'A FlexTech cria sites, aplicações web e mobile, dashboards de BI, Power Platform, UX/UI e automações que conectam sua empresa ao próximo passo.',
  ogType: 'website',
  locale: 'pt_BR',
  themeColor: '#08070c',
  keywords: [
    'desenvolvimento web',
    'aplicações mobile',
    'business intelligence',
    'Power Apps',
    'Power Automate',
    'UX/UI design',
    'automações e integrações',
    'FlexTech',
  ],
};

/**
 * Rastreamento.
 * Nenhum rastreador é instalado e nenhum dado pessoal é enviado: os eventos
 * abaixo são apenas o contrato pronto para plugar (GA4/Meta/etc.) quando houver
 * definição de privacidade. Ver `src/lib/analytics.ts`.
 */
export const analytics = {
  enabled: false as boolean,
  events: {
    ctaClick: 'cta_click',
    projectOpen: 'project_open',
    whatsappClick: 'whatsapp_click',
  },
} as const;
