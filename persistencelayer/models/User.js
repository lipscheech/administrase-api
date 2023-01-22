const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        nome: String,
        email: String,
        password: String,
        token: String
    }
);

module.exports = mongoose.model('User', UserSchema);