/**
 * Artes do portfólio — composições SVG autorais e ILUSTRATIVAS.
 * ---------------------------------------------------------------------------
 * As capturas reais dos projetos não puderam ser baixadas no ambiente de build
 * (host de mídia bloqueado). Cada arte reinterpreta a identidade declarada do
 * projeto (paleta e linguagem) sem inventar métricas, clientes ou resultados.
 * O estudo de caso avisa explicitamente que a imagem é ilustrativa.
 *
 * São decorativas na árvore de acessibilidade: o nome, a categoria e a
 * descrição do card já comunicam o conteúdo para leitores de tela.
 */
import type { ProjectArtwork as ArtworkKind } from '@/data/projects';
import type { ComponentType, SVGProps } from 'react';

type ArtworkProps = SVGProps<SVGSVGElement>;

const FRAME = { width: 640, height: 400 } as const;

/* ------------------------------------------------------------- BODR/N --- */

function CafeArt(props: ArtworkProps) {
  return (
    <svg viewBox={`0 0 ${FRAME.width} ${FRAME.height}`} aria-hidden focusable="false" {...props}>
      <defs>
        <radialGradient id="cafe-glow" cx="0.72" cy="0.2" r="0.85">
          <stop offset="0" stopColor="rgba(232,163,61,.28)" />
          <stop offset="1" stopColor="rgba(232,163,61,0)" />
        </radialGradient>
        <radialGradient id="cafe-crema" cx="0.42" cy="0.38" r="0.75">
          <stop offset="0" stopColor="#d99a4e" />
          <stop offset="0.55" stopColor="#8a5426" />
          <stop offset="1" stopColor="#3a2210" />
        </radialGradient>
      </defs>

      <rect width="640" height="400" fill="#140d08" />
      <rect width="640" height="400" fill="url(#cafe-glow)" />

      {/* moldura do site */}
      <rect x="36" y="30" width="568" height="340" rx="10" fill="#0d0906" stroke="rgba(232,163,61,.26)" />
      <path d="M36 58h568" stroke="rgba(232,163,61,.2)" />
      <circle cx="56" cy="44" r="3.4" fill="rgba(232,163,61,.5)" />
      <circle cx="70" cy="44" r="3.4" fill="rgba(232,163,61,.3)" />
      <circle cx="84" cy="44" r="3.4" fill="rgba(232,163,61,.2)" />

      <text x="64" y="122" fill="#f3e2c8" fontFamily="var(--font-display)" fontWeight="700" fontSize="42" letterSpacing="6">
        BODR/N
      </text>
      <text x="66" y="146" fill="rgba(243,226,200,.6)" fontFamily="var(--font-body)" fontSize="12" letterSpacing="3.4">
        CAFÉ ESPECIAL · TORRA ARTESANAL
      </text>

      <rect x="64" y="170" width="150" height="6" rx="3" fill="rgba(243,226,200,.22)" />
      <rect x="64" y="186" width="118" height="6" rx="3" fill="rgba(243,226,200,.14)" />

      <rect x="64" y="216" width="118" height="34" rx="4" fill="#e8a33d" />
      <rect x="78" y="230" width="72" height="6" rx="3" fill="#241505" />
      <rect x="194" y="216" width="96" height="34" rx="4" fill="none" stroke="rgba(232,163,61,.45)" />
      <rect x="210" y="230" width="62" height="6" rx="3" fill="rgba(232,163,61,.6)" />

      {/* xícara vista de cima */}
      <circle cx="452" cy="196" r="98" fill="#1c1108" stroke="rgba(232,163,61,.3)" />
      <circle cx="452" cy="196" r="78" fill="url(#cafe-crema)" />
      <path
        d="M404 172c22-14 62-14 84 2M398 196c26-16 78-16 106 0M406 222c22 14 66 14 88-2"
        stroke="rgba(255,236,205,.34)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M548 176a26 26 0 0 1 0 44" stroke="rgba(232,163,61,.4)" strokeWidth="7" fill="none" />

      {/* produtos */}
      {[0, 1, 2].map((index) => (
        <g key={index} transform={`translate(${64 + index * 132} 282)`}>
          <rect width="116" height="64" rx="6" fill="#170e07" stroke="rgba(232,163,61,.2)" />
          <path d="M34 14h48l8 12v26h-64V26z" fill="rgba(232,163,61,.16)" />
          <rect x="42" y="26" width="32" height="5" rx="2.5" fill="rgba(243,226,200,.5)" />
          <rect x="12" y="50" width="52" height="4" rx="2" fill="rgba(243,226,200,.24)" />
        </g>
      ))}
    </svg>
  );
}

