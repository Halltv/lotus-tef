import { useAuth } from '@/_core/hooks/useAuth';
import { Button } from '@/components/ui/button';
import FileStorage from '@/components/FileStorage';
import { ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';
import { Loader2 } from 'lucide-react';

export default function FileStoragePage() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acesso Restrito</h1>
          <p className="text-foreground/60 mb-6">Você precisa fazer login para acessar o armazenamento de arquivos.</p>
          <Button onClick={() => setLocation('/')}>Voltar para Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container py-12">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => setLocation('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <h1 className="text-4xl font-bold mb-2">Armazenamento de Arquivos</h1>
          <p className="text-foreground/60">
            Gerencie seus arquivos e imagens de forma segura
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl">
          <FileStorage />
        </div>
      </div>
    </div>
  );
}
