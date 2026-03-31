import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

/**
 * WhatsApp Section - Lotus TEF
 * Seção simples e elegante para contato via WhatsApp
 * Design: Dark Tech com roxo/dourado
 * Posicionada após o formulário de contato como alternativa
 */

export default function WhatsAppSection() {
  const whatsappNumber = '5566996798563';
  const whatsappMessage = 'Olá! Gostaria de saber mais sobre as soluções da Lotus TEF.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Card Principal */}
          <motion.div
            className="relative rounded-2xl border border-secondary/30 bg-gradient-to-br from-secondary/5 to-primary/5 backdrop-blur-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Content */}
            <div className="relative p-8 md:p-12 space-y-6">
              {/* Header */}
              <div className="flex items-start gap-4">
                {/* Icon */}
                <motion.div
                  className="flex-shrink-0"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                </motion.div>

                {/* Text */}
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    Prefere conversar?
                  </h3>
                  <p className="text-foreground/70">
                    Fale conosco via WhatsApp para uma resposta mais rápida
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-foreground/60 text-base leading-relaxed">
                Disponível 24/7 para responder suas dúvidas sobre TEF, pagamentos e nossas soluções. Clique no botão abaixo e inicie uma conversa com nosso time.
              </p>

              {/* Button */}
              <motion.div
                className="flex gap-4 pt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary to-primary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-secondary/50 transition-all group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
                  }}
                >
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Abrir WhatsApp</span>
                  <span className="ml-1">→</span>
                </motion.a>

                {/* Phone Number */}
                <div className="flex items-center px-6 py-3 rounded-lg bg-card/50 border border-border/50">
                  <span className="text-foreground/70 text-sm">
                    <span className="font-semibold text-foreground">(66) 99679-8563</span>
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
