import { describe, it, expect } from 'vitest';
import nodemailer from 'nodemailer';

describe('SMTP Hostinger - Credential Validation', () => {
  it('should verify SMTP connection with Hostinger credentials', async () => {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT ?? '465', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    // Verificar que as variáveis estão configuradas
    expect(smtpHost).toBeTruthy();
    expect(smtpUser).toBeTruthy();
    expect(smtpPass).toBeTruthy();

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Verificar conexão SMTP
    const verified = await transporter.verify();
    expect(verified).toBe(true);
  }, 15000); // timeout de 15s para conexão SMTP
});
