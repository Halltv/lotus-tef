import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

/**
 * Header Component - Lotus TEF
 * Navbar sticky com efeito glass, logo SVG, navegação por âncoras e menu responsivo
 * Design: Dark Tech com dourado (#E6B450) para CTAs
 */

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Soluções', href: '#solutions' },
    { label: 'Produtos', href: '#products' },
    { label: 'Notícias', href: '#news' },
    { label: 'Contato', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <img
            src="/images/lotus-logo.png"
            alt="Lotus TEF"
            className="h-14 w-14 rounded-full object-cover"
          />
          <span className="text-2xl font-bold text-foreground hidden sm:inline">
            Lotus <span className="text-primary">TEF</span>
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium text-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <motion.button
            onClick={() => handleNavClick('#contact')}
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Fale Conosco
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2 text-primary"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        className="md:hidden bg-card border-b border-border"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        <nav className="container py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <motion.button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="text-foreground/80 hover:text-primary transition-colors text-left font-medium"
              whileHover={{ x: 8 }}
            >
              {item.label}
            </motion.button>
          ))}
          <motion.button
            onClick={() => handleNavClick('#contact')}
            className="btn-primary w-full mt-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Fale Conosco
          </motion.button>
        </nav>
      </motion.div>
    </motion.header>
  );
}
