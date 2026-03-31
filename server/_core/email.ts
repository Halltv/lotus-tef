import nodemailer from 'nodemailer';
import { ENV } from './env';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Create SMTP transporter using Hostinger credentials
 */
function createTransporter() {
  return nodemailer.createTransport({
    host: ENV.smtpHost,
    port: ENV.smtpPort,
    secure: true, // true for port 465 (SSL/TLS)
    auth: {
      user: ENV.smtpUser,
      pass: ENV.smtpPass,
    },
  });
}

/**
 * Send email using SMTP (Hostinger)
 * Requires SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS environment variables
 */
export async function sendEmail({ to, subject, html }: EmailOptions): Promise<void> {
  if (!ENV.smtpHost || !ENV.smtpUser || !ENV.smtpPass) {
    console.warn('[Email] SMTP credentials not configured. Email not sent.');
    return;
  }

  try {
    const transporter = createTransporter();

    const info = await transporter.sendMail({
      from: `"Lotus TEF" <${ENV.smtpUser}>`,
      to,
      subject,
      html,
    });

    console.log(`[Email] Successfully sent email to ${to}. Message ID: ${info.messageId}`);
  } catch (error) {
    console.error('[Email] Error sending email:', error);
    throw error;
  }
}
