import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

/**
 * How TEF Simplifies Section - Lotus TEF
 * Seção com comparação visual "Antes vs Depois" do TEF
 * Design: Dark Tech com layout de comparação
 */

const beforeAfter = [
  { before: 'Digitação manual de valores', after: 'Pagamento vinculado à nota fiscal' },
  { before: 'Divergência entre sistema e maquininha', after: 'Conformidade com exigências legais' },
  { before: 'Dependência de conferências manuais', after: 'Transações rastreáveis' },
  { before: 'Conciliação bancária lenta e operacionalmente custosa', after: 'Conciliação automática' },
  { before: 'Fechamento de caixa demorado', after: 'Gestão financeira mais eficiente' },
  { before: 'Maior risco de erros e estornos', after: 'Maior controle operacional' },
  { before: 'Pagamentos sem vínculo com o sistema fiscal', after: 'Redução de erros operacionais' },
  { before: 'Risco de inconsistências com a SEFAZ', after: 'Mais agilidade no caixa' },
  { before: 'Falta de rastreabilidade das transações', after: 'Segurança contra fraudes' },
  { before: 'Maior exposição a fraudes internas', after: 'Conformidade total' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

export default function HowTEFSimplifies() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
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
            Como a integração TEF simplifica seu processo de vendas
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            O TEF é um sistema que possibilita transações de pagamento rápidas e seguras, isso inclui cartão de crédito, débito e pagamentos via Pix. Com ele, você pode oferecer mais opções de pagamento sem a necessidade de múltiplas maquininhas.
          </p>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto mt-4">
            Com o TEF, você não precisa mais digitar manualmente os valores das vendas nas maquininhas de cartão. A tecnologia faz a comunicação direta entre o sistema e o pagamento, garantindo mais segurança para seu negócio e seus clientes, além de estar em conformidade com a legislação de diversos estados.
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Before Column */}
          <motion.div className="space-y-4">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-red-400/80">Antes do TEF</h3>
              <div className="w-12 h-1 bg-red-400/30 mx-auto mt-2 rounded-full" />
            </div>

            <motion.div
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {beforeAfter.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20 hover:border-destructive/40 transition-all"
                >
                  <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-foreground/80 text-sm">{item.before}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* After Column */}
          <motion.div className="space-y-4">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-primary">Depois do TEF</h3>
              <div className="w-12 h-1 bg-primary/30 mx-auto mt-2 rounded-full" />
            </div>

            <motion.div
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {beforeAfter.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20 hover:border-primary/40 transition-all"
                >
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground/80 text-sm">{item.after}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
