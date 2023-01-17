const mongoose = require('mongoose');

const BankSchema = new mongoose.Schema(
  {
    _idUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    bankName: String,
    debit: [{ decription: String, value: Number }],
    totalDebitAmount: Number,
    accountValue: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bank', BankSchema);