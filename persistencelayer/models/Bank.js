const mongoose = require('mongoose');
const Debt = require('./Debt')

const BankSchema = new mongoose.Schema(
        {
		      _idUser: {
                 type: mongoose.Schema.Types.ObjectId, 
                 required: true
              },
            bankName: String,
            debit: Debt[{}],
            totalDebitAmount: Number,
            accountValue: Number
           },
         { timestamps: true }
);

module.exports = mongoose.model('Bank', BankSchema);