/* --------------------------------------------------------------- Lucra --- */

function DashboardArt(props: ArtworkProps) {
  return (
    <svg viewBox={`0 0 ${FRAME.width} ${FRAME.height}`} aria-hidden focusable="false" {...props}>
      <defs>
        <linearGradient id="lucra-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(144,19,254,.4)" />
          <stop offset="1" stopColor="rgba(144,19,254,0)" />
        </linearGradient>
      </defs>

      <rect width="640" height="400" fill="#0d0c14" />
      <rect width="640" height="400" fill="none" />

      {/* sidebar */}
      <rect width="72" height="400" fill="#12101b" />
      {[0, 1, 2, 3, 4].map((index) => (
        <rect key={index} x="20" y={44 + index * 34} width="32" height="7" rx="3.5" fill={index === 0 ? 'rgba(189,77,255,.6)' : 'rgba(219,195,255,.16)'} />
      ))}

      {/* topbar */}
      <rect x="72" y="0" width="568" height="46" fill="#12101b" />
      <rect x="96" y="18" width="96" height="9" rx="4.5" fill="rgba(246,243,255,.5)" />
      <rect x="520" y="14" width="96" height="18" rx="9" fill="rgba(144,19,254,.24)" stroke="rgba(212,173,255,.3)" />

      {/* KPIs */}
      {[0, 1, 2, 3].map((index) => (
        <g key={index} transform={`translate(${96 + index * 132} 66)`}>
          <rect width="118" height="62" rx="7" fill="#171425" stroke="rgba(219,195,255,.12)" />
          <rect x="12" y="12" width="42" height="6" rx="3" fill="rgba(246,243,255,.28)" />
          <rect x="12" y="28" width="58" height="12" rx="3" fill="#ece6fa" opacity="0.85" />
          <polygon points={`12,52 18,44 24,52`} fill={index === 3 ? '#8f86a3' : '#bd4dff'} />
          <rect x="28" y="47" width="26" height="4" rx="2" fill="rgba(219,195,255,.3)" />
        </g>
      ))}

      {/* gráfico principal */}
      <rect x="96" y="146" width="378" height="206" rx="8" fill="#131120" stroke="rgba(219,195,255,.12)" />
      {[186, 226, 266, 306].map((y) => (
        <path key={y} d={`M116 ${y}h338`} stroke="rgba(219,195,255,.08)" />
      ))}
      <path
        d="M116 312 L164 288 L212 300 L260 250 L308 262 L356 210 L404 224 L454 178 L454 336 L116 336 Z"
        fill="url(#lucra-area)"
      />
      <path
        d="M116 312 L164 288 L212 300 L260 250 L308 262 L356 210 L404 224 L454 178"
        fill="none"
        stroke="#bd4dff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M116 328 L164 318 L212 322 L260 300 L308 306 L356 286 L404 292 L454 268"
        fill="none"
        stroke="rgba(126,231,214,.66)"
        strokeWidth="2"
        strokeDasharray="5 5"
        strokeLinecap="round"
      />

      {/* distribuição */}
      <rect x="490" y="146" width="126" height="206" rx="8" fill="#131120" stroke="rgba(219,195,255,.12)" />
      <circle cx="553" cy="222" r="40" fill="none" stroke="rgba(219,195,255,.14)" strokeWidth="14" />
      <circle
        cx="553"
        cy="222"
        r="40"
        fill="none"
        stroke="#9013fe"
        strokeWidth="14"
        strokeDasharray="150 251"
        strokeLinecap="butt"
        transform="rotate(-90 553 222)"
      />
      <circle
        cx="553"
        cy="222"
        r="40"
        fill="none"
        stroke="#d4adff"
        strokeWidth="14"
        strokeDasharray="60 251"
        strokeDashoffset="-150"
        transform="rotate(-90 553 222)"
      />
      {[0, 1, 2].map((index) => (
        <g key={index} transform={`translate(508 ${292 + index * 20})`}>
          <rect width="10" height="10" rx="2" fill={['#9013fe', '#d4adff', 'rgba(219,195,255,.22)'][index]} />
          <rect x="18" y="2.5" width={56 - index * 12} height="5" rx="2.5" fill="rgba(246,243,255,.24)" />
        </g>
      ))}

      {/* tabela */}
      <rect x="96" y="364" width="520" height="20" rx="5" fill="#131120" />
      {[0, 1, 2, 3, 4].map((index) => (
        <rect key={index} x={112 + index * 104} y="371" width="60" height="6" rx="3" fill="rgba(246,243,255,.16)" />
      ))}
    </svg>
  );
}

