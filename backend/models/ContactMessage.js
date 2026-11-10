const { pool, mem, nextId, isMemory } = require('../config/db');

const ContactMessage = {
  async findAll() {
    if (isMemory) return [...mem.contact_messages].reverse();
    const [rows] = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    return rows;
  },

  async create({ name, email, subject, message }) {
    if (isMemory) {
      const m = { id: nextId('contact_messages'), name, email, subject, message, status: 'new', created_at: new Date() };
      mem.contact_messages.push(m);
      return m;
    }
    const [result] = await pool.query(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]);
    return { id: result.insertId, name, email, subject, message, status: 'new' };
  }
};

module.exports = ContactMessage;
