/**
 * WhatsApp — caminho mais curto até a conversa.
 * ---------------------------------------------------------------------------
 * Toda URL é montada aqui, com `encodeURIComponent`. Nenhum dado é armazenado,
 * enviado para servidor nosso ou gravado em CRM: o clique apenas abre o
 * WhatsApp com a mensagem pronta e a conversa continua lá.
 */
import { people, type PersonId } from '@/config/site';

export type ProjectTypeId =
  | 'site'
  | 'sistema'
  | 'mobile'
  | 'bi'
  | 'power-platform'
  | 'ux-ui'
  | 'automacao'
  | 'outro';

export type ProjectType = { id: ProjectTypeId; label: string; hint: string };

/** Tipos de projeto oferecidos no fluxo de contato. */
export const projectTypes: readonly ProjectType[] = [
  { id: 'site', label: 'Site ou landing page', hint: 'Institucional, portfólio, campanha' },
  { id: 'sistema', label: 'Sistema ou plataforma web', hint: 'Painel, área restrita, produto' },
  { id: 'mobile', label: 'Aplicação mobile', hint: 'Android e iOS' },
  { id: 'bi', label: 'BI e dashboards', hint: 'Indicadores e relatórios' },
  { id: 'power-platform', label: 'Power Platform', hint: 'Power Apps, Power Automate, Power BI' },
  { id: 'ux-ui', label: 'UX/UI Design', hint: 'Interface, protótipo, design system' },
  { id: 'automacao', label: 'Automação e integração', hint: 'APIs, rotinas, ferramentas conectadas' },
  { id: 'outro', label: 'Outro / ainda não sei', hint: 'Vamos descobrir juntos' },
] as const;

export const projectTypeLabel = (id: ProjectTypeId): string =>
  projectTypes.find((type) => type.id === id)?.label ?? 'Projeto';

/** URL wa.me sem mensagem pré-preenchida. */
export const whatsappLink = (person: PersonId): string => people[person].whatsappUrl;

/** URL wa.me com mensagem codificada. */
export function whatsappLinkWithMessage(person: PersonId, message: string): string {
  const { whatsappNumber } = people[person];
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export type ContactDraft = {
  person: PersonId;
  projectType: ProjectTypeId | null;
  description: string;
  name: string;
};

/**
 * Monta a mensagem que abre o WhatsApp.
 * Deliberadamente curta e legível no chat — não um formulário despejado.
 */
export function buildContactMessage(draft: ContactDraft): string {
  const { person, projectType, description, name } = draft;
  const lines: string[] = ['Olá! Vim pelo site da FlexTech.'];

  if (projectType) {
    lines.push(`Interesse: ${projectTypeLabel(projectType)}.`);
  }

  const trimmed = description.trim();
  if (trimmed.length > 0) {
    lines.push('', trimmed);
  }

  const trimmedName = name.trim();
  if (trimmedName.length > 0) {
    lines.push('', `Nome: ${trimmedName}`);
  }

  lines.push('', `Para: ${people[person].firstName}`);

  return lines.join('\n');
}

/** Mensagem genérica usada pelos CTAs espalhados pela página. */
export function buildCtaMessage(context: string): string {
  return `Olá! Vim pelo site da FlexTech e quero conversar sobre: ${context}.`;
}
