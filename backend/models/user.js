const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')


// on crée notre schéma de données dédié à l'utilisateur
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true}, // email doit etre unique
    password: {type: String, required: true}
});

userSchema.plugin(uniqueValidator); // plugin pour garantir un email unique

module.exports = mongoose.model('User', userSchema);// export du modèle terminé grace a mongoose.model