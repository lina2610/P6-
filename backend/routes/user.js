const express = require('express'); // appel express
const router = express.Router(); //création d'un router 
const userCtrl = require('../controllers/user'); // on importe controller




router.post('/signup', userCtrl.signUp); //ajoute l'utilisateur à la base de données
router.post('/login', userCtrl.login); //vérification des informations d'identification 

module.exports = router;