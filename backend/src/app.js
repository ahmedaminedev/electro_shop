
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser'); // Import cookie-parser

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/admin');
const orderRoutes = require('./routes/orders');
const packRoutes = require('./routes/packs');
const categoryRoutes = require('./routes/categories');
const storeRoutes = require('./routes/stores');
const promotionRoutes = require('./routes/promotions');
const advertisementRoutes = require('./routes/advertisements');
const blogRoutes = require('./routes/blog');
const contactRoutes = require('./routes/contact');
const chatRoutes = require('./routes/chat');

const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser()); // Use cookie-parser

// Configuration des middlewares
// CORS (Cross-Origin Resource Sharing) pour autoriser les requêtes depuis votre frontend
const corsOptions = {
    origin: (origin, callback) => {
        const isDevelopment = process.env.NODE_ENV !== 'production';
        
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (isDevelopment) {
            // Pour le développement, être plus permissif.
            // Autoriser localhost, 127.0.0.1, les domaines de développement Google
            // "origin: true" dynamically reflects the request origin, allowing mixed environments like AI Studio.
            return callback(null, true);
        } else {
            // Pour la production, vérifier strictement l'URL du frontend.
            const prodAllowlist = [process.env.FRONTEND_URL].filter(Boolean);
            if (prodAllowlist.includes(origin)) {
                return callback(null, true);
            }
        }

        // Si on arrive ici, l'origine n'est pas autorisée.
        console.warn(`CORS a bloqué l'origine : ${origin}`);
        return callback(new Error('Non autorisé par CORS'));
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200 // Utiliser 200 pour une meilleure compatibilité
};

// Activer CORS avec les options définies.
app.use(cors(corsOptions));

// Logger Middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/packs', packRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/advertisements', advertisementRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/chat', chatRoutes);

// Root route for health check
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: (process.env.NODE_ENV || 'development') === 'production' ? null : err.stack,
  });
});

module.exports = app;
