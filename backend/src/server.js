
const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const seedData = require('./utils/seeder');

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Serveur démarré en mode ${process.env.NODE_ENV} sur le port ${PORT}`);
  
  try {
      // Exécuter le seeding au démarrage
      await seedData();
      console.log('Données initiales chargées (Seeding terminé).');
  } catch (error) {
      console.error("Erreur lors du seeding au démarrage (Le serveur continue de tourner):", error.message);
  }
});
