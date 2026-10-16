/**
 * Faixa de competências — itens do marquee.
 * Sem marcas de clientes (não há autorização de uso).
 */
export type Capability = { id: string; label: string };

export const capabilities: readonly Capability[] = [
  { id: 'web', label: 'Aplicações Web' },
  { id: 'mobile', label: 'Aplicações Mobile' },
  { id: 'bi', label: 'Business Intelligence' },
  { id: 'power-apps', label: 'Power Apps' },
  { id: 'power-automate', label: 'Power Automate' },
  { id: 'uxui', label: 'UX/UI' },
  { id: 'apis', label: 'APIs e integrações' },
] as const;
