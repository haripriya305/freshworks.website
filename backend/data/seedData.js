// Shared demo data — used by in-memory mode, MySQL auto-seed and `npm run seed`
module.exports = {
  users: [
    { name: 'Haripriya B.', email: 'admin@freshworks-demo.com', password: 'Admin@123', role: 'admin' },
    { name: 'Dev Sharma', email: 'dev@freshworks-demo.com', password: 'Agent@123', role: 'agent' },
    { name: 'Lena Ortiz', email: 'lena@freshworks-demo.com', password: 'Agent@123', role: 'agent' }
  ],
  posts: [
    { slug: 'first-response-time', title: 'Why first response time matters more than resolution time', date: '2026-05-12', author: 'FreshWorks Team', tag: 'Strategy', excerpt: 'Customers forgive a slow fix far more easily than a slow first reply.', body: 'Full article body goes here — replace with real content when publishing.' },
    { slug: 'ai-triage-explained', title: 'How AI ticket triage actually works (and where it fails)', date: '2026-04-28', author: 'FreshWorks Team', tag: 'Product', excerpt: 'A practical look at what AI can and cannot do in your support queue.', body: 'Full article body goes here — replace with real content when publishing.' },
    { slug: 'scaling-support-team', title: 'Scaling a support team from 2 to 20 without losing your voice', date: '2026-04-09', author: 'FreshWorks Team', tag: 'Growth', excerpt: 'Tone of voice degrades fast as teams grow — here is what kept ours consistent.', body: 'Full article body goes here — replace with real content when publishing.' }
  ],
  tickets: [
    { customer: 'Reema K.', subject: 'Refund on annual plan', status: 'Resolved', channel: 'email' },
    { customer: 'Vikram S.', subject: 'API rate limit increase', status: 'In progress', channel: 'chat' },
    { customer: 'Anita D.', subject: 'SSO login failing', status: 'Urgent', channel: 'email' },
    { customer: 'Tom Lee', subject: 'Billing address update', status: 'Resolved', channel: 'social' }
  ]
};
