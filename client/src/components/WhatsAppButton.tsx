import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

/**
 * WhatsApp Floating Button - Lotus TEF
 * Botão flutuante simples e funcional para abrir WhatsApp
 * Número: 55 66 99679-8563
 */

export default function WhatsAppButton() {
  // Número de WhatsApp com código de país e área
  const whatsappNumber = '5566996798563';
  const whatsappMessage = 'Olá! Gostaria de saber mais sobre as soluções da Lotus TEF.';
  
  // URL do WhatsApp (funciona em desktop e mobile)
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
    >
      {/* Pulse Background */}
      <motion.div
        className="absolute inset-0 rounded-full bg-green-500/20 blur-lg"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Main Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/50 transition-all cursor-pointer group"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          // Garante que o link será aberto
          e.preventDefault();
          window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        }}
      >
        <MessageCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
      </motion.a>

      {/* Tooltip on Hover */}
      <motion.div
        className="absolute left-20 top-1/2 -translate-y-1/2 bg-background border border-border rounded-lg px-4 py-2 whitespace-nowrap opacity-0 pointer-events-none"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <p className="text-sm font-semibold text-foreground">Fale conosco!</p>
      </motion.div>

      {/* Animated Ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-green-400"
        animate={{ scale: [1, 1.3, 1.6], opacity: [1, 0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}
