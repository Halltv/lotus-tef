import { motion } from 'framer-motion';
import { Shield, Lock, Zap } from 'lucide-react';

/**
 * Why TEF Section - Lotus TEF
 * Seção explicando por que o TEF é essencial no cenário atual
 * Design: Dark Tech com 3 cards destacados
 */

const reasons = [
  {
    icon: Shield,
    title: 'Conformidade Total com a SEFAZ',
    description: 'Evite multas e problemas fiscais. Em diversos estados, a legislação exige que o comprovante de pagamento esteja vinculado eletrônicamente à nota fiscal. Com a Lotus TEF, seu negócio opera em total conformidade com a SEFAZ, garantindo que cada venda seja reportada corretamente e de forma automática.',
  },
  {
    icon: Lock,
    title: 'Segurança contra fraudes',
    description: 'Maquininhas comuns podem ser trocadas ou extraviadas facilmente. O TEF é integrado ao seu computador e utiliza criptografia de ponta a ponta. Isso protege o seu negócio contra fraudes, estornos indevidos e garante que o dinheiro caia na conta certa: a sua.',
  },
  {
    icon: Zap,
    title: 'Gestão centralizada (Multiadquirente)',
    description: 'Não fique preso a uma única operadora. O TEF permite que você use várias adquirentes em um só lugar, escolhendo a que oferece a melhor taxa para cada bandeira. É a liberdade de escolher quem te cobra menos, sem precisar trocar de aparelho.',
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

export default function WhyTEFSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Por que o TEF se tornou essencial
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Entenda os principais fatores que tornaram o TEF essencial para segurança, eficiência e conformidade fiscal.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="relative p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:bg-card/80 h-full flex flex-col">
                  {/* Icon */}
                  <div className="mb-6 inline-flex">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="text-foreground/70 leading-relaxed flex-grow">
                    {reason.description}
                  </p>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
