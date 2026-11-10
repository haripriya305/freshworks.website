const bcrypt = require('bcryptjs');
const { pool, mem, nextId, isMemory } = require('../config/db');

const safeRow = (u) => u && ({ id: u.id, name: u.name, email: u.email, role: u.role, created_at: u.created_at, updated_at: u.updated_at });

const User = {
  async findByEmail(email) {
    if (isMemory) return mem.users.find(u => u.email === email) || null;
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    return rows[0] || null;
  },

  async findById(id) {
    if (isMemory) return mem.users.find(u => u.id === Number(id)) || null;
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ? LIMIT 1', [id]);
    return rows[0] || null;
  },

  async create({ name, email, password, role = 'agent' }) {
    const hashed = await bcrypt.hash(password, 10);
    email = email.toLowerCase();
    if (isMemory) {
      const now = new Date();
      const user = { id: nextId('users'), name, email, password: hashed, role, created_at: now, updated_at: now };
      mem.users.push(user);
      return user;
    }
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, hashed, role]);
    return this.findById(result.insertId);
  },

  async findAllExcludingPassword() {
    if (isMemory) return [...mem.users].reverse().map(safeRow);
    const [rows] = await pool.query('SELECT id, name, email, role, created_at, updated_at FROM users ORDER BY created_at DESC');
    return rows;
  },

  async updateRole(id, role) {
    if (isMemory) {
      const u = mem.users.find(x => x.id === Number(id));
      if (!u) return null;
      u.role = role; u.updated_at = new Date();
      return safeRow(u);
    }
    await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);
    const [rows] = await pool.query('SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async deleteById(id) {
    if (isMemory) { mem.users = mem.users.filter(u => u.id !== Number(id)); return; }
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
  },

  async comparePassword(candidate, hash) {
    if (!candidate || !hash) return false;
    return bcrypt.compare(String(candidate), hash);
  },

  toSafeObject(user) {
    return { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.created_at };
  }
};

module.exports = User;
