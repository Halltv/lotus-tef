import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Trash2, Download, FileIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function FileStorage() {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = trpc.files.upload.useMutation();
  const listQuery = trpc.files.list.useQuery();
  const deleteMutation = trpc.files.delete.useMutation();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    for (const file of files) {
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const fileData = e.target?.result as string;
          const base64Data = fileData.split(',')[1];

          await uploadMutation.mutateAsync({
            fileName: file.name,
            fileData: base64Data,
            mimeType: file.type,
            fileSize: file.size,
          });

          toast.success(`${file.name} enviado com sucesso!`);
          listQuery.refetch();
        };
        reader.readAsDataURL(file);
      } catch (error) {
        toast.error(`Erro ao fazer upload de ${file.name}`);
      }
    }
  };

  const handleDelete = async (fileId: number) => {
    try {
      await deleteMutation.mutateAsync({ fileId });
      toast.success('Arquivo deletado com sucesso!');
      listQuery.refetch();
    } catch (error) {
      toast.error('Erro ao deletar arquivo');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <motion.div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-primary bg-primary/10'
            : 'border-border hover:border-primary'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        whileHover={{ scale: 1.02 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h3 className="text-lg font-semibold mb-2">Arraste arquivos aqui</h3>
        <p className="text-foreground/60 mb-4">ou clique para selecionar</p>
        <Button variant="outline">Selecionar Arquivos</Button>
      </motion.div>

      {/* Files List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Meus Arquivos</h3>

        {listQuery.isLoading ? (
          <div className="text-center py-8 text-foreground/60">
            Carregando arquivos...
          </div>
        ) : listQuery.data && listQuery.data.length > 0 ? (
          <div className="grid gap-4">
            {listQuery.data.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-4 flex items-center justify-between hover:border-primary transition-all">
                  <div className="flex items-center gap-4 flex-1">
                    <FileIcon className="w-8 h-8 text-primary" />
                    <div className="flex-1">
                      <h4 className="font-medium truncate">{file.fileName}</h4>
                      <p className="text-sm text-foreground/60">
                        {formatFileSize(file.fileSize)} • {formatDate(file.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <motion.a
                      href={file.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </motion.a>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(file.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-foreground/60">
            Nenhum arquivo enviado ainda
          </div>
        )}
      </div>
    </div>
  );
}
