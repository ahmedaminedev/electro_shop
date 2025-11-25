
const ContactMessage = require('../models/ContactMessage');
const catchAsync = require('../utils/catchAsync');

exports.getMessages = catchAsync(async (req, res) => {
  // Récupère les messages stockés dans MongoDB, triés par date
  const messages = await ContactMessage.find({}).sort({ date: -1 });
  res.json(messages);
});

exports.createMessage = catchAsync(async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // Enregistre le nouveau message dans MongoDB
  const newMessage = await ContactMessage.create({
      id: Date.now(),
      name,
      email,
      subject,
      message,
      date: new Date().toISOString().split('T')[0],
      read: false
  });

  res.status(201).json(newMessage);
});
