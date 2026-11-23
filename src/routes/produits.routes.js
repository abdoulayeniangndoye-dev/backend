const express = require('express');
const router = express.Router();

const {
    getproduits,
    getproduitById,
    addproduits,
    updateproduits,
    deleteproduits
}  = require('./produitsController');

router.get('/test', (req, res) => {
    res.send('La route fonctionne !');
});
console.log('test');
router.get('/', getproduits);
router.get('/:id', getproduitById);
router.post('/', addproduits);
router.put('/:id', updateproduits);
router.delete('/:id', deleteproduits);

module.exports = router;