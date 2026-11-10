const { pool, mem, nextId, isMemory } = require('../config/db');

const BlogPost = {
  async findAll() {
    if (isMemory) return [...mem.blog_posts].sort((a, b) => new Date(b.post_date) - new Date(a.post_date));
    const [rows] = await pool.query('SELECT * FROM blog_posts ORDER BY post_date DESC');
    return rows;
  },

  async findBySlug(slug) {
    if (isMemory) return mem.blog_posts.find(p => p.slug === slug) || null;
    const [rows] = await pool.query('SELECT * FROM blog_posts WHERE slug = ? LIMIT 1', [slug]);
    return rows[0] || null;
  },

  async create({ slug, title, excerpt, body = '', tag = 'General', author = 'FreshWorks Team', date }) {
    if (isMemory) {
      const post = { id: nextId('blog_posts'), slug, title, excerpt, body, tag, author, post_date: date || new Date().toISOString().slice(0, 10), created_at: new Date() };
      mem.blog_posts.push(post);
      return post;
    }
    await pool.query(
      'INSERT INTO blog_posts (slug, title, excerpt, body, tag, author, post_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [slug, title, excerpt, body, tag, author, date || new Date()]);
    return this.findBySlug(slug);
  },

  async deleteAll() {
    if (isMemory) { mem.blog_posts = []; return; }
    await pool.query('DELETE FROM blog_posts');
  }
};

module.exports = BlogPost;
