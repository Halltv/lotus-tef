import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * Dynamic Headline Section - Lotus TEF
 * Seção com layout similar à Hero, com headline dinâmica e imagem ao lado
 * Design: Dark Tech com animações suaves
 */

interface DynamicPhrase {
  headline: string;
  subtitle: string;
  image: string;
}

const dynamicPhrases: DynamicPhrase[] = [
  {
    headline: 'Tecnologia que impulsiona',
    subtitle: 'o crescimento do seu negócio',
    image: '/images/1.png',
  },
  {
    headline: 'Segurança que protege',
    subtitle: 'seus dados e transações',
    image: '/images/5.png',
  },
  {
    headline: 'Eficiência que aumenta',
    subtitle: 'a produtividade do caixa',
    image: '/images/10.png',
  },
  {
    headline: 'Conformidade que garante',
    subtitle: 'tranquilidade fiscal',
    image: '/images/15.png',
  },
  {
    headline: 'Integração que simplifica',
    subtitle: 'seu processo de vendas',
    image: '/images/3.png',
  },
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

export default function DynamicHeadlineSection() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % dynamicPhrases.length);
    }, 5000);

    return () => clearInterval(phraseInterval);
  }, []);

  const currentPhrase = dynamicPhrases[currentPhraseIndex];

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
            {/* Rotating Headline */}
            <motion.div
              key={currentPhraseIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                {currentPhrase.headline}
                <br />
                <span className="text-primary">{currentPhrase.subtitle}</span>
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-foreground/70 leading-relaxed max-w-xl"
            >
              A Lotus TEF oferece a solução mais confiável e segura para processamento de pagamentos. 
              Com infraestrutura robusta e suporte dedicado, suas transações nunca param.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.button
                className="btn-primary flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Começar Agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                className="btn-outline flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Agendar Demo
              </motion.button>
            </motion.div>

            {/* Phrase indicator */}
            <motion.div
              className="pt-8 border-t border-border space-y-3"
              variants={itemVariants}
            >
              <div className="flex gap-2">
                {dynamicPhrases.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === currentPhraseIndex
                        ? 'bg-primary w-8'
                        : 'bg-border w-2'
                    }`}
                    animate={{
                      width: index === currentPhraseIndex ? '32px' : '8px',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
              <p className="text-xs text-foreground/50">
                {currentPhraseIndex + 1} de {dynamicPhrases.length}
              </p>
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
                key={currentPhraseIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                className="relative rounded-2xl overflow-hidden border-2 border-primary/30 hover:border-primary/50 transition-all hover-glow"
              >
                <img
                  src={currentPhrase.image}
                  alt={currentPhrase.headline}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent hover:bg-black/20 transition-all" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
