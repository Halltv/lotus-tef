# Design Brainstorm - Lotus TEF Landing Page

## Abordagem Escolhida: Dark Tech Elegante com Minimalismo Corporativo

### Design Movement
**Neo-Brutalism Corporativo com Influências Cyberpunk**

Este design combina a robustez visual do neo-brutalism com a sofisticação do design corporativo de alta tecnologia, criando uma identidade que transmite confiabilidade, inovação e modernidade.

### Core Principles

1. **Contraste Intencional**: Uso deliberado de oposições visuais (luz/sombra, geométrico/orgânico) para criar hierarquia e guiar a atenção do usuário.

2. **Minimalismo Funcional**: Cada elemento visual serve um propósito claro. Sem decoração desnecessária, mas com profundidade através de sombras e texturas sutis.

3. **Movimento Propositivo**: Animações não são decorativas—elas comunicam estados, guiam o fluxo de informação e criam feedback visual imediato.

4. **Tipografia Forte**: Poppins em diferentes pesos cria uma hierarquia visual clara, com contraste entre títulos ousados e corpo legível.

### Color Philosophy

**Paleta Dark Tech Profunda:**
- **Background (#0B0F2A)**: Azul marinho profundo que evoca confiança, segurança e tecnologia de ponta. Reduz fadiga visual em sessões prolongadas.
- **Foreground (#FAFAFA)**: Branco gelo com leve tom azulado, criando contraste suficiente sem ser agressivo.
- **Primary (#E6B450)**: Dourado quente que representa luxo, exclusividade e sucesso. Funciona como CTA principal, criando pontos de foco.
- **Secondary (#5B2C83)**: Roxo intenso que adiciona sofisticação e diferenciação visual. Usado em elementos secundários e detalhes.
- **Card Background (#131835)**: Azul petróleo levemente mais claro que o fundo, criando profundidade e separação visual.
- **Border (#48236A)**: Roxo escuro que define limites sem ser invasivo, mantendo a coesão visual.

**Intenção Emocional**: A paleta transmite profissionalismo, segurança tecnológica e exclusividade. O dourado funciona como um chamado à ação que não pode ser ignorado.

### Layout Paradigm

**Assimétrico com Eixo Vertical Dinâmico**

- Hero section com composição assimétrica: headline à esquerda, elemento dinâmico (card rotativo) à direita.
- Seções alternadas entre conteúdo à esquerda/direita para evitar monotonia.
- Uso de clip-paths e dividers angulares para criar transições visuais interessantes entre seções.
- Grid de features com cards que se sobrepõem levemente, criando profundidade.
- Social wall em grid 2x2 com hover effects que revelam informações.

### Signature Elements

1. **Gradientes Dourados Sutis**: Linhas e acentos em dourado (#E6B450) que aparecem em CTAs, bordas de cards e elementos de destaque.

2. **Dividers Angulares**: Transições entre seções usando clip-paths diagonais, criando movimento visual e diferenciando cada seção.

3. **Cards com Efeito Vidro (Glassmorphism)**: Fundo semi-transparente com backdrop blur, bordas roxas sutis, criando profundidade e modernidade.

### Interaction Philosophy

- **Hover States Reveladores**: Cards expandem levemente, sombras aumentam, bordas ganham brilho dourado.
- **Feedback Imediato**: Botões mudam cor e escala ao interagir, inputs ganham brilho ao focar.
- **Scroll Reveal**: Elementos aparecem com fade-in + slide-up ao entrar na viewport.
- **Micro-interações**: Ícones animam ao hover, contadores incrementam ao scroll, indicadores de progresso se movem suavemente.

### Animation

- **Entrance Animations**: Fade-in + slide-up com stagger de 100-150ms entre elementos.
- **Hover Effects**: Scale (1.02-1.05), shadow increase, border color change to primary.
- **Scroll Reveal**: Elementos ganham opacity e translateY ao entrar na viewport, com duração de 600-800ms.
- **Transitions**: Todas as mudanças de cor/tamanho usam 300-400ms de transição suave (easing: ease-out).
- **Floating Elements**: Card dinâmico na hero section flutua levemente (translateY: -10px) em loop infinito.
- **Pulsing Accents**: Elementos de destaque (CTA principal) têm um leve pulso de sombra/brilho.

### Typography System

**Fonte Principal: Poppins (Google Fonts)**

- **Display (H1)**: Poppins Bold (700), 48-56px, line-height 1.2, tracking -0.02em
  - Usado em headlines principais e títulos de seção
  - Cor: Foreground (#FAFAFA)

- **Heading (H2/H3)**: Poppins SemiBold (600), 32-40px, line-height 1.3
  - Subtítulos e títulos de cards
  - Cor: Foreground com opacidade 0.95

- **Subheading (H4)**: Poppins Medium (500), 18-24px, line-height 1.4
  - Títulos de features e seções menores
  - Cor: Primary (#E6B450) ou Foreground

- **Body**: Poppins Regular (400), 14-16px, line-height 1.6
  - Texto corrido e descrições
  - Cor: Foreground com opacidade 0.8

- **Caption**: Poppins Regular (400), 12-14px, line-height 1.5
  - Textos pequenos, labels, footers
  - Cor: Foreground com opacidade 0.6

- **CTA/Button**: Poppins SemiBold (600), 14-16px, letter-spacing 0.5px
  - Botões e chamadas à ação
  - Cor: Background (#0B0F2A) em fundo Primary

### Design Consistency Rules

1. **Espaçamento**: Usar múltiplos de 8px (8, 16, 24, 32, 40, 48, 56, 64)
2. **Bordas**: Raio de 8-12px para cards, 4px para inputs
3. **Sombras**: Usar sombras em 3 níveis (subtle, medium, elevated)
4. **Ícones**: Lucide React com tamanho 20-24px para corpo, 32-40px para destaques
5. **Transições**: 300-400ms com easing ease-out padrão

---

## Próximos Passos

1. Configurar CSS variables no `index.css` com a paleta Dark Tech
2. Adicionar Poppins do Google Fonts
3. Implementar componentes base com Framer Motion
4. Criar seções da landing page seguindo o layout assimétrico
5. Integrar animações de scroll reveal
