const mongoose = require("mongoose");

const BankAccount = mongoose.model(
  "BankAccount",
  new mongoose.Schema({
    type: String,
    OwnerAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OwnerAddress"
    },
    OwnerName: String,
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    Actif: Boolean
  })
);

module.exports = BankAccount;