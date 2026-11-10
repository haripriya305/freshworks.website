const User = require('../models/User');
const ContactMessage = require('../models/ContactMessage');

exports.listUsers = async (req, res) => {
  try {
    const users = await User.findAllExcludingPassword();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['agent', 'admin'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
    const user = await User.updateRole(req.params.id, role);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.deleteById(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.findAll();
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
