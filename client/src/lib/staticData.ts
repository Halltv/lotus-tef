export interface NewsItem {
  id: number;
  title: string;
  caption: string;
  description: string;
  imageUrl: string;
}

export const staticNews: NewsItem[] = [
  {
    id: 1,
    title: "O que é TEF e por que sua empresa precisa?",
    caption: "Entenda como a Transferência Eletrônica de Fundos pode automatizar suas vendas.",
    description: "O TEF (Transferência Eletrônica de Fundos) é uma solução de pagamento que integra as vendas de cartões diretamente ao seu sistema de gestão (ERP). Com ele, você evita erros de digitação, reduz fraudes e tem um controle financeiro muito mais preciso.",
    imageUrl: "/images/1.png"
  },
  {
    id: 2,
    title: "Segurança em Pagamentos Digitais",
    caption: "Como a Lotus TEF protege os dados das suas transações.",
    description: "Segurança é nossa prioridade. Utilizamos criptografia de ponta a ponta e seguimos todos os protocolos PCI-DSS para garantir que cada centavo transacionado em nossa plataforma esteja seguro contra interceptações.",
    imageUrl: "/images/2.png"
  },
  {
    id: 3,
    title: "TEF Obrigatório: Fique em conformidade",
    caption: "Saiba quais estados exigem o uso do TEF por lei.",
    description: "Estados como Mato Grosso, Ceará e Rio Grande do Sul já possuem legislações que tornam o uso do TEF obrigatório para diversos segmentos. Não corra o risco de multas, regularize sua operação com a Lotus TEF.",
    imageUrl: "/images/3.png"
  },
  {
    id: 4,
    title: "Integração com SiTef e Scope",
    caption: "As melhores tecnologias de mercado integradas em um só lugar.",
    description: "Trabalhamos com as gigantes do setor para oferecer a você a melhor experiência. Seja via SiTef ou Scope, garantimos uma integração fluida e suporte técnico especializado para sua software house.",
    imageUrl: "/images/4.png"
  }
];

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  icon: string;
  features: string[];
}

export const staticProducts: Product[] = [
  {
    id: 'troca',
    name: 'TEF Troca de Arquivo',
    subtitle: 'Tradição e confiabilidade',
    description: 'A solução ideal para ambientes que exigem um sistema de TEF robusto e comprovado pelo mercado, com integração simplificada via arquivos.',
    icon: '📄',
    features: [
      'Processamento em lote',
      'Integração com sistemas legados',
      'Relatórios detalhados',
      'Suporte técnico prioritário',
    ],
  },
  {
    id: 'sitef',
    name: 'TEF SiTef (DLL)',
    subtitle: 'Alta performance e integração',
    description: 'Alta performance e integração direta via biblioteca (DLL). Utilize a tecnologia da Software Express para uma comunicação rápida e segura.',
    icon: '⚙️',
    features: [
      'Processamento em tempo real',
      'Múltiplos adquirentes',
      'Reconciliação automática',
      'Suporte 24/7 dedicado',
    ],
  },
  {
    id: 'scope',
    name: 'TEF Scope',
    subtitle: 'Modernidade e escalabilidade',
    description: 'Perfeito para operações de alto volume, garantindo velocidade, gestão centralizada e alta disponibilidade para seu negócio.',
    icon: '⚡',
    features: [
      'Arquitetura customizável',
      'Integração com qualquer sistema',
      'Monitoramento em tempo real',
      'SLA garantido 99.99%',
    ],
  },
];
