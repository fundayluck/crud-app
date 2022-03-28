import Client from "../../../models/clients";
import dbConnection from "../../../service/dbConnection";

dbConnection();

export default async function handler(req, res) {
  const { method } = req;
  const { ClientID } = req.query;

  switch (method) {
    case "PUT":
      try {
        const { fname, lname, email, phone, address } = req.body;
        if (!fname && !lname && !email && !phone && !address)
          return "invalid data";
        await Client.updateOne(
          { _id: ClientID },
          { fname, lname, email, phone, address }
        );
        res.status(200).json({ success: true });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }
      break;

    case "DELETE":
      try {
        await Client.deleteOne({ _id: ClientID });
        res.status(200).json({ success: true });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }
      break;
  }
}
