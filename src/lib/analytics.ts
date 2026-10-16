/**
 * Analytics — contrato pronto, nenhum rastreador instalado.
 * ---------------------------------------------------------------------------
 * Nada é enviado para fora: não há script de terceiros, pixel ou cookie.
 * Se um dia houver definição de privacidade e um GTM/GA4 for adicionado pelo
 * dono do site, os eventos abaixo já chegam no formato esperado via
 * `window.dataLayer`. Em desenvolvimento, apenas loga no console.
 *
 * Regra de privacidade: nunca incluir texto livre digitado pelo usuário,
 * nome, telefone ou qualquer dado pessoal no payload.
 */
import { analytics } from '@/config/site';
import type { PersonId } from '@/config/site';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export type AnalyticsEventName =
  (typeof analytics.events)[keyof typeof analytics.events];

export type AnalyticsPayload = Record<string, string | number | boolean>;

export function track(event: AnalyticsEventName, payload: AnalyticsPayload = {}): void {
  if (import.meta.env.DEV) {
    console.debug('[analytics:stub]', event, payload);
  }

  if (!analytics.enabled) return;
  if (typeof window === 'undefined' || !Array.isArray(window.dataLayer)) return;

  window.dataLayer.push({ event, ...payload });
}

/** Clique em qualquer CTA da página. */
export function trackCta(location: string, label: string): void {
  track('cta_click', { location, label });
}

/** Abertura de um estudo de caso ou clique em "ver projeto". */
export function trackProjectOpen(projectId: string, location: string): void {
  track('project_open', { project_id: projectId, location });
}

/** Clique que leva ao WhatsApp. */
export function trackWhatsAppClick(person: PersonId | 'none', location: string): void {
  track('whatsapp_click', { person, location });
}
