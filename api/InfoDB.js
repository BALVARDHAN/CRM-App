const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InfoSchema = new Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  street: String,
  state: String,
  city: String,
  postalCode: String,
  currentOrganization: String,
});

module.exports = mongoose.model("InfoDB", InfoSchema);
