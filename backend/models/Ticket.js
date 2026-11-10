const { pool, mem, nextId, isMemory } = require('../config/db');

const Ticket = {
  async count(statusList = null) {
    if (isMemory) return statusList ? mem.tickets.filter(t => statusList.includes(t.status)).length : mem.tickets.length;
    if (statusList) {
      const placeholders = statusList.map(() => '?').join(', ');
      const [rows] = await pool.query(`SELECT COUNT(*) AS count FROM tickets WHERE status IN (${placeholders})`, statusList);
      return rows[0].count;
    }
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM tickets');
    return rows[0].count;
  },

  async findRecent(limit = 20) {
    if (isMemory) return [...mem.tickets].reverse().slice(0, limit);
    const [rows] = await pool.query('SELECT * FROM tickets ORDER BY updated_at DESC LIMIT ?', [Number(limit)]);
    return rows;
  },

  async create({ customer, subject, status = 'Open', channel = 'email', assignedTo = null }) {
    if (isMemory) {
      const now = new Date();
      const t = { id: nextId('tickets'), customer, subject, status, channel, assigned_to: assignedTo, created_at: now, updated_at: now };
      mem.tickets.push(t);
      return t;
    }
    const [result] = await pool.query(
      'INSERT INTO tickets (customer, subject, status, channel, assigned_to) VALUES (?, ?, ?, ?, ?)',
      [customer, subject, status, channel, assignedTo]);
    return { id: result.insertId, customer, subject, status, channel };
  },

  async deleteAll() {
    if (isMemory) { mem.tickets = []; return; }
    await pool.query('DELETE FROM tickets');
  }
};

module.exports = Ticket;
