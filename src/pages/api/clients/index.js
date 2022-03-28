import Client from "../../../models/clients";
import dbConnection from "../../../service/dbConnection";

dbConnection();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const clients = await Client.find({});
        res.status(200).json({ success: true, clients });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }
      break;

    case "POST":
      try {
        const { firstName, lastName, email, phone, address } = req.body;
        if ((!firstName && !lastName) || !email || !phone || !address) {
          throw "Please fill all the fields";
        }
        const client = await Client.create({
          firstName,
          lastName,
          email,
          phone,
          address,
        });
        res.status(201).json({ success: true, client });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }
      break;
  }
}
