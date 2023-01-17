const mongoose = require('mongoose');

const Debit = new mongoose.Schema(
    {
        _idUser: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        description: String,
        value: Number

    },
    { timestamps: true }
);

module.exports = mongoose.model('Debit', Debit);