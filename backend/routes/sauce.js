const express = require('express');  //
const router = express.Router();  // appel du routeur
const sauceCtrl = require('../controllers/sauce');  // on importe le controller
const auth = require('../middleware/auth');  //import du middleware auth pour sécuriser les routes
const multer = require('../middleware/multer-config'); //on importe le middleware multer pour la gestion des images



router.post('/', auth, multer, sauceCtrl.createSauce); //route qui permet de créer une sauce
router.post('/:id/like', auth, sauceCtrl.likeSauceOrNot);  // route qui permet de définir le statut j'aime pour un utilisateur 
router.get('/', auth, sauceCtrl.getAllSauces);  //route qui permet de récupérer toutes les sauces
router.get('/:id', auth, sauceCtrl.getOneSauce);  // route qui permet de cliquer sur une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce); //route qui permet de modifier une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);  //route qui permet de supprimer une sauce

module.exports = router;