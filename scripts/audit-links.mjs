/**
 * Auditoria de links, âncoras e referências de acessibilidade.
 * ---------------------------------------------------------------------------
 * Executa o render de servidor (smoke test: qualquer crash de render derruba o
 * script) e valida, no HTML produzido:
 *   1. toda âncora `#id` aponta para um elemento existente;
 *   2. nenhum href vazio, `#` solto ou `javascript:`;
 *   3. links externos pertencem à lista oficial (WhatsApp/Instagram/tel do config);
 *   4. `aria-controls` / `aria-labelledby` / `for` referenciam ids existentes.
 *
 * Uso: npm run audit:links   (faz o build SSR antes)
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const bundle = join(root, 'dist-ssr', 'entry-server.js');

const { render } = await import(bundle);
const html = render();

const failures = [];
const notes = [];

/* ids presentes no documento */
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

/* 1 + 2: hrefs */
const allowedExternal = new Set([
  'https://wa.me/5511975854678',
  'https://wa.me/5511978330904',
  'https://www.instagram.com/olucascoder/',
  'https://www.instagram.com/gabrielsanto/',
  'https://www.instagram.com/flextechnolog/',
  'tel:+5511975854678',
  'tel:+5511978330904',
]);

const hrefs = [...html.matchAll(/\shref="([^"]*)"/g)].map((m) => m[1]);
for (const href of hrefs) {
  if (href === '' || href === '#') {
    failures.push(`href invazio ou "#" solto: "${href}"`);
    continue;
  }
  if (href.startsWith('javascript:')) {
    failures.push(`href javascript: "${href}"`);
    continue;
  }
  if (href.startsWith('#')) {
    const id = href.slice(1);
    if (!ids.has(id)) failures.push(`âncora sem destino: ${href}`);
    continue;
  }
  if (/^https?:\/\//.test(href) || href.startsWith('tel:')) {
    if (allowedExternal.has(href)) continue;

    // wa.me com mensagem pré-preenchida: valida o número, ignora a query.
    if (href.startsWith('https://wa.me/')) {
      const base = href.split('?')[0];
      if (allowedExternal.has(base)) continue;
    }

    failures.push(`link externo fora da lista oficial: ${href}`);
  }
}

/* 3: aria-controls / aria-labelledby / for */
for (const attribute of ['aria-controls', 'aria-labelledby', 'for']) {
  for (const match of html.matchAll(new RegExp(`\\s${attribute}="([^"]+)"`, 'g'))) {
    for (const value of match[1].split(/\s+/)) {
      if (!ids.has(value)) failures.push(`${attribute}="${value}" sem elemento correspondente`);
    }
  }
}

/* 4: sanidade de conteúdo */
const required = [
  'Soluções digitais.',
  'Possibilidades',
  'Quero tirar meu projeto do papel',
  'Explorar projetos',
  'Tecnologia sob medida para o que seu negócio precisa.',
  'Ideias que ganharam forma.',
  'Do primeiro insight à entrega.',
  'Cada projeto tem um próximo passo. Vamos encontrar o seu.',
  'Seu próximo projeto começa com uma conversa.',
  'Lucas Souza',
  'Igor Gabriel',
  'Pular para o conteúdo',
];
for (const text of required) {
  if (!html.includes(text)) failures.push(`conteúdo essencial ausente: "${text}"`);
}

/* 5: hierarquia de títulos — um único h1 */
const h1Count = [...html.matchAll(/<h1[\s>]/g)].length;
if (h1Count !== 1) failures.push(`esperado 1 <h1>, encontrado ${h1Count}`);

/* 6: proibições de conteúdo */
const forbidden = ['R$ 990', 'R$ 2.490', '24/7', 'SLA', 'depoimento', 'Depoimento'];
for (const word of forbidden) {
  if (html.includes(word)) notes.push(`atenção: termo sensível presente no HTML: "${word}"`);
}

console.log(`HTML renderizado: ${(html.length / 1024).toFixed(1)} KB`);
console.log(`Links/âncoras verificados: ${hrefs.length}`);
console.log(`IDs no documento: ${ids.size}`);

if (notes.length > 0) {
  console.log('\nNotas:');
  notes.forEach((note) => console.log('  -', note));
}

if (failures.length > 0) {
  console.error(`\n✗ ${failures.length} problema(s):`);
  failures.forEach((failure) => console.error('  -', failure));
  process.exit(1);
}

console.log('\n✓ Auditoria de links, âncoras e acessibilidade: OK');
