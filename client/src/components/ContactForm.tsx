import { motion } from 'framer-motion';
import { Mail, Phone, Building2, User } from 'lucide-react';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

// Validação de telefone brasileiro
const isValidPhoneNumber = (phone: string): boolean => {
  // Remove caracteres não numéricos
  const cleanPhone = phone.replace(/\D/g, '');
  // Aceita telefone com 10 ou 11 dígitos (com ou sem 9º dígito)
  return cleanPhone.length === 10 || cleanPhone.length === 11;
};

// Formatar telefone com máscara automática
const formatPhoneNumber = (value: string): string => {
  // Remove caracteres não numéricos
  const cleanPhone = value.replace(/\D/g, '');
  
  // Limita a 11 dígitos
  if (cleanPhone.length > 11) {
    return formatPhoneNumber(cleanPhone.slice(0, 11));
  }
  
  // Formata conforme o tamanho
  if (cleanPhone.length === 0) return '';
  if (cleanPhone.length <= 2) return `(${cleanPhone}`;
  if (cleanPhone.length <= 7) return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2)}`;
  return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 7)}-${cleanPhone.slice(7)}`;
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Use tRPC mutation para enviar contato
  const submitContactMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setIsSuccess(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
      });

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    },
    onError: (err) => {
      setError(err.message || 'Erro ao enviar formulário. Tente novamente.');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Aplicar máscara de telefone se for o campo de telefone
    let finalValue = value;
    if (name === 'phone') {
      finalValue = formatPhoneNumber(value);
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (!formData.name || !formData.email || !formData.company) {
        setError('Por favor, preencha todos os campos obrigatórios');
        return;
      }

      // Validar telefone se preenchido
      if (formData.phone && !isValidPhoneNumber(formData.phone)) {
        setError('Por favor, insira um número de telefone válido (10 ou 11 dígitos)');
        return;
      }

      await submitContactMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone || undefined,
        message: formData.message || undefined,
      });
    } catch (err) {
      // Error is handled by onError callback
    }
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const isLoading = submitContactMutation.isPending;

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                Vamos conversar sobre seu <span className="text-primary">negócio</span>
              </h2>
              <p className="text-lg text-foreground/70">
                Nossa equipe está pronta para ajudar você a encontrar a solução perfeita
              </p>
            </div>

            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                variants={itemVariants}
                className="flex items-start gap-4 glass-effect p-4 rounded-lg border border-border"
              >
                <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <p className="text-foreground/70">contato@lotustef.com</p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-start gap-4 glass-effect p-4 rounded-lg border border-border"
              >
                <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Telefone</p>
                  <p className="text-foreground/70">+55 66 99679-8563</p>
                  <p className="text-xs text-foreground/50 mt-1">Seg-Sex 07:00-18:00 | Sab 07:00-12:00</p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-start gap-4 glass-effect p-4 rounded-lg border border-border"
              >
                <Building2 className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Localização</p>
                  <p className="text-foreground/70">Sinop - MT</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Form */}
          <motion.form
            onSubmit={handleSubmit}
            variants={itemVariants}
            className="glass-effect p-8 rounded-2xl border-2 border-primary/20 space-y-6"
          >
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-foreground mb-2">
                <User className="w-4 h-4 inline mr-2 text-primary" />
                Nome *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome completo"
                className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary transition-colors"
                disabled={isLoading || isSuccess}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-foreground mb-2">
                <Building2 className="w-4 h-4 inline mr-2 text-primary" />
                Empresa *
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Nome da sua empresa"
                className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary transition-colors"
                disabled={isLoading || isSuccess}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-foreground mb-2">
                <Mail className="w-4 h-4 inline mr-2 text-primary" />
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary transition-colors"
                disabled={isLoading || isSuccess}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-foreground mb-2">
                <Phone className="w-4 h-4 inline mr-2 text-primary" />
                Telefone
              </label>
                <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(66) 99679-8563"
              maxLength={15}
              className={`w-full px-4 py-3 bg-card border rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                !isValidPhoneNumber(formData.phone) && formData.phone.length > 0
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-border'
              }`}
            />
            {!isValidPhoneNumber(formData.phone) && formData.phone.length > 0 && (
              <p className="text-red-500 text-sm mt-1">Telefone inválido. Use 10 ou 11 dígitos (ex: (66) 99679-8563).</p>
            )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Mensagem
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Conte-nos sobre seu projeto..."
                rows={4}
                className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
                disabled={isLoading || isSuccess}
              />
            </motion.div>

            {error && (
              <motion.p
                className="text-red-400 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.p>
            )}

            {isSuccess && (
              <motion.p
                className="text-primary text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ✓ Mensagem enviada com sucesso! Entraremos em contato em breve.
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={isLoading || isSuccess}
              className="w-full btn-primary disabled:opacity-50 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSuccess ? (
                <>✓ Enviado!</>
              ) : isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar Mensagem'
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
