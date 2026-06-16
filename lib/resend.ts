import { Resend } from 'resend';
import { render } from '@react-email/components';
import type { ReactElement } from 'react';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const FROM = () => process.env.RESEND_FROM_EMAIL || 'info@blankanovak.com';
const FROM_NAME = 'Novák Blanka';

export async function sendEmail(params: {
  to: string | string[];
  subject: string;
  template: ReactElement;
  replyTo?: string;
}) {
  const html = await render(params.template);
  const resend = getResend();

  const { error } = await resend.emails.send({
    from: `${FROM_NAME} <${FROM()}>`,
    to: params.to,
    subject: params.subject,
    html,
    replyTo: params.replyTo,
  });

  if (error) {
    throw new Error(`Resend send failed: ${JSON.stringify(error)}`);
  }
}

export async function sendContactNotification(params: {
  name: string;
  email: string;
  message: string;
}) {
  const resend = getResend();

  const { error } = await resend.emails.send({
    from: `${FROM_NAME} <${FROM()}>`,
    to: FROM(),
    replyTo: params.email,
    subject: `Új üzenet: ${params.name}`,
    html: `
      <h2>Új kapcsolatfelvételi üzenet</h2>
      <p><strong>Név:</strong> ${escapeHtml(params.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(params.email)}</p>
      <p><strong>Üzenet:</strong></p>
      <p>${escapeHtml(params.message).replace(/\n/g, '<br/>')}</p>
    `,
  });

  if (error) {
    throw new Error(`Resend contact notification failed: ${JSON.stringify(error)}`);
  }
}
