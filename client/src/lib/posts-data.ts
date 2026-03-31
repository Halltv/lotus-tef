export interface Post {
  id: number;
  image: string;
  title: string;
  description: string;
  content: string;
}

export const postsData: Post[] = [
  {
    id: 1,
    image: '/images/1.png',
    title: 'O que é TEF?',
    description: 'Transferência Eletrônica de Fundos',
    content: `TEF (Transferência Eletrônica de Fundos) é um sistema de processamento de transações financeiras que permite a transferência segura e rápida de fundos entre contas bancárias.

A Lotus TEF oferece uma solução robusta e confiável para este tipo de transação, garantindo:

• Processamento em tempo real
• Segurança de ponta a ponta
• Conformidade com padrões internacionais
• Suporte 24/7 dedicado
• Taxa de sucesso de 99.99%

Com a Lotus TEF, sua empresa pode processar transferências eletrônicas com confiança, sabendo que cada transação é tratada com o máximo cuidado e segurança.`,
  },
  {
    id: 5,
    image: '/images/5.png',
    title: 'O que é ADQUIRENTE?',
    description: 'Entenda o papel crucial na cadeia de pagamentos',
    content: `Um ADQUIRENTE é a instituição financeira responsável por processar e autorizar transações de cartão de crédito e débito em nome dos comerciantes.

O adquirente atua como intermediário entre:

• O estabelecimento comercial (loja)
• O banco do cliente (emissor do cartão)
• As bandeiras de cartão (Visa, Mastercard, etc.)

Funções principais do adquirente:

✓ Autorização de transações
✓ Processamento de pagamentos
✓ Liquidação de fundos
✓ Conformidade regulatória
✓ Suporte ao comerciante

A Lotus TEF trabalha em parceria com os principais adquirentes do mercado, garantindo que sua loja tenha acesso aos melhores serviços de processamento de pagamentos.`,
  },
  {
    id: 10,
    image: '/images/10.png',
    title: 'TEF na Automação Comercial',
    description: 'Integração perfeita com seus sistemas',
    content: `A automação comercial é essencial para empresas modernas que buscam eficiência operacional. O TEF integrado ao seu sistema de ponto de venda (PDV) oferece benefícios significativos.

Vantagens da integração TEF:

• Processamento automático de transações
• Redução de erros manuais
• Maior velocidade no atendimento
• Melhor controle de caixa
• Relatórios em tempo real

Com a Lotus TEF, você consegue:

✓ Integrar facilmente com sistemas PDV existentes
✓ Automatizar fluxos de pagamento
✓ Reduzir custos operacionais
✓ Aumentar a satisfação do cliente
✓ Melhorar a rastreabilidade das transações

Nossa plataforma foi desenvolvida para se integrar perfeitamente com os principais sistemas de automação comercial do mercado, oferecendo uma experiência seamless para sua operação.`,
  },
  {
    id: 15,
    image: '/images/15.png',
    title: 'Segurança em Transações Digitais',
    description: 'Protegendo seus dados e os de seus clientes',
    content: `A segurança é a prioridade máxima em qualquer transação financeira digital. A Lotus TEF implementa os mais altos padrões de segurança da indústria.

Camadas de proteção implementadas:

• Criptografia AES-256
• Tokenização de dados sensíveis
• Conformidade PCI-DSS
• Autenticação multi-fator
• Monitoramento 24/7 de fraudes

Certificações e conformidade:

✓ ISO 27001 (Segurança da Informação)
✓ PCI-DSS Nível 1
✓ LGPD (Lei Geral de Proteção de Dados)
✓ Auditoria externa regular

Seus dados e os de seus clientes estão protegidos com a mais avançada tecnologia de segurança disponível no mercado. Cada transação é monitorada em tempo real para detectar e prevenir atividades suspeitas.`,
  },
];

export const getPostById = (id: number): Post | undefined => {
  return postsData.find((post) => post.id === id);
};

export const getFeaturedPosts = (count: number = 4): Post[] => {
  return postsData.slice(0, count);
};
