//récupération du modèle sauce

const sauce = require('../models/sauce');
const Sauce = require('../models/sauce');



//création d'une nouvelle sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    // sauvegarde de la sauce dans la base de donnée
    sauce.save()
        .then(() => res.status(201).json({message: 'Sauce enregistée !'}))
        .catch(error => res.status(500).json({error}));
}


//permet de récupérer une seule sauce, identifiée par son Id
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({error}));
}

//permet de récupérer toutes les sauces 

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}));
};


//Modification d'une sauce

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
        .then(() => res.status(200).json({message: 'Sauce modifiée !'}))
        .catch(error => res.status(400).json({error}));
};

//suppression d'une sauce

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: 'Sauce supprimée !'}))
        .catch(error => res.status(400).json({error}));
};

//permet de liker ou disliker une sauce

exports.likeSauceOrNot = (req, res, next) => {
    if (req.body.like === 1) {
        Sauce.updateOne({_id: req.params.id}, {$inc: {likes: req.body.like++}, $push: {usersLiked: req.body.userId}})
            .then(sauce => res.status(200).json({message: 'Like ajouté !'}))
            .catch(error => res.status(400).json({error}))
    } else if (req.body.like === -1) {
        Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } })
            .then(sauce => res.status(200).json({message: 'Dislike ajouté !'}))
            .catch(error => res.status(400).json({error}))
    }
    else {
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
                        .then(sauce => { res.status(200).json({message: 'Like supprimé !'}) })
                        .catch(error => res.status(400).json({error}))
                } else if (sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                        .then(sauce => { res.status(200).json({message: 'Dislike supprimé !'}) })
                        .catch(error => res.status(400).json({error}))
                }
            })
            .catch(error => res.status(400).json({ error }))
    }

}