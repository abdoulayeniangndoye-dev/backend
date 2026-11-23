const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

const clientRoutes = require('./routes/client.routes');
console.log('test111111111');
const produitRoutes = require('./routes/produits.routes');

app.use('/api/clients', clientRoutes);
app.use('/api/produits', produitRoutes);

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API Express !');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});