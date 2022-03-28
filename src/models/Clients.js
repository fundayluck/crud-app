import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: Number,
  address: String,
  createAt: {
    type: Date,
    default: new Date(),
  },
});

const Client = mongoose.models.Client || mongoose.model("Client", ClientSchema);

export default Client;
