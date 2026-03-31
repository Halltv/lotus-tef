import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface PostDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    id: number;
    imageUrl: string;
    title: string;
    caption: string;
    description?: string;
  } | null;
}

export default function PostDetailModal({
  isOpen,
  onClose,
  post,
}: PostDetailModalProps) {
  if (!post) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={onClose}
          >
            <motion.div
              className="bg-card rounded-2xl border border-border max-w-3xl w-full max-h-[85vh] overflow-hidden relative shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-primary/20 hover:bg-primary/40 rounded-lg transition-colors z-20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6 text-foreground" />
              </motion.button>

              {/* Image */}
              <div className="relative w-full h-80 overflow-hidden flex-shrink-0">
                <motion.img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = '/images/placeholder.png';
                  }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-8 md:p-10 space-y-6">
                  {/* Title and Subtitle */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-3"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-lg text-primary font-semibold">
                      {post.caption}
                    </p>
                    <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full" />
                  </motion.div>

                  {/* Description */}
                  {post.description && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-4"
                    >
                      <p className="text-foreground/90 leading-relaxed text-base md:text-lg whitespace-pre-wrap">
                        {post.description}
                      </p>
                    </motion.div>
                  )}

                  {/* Additional Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-6 border-t border-border space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <p className="text-xs text-foreground/60 uppercase tracking-wide font-semibold mb-2">
                          Categoria
                        </p>
                        <p className="text-foreground font-semibold">Educação Financeira</p>
                      </div>
                      <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                        <p className="text-xs text-foreground/60 uppercase tracking-wide font-semibold mb-2">
                          Tipo
                        </p>
                        <p className="text-foreground font-semibold">Artigo</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="pt-4 space-y-3"
                  >
                    <button
                      onClick={onClose}
                      className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                      Voltar às Notícias
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
