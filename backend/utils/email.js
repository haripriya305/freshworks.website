const nodemailer = require('nodemailer');

function buildTransport() {
  if (!process.env.SMTP_USER) return null; // Email is optional
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
}
const transporter = buildTransport();

// Never throws — a failed email must never break login/contact.
async function sendEmail({ to, subject, html }) {
  if (!transporter) {
    console.log(`✉️  [email skipped — SMTP not configured] To: ${to} | Subject: ${subject}`);
    return;
  }
  try {
    await transporter.sendMail({ from: process.env.EMAIL_FROM || process.env.SMTP_USER, to, subject, html });
  } catch (err) {
    console.error('Email send failed:', err.message);
  }
}

const templates = {
  welcome: (name) => `<h2>Welcome to FreshWorks, ${name}!</h2><p>Your 14-day free trial has started. Log in to your dashboard to get going.</p>`,
  contactReceived: (name) => `<p>Hi ${name},</p><p>Thanks for reaching out — we've received your message and will reply within one business day.</p>`,
  contactAdminAlert: (d) => `<h3>New contact form submission</h3><p><b>From:</b> ${d.name} (${d.email})</p><p><b>Subject:</b> ${d.subject}</p><p>${d.message}</p>`,
  slaWarning: (ticketId) => `<p>⚠️ Ticket #${ticketId} is approaching its SLA deadline.</p>`
};

module.exports = { sendEmail, templates };
