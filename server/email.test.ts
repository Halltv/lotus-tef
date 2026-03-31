import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock nodemailer
const mockSendMail = vi.fn();
const mockVerify = vi.fn();

vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn(() => ({
      sendMail: mockSendMail,
      verify: mockVerify,
    })),
  },
}));

import { sendEmail } from './_core/email';

describe('Email Service - SMTP Hostinger Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should send email successfully via SMTP', async () => {
    mockSendMail.mockResolvedValueOnce({
      messageId: '<test-message-id@lotustef.com>',
    });

    await sendEmail({
      to: 'contato@lotustef.com',
      subject: 'Novo contato de João Silva',
      html: '<h2>Novo Contato Recebido</h2><p><strong>Nome:</strong> João Silva</p>',
    });

    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'contato@lotustef.com',
        subject: 'Novo contato de João Silva',
        html: expect.stringContaining('João Silva'),
      })
    );
  });

  it('should include all contact form fields in email', async () => {
    mockSendMail.mockResolvedValueOnce({
      messageId: '<test-message-id-2@lotustef.com>',
    });

    const emailHtml = `
      <h2>Novo Contato Recebido</h2>
      <p><strong>Nome:</strong> Maria Santos</p>
      <p><strong>Email:</strong> maria@example.com</p>
      <p><strong>Empresa:</strong> Tech Corp</p>
      <p><strong>Telefone:</strong> (66) 99679-8563</p>
      <p><strong>Mensagem:</strong></p><p>Preciso de informações sobre TEF</p>
    `;

    await sendEmail({
      to: 'contato@lotustef.com',
      subject: 'Novo contato de Maria Santos',
      html: emailHtml,
    });

    const callArgs = mockSendMail.mock.calls[0][0];
    expect(callArgs.html).toContain('Maria Santos');
    expect(callArgs.html).toContain('maria@example.com');
    expect(callArgs.html).toContain('Tech Corp');
    expect(callArgs.html).toContain('(66) 99679-8563');
    expect(callArgs.html).toContain('Preciso de informações sobre TEF');
  });

  it('should handle SMTP errors gracefully', async () => {
    mockSendMail.mockRejectedValueOnce(new Error('SMTP connection failed'));

    await expect(
      sendEmail({
        to: 'contato@lotustef.com',
        subject: 'Test Email',
        html: '<p>Test</p>',
      })
    ).rejects.toThrow('SMTP connection failed');
  });

  it('should use correct from address', async () => {
    mockSendMail.mockResolvedValueOnce({
      messageId: '<test-message-id-3@lotustef.com>',
    });

    await sendEmail({
      to: 'contato@lotustef.com',
      subject: 'Test',
      html: '<p>Test</p>',
    });

    const callArgs = mockSendMail.mock.calls[0][0];
    expect(callArgs.from).toContain('Lotus TEF');
  });
});
