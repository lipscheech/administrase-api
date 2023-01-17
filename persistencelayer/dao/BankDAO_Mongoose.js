const mongoose = require('mongoose');

const BankDAO = require('./IBankDAO');

const Bank = require('../models/Bank');


class BankDAO_Mongoose extends BankDAO {

    constructor() {
        super();
        mongoose.connect('mongodb+srv://lipscheech:VB5Cw_iAW_qDRaB@administrase.ieoskjm.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
    async create(req) {

        const bank = await Bank.create(req.body);
        return bank;
    }
    async recovery() {
        let banks = await Bank.find().sort({ createdAt: -1 }).limit(5);
        return banks;
    }
    async update(req) {
        let bank = await Bank.findByIdAndUpdate(req.params.id, req.body,
            { new: true });
        return bank;

    }
    async delete(req) {
        let bank = await Bank.findByIdAndRemove(req.params.id);
        return bank;
    }

    async search(req) {
        let banks = await Bank.find(
            { _idUser: req.query.idUser }
        ).sort({ createdAt: -1 }).limit(5);
        return banks;

    }

    async searchbyUser(req) {
        let banks = await Bank.find(
            { _idUser: req.params.iduser }
        ).sort({ createdAt: -1 }).limit(5);
        return banks;

    }


}
module.exports = BankDAO_Mongoose;