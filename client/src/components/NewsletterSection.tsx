import { motion } from 'framer-motion';
import { Mail, Check } from 'lucide-react';
import { useState } from 'react';

/**
 * Newsletter Section - Lotus TEF
 * Captura de leads com integração Resend
 * Design: Input elegante com feedback visual
 */

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validação básica
      if (!email || !email.includes('@')) {
        setError('Por favor, insira um email válido');
        setIsLoading(false);
        return;
      }

      // Aqui você integraria com Resend API
      // Por enquanto, simulamos sucesso
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSuccess(true);
      setEmail('');

      // Reset após 3 segundos
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      setError('Erro ao inscrever-se. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          className="max-w-2xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <span className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-semibold">
                📧 Fique Atualizado
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold">
              Fique por dentro das <span className="text-primary">novidades</span>
            </h2>

            <p className="text-lg text-foreground/70">
              Receba as últimas atualizações, dicas e ofertas exclusivas direto no seu email
            </p>
          </div>

          {/* Newsletter Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 glass-effect p-2 rounded-lg border border-primary/20"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50 pointer-events-none" />
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || isSuccess}
                className="w-full bg-transparent pl-12 pr-4 py-3 text-foreground placeholder:text-foreground/50 focus:outline-none disabled:opacity-50"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isLoading || isSuccess}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  Inscrito!
                </>
              ) : isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Inscrevendo...
                </>
              ) : (
                'Inscrever-se'
              )}
            </motion.button>
          </motion.form>

          {/* Error Message */}
          {error && (
            <motion.p
              className="text-red-400 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}

          {/* Success Message */}
          {isSuccess && (
            <motion.p
              className="text-primary text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ✓ Obrigado por se inscrever! Você receberá novidades em breve.
            </motion.p>
          )}

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-foreground/60 pt-4 border-t border-border"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Sem spam</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Cancelar a qualquer momento</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>100% seguro</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
