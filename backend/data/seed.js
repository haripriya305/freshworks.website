/* Manual seed for MySQL:  npm run seed   (wipes users/blog/tickets and re-inserts demo data)
   Not required — the app auto-creates tables and seeds demo data on first request. */
require('dotenv').config();
const db = require('../config/db');
const User = require('../models/User');
const BlogPost = require('../models/BlogPost');
const Ticket = require('../models/Ticket');
const seedData = require('./seedData');

(async () => {
  if (db.isMemory) { console.log('No DB_HOST set — memory mode seeds itself automatically. Nothing to do.'); process.exit(0); }
  await db.connectDB();
  console.log('🌱 Re-seeding database...');
  await db.pool.query('DELETE FROM tickets');
  await db.pool.query('DELETE FROM blog_posts');
  await db.pool.query('DELETE FROM users');
  for (const u of seedData.users) await User.create(u);
  for (const p of seedData.posts) await BlogPost.create(p);
  for (const t of seedData.tickets) await Ticket.create(t);
  console.log('✅ Done. Admin: admin@freshworks-demo.com / Admin@123   Agent: dev@freshworks-demo.com / Agent@123');
  await db.pool.end();
  process.exit(0);
})();
