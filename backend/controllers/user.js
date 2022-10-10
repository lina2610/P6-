const User = require('../models/user'); //
const bcrypt = require('bcrypt');  // hachage du mot de passe avec bcrypt
const jwt = require('jsonwebtoken'); //attribuer un token à un utilisateur
require('dotenv').config();

// sauvegarde nouvel utilisateur et on crypte son mot de passe avec un hash généré par bcrypt

exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            })

            // on enregistre l'utilisateur dans la base de données
            user.save()
                .then(() => res.status(201).json({message: 'Utilisateur créé avec succés !'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
},


//middleware vérifie si utlisateur existe dans la base, si oui il vérifie son mot de passe  et renvoie un TOKEN, sinon il renvoie une erreur
exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                return res.status(401).json({error: 'Utlisateur inexistant'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid){
                        return res.status(401).json({error: 'Mot de passe incorrect !'});
                    }
                    
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            `${process.env.TOKEN_SECRET}`,
                            {expiresIn: '24h'}
                        )
                    });
                    
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}))
};


