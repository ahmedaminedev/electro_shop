
const Order = require('../models/Order');
const catchAsync = require('../utils/catchAsync');

exports.addOrderItems = catchAsync(async (req, res) => {
  const {
    id,
    customerName,
    date,
    total,
    status,
    itemCount,
    items,
    shippingAddress,
    paymentMethod
  } = req.body;

  // Validation Backend
  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Aucun article dans la commande' });
  } 

  if (!shippingAddress || !shippingAddress.street || !shippingAddress.city || !shippingAddress.postalCode) {
      return res.status(400).json({ message: "L'adresse de livraison est incomplète." });
  }
  
  // CRITICAL: Ensure user is attached from the protect middleware
  if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Utilisateur non identifié. Connexion requise.' });
  }

  try {
      const order = new Order({
        id, // Frontend generated ID (e.g. ES-170...)
        customerName,
        user: req.user._id, // Link to DB User
        date,
        total: Number(total),
        status: status || 'En attente',
        itemCount: Number(itemCount),
        items, 
        shippingAddress, 
        paymentMethod
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);

  } catch (error) {
      console.error("Order Save Error:", error);
      if (error.code === 11000) {
          // Handle duplicate key error (if frontend sends same ID twice)
          return res.status(400).json({ message: 'Cette commande a déjà été enregistrée.' });
      }
      res.status(500).json({ message: 'Erreur lors de l\'enregistrement de la commande.' });
  }
});

// Cette méthode récupère uniquement les commandes de l'utilisateur connecté (req.user._id)
exports.getMyOrders = catchAsync(async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Non authentifié' });
  
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

exports.getOrders = catchAsync(async (req, res) => {
  const orders = await Order.find({})
    .populate('user', 'id firstName lastName email')
    .sort({ createdAt: -1 });
  res.json(orders);
});
