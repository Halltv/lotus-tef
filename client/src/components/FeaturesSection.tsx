import { motion } from 'framer-motion';
import { AlertCircle, Clock, Lock } from 'lucide-react';

/**
 * Features Section - Lotus TEF
 * Grid de cards mostrando problemas que a Lotus resolve
 * Design: Cards com ícones e descrições impactantes
 */

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <AlertCircle className="w-8 h-8 text-primary" />,
    title: 'TEF Estável',
    description: 'Evite quedas no momento da venda. Nossa infraestrutura robusta garante máxima disponibilidade para suas operações críticas.',
  },
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: 'Alta Performance',
    description: 'Agilize o caixa com transações rápidas. Reduza filas e aumente a satisfação do cliente com um sistema otimizado.',
  },
  {
    icon: <Lock className="w-8 h-8 text-primary" />,
    title: 'Segurança de Ponta',
    description: 'Transações protegidas com os mais altos padrões do mercado, garantindo a segurança dos dados do seu cliente e do seu negócio.',
  },
];

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="solutions" className="relative py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            O que prejudica seu <span className="text-primary">negócio hoje?</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            A Lotus TEF resolve os principais problemas que afetam o seu ponto de venda.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Card */}
              <div className="relative glass-effect p-8 rounded-2xl border border-border group-hover:border-primary/50 transition-all h-full flex flex-col">
                {/* Icon */}
                <motion.div
                  className="mb-4 p-3 bg-primary/10 rounded-lg w-fit"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {feature.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-foreground/70 leading-relaxed flex-grow">
                  {feature.description}
                </p>

                {/* Decorative line on hover */}
                <motion.div
                  className="mt-4 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
