// on récupère le package jsonbtoken

const jwt = require('jsonwebtoken')
require('dotenv').config();

// on vérifie le TOKEN de l'utilisateur, s'il correspond à l'id de l'utilisateur dans la requête, il sera autorisé à changer les données correspondantes

// middleware appliqué à toutes les routes afin de les sécuriser

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, `${process.env.TOKEN_SECRET}`)
        const userId = decodedToken.userId
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !'
        } else {
            next()
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non-authentifiée !' })
    }
}