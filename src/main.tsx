import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Registra GSAP + plugins uma única vez, antes de qualquer componente.
import '@/lib/gsap';
import '@/styles/global.css';
import { App } from './App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Elemento #root não encontrado.');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
