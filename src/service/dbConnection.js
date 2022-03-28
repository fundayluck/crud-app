import mongoose from "mongoose";
const connection = {};

async function dbConnection() {
  if (connection.isConnected) {
    return connection;
  }

  const db = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  });

  connection.isConnected = db.isConnected[0].readyState;
}

export default dbConnection;
