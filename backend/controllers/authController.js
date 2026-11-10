const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendEmail, templates } = require('../utils/email');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function signToken(user) {
  return jwt.sign({ id: user.id, role: user.role, name: user.name, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
}

exports.register = async (req, res) => {
  try {
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email, and password are required' });
    if (!EMAIL_RE.test(email)) return res.status(400).json({ message: 'Please enter a valid email address' });
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });

    if (await User.findByEmail(email)) return res.status(409).json({ message: 'An account with this email already exists' });

    const user = await User.create({ name, email, password });
    await sendEmail({ to: user.email, subject: 'Welcome to FreshWorks 🎉', html: templates.welcome(user.name) });

    res.status(201).json({ token: signToken(user), user: User.toSafeObject(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not create account: ' + err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

    const user = await User.findByEmail(email);
    if (!user || !(await User.comparePassword(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json({ token: signToken(user), user: User.toSafeObject(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed: ' + err.message });
  }
};

exports.me = async (req, res) => {
  res.json({ user: User.toSafeObject(req.user) });
};
