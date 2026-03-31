import { motion } from 'framer-motion';
import { useState } from 'react';
import PostDetailModal from './PostDetailModal';
import { trpc } from '@/lib/trpc';

/**
 * Social Wall Section - Lotus TEF
 * Exibe posts educativos em grid com modal de detalhe
 * Design: Grid responsivo com overlay interativo
 */

export default function SocialWallSection() {
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Carregar notícias do banco de dados
  const { data: news = [], isLoading } = trpc.news.list.useQuery();
  
  // Pegar apenas os 4 primeiros posts
  const posts = news.slice(0, 4);

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
    setIsModalOpen(true);
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

  if (isLoading) {
    return (
      <section id="news" className="relative py-24 overflow-hidden">
        <div className="container relative z-10">
          <div className="text-center">
            <p className="text-foreground/70">Carregando notícias...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="news" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <span className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-semibold">
                📰 Fique por dentro das Notícias
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold">
              Acompanhe as últimas <span className="text-primary">atualizações</span>
            </h2>

            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Conheça mais sobre TEF, segurança em pagamentos e tendências do mercado financeiro
            </p>
          </motion.div>

          {/* Posts Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {posts.map((post) => (
              <motion.div
                key={post.id}
                data-news-id={post.id}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-xl cursor-pointer h-72"
                onClick={() => handlePostClick(post)}
              >
                {/* Image com preload */}
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent flex flex-col justify-end p-4"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <h3 className="text-lg font-bold text-foreground">
                      {post.title}
                    </h3>
                    <p className="text-sm text-foreground/80 line-clamp-2">
                      {post.caption}
                    </p>
                    <motion.button
                      className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Saiba Mais
                    </motion.button>
                  </motion.div>
                </motion.div>

                {/* Border Glow */}
                <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/50 rounded-xl transition-all duration-300" />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-foreground/70 mb-4">
              Siga a Lotus TEF no Instagram para mais novidades
            </p>
            <motion.a
              href="https://www.instagram.com/lotustef"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary font-semibold hover:bg-primary/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>@Lotustef</span>
              <span>→</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <PostDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        post={selectedPost}
      />
    </>
  );
}
