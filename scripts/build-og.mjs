/**
 * Gera as imagens estáticas da marca sem nenhuma dependência externa:
 *   public/og.png              (1200×630 — Open Graph / Twitter Card)
 *   public/apple-touch-icon.png (180×180)
 *
 * O sandbox onde este projeto foi construído não tem rasterizador de SVG
 * (nem Chrome/Skia), então o PNG é composto pixel a pixel e comprimido com o
 * `zlib` nativo do Node. Rode com `npm run og:image` para regenerar.
 */
import { deflateSync } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/* ------------------------------------------------------------------ PNG --- */

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buffer) {
  let c = 0xffffffff;
  for (let i = 0; i < buffer.length; i += 1) c = CRC_TABLE[(c ^ buffer[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([length, body, crc]);
}

function encodePng(width, height, rgba) {
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (stride + 1)] = 0; // filtro "none" por linha
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/* --------------------------------------------------------------- canvas --- */

class Canvas {
  constructor(width, height, background = [8, 7, 12, 255]) {
    this.width = width;
    this.height = height;
    this.data = Buffer.alloc(width * height * 4);
    for (let i = 0; i < width * height; i += 1) {
      this.data[i * 4] = background[0];
      this.data[i * 4 + 1] = background[1];
      this.data[i * 4 + 2] = background[2];
      this.data[i * 4 + 3] = background[3];
    }
  }

  set(x, y, [r, g, b, a = 255]) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return;
    const i = (y * this.width + x) * 4;
    const alpha = a / 255;
    this.data[i] = Math.round(this.data[i] * (1 - alpha) + r * alpha);
    this.data[i + 1] = Math.round(this.data[i + 1] * (1 - alpha) + g * alpha);
    this.data[i + 2] = Math.round(this.data[i + 2] * (1 - alpha) + b * alpha);
    this.data[i + 3] = 255;
  }

  /** Gradiente radial aditivo (luz violeta controlada). */
  glow(cx, cy, radius, color, strength) {
    const r2 = radius * radius;
    for (let y = Math.max(0, Math.floor(cy - radius)); y < Math.min(this.height, cy + radius); y += 1) {
      for (let x = Math.max(0, Math.floor(cx - radius)); x < Math.min(this.width, cx + radius); x += 1) {
        const d2 = (x - cx) ** 2 + (y - cy) ** 2;
        if (d2 > r2) continue;
        const t = 1 - Math.sqrt(d2) / radius;
        const i = (y * this.width + x) * 4;
        const k = t * t * strength;
        this.data[i] = Math.min(255, Math.round(this.data[i] + color[0] * k));
        this.data[i + 1] = Math.min(255, Math.round(this.data[i + 1] + color[1] * k));
        this.data[i + 2] = Math.min(255, Math.round(this.data[i + 2] + color[2] * k));
      }
    }
  }

  /** Preenche um polígono simples (scanline even-odd) com gradiente linear em X. */
  polygon(points, from, to, alpha = 255) {
    const ys = points.map((p) => p[1]);
    const minY = Math.max(0, Math.floor(Math.min(...ys)));
    const maxY = Math.min(this.height - 1, Math.ceil(Math.max(...ys)));
    const xsAll = points.map((p) => p[0]);
    const minX = Math.min(...xsAll);
    const maxX = Math.max(...xsAll);
    const span = Math.max(1, maxX - minX);

    for (let y = minY; y <= maxY; y += 1) {
      const intersections = [];
      for (let i = 0; i < points.length; i += 1) {
        const [x1, y1] = points[i];
        const [x2, y2] = points[(i + 1) % points.length];
        if ((y1 <= y && y2 > y) || (y2 <= y && y1 > y)) {
          intersections.push(x1 + ((y - y1) / (y2 - y1)) * (x2 - x1));
        }
      }
      intersections.sort((a, b) => a - b);

      for (let i = 0; i < intersections.length - 1; i += 2) {
        const startX = Math.ceil(intersections[i]);
        const endX = Math.floor(intersections[i + 1]);
        for (let x = startX; x <= endX; x += 1) {
          const t = Math.min(1, Math.max(0, (x - minX) / span));
          const color = [
            Math.round(from[0] + (to[0] - from[0]) * t),
            Math.round(from[1] + (to[1] - from[1]) * t),
            Math.round(from[2] + (to[2] - from[2]) * t),
            alpha,
          ];
          this.set(x, y, color);
        }
      }
    }
  }

  /** Contorno de polígono com espessura. */
  outline(points, color, thickness = 2, alpha = 255) {
    for (let i = 0; i < points.length; i += 1) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[(i + 1) % points.length];
      const steps = Math.ceil(Math.hypot(x2 - x1, y2 - y1) * 2);
      for (let s = 0; s <= steps; s += 1) {
        const t = s / steps;
        const cx = x1 + (x2 - x1) * t;
        const cy = y1 + (y2 - y1) * t;
        for (let dy = -thickness; dy <= thickness; dy += 1) {
          for (let dx = -thickness; dx <= thickness; dx += 1) {
            if (dx * dx + dy * dy > thickness * thickness) continue;
            this.set(Math.round(cx + dx), Math.round(cy + dy), [...color, alpha]);
          }
        }
      }
    }
  }

  rect(x, y, w, h, color) {
    for (let j = 0; j < h; j += 1) {
      for (let i = 0; i < w; i += 1) this.set(x + i, y + j, color);
    }
  }
}

/* ------------------------------------------------------------ bitmap font -- */

const GLYPHS = {
  F: ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  X: ['10001', '10001', '01010', '00100', '01010', '10001', '10001'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  C: ['01111', '10000', '10000', '10000', '10000', '10000', '01111'],
  H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
};

function drawWord(canvas, word, x, y, scale, color, bold = true) {
  let cursorX = x;
  for (const char of word) {
    const glyph = GLYPHS[char];
    if (!glyph) {
      cursorX += 3 * scale;
      continue;
    }
    glyph.forEach((row, rowY) => {
      [...row].forEach((cell, colX) => {
        if (cell !== '1') return;
        canvas.rect(
          cursorX + colX * scale,
          y + rowY * scale,
          scale + (bold ? 1 : 0),
          scale + (bold ? 1 : 0),
          color,
        );
      });
    });
    cursorX += 6 * scale;
  }
  return cursorX;
}

/* ----------------------------------------------------------------- marca --- */

/** Três planos angulares empilhados (mesma geometria do BrandMark). */
function drawPlanes(canvas, originX, originY, unit, alpha = 255) {
  const plane = (dy, from, to, strokeAlpha) => {
    const points = [
      [originX, originY + dy],
      [originX + 28 * unit, originY + dy - 6 * unit],
      [originX + 36 * unit, originY + dy - 2 * unit],
      [originX + 8 * unit, originY + dy + 4 * unit],
    ];
    canvas.polygon(points, from, to, alpha);
    canvas.outline(points, [219, 195, 255], Math.max(1, Math.round(unit * 0.35)), strokeAlpha);
  };

  plane(20 * unit, [43, 36, 56], [21, 18, 31], 56);
  plane(10 * unit, [189, 77, 255], [125, 16, 232], 96);
  plane(0, [239, 232, 255], [111, 102, 131], 128);

  // ponto de luz no vértice do plano superior
  const px = Math.round(originX + 36 * unit);
  const py = Math.round(originY - 2 * unit);
  const r = Math.max(2, Math.round(unit * 0.9));
  for (let dy = -r; dy <= r; dy += 1) {
    for (let dx = -r; dx <= r; dx += 1) {
      if (Math.abs(dx) + Math.abs(dy) > r) continue;
      canvas.set(px + dx, py + dy, [226, 205, 255, 255]);
    }
  }
}

/* ---------------------------------------------------------------- saída --- */

/** Reduz por média de bloco S×S (anti-aliasing barato e sem dependências). */
function downsample(canvas, factor) {
  const width = Math.floor(canvas.width / factor);
  const height = Math.floor(canvas.height / factor);
  const out = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let r = 0;
      let g = 0;
      let b = 0;
      for (let dy = 0; dy < factor; dy += 1) {
        for (let dx = 0; dx < factor; dx += 1) {
          const i = (((y * factor + dy) * canvas.width) + (x * factor + dx)) * 4;
          r += canvas.data[i];
          g += canvas.data[i + 1];
          b += canvas.data[i + 2];
        }
      }
      const n = factor * factor;
      const o = (y * width + x) * 4;
      out[o] = Math.round(r / n);
      out[o + 1] = Math.round(g / n);
      out[o + 2] = Math.round(b / n);
      out[o + 3] = 255;
    }
  }

  return out;
}