/* ----------------------------------------------------------- Auraverse --- */

function XrArt(props: ArtworkProps) {
  return (
    <svg viewBox={`0 0 ${FRAME.width} ${FRAME.height}`} aria-hidden focusable="false" {...props}>
      <defs>
        <radialGradient id="xr-glow" cx="0.5" cy="0.42" r="0.68">
          <stop offset="0" stopColor="rgba(86,224,255,.3)" />
          <stop offset="0.55" stopColor="rgba(144,19,254,.2)" />
          <stop offset="1" stopColor="rgba(144,19,254,0)" />
        </radialGradient>
        <linearGradient id="xr-horizon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(255,77,216,.5)" />
          <stop offset="1" stopColor="rgba(255,77,216,0)" />
        </linearGradient>
      </defs>

      <rect width="640" height="400" fill="#080713" />
      <rect width="640" height="400" fill="url(#xr-glow)" />

      {/* estrelas */}
      {[
        [48, 44], [132, 92], [214, 40], [308, 74], [404, 36], [502, 88], [588, 52], [96, 168],
        [556, 176], [40, 250], [608, 262],
      ].map(([x, y], index) => (
        <circle key={index} cx={x} cy={y} r={index % 3 === 0 ? 1.7 : 1.1} fill="rgba(246,243,255,.5)" />
      ))}

      {/* grade em perspectiva */}
      <g stroke="rgba(86,224,255,.24)" strokeWidth="1">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <path key={`v-${index}`} d={`M${320 + (index - 4) * 26} 268 L${320 + (index - 4) * 150} 400`} />
        ))}
        {[268, 286, 310, 342, 380].map((y) => (
          <path key={`h-${y}`} d={`M0 ${y}h640`} opacity={0.5} />
        ))}
      </g>
      <rect x="0" y="262" width="640" height="4" fill="url(#xr-horizon)" />

      {/* portal */}
      <ellipse cx="320" cy="176" rx="132" ry="86" fill="rgba(8,7,19,.5)" stroke="rgba(86,224,255,.5)" strokeWidth="2" />
      <ellipse cx="320" cy="176" rx="104" ry="66" fill="none" stroke="rgba(255,77,216,.4)" strokeWidth="1.4" />
      <ellipse cx="320" cy="176" rx="74" ry="46" fill="none" stroke="rgba(212,173,255,.3)" strokeWidth="1" />

      {/* avatar geométrico */}
      <g transform="translate(320 186)">
        <circle cy="-34" r="20" fill="#191430" stroke="rgba(212,173,255,.5)" />
        <path d="M-30 26c4-24 16-34 30-34s26 10 30 34z" fill="#191430" stroke="rgba(212,173,255,.5)" />
        <path d="M-20 -34h40" stroke="rgba(86,224,255,.7)" strokeWidth="3" />
      </g>

      {/* HUD */}
      <g fontFamily="var(--font-mono)" fontSize="10" fill="rgba(86,224,255,.8)" letterSpacing="2">
        <text x="44" y="330">XR.SPACE/01</text>
        <text x="500" y="330">AVATAR:ON</text>
      </g>
      <rect x="44" y="342" width="120" height="10" rx="5" fill="rgba(86,224,255,.18)" />
      <rect x="500" y="342" width="96" height="10" rx="5" fill="rgba(255,77,216,.2)" />

      <text x="320" y="72" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="600" fontSize="26" letterSpacing="12" fill="#eaf9ff">
        AURAVERSE
      </text>
    </svg>
  );
}

/* ---------------------------------------------------------------- Kaze --- */

