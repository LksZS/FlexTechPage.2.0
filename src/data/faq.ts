/**
 * FAQ.
 * Sem condições comerciais inventadas: prazos, suporte e manutenção são
 * definidos na proposta, e isso é dito explicitamente quando necessário.
 */

export type FaqItem = { id: string; question: string; answer: string };

export const faq: readonly FaqItem[] = [
  {
    id: 'proposta',
    question: 'O que preciso enviar para pedir uma proposta?',
    answer:
      'O essencial: o que você quer construir, para quem, e o que precisa acontecer depois de pronto. Se tiver referências, materiais de marca, prints ou um sistema atual, ajuda muito. Não precisa de documento formal — uma mensagem no WhatsApp já inicia a conversa.',
  },
  {
    id: 'escopo',
    question: 'Como o escopo é definido?',
    answer:
      'Na etapa de descoberta levantamos objetivos, fluxos e integrações. Em seguida montamos o recorte do que entra na primeira entrega, junto com o que fica para uma fase seguinte. O escopo é fechado com você antes do desenvolvimento começar, para que a proposta reflita o trabalho real.',
  },
  {
    id: 'sites-sistemas',
    question: 'Vocês desenvolvem sites e sistemas?',
    answer:
      'Sim. Desde sites institucionais e landing pages até plataformas e sistemas sob medida, com painel administrativo, áreas restritas e integração com outras ferramentas. O mesmo vale para aplicações mobile e para dashboards de dados.',
  },
  {
    id: 'automacoes',
    question: 'Vocês fazem automações e integrações?',
    answer:
      'Sim. Conectamos ferramentas por APIs e webhooks, criamos rotinas automáticas e montamos fluxos com Power Automate e Power Apps. O ponto de partida é sempre mapear a tarefa repetitiva e entender de onde vêm os dados.',
  },
  {
    id: 'celular',
    question: 'O projeto funciona bem em celulares?',
    answer:
      'Funcionar no celular não é um ajuste final: o layout é desenhado e testado em telas pequenas desde o início, com atenção a toque, contraste, peso de página e leitura. Também cuidamos de acessibilidade — navegação por teclado, foco visível e respeito à preferência de movimento reduzido.',
  },
  {
    id: 'manutencao',
    question: 'E a manutenção depois da entrega?',
    answer:
      'Todo projeto é entregue com orientações de uso e os acessos necessários. O formato de suporte, ajustes e evolução contínua é definido na proposta, conforme o tipo de produto e a rotina do seu time — não trabalhamos com pacotes genéricos de suporte.',
  },
] as const;