function buildOgImage() {
  const width = 1200;
  const height = 630;
  const S = 2; // supersample
  const canvas = new Canvas(width * S, height * S);

  // fundo: gradiente vertical suave + luz violeta no canto superior direito
  for (let y = 0; y < height * S; y += 1) {
    const t = y / (height * S);
    for (let x = 0; x < width * S; x += 1) {
      const i = (y * width * S + x) * 4;
      canvas.data[i] = Math.round(10 + (5 - 10) * t);
      canvas.data[i + 1] = Math.round(8 + (4 - 8) * t);
      canvas.data[i + 2] = Math.round(18 + (13 - 18) * t);
      canvas.data[i + 3] = 255;
    }
  }
  canvas.glow(950 * S, 140 * S, 620 * S, [144, 19, 254], 0.34);
  canvas.glow(110 * S, 570 * S, 460 * S, [88, 24, 148], 0.18);

  // retícula de pontos finíssima
  for (let y = 26; y < height; y += 34) {
    for (let x = 26; x < width; x += 34) {
      canvas.rect(x * S, y * S, S, S, [219, 195, 255, 30]);
    }
  }

  // plano aramado de apoio (equilíbrio da composição, canto inferior esquerdo)
  canvas.outline(
    [
      [60 * S, 520 * S],
      [250 * S, 462 * S],
      [420 * S, 526 * S],
      [230 * S, 588 * S],
    ],
    [219, 195, 255],
    Math.round(1 * S),
    34,
  );

  drawPlanes(canvas, 756 * S, 204 * S, 8.6 * S);

  // wordmark
  drawWord(canvas, 'FLEX', 92 * S, 258 * S, 12 * S, [246, 243, 255, 255]);
  drawWord(canvas, 'TECH', (92 + 4 * 6 * 12) * S, 258 * S, 12 * S, [212, 173, 255, 255]);

  // régua metálica
  for (let x = 92; x < 640; x += 1) {
    const t = (x - 92) / 548;
    const alpha = Math.round(150 * Math.sin(Math.PI * Math.min(1, t * 1.15)) + 22);
    canvas.rect(x * S, 386 * S, S, 2 * S, [212, 173, 255, alpha]);
  }

  // três losangos: eco do chanfro da marca
  [0, 1, 2].forEach((index) => {
    const cx = (100 + index * 26) * S;
    const cy = 432 * S;
    for (let dy = -6; dy <= 6; dy += 1) {
      for (let dx = -6; dx <= 6; dx += 1) {
        if (Math.abs(dx) + Math.abs(dy) > 6) continue;
        canvas.set(cx + dx, cy + dy, [212, 173, 255, index === 1 ? 235 : 120]);
      }
    }
  });

  // borda superior iluminada
  for (let x = 0; x < width * S; x += 1) {
    const t = x / (width * S);
    canvas.rect(x, 0, 1, 3 * S, [189, 77, 255, Math.round(120 * Math.sin(Math.PI * t))]);
  }

  return encodePng(width, height, downsample(canvas, S));
}

function buildTouchIcon() {
  const size = 180;
  const S = 4;
  const canvas = new Canvas(size * S, size * S, [10, 8, 18, 255]);
  canvas.glow(128 * S, 42 * S, 150 * S, [144, 19, 254], 0.42);
  drawPlanes(canvas, 30 * S, 58 * S, 3.4 * S);
  return encodePng(size, size, downsample(canvas, S));
}

mkdirSync(join(root, 'public'), { recursive: true });
writeFileSync(join(root, 'public', 'og.png'), buildOgImage());
writeFileSync(join(root, 'public', 'apple-touch-icon.png'), buildTouchIcon());

console.log('✓ public/og.png (1200×630)');
console.log('✓ public/apple-touch-icon.png (180×180)');