function RestaurantArt(props: ArtworkProps) {
  return (
    <svg viewBox={`0 0 ${FRAME.width} ${FRAME.height}`} aria-hidden focusable="false" {...props}>
      <rect width="640" height="400" fill="#100d0c" />
      <rect width="640" height="400" fill="none" />

      {/* papel de arroz / textura */}
      <rect x="0" y="0" width="640" height="400" fill="rgba(246,239,228,.02)" />

      {/* prato */}
      <circle cx="440" cy="200" r="126" fill="#161211" stroke="rgba(246,239,228,.16)" />
      <circle cx="440" cy="200" r="98" fill="#0c0a09" stroke="rgba(246,239,228,.1)" />
      <path d="M392 210c18-30 78-30 96 0-18 26-78 26-96 0z" fill="#2a1a16" />
      <path d="M404 202c14-16 58-16 72 0" stroke="rgba(246,239,228,.4)" strokeWidth="2" fill="none" />
      <rect x="472" y="164" width="16" height="16" fill="#b3271f" />
      <path d="M475 167h10v10h-10z" fill="none" stroke="rgba(246,239,228,.8)" strokeWidth="1.4" />

      {/* tipografia vertical */}
      <text x="96" y="128" fontFamily="var(--font-display)" fontWeight="500" fontSize="54" letterSpacing="18" fill="#f6efe4">
        KAZE
      </text>
      <text x="100" y="156" fontFamily="var(--font-body)" fontSize="11" letterSpacing="5" fill="rgba(246,239,228,.5)">
        OMAKASE · 12 LUGARES
      </text>

      <path d="M96 184h180" stroke="rgba(246,239,228,.24)" />

      {[0, 1, 2].map((index) => (
        <g key={index} transform={`translate(96 ${212 + index * 34})`}>
          <rect width="148" height="5" rx="2.5" fill="rgba(246,239,228,.3)" />
          <rect y="14" width="96" height="4" rx="2" fill="rgba(246,239,228,.16)" />
        </g>
      ))}

      <rect x="96" y="330" width="132" height="34" rx="2" fill="none" stroke="rgba(246,239,228,.5)" />
      <text x="116" y="352" fontFamily="var(--font-body)" fontSize="12" letterSpacing="3" fill="#f6efe4">
        RESERVAR
      </text>

      {/* selo */}
      <g transform="translate(258 322)">
        <rect width="30" height="30" fill="#b3271f" />
        <path d="M8 8h14M15 8v14M8 22h14" stroke="rgba(246,239,228,.85)" strokeWidth="1.6" />
      </g>
    </svg>
  );
}

/* ---------------------------------------------------- Lavínia Lopes --- */

function BeautyArt(props: ArtworkProps) {
  return (
    <svg viewBox={`0 0 ${FRAME.width} ${FRAME.height}`} aria-hidden focusable="false" {...props}>
      <defs>
        <linearGradient id="lav-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a1216" />
          <stop offset="1" stopColor="#120d10" />
        </linearGradient>
        <linearGradient id="lav-arch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(232,168,178,.34)" />
          <stop offset="1" stopColor="rgba(232,168,178,.08)" />
        </linearGradient>
      </defs>

      <rect width="640" height="400" fill="url(#lav-bg)" />

      {/* arco / espelho */}
      <path d="M392 372V196a96 96 0 0 1 192 0v176z" fill="url(#lav-arch)" stroke="rgba(232,168,178,.4)" />
      <path d="M420 372V204a68 68 0 0 1 136 0v168z" fill="#170f13" stroke="rgba(232,168,178,.22)" />

      {/* reflexos */}
      <path d="M444 250l72-44M452 286l84-52" stroke="rgba(246,239,240,.14)" strokeWidth="6" strokeLinecap="round" />

      {/* tipologia */}
      <text x="72" y="122" fontFamily="var(--font-display)" fontWeight="500" fontSize="38" letterSpacing="2" fill="#f4e7e9">
        Lavínia Lopes
      </text>
      <text x="74" y="148" fontFamily="var(--font-body)" fontSize="11" letterSpacing="4" fill="rgba(244,231,233,.55)">
        STUDIO DE BELEZA
      </text>

      <path d="M72 176h196" stroke="rgba(232,168,178,.3)" />

      {/* galeria */}
      {[0, 1, 2].map((index) => (
        <g key={index} transform={`translate(${72 + index * 72} 200)`}>
          <rect width="60" height="76" rx="4" fill="#1d1418" stroke="rgba(232,168,178,.24)" />
          <circle cx="30" cy="28" r="12" fill="rgba(232,168,178,.2)" />
          <rect x="12" y="52" width="36" height="4" rx="2" fill="rgba(244,231,233,.3)" />
        </g>
      ))}

      {/* agendamento */}
      <rect x="72" y="306" width="150" height="36" rx="18" fill="#e8a8b2" />
      <rect x="92" y="321" width="110" height="6" rx="3" fill="#2a151a" />
      <rect x="238" y="306" width="112" height="36" rx="18" fill="none" stroke="rgba(232,168,178,.5)" />
      <rect x="258" y="321" width="72" height="6" rx="3" fill="rgba(232,168,178,.7)" />
    </svg>
  );
}

const ARTWORKS: Record<ArtworkKind, ComponentType<ArtworkProps>> = {
  cafe: CafeArt,
  dashboard: DashboardArt,
  xr: XrArt,
  restaurant: RestaurantArt,
  beauty: BeautyArt,
};

export function ProjectArtwork({ kind, ...props }: { kind: ArtworkKind } & ArtworkProps) {
  const Art = ARTWORKS[kind];
  return <Art {...props} />;
}
