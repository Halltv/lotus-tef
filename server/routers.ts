import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { saveContact, saveFileMetadata, getFilesByUser, deleteFile, getAllNews, getNewsByHash, saveNews } from "./db";
import { sendEmail } from "./_core/email";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
          company: z.string().optional(),
          phone: z.string().optional(),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          // Salvar no banco de dados
          await saveContact({
            name: input.name,
            email: input.email,
            company: input.company,
            phone: input.phone,
            message: input.message,
          });

          // Enviar e-mail para a empresa
          await sendEmail({
            to: 'contato@lotustef.com',
            subject: `Novo contato de ${input.name}`,
            html: `
              <h2>Novo Contato Recebido</h2>
              <p><strong>Nome:</strong> ${input.name}</p>
              <p><strong>Email:</strong> ${input.email}</p>
              ${input.company ? `<p><strong>Empresa:</strong> ${input.company}</p>` : ''}
              ${input.phone ? `<p><strong>Telefone:</strong> ${input.phone}</p>` : ''}
              ${input.message ? `<p><strong>Mensagem:</strong></p><p>${input.message}</p>` : ''}
            `,
          });

          return { success: true, message: 'Contato enviado com sucesso!' };
        } catch (error) {
          console.error('Erro ao enviar contato:', error);
          throw new Error('Falha ao enviar contato. Tente novamente.');
        }
      }),
  }),

  news: router({
    list: publicProcedure.query(async () => {
      try {
        const allNews = await getAllNews();
        return allNews;
      } catch (error) {
        console.error('Erro ao listar notícias:', error);
        return [];
      }
    }),

    getByHash: publicProcedure
      .input(z.object({ imageHash: z.string() }))
      .query(async ({ input }) => {
        try {
          const newsItem = await getNewsByHash(input.imageHash);
          return newsItem || null;
        } catch (error) {
          console.error('Erro ao buscar notícia:', error);
          return null;
        }
      }),
  }),

  files: router({
    upload: protectedProcedure
      .input(
        z.object({
          fileName: z.string().min(1),
          fileData: z.string(),
          mimeType: z.string(),
          fileSize: z.number(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        try {
          const fileKey = `uploads/${ctx.user.id}/${nanoid()}-${input.fileName}`;
          const buffer = Buffer.from(input.fileData, 'base64');

          // Upload para S3
          const { url } = await storagePut(fileKey, buffer, input.mimeType);

          // Salvar metadados no banco de dados
          await saveFileMetadata({
            fileName: input.fileName,
            fileKey,
            fileUrl: url,
            fileSize: input.fileSize,
            mimeType: input.mimeType,
            uploadedBy: ctx.user.id,
          });

          return { success: true, url, message: 'Arquivo enviado com sucesso!' };
        } catch (error) {
          console.error('Erro ao fazer upload:', error);
          throw new Error('Falha ao fazer upload do arquivo.');
        }
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      try {
        const userFiles = await getFilesByUser(ctx.user.id);
        return userFiles;
      } catch (error) {
        console.error('Erro ao listar arquivos:', error);
        return [];
      }
    }),

    delete: protectedProcedure
      .input(z.object({ fileId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        try {
          const success = await deleteFile(input.fileId);
          return { success, message: success ? 'Arquivo deletado com sucesso!' : 'Falha ao deletar arquivo.' };
        } catch (error) {
          console.error('Erro ao deletar arquivo:', error);
          throw new Error('Falha ao deletar arquivo.');
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
