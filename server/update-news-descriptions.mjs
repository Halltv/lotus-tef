import { db } from './db.ts';
import { news } from '../drizzle/schema.ts';
import { eq } from 'drizzle-orm';

const newsDescriptions = [
  'Transferência Eletrônica de Fundos (TEF) é um sistema de pagamento eletrônico que permite a transferência de valores entre contas bancárias de forma rápida e segura. Descubra como o TEF funciona e por que é essencial para o seu negócio.',
  'Entenda as principais diferenças entre TEF e maquininha tradicional. TEF oferece maior segurança, menores taxas e melhor controle de transações. Saiba por que grandes empresas estão migrando para TEF.',
  'A segurança é fundamental em transações eletrônicas. Conheça os protocolos de criptografia, autenticação de dois fatores e as melhores práticas para proteger seus dados financeiros.',
  'Acompanhe as principais tendências do mercado financeiro em 2024. Desde a adoção de criptomoedas até a inteligência artificial em análise de risco, o setor está em constante evolução.',
  'TEF não é apenas um método de pagamento, é uma ferramenta para aumentar vendas. Com transações mais rápidas e confiáveis, seus clientes têm mais confiança em comprar. Veja como implementar TEF no seu negócio.',
  'Entenda as regulamentações que envolvem TEF e pagamentos eletrônicos. A conformidade com normas como PCI-DSS é essencial para proteger seu negócio e seus clientes.',
  'Integrar um sistema de pagamento robusto é essencial para o sucesso do seu e-commerce. Saiba como escolher a melhor solução e implementá-la sem complicações.',
  'Fraudes em transações eletrônicas são um problema crescente. Conheça as estratégias mais eficazes para reduzir fraudes e proteger seu negócio.',
  'Sistemas modernos de análise de risco utilizam inteligência artificial para identificar transações suspeitas em tempo real. Descubra como essa tecnologia protege seu negócio.',
  'A experiência do cliente no processo de pagamento é crucial. Um checkout rápido e seguro aumenta a taxa de conversão. Saiba como otimizar a jornada de pagamento.',
  'O futuro dos pagamentos é digital. Desde wallets digitais até pagamentos por biometria, conheça as inovações que estão transformando o mercado de pagamentos.',
  'Educação financeira é fundamental para que empresas e consumidores entendam a importância de sistemas de pagamento seguros. Saiba como a Lotus TEF contribui para isso.',
  'Conheça histórias de sucesso de empresas que implementaram TEF e aumentaram suas vendas significativamente. Veja como você também pode alcançar esses resultados.',
  'A Lotus TEF oferece suporte técnico 24/7 para garantir que suas transações nunca parem. Conheça os canais de atendimento e como obter ajuda quando precisar.',
  'A tecnologia de pagamento está em constante evolução. Conheça as inovações mais recentes que estão transformando a indústria de pagamentos eletrônicos.',
  'Reduzir custos de transação sem comprometer a qualidade é possível. Saiba como otimizar seus gastos com pagamentos eletrônicos e aumentar sua margem de lucro.',
  'Pagamentos móveis estão crescendo exponencialmente. Descubra como adaptar seu negócio para oferecer soluções de pagamento móvel seguras e eficientes.',
  'Inteligência artificial está revolucionando o setor de pagamentos. De detecção de fraudes a personalização de ofertas, veja como IA está transformando o mercado.',
  'Transações digitais são mais sustentáveis que transações em papel. Conheça o impacto ambiental positivo de adotar sistemas de pagamento eletrônico.',
  'Parcerias estratégicas são fundamentais para oferecer soluções completas de pagamento. Saiba como a Lotus TEF trabalha com parceiros para oferecer o melhor serviço.',
  'A transformação digital está mudando o varejo. Sistemas de pagamento modernos como TEF são essenciais para acompanhar essa transformação e manter a competitividade.'
];

async function updateNewsDescriptions() {
  try {
    const allNews = await db.query.news.findMany();
    
    for (let i = 0; i < allNews.length && i < newsDescriptions.length; i++) {
      const newsItem = allNews[i];
      const description = newsDescriptions[i];

      await db
        .update(news)
        .set({ description })
        .where(eq(news.id, newsItem.id));

      console.log(`✓ Atualizado: ${newsItem.title}`);
    }

    console.log(`\n✓ ${Math.min(allNews.length, newsDescriptions.length)} notícias atualizadas com sucesso!`);
  } catch (error) {
    console.error('Erro ao atualizar notícias:', error);
  }
}

updateNewsDescriptions();
