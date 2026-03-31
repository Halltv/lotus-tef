import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { trpc } from '@/lib/trpc';

/**
 * Hero Section - Lotus TEF
 * Seção principal com imagens rotativas carregadas do banco de dados
 * Design: Assimétrico com rotação de imagens a cada 30 segundos
 */

interface HeroImage {
  id: number;
  url: string;
  caption: string;
}

const dynamicSubtitles = [
  'com segurança',
  'com estabilidade',
  'com eficiência',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar notícias do banco de dados
  const { data: news } = trpc.news.list.useQuery();

  useEffect(() => {
    if (news && news.length > 0) {
      // Pegar as primeiras 5 notícias para o hero
      const heroNews = news.slice(0, 5).map((item: any) => ({
        id: item.id,
        url: item.imageUrl,
        caption: item.caption || item.title,
      }));
      setHeroImages(heroNews);
      setIsLoading(false);
    }
  }, [news]);

  useEffect(() => {
    if (heroImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 30000); // 30 segundos

    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    const subtitleInterval = setInterval(() => {
      setCurrentSubtitleIndex((prev) => (prev + 1) % dynamicSubtitles.length);
    }, 30000); // 30 segundos

    return () => clearInterval(subtitleInterval);
  }, []);

  const handlePrevImage = () => {
    if (heroImages.length === 0) return;
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const handleNextImage = () => {
    if (heroImages.length === 0) return;
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const handleImageClick = () => {
    const newsSection = document.getElementById('news');
    if (newsSection) {
      newsSection.scrollIntoView({ behavior: 'smooth' });
      // Scroll para a notícia correspondente após um pequeno delay
      setTimeout(() => {
        const newsCard = document.querySelector(`[data-news-id="${heroImages[currentImageIndex]?.id}"]`);
        if (newsCard) {
          newsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  };

  const handleContactClick = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center justify-center">
        <div className="animate-pulse text-foreground/50">Carregando notícias...</div>
      </section>
    );
  }

  if (heroImages.length === 0) {
    return (
      <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center justify-center">
        <div className="text-foreground/50">Nenhuma notícia disponível</div>
      </section>
    );
  }

  const currentImage = heroImages[currentImageIndex];

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-4">
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.05 }}
              >
                <span className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-semibold">
                  ✨ Solução de Pagamento Inteligente
                </span>
              </motion.div>

              {/* Fixed Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Tecnologia que impulsiona o
                <br />
                <span className="text-primary">crescimento do seu negócio.</span>
              </h1>
            </div>

            {/* Dynamic Subtitle */}
            <motion.div
              key={currentSubtitleIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary leading-tight">
                {dynamicSubtitles[currentSubtitleIndex]}
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-foreground/70 leading-relaxed max-w-xl"
            >
              A Lotus TEF oferece a solução mais confiável e segura para processamento de pagamentos. 
              Com infraestrutura robusta e suporte dedicado, suas transações nunca param.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.button
                onClick={handleContactClick}
                className="btn-primary flex items-center justify-center gap-2 group w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Começar Agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Obrigatoriedade Info */}
            <motion.div
              className="pt-8 border-t border-border space-y-3"
              variants={itemVariants}
            >
              <p className="text-sm text-foreground/70">
                <span className="font-semibold text-primary">TEF Obrigatório em:</span> Mato Grosso, Ceará e Rio Grande do Sul
              </p>
              <div className="flex gap-2">
                {heroImages.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      index === currentImageIndex
                        ? 'bg-primary w-8'
                        : 'bg-border w-2 hover:bg-border/70'
                    }`}
                    animate={{
                      width: index === currentImageIndex ? '32px' : '8px',
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            variants={itemVariants}
            className="relative h-full flex items-center justify-center"
          >
            {/* Image Card */}
            <motion.div
              className="w-full max-w-2xl"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="relative rounded-2xl overflow-hidden border-2 border-primary/30 hover:border-primary/50 transition-all hover-glow cursor-pointer group"
                onClick={handleImageClick}
              >
                <img
                  src={currentImage.url}
                  alt={currentImage.caption}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = '/images/placeholder.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent group-hover:bg-black/20 transition-all" />
                
                {/* Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-all z-10"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-all z-10"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {heroImages.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-primary w-8'
                          : 'bg-white/50 w-2 hover:bg-white/70'
                      }`}
                      animate={{
                        width: index === currentImageIndex ? '32px' : '8px',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Image indicator */}
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-xs text-foreground/50 cursor-pointer hover:text-foreground/70 transition-colors" onClick={handleImageClick}>
                  {currentImageIndex + 1} de {heroImages.length} • Clique para ver nas notícias
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
