const Ticket = require('../models/Ticket');

exports.summary = async (req, res) => {
  try {
    const total = await Ticket.count();
    const open = await Ticket.count(['Open', 'In progress', 'Urgent']);
    const resolved = await Ticket.count(['Resolved']);

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const series = days.map(label => ({ label, value: Math.floor(Math.random() * 20) + 3 }));

    res.json({
      openTickets: open,
      avgResponse: '1h 42m',
      csat: '94%',
      resolved,
      totalTickets: total,
      series
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findRecent(20);
    res.json({ tickets });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
