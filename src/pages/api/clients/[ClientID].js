import Client from "../../../models/clients";
import dbConnection from "../../../service/dbConnection";

dbConnection();

export default async function handler(req, res) {
  const { method } = req;
  const { ClientID } = req.query;

  switch (method) {
    case "PUT":
      try {
        const { first_name, last_name, email, phone, address } = req.body;
        if ((!first_name && !last_name) || !email || !phone || !address) {
          throw "Please fill all the fields";
        }
        await Client.updateOne(
          { _id: ClientID },
          { first_name, last_name, email, phone, address }
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
