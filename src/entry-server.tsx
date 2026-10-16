/**
 * Entry de SSR usado apenas para validação (smoke test + auditoria de links).
 * Não é usado em produção: o site é uma SPA client-side.
 */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';

export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
