import crypto from 'crypto';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const newsData = [
  {
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663040339654/fwCTXHPCMvoEGyqkSoXakS/pasted_file_72bKbD_1_5230d379.webp',
    caption: 'O que é TEF? Entenda a Transferência Eletrônica de Fundos',
    title: 'Introdução ao TEF',
    description: 'Conheça os conceitos básicos da Transferência Eletrônica de Fundos e como funciona'
  },
  {
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663040339654/fwCTXHPCMvoEGyqkSoXakS/pasted_file_my1rGV_2_95d535bb.webp',
    caption: 'TEF na prática: pagamento integrado entre sistema e maquininha',
    title: 'TEF na Prática',
    description: 'Veja como o TEF funciona na integração entre seu sistema e a maquininha de pagamento'
  },
  {
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663040339654/fwCTXHPCMvoEGyqkSoXakS/pasted_file_CBk249_3_d3daabe2.webp',
    caption: 'TEF x Maquininha Tradicional: conheça as diferenças',
    title: 'TEF vs Maquininha Tradicional',
    description: 'Entenda as principais diferenças entre TEF e maquininha tradicional'
  },
  {
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663040339654/fwCTXHPCMvoEGyqkSoXakS/pasted_file_lk3b84_4_2963139e.webp',
    caption: 'O que é PinPad? Entenda o dispositivo essencial para TEF',
    title: 'O que é PinPad?',
    description: 'Descubra o papel do PinPad na segurança das transações TEF'
  },
  {
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663040339654/fwCTXHPCMvoEGyqkSoXakS/pasted_file_rBZXdW_5_6d332b56.webp',
    caption: 'O que é Adquirente? Descubra o papel dessa peça no pagamento',
    title: 'O que é Adquirente?',
    description: 'Entenda o papel do adquirente no processo de pagamento eletrônico'
  },
  {
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663040339654/fwCTXHPCMvoEGyqkSoXakS/pasted_file_zgVAzX_6_0d79ed82.webp',
    caption: 'PinPad, Adquirente e TEF: entenda de vez a diferença',
    title: 'Conceitos Principais',
    description: 'Diferenças entre PinPad, Adquirente e TEF explicadas'
  },
  {
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663040339654/fwCTXHPCMvoEGyqkSoXakS/pasted_file_6JXXux_7_b2f80c03.webp',
    caption: 'O que é PinPad, Adquirente e TEF? Entenda os conceitos',
    title: 'Guia Completo',
    description: 'Guia completo sobre PinPad, Adquirente e TEF'
  },
  {
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663040339654/fwCTXHPCMvoEGyqkSoXakS/pasted_file_x4JJiy_8_9cc1d103.webp',
    caption: 'Quais as formas de pagamento que o TEF aceita?',
    title: 'Formas de Pagamento',
    description: 'Conheça todas as formas de pagamento suportadas pelo TEF'
  },
  {
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663040339654/fwCTXHPCMvoEGyqkSoXakS/pasted_file_Oz22tW_9_aa100da6.webp',
    caption: 'Segurança do TEF: pagamentos integrados e mais proteção',
    title: 'Segurança em Transações',
    description: 'Entenda os mecanismos de segurança do TEF para proteger suas transações'
  },
  {
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663040339654/fwCTXHPCMvoEGyqkSoXakS/pasted_file_tKJZk0_10_b427e73c.webp',
    caption: 'TEF na automação comercial: integração completa',
    title: 'Automação Comercial',
    description: 'Como o TEF se integra com sistemas de automação comercial'
  },
  {
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663040339654/fwCTXHPCMvoEGyqkSoXakS/pasted_file_Wvxeop_11_ca1365b2.webp',
    caption: 'TEF: Solução moderna para pagamentos',
    title: 'Solução Moderna',
    description: 'Por que TEF é a solução moderna para pagamentos eletrônicos'
  },
  {
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663040339654/fwCTXHPCMvoEGyqkSoXakS/pasted_file_GHnMIa_12_c0f57075.webp',
    caption: 'Benefícios do TEF para seu negócio',
    title: 'Benefícios do TEF',
    description: 'Descubra os principais benefícios de usar TEF no seu negócio'
  },
  {
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663040339654/fwCTXHPCMvoEGyqkSoXakS/pasted_file_9qIbMw_13_e33a7534.webp',
    caption: 'TEF: Integração com seu sistema de ponto',
    title: 'Integração com PDV',
    description: 'Como integrar TEF com seu sistema de ponto de venda'
  },
  {
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663040339654/fwCTXHPCMvoEGyqkSoXakS/pasted_file_QhMR51_14_408f7272.webp',
    caption: 'TEF: Redução de custos em transações',
    title: 'Economia com TEF',
    description: 'Como o TEF pode reduzir seus custos de transação'
  },
  {
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663040339654/fwCTXHPCMvoEGyqkSoXakS/pasted_file_734MYt_15_982fa3fc.webp',
    caption: 'TEF: Conformidade e regulamentação',
    title: 'Conformidade Regulatória',
    description: 'Entenda as exigências regulatórias do TEF'
  },
  {
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663040339654/fwCTXHPCMvoEGyqkSoXakS/pasted_file_D1INvI_16_e055789a.webp',
    caption: 'TEF: Suporte e assistência técnica',
    title: 'Suporte Técnico',
    description: 'Saiba mais sobre o suporte técnico disponível para TEF'
  },
  {
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663040339654/fwCTXHPCMvoEGyqkSoXakS/pasted_file_jtZaAG_17_045195c0.webp',
    caption: 'TEF: Casos de sucesso',
    title: 'Histórias de Sucesso',
    description: 'Conheça histórias de sucesso de empresas usando TEF'
  },
  {
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663040339654/fwCTXHPCMvoEGyqkSoXakS/pasted_file_vHDxUv_18_9cf42fa3.webp',
    caption: 'TEF: Futuro dos pagamentos',
    title: 'Futuro dos Pagamentos',
    description: 'Tendências futuras em tecnologia de pagamento com TEF'
  },
  {
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663040339654/fwCTXHPCMvoEGyqkSoXakS/pasted_file_YP02yQ_19_e3399e09.webp',
    caption: 'TEF: Implementação passo a passo',
    title: 'Como Implementar',
    description: 'Guia passo a passo para implementar TEF'
  },
  {
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663040339654/fwCTXHPCMvoEGyqkSoXakS/pasted_file_P0q9oG_20_88c6e541.webp',
    caption: 'TEF: Perguntas frequentes',
    title: 'FAQ - Perguntas Frequentes',
    description: 'Respostas para as perguntas mais frequentes sobre TEF'
  },
  {
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663040339654/fwCTXHPCMvoEGyqkSoXakS/pasted_file_S9DW9q_21_975de44b.webp',
    caption: 'TEF: Comece agora',
    title: 'Comece Agora',
    description: 'Inicie sua jornada com TEF hoje mesmo'
  }
];

async function seedNews() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  console.log('Starting to seed news...');
  
  for (const item of newsData) {
    // Gerar hash SHA-256 da imagem para detecção de duplicatas
    const imageHash = crypto.createHash('sha256').update(item.imageUrl).digest('hex');
    
    // Verificar se a imagem já existe
    const [existing] = await connection.query(
      'SELECT id FROM news WHERE imageHash = ?',
      [imageHash]
    );
    
    if (existing.length > 0) {
      console.log(`⏭️  Imagem já existe: ${item.title}`);
      continue;
    }
    
    try {
      await connection.query(
        'INSERT INTO news (imageUrl, imageHash, caption, title, description, published, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), NOW())',
        [item.imageUrl, imageHash, item.caption, item.title, item.description]
      );
      console.log(`✅ Inserida: ${item.title}`);
    } catch (error) {
      console.error(`❌ Erro ao inserir ${item.title}:`, error.message);
    }
  }
  
  await connection.end();
  console.log('✓ Seed completo!');
  process.exit(0);
}

seedNews().catch(error => {
  console.error('Erro fatal:', error);
  process.exit(1);
});
