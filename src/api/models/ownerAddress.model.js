const mongoose = require("mongoose");

const OwnerAddress = mongoose.model(
  "OwnerAddress",
  new mongoose.Schema({
    AddressLine1: String,
    AddressLine2: String,
    Ville: String,
    Région: String,
    PostalCode: String,
    Pays: String
  })
);

module.exports = OwnerAddress;