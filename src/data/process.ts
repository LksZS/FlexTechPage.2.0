/**
 * Processo — "Do primeiro insight à entrega."
 * Cada etapa mostra como o cliente participa e o que ele recebe.
 * Prazos não são afirmados: são definidos na proposta.
 */

export type ProcessStep = {
  id: string;
  index: string;
  title: string;
  description: string;
  /** Como o cliente participa. */
  youDo: string;
  /** O que o cliente recebe ao fim da etapa. */
  youGet: string;
};

export const processSteps: readonly ProcessStep[] = [
  {
    id: 'descoberta',
    index: '01',
    title: 'Descoberta',
    description:
      'Uma conversa para entender o negócio, o problema real e o que precisa acontecer depois do projeto pronto.',
    youDo: 'Conta o cenário atual, os objetivos e o que já foi tentado.',
    youGet: 'Um resumo do problema, do público e dos critérios de sucesso.',
  },
  {
    id: 'estrategia',
    index: '02',
    title: 'Estratégia',
    description:
      'Definimos arquitetura, fluxos, integrações e o recorte do que entra na primeira entrega.',
    youDo: 'Valida prioridades e aponta o que é inegociável.',
    youGet: 'Escopo fechado, estrutura de páginas ou telas e proposta com investimento.',
  },
  {
    id: 'design',
    index: '03',
    title: 'Design',
    description:
      'Identidade, hierarquia e interface. O desenho é revisado em conjunto antes de virar código.',
    youDo: 'Aprova direção visual e comenta os protótipos.',
    youGet: 'Telas finais, componentes e o comportamento de cada estado.',
  },
  {
    id: 'desenvolvimento',
    index: '04',
    title: 'Desenvolvimento',
    description:
      'Construção com foco em performance, acessibilidade e manutenção — com acompanhamento durante o caminho.',
    youDo: 'Acompanha as entregas parciais e testa com a gente.',
    youGet: 'Versões navegáveis para validar antes do lançamento.',
  },
  {
    id: 'entrega',
    index: '05',
    title: 'Entrega e evolução',
    description:
      'Publicação, verificação final e orientação de uso. Depois disso, o produto continua evoluindo conforme o negócio pede.',
    youDo: 'Confere o projeto no ar e aponta ajustes do período inicial.',
    youGet: 'Projeto publicado, acessos e orientações — e um próximo passo definido.',
  },
] as const;
