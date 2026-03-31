# Lotus TEF - Landing Page TODO

## Funcionalidades Implementadas

- [x] Header/Navbar com logo redonda (56x56px) e navegação responsiva
- [x] Hero Section com headline dinâmica e subtítulos rotativos
- [x] Features Section com 3 cards de problemas
- [x] Why TEF Section com 3 cards de benefícios
- [x] How TEF Simplifies com comparação Antes vs Depois
- [x] Products Section com 3 produtos
- [x] News/Social Wall com 4 posts e modal interativo
- [x] Contact Form com validação e máscara de telefone
- [x] Footer com redes sociais e WhatsApp button
- [x] Design Dark Tech com tema customizado
- [x] Banco de dados MySQL com tabela de contatos
- [x] Procedimento tRPC para envio de formulário
- [x] Integração com Resend API para envio de e-mails automáticos
- [x] Testes unitários para integração Resend
- [x] Testes de integração para formulário de contato
- [x] Imagens comprimidas (250MB → 18MB)
- [x] Responsividade Mobile First
- [x] Animações com Framer Motion

## Integração Resend - Como Funciona

Quando um cliente preenche o formulário "Fale Conosco":

1. Os dados são salvos no banco de dados
2. Um e-mail é enviado automaticamente para **contato@lotustef.com** com:
   - Nome do cliente
   - E-mail do cliente
   - Empresa (se fornecido)
   - Telefone (se fornecido)
   - Mensagem (se fornecida)

**Você não precisa mais acessar o banco de dados para verificar mensagens!**

## Próximos Passos (Opcional)

- [ ] Adicionar mais posts à seção de Notícias
- [ ] Implementar carousel/paginação para Notícias
- [ ] Criar dashboard admin para gerenciar contatos
- [ ] Adicionar analytics tracking
- [ ] Configurar domínio customizado (Lotustef.com)

- [x] Substituir Resend por SMTP Hostinger para envio de e-mails
- [x] Configurar credenciais SMTP como variáveis de ambiente
- [x] Testar envio de e-mail via SMTP Hostinger
- [x] Remover tela de login OAuth da landing page (acesso público)
- [x] Upload 21 novas imagens de notícias para S3
- [x] Criar tabela de notícias no banco de dados
- [x] Gerar legendas para cada imagem e inserir no banco
- [x] Verificar duplicatas de imagens no banco (usando hash SHA-256)
- [x] Melhorar transição/loop do carrossel de notícias (mais suave)
- [x] Atualizar frontend para carregar notícias do banco de dados
- [x] Aplicar melhorias de segurança no site

## Correções Solicitadas

- [x] Reverter layout de notícias para grid com 4 cards (layout anterior)
- [x] Melhorar carregamento de imagens para evitar flicker/recarregamento visível
- [x] Criar novo componente WhatsApp funcional e clicável
- [x] Remover botão WhatsApp antigo do Footer que não funciona
- [x] Adicionar novo botão WhatsApp funcional à página
