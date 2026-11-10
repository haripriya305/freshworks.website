const ContactMessage = require('../models/ContactMessage');
const { sendEmail, templates } = require('../utils/email');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

exports.submitContact = async (req, res) => {
  try {
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim();
    const subject = String(req.body.subject || '').trim();
    const message = String(req.body.message || '').trim();
    if (!name || !email || !subject || !message) return res.status(400).json({ message: 'All fields are required' });
    if (!EMAIL_RE.test(email)) return res.status(400).json({ message: 'Please enter a valid email address' });

    const doc = await ContactMessage.create({ name, email, subject, message });

    // Emails are best-effort: they never make the request fail (sendEmail swallows its own errors)
    await Promise.all([
      sendEmail({ to: email, subject: 'We received your message — FreshWorks', html: templates.contactReceived(esc(name)) }),
      sendEmail({
        to: process.env.ADMIN_EMAIL || 'admin@freshworks-demo.com',
        subject: `New contact form: ${subject}`,
        html: templates.contactAdminAlert({ name: esc(name), email: esc(email), subject: esc(subject), message: esc(message) })
      })
    ]);

    res.status(201).json({ message: 'Message received', id: doc.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not save your message: ' + err.message });
  }
};
