/* ===========================================================
   Database layer — two modes, chosen automatically:
   • MySQL   : when DB_HOST (or DATABASE_URL) is set
   • Memory  : otherwise (zero-setup demo mode, perfect for Vercel preview)
   Tables + demo data are created automatically on first use.
=========================================================== */
const fs = require('fs');
const path = require('path');
const seedData = require('../data/seedData');

const isMemory = !(process.env.DB_HOST || process.env.DATABASE_URL);

// ---------- in-memory store (survives across requests inside one server instance) ----------
const mem = globalThis.__fwMem || (globalThis.__fwMem = {
  users: [], blog_posts: [], contact_messages: [], tickets: [],
  seq: { users: 0, blog_posts: 0, contact_messages: 0, tickets: 0 }
});
const nextId = (t) => ++mem.seq[t];

// ---------- MySQL pool ----------
let pool = null;
if (!isMemory) {
  const mysql = require('mysql2/promise');
  const ssl = String(process.env.DB_SSL || '').toLowerCase() === 'true' ? { rejectUnauthorized: false } : undefined;
  pool = process.env.DATABASE_URL
    ? mysql.createPool({ uri: process.env.DATABASE_URL, ssl, waitForConnections: true, connectionLimit: 5 })
    : mysql.createPool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 3306),
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'freshworks',
        ssl,
        waitForConnections: true,
        connectionLimit: 5
      });
}

let readyPromise = null;

async function init() {
  if (isMemory) {
    if (mem.users.length === 0) await seedInto(require('../models/User'), require('../models/BlogPost'), require('../models/Ticket'));
    return;
  }
  const schema = fs.readFileSync(path.join(__dirname, '../data/schema.sql'), 'utf8');
  const statements = schema.split(/;\s*(?:\r?\n|$)/).map(s => s.replace(/--.*$/gm, '').trim()).filter(Boolean);
  for (const s of statements) await pool.query(s);
  const [rows] = await pool.query('SELECT COUNT(*) AS c FROM users');
  if (rows[0].c === 0) await seedInto(require('../models/User'), require('../models/BlogPost'), require('../models/Ticket'));
}

async function seedInto(User, BlogPost, Ticket) {
  for (const u of seedData.users) await User.create(u);
  for (const p of seedData.posts) await BlogPost.create(p);
  for (const t of seedData.tickets) await Ticket.create(t);
  console.log('🌱 Demo data seeded');
}

// Call before handling any request; runs once per server instance.
function ready() {
  if (!readyPromise) {
    readyPromise = init().then(() => console.log(isMemory ? '✅ Using in-memory store (demo mode)' : '✅ MySQL ready'))
      .catch(err => { readyPromise = null; throw err; });
  }
  return readyPromise;
}

// Kept for the CLI seed script / local server
async function connectDB() {
  try { await ready(); } catch (err) { console.error('❌ Database error:', err.message); process.exit(1); }
}

module.exports = { pool, mem, nextId, isMemory, ready, connectDB };
