const db = require('../config/database');

const getproduits = async (req, res) => {
    console.log('test2222');
    try {
        const [produits] = await db.query('SELECT * FROM produit');
        res.status(200).json(produits);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

const getproduitById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await db.query(
            'SELECT * FROM produit WHERE IdProduit = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Produit introuvable' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

const addproduits = async (req, res) => {
    try {
        const { NomProduit,Prix ,Stock } = req.body;

        if (!NomProduit) {
            return res.status(400).json({ message: 'Le nom du produit est obligatoire' });
        }

        const sql = `
            INSERT INTO produit (NomProduit,Prix ,Stock)
            VALUES (?, ?, ?)
        `;

        const [result] = await db.query(sql, [
            NomProduit || null,
            Prix || null,
            Stock || null
        ]);

        res.status(201).json({
            message: 'Produit ajouté avec succès',
            IdProduit: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

const updateproduits = async (req, res) => {
    try {
        const { id } = req.params;
        const { NomProduit,Prix ,Stock } = req.body;

        if (!NomProduit) {
            return res.status(400).json({ message: 'Le nom du produit est obligatoire' });
        }

        const sql = `
            UPDATE produit
            SET NomProduit = ?,
                Prix = ?,
                Stock = ?
            WHERE IdProduit = ?
        `;

        const [result] = await db.query(sql, [
            NomProduit || null,
            Prix || null,
            Stock || null,
            id
        
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produit introuvable' });
        }

        res.status(200).json({ message: 'Produit modifié avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

const deleteproduits = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            'DELETE FROM produit WHERE IdProduit = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produit introuvable' });
        }

        res.status(200).json({ message: 'Produit supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

module.exports = {
    getproduits,
    getproduitById,
    addproduits,
    updateproduits,
    deleteproduits
};