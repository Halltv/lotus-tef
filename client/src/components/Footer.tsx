import { motion } from 'framer-motion';
import { MessageCircle, Mail, Phone, MapPin, Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';
import { useState } from 'react';

/**
 * Footer & WhatsApp Button - Lotus TEF
 * Footer com links, redes sociais e WhatsApp floating button
 * Design: Dark Tech com ícones interativos
 */

export default function Footer() {
  const [showWhatsAppMenu, setShowWhatsAppMenu] = useState(false);

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Produtos: [
      { label: 'Troca de Arquivo', href: '#products' },
      { label: 'SiTef', href: '#products' },
      { label: 'Scope', href: '#products' },
    ],
    Suporte: [
      { label: 'Contato', href: '#contact' },
      { label: 'WhatsApp', href: 'https://api.whatsapp.com/send/?phone=5566996798563&text&type=phone_number&app_absent=0' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61585603738322', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/lotustef', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: MessageCircle, href: 'https://api.whatsapp.com/send/?phone=5566996798563&text&type=phone_number&app_absent=0', label: 'WhatsApp' },
  ];

  return (
    <>
      {/* Footer */}
      <footer className="relative bg-card border-t border-border">
        <div className="container py-16">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Brand */}
            <motion.div className="space-y-4">
              <div className="flex items-center gap-2">
                <img
                  src="/images/lotus-logo.png"
                  alt="Lotus TEF"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="font-bold text-lg">
                  Lotus <span className="text-primary">TEF</span>
                </span>
              </div>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Soluções de pagamento confiáveis e seguras para seu negócio crescer sem preocupações.
              </p>
              <div className="flex gap-3 pt-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-border rounded-lg text-foreground/70 hover:text-primary hover:bg-primary/10 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <motion.div
                key={title}
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold text-foreground">{title}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <motion.a
                        href={link.href}
                        className="text-foreground/70 hover:text-primary transition-colors text-sm"
                        whileHover={{ x: 4 }}
                      >
                        {link.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-border"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-foreground/60">Email</p>
                <p className="text-sm text-foreground">contato@lotustef.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-foreground/60">Telefone</p>
                <p className="text-sm text-foreground">+55 66 99679-8563</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-foreground/60">Localização</p>
                <p className="text-sm text-foreground">Sinop - MT</p>
              </div>
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="text-center pt-8 border-t border-border"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-foreground/60 text-sm">
              © {currentYear} Lotus TEF. Todos os direitos reservados.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* WhatsApp Button moved to Home.tsx */}
    </>
  );
}
