const mongoose = require("mongoose");

delete mongoose.connection.models["client"];

const ClientSchema = mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  phone: Number,
  address: String,
  createAt: {
    type: Date,
    default: new Date(),
  },
});
const Client = mongoose.models.Client || mongoose.model("client", ClientSchema);

export default Client;
