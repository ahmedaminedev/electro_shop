
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');

// Helper pour générer le token et la réponse
const sendTokenResponse = (user, statusCode, res) => {
  // Création du token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "votre_secret_jwt_tres_long_et_securise_123456", {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  });

  console.log(`[BACKEND-AUTH] Token généré avec succès pour : ${user.email} | Rôle : ${user.role}`);

  const options = {
    expires: new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 jours
    ),
    httpOnly: true,
    secure: (process.env.NODE_ENV || 'development') === 'production',
    sameSite: 'strict'
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        addresses: user.addresses
      }
    });
};

// @desc    Inscrire un utilisateur
// @route   POST /api/auth/register
// @access  Public
exports.register = catchAsync(async (req, res) => {
  console.log('[BACKEND-AUTH] Tentative d\'inscription pour :', req.body.email);
  const { firstName, lastName, email, password, phone } = req.body;

  // Validation Backend
  if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Tous les champs obligatoires (Nom, Prénom, Email, Mot de passe) doivent être remplis." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Format d'email invalide." });
  }

  if (password.length < 6) {
      return res.status(400).json({ message: "Le mot de passe doit contenir au moins 6 caractères." });
  }

  if (phone && !/^\d{8}$/.test(phone)) {
      return res.status(400).json({ message: "Le numéro de téléphone doit contenir exactement 8 chiffres." });
  }

  // Vérifier si l'utilisateur existe
  const userExists = await User.findOne({ email });

  if (userExists) {
    console.log('[BACKEND-AUTH] Échec inscription : Email déjà utilisé ->', email);
    return res.status(400).json({ message: 'Cet email est déjà associé à un compte.' });
  }

  // Créer l'utilisateur (Force le rôle CUSTOMER par sécurité pour l'inscription publique)
  const user = await User.create({ 
      firstName, 
      lastName, 
      email, 
      password, 
      phone,
      role: 'CUSTOMER' 
  });

  if (user) {
    console.log('[BACKEND-AUTH] Inscription réussie. ID:', user._id);
    sendTokenResponse(user, 201, res);
  } else {
    console.log('[BACKEND-AUTH] Erreur lors de la création en BDD.');
    res.status(400).json({ message: 'Données utilisateur invalides.' });
  }
});

// @desc    Connecter un utilisateur
// @route   POST /api/auth/login
// @access  Public
exports.login = catchAsync(async (req, res) => {
  console.log('[BACKEND-AUTH] Tentative de connexion pour :', req.body.email);
  const { email, password } = req.body;

  // Validation simple
  if (!email || !password) {
    return res.status(400).json({ message: 'Veuillez fournir un email et un mot de passe.' });
  }

  // Vérifier l'email
  const user = await User.findOne({ email }).select('+password'); // Inclure le mdp pour la vérification

  if (!user) {
    console.log('[BACKEND-AUTH] Utilisateur non trouvé :', email);
    return res.status(401).json({ message: 'Identifiants invalides.' });
  }

  // Vérifier le mot de passe
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    console.log('[BACKEND-AUTH] Mot de passe incorrect pour :', email);
    return res.status(401).json({ message: 'Identifiants invalides.' });
  }

  console.log('[BACKEND-AUTH] Connexion validée pour :', email);
  sendTokenResponse(user, 200, res);
});

// @desc    Déconnexion (Clear cookie)
// @route   GET /api/auth/logout
// @access  Private
exports.logout = catchAsync(async (req, res) => {
  console.log('[BACKEND-AUTH] Déconnexion demandée.');
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ success: true, message: 'Déconnecté avec succès' });
});

// @desc    Obtenir l'utilisateur courant
// @route   GET /api/auth/me
// @access  Private
exports.getMe = catchAsync(async (req, res) => {
  // req.user est injecté par le middleware 'protect'
  console.log('[BACKEND-AUTH] /me appelé par :', req.user ? req.user.email : 'Inconnu');
  
  const user = await User.findById(req.user._id);

  if (!user) {
      console.log('[BACKEND-AUTH] /me : Utilisateur introuvable en BDD malgré un token valide.');
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
  }

  res.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role, 
      addresses: user.addresses,
      age: user.age
  });
});
