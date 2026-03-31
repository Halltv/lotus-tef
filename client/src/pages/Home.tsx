import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import WhyTEFSection from '@/components/WhyTEFSection';
import ProductsSection from '@/components/ProductsSection';
import HowTEFSimplifies from '@/components/HowTEFSimplifies';
import SocialWallSection from '@/components/SocialWallSection';
import WhatsAppSection from '@/components/WhatsAppSection';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';


/**
 * Home Page - Lotus TEF Landing Page
 * Single Page Application com todas as seções
 * Design: Dark Tech com Framer Motion animations
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <WhyTEFSection />
        <ProductsSection />
        <HowTEFSimplifies />
        <SocialWallSection />
        <ContactForm />
        <WhatsAppSection />
      </main>
      <Footer />
    </div>
  );
}
