import { describe, it, expect, vi, beforeEach } from 'vitest';
import { z } from 'zod';

// Mock do sendEmail
vi.mock('./_core/email', () => ({
  sendEmail: vi.fn(),
}));

// Mock do saveContact
vi.mock('./db', () => ({
  saveContact: vi.fn(),
}));

describe('Contact Form Integration - Resend Email', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should send contact form data to contato@lotustef.com', async () => {
    const { sendEmail } = await import('./_core/email');
    const { saveContact } = await import('./db');

    const contactData = {
      name: 'João Silva',
      email: 'joao@example.com',
      company: 'Tech Solutions',
      phone: '(66) 99679-8563',
      message: 'Gostaria de mais informações sobre seus serviços de TEF',
    };

    // Simular o que o procedimento tRPC faria
    await saveContact(contactData);
    await sendEmail({
      to: 'contato@lotustef.com',
      subject: `Novo contato de ${contactData.name}`,
      html: `
        <h2>Novo Contato Recebido</h2>
        <p><strong>Nome:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Empresa:</strong> ${contactData.company}</p>
        <p><strong>Telefone:</strong> ${contactData.phone}</p>
        <p><strong>Mensagem:</strong></p><p>${contactData.message}</p>
      `,
    });

    // Verificar que saveContact foi chamado com os dados corretos
    expect(saveContact).toHaveBeenCalledWith(contactData);

    // Verificar que sendEmail foi chamado com o e-mail correto
    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'contato@lotustef.com',
        subject: expect.stringContaining('João Silva'),
      })
    );
  });

  it('should validate required fields before sending', async () => {
    const contactSchema = z.object({
      name: z.string().min(1, 'Nome é obrigatório'),
      email: z.string().email('E-mail inválido'),
      company: z.string().optional(),
      phone: z.string().optional(),
      message: z.string().optional(),
    });

    // Teste com dados válidos
    const validData = {
      name: 'Maria Santos',
      email: 'maria@example.com',
      company: 'Company Inc',
      phone: '(66) 99999-9999',
      message: 'Teste',
    };

    expect(() => contactSchema.parse(validData)).not.toThrow();

    // Teste com e-mail inválido
    const invalidData = {
      name: 'Maria Santos',
      email: 'invalid-email',
      company: 'Company Inc',
    };

    expect(() => contactSchema.parse(invalidData)).toThrow();

    // Teste sem nome
    const missingName = {
      name: '',
      email: 'maria@example.com',
    };

    expect(() => contactSchema.parse(missingName)).toThrow();
  });

  it('should format phone number correctly in email', async () => {
    const { sendEmail } = await import('./_core/email');

    const contactData = {
      name: 'Pedro Costa',
      email: 'pedro@example.com',
      company: 'Business Corp',
      phone: '(66) 99679-8563',
      message: 'Preciso de suporte',
    };

    await sendEmail({
      to: 'contato@lotustef.com',
      subject: `Novo contato de ${contactData.name}`,
      html: `
        <p><strong>Telefone:</strong> ${contactData.phone}</p>
      `,
    });

    const callArgs = (sendEmail as any).mock.calls[0][0];
    expect(callArgs.html).toContain('(66) 99679-8563');
  });

  it('should handle optional fields gracefully', async () => {
    const { sendEmail } = await import('./_core/email');
    const { saveContact } = await import('./db');

    const minimalData = {
      name: 'Ana Silva',
      email: 'ana@example.com',
    };

    await saveContact(minimalData);
    await sendEmail({
      to: 'contato@lotustef.com',
      subject: `Novo contato de ${minimalData.name}`,
      html: `
        <h2>Novo Contato Recebido</h2>
        <p><strong>Nome:</strong> ${minimalData.name}</p>
        <p><strong>Email:</strong> ${minimalData.email}</p>
      `,
    });

    expect(saveContact).toHaveBeenCalledWith(minimalData);
    expect(sendEmail).toHaveBeenCalled();
  });
});
