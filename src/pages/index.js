import { useState, useEffect } from "react";
import Header from "../components/Header";
import DataTable from "react-data-table-component";

import api from "../service/api";

export default function Home() {
  const [fname, setFName] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState(null);
  const [address, setAddress] = useState("");
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitCreateClient = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = await api.post("/clients", {
        fname,
        lname,
        email,
        phone,
        address,
      });
      setClients(clients.concat(data.data));
      setFName("");
      setLname("");
      setEmail("");
      setPhone("");
      setAddress("");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handlShowUpdateClient = (client) => {
    setId(client._id);
    setFName(client.fname);
    setLname(client.lname);
    setEmail(client.email);
    setPhone(client.phone);
    setAddress(client.address);
  };

  const handleUpdateClient = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await api.put(`clients/${id}`, { fname, lname, email, phone, address });
      setFName("");
      setLname("");
      setEmail("");
      setPhone("");
      setAddress("");
      setId(null);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleDeleteClient = async (_id) => {
    try {
      await api.delete(`/clients/${_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    api.get("/clients").then(({ data }) => {
      setClients(data.data);
    });
  }, [clients]);

  const columns = [
    {
      name: "First name",
      selector: (row) => row.fname,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      wrap: true,
      sortable: true,
      format: (row) => `${row.address.slice(0, 200)}`,
    },
  ];

  return (
    <>
      <Header />
      <div className="flex items-center justify-center pt-[10px]">
        <div className="max-w-md w-full space-y-8 rounded-md p-[20px] bg-[#FFFFFF]">
          <h1 className="font-mono flex justify-center">Add User</h1>
          <form
            className="mt-8 space-y-6"
            onSubmit={id ? handleUpdateClient : handleSubmitCreateClient}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="firstName" className="sr-only">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="name"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="First Name"
                  value={fname}
                  onChange={(e) => setFName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="name"
                  autoComplete="lastName"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  pattern="[0-9]{10}"
                  type="tel"
                  autoComplete="phone"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="address" className="sr-only">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="address"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                isloading={isLoading}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {id ? "edit" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-[#E5E5E5]  px-3  ">
        <div className="md-flex  mx-auto rounded-xl shadow-md overflow-hidden w-full m-4 col-span-2 bg-[#FFFFFF] ">
          <DataTable
            columns={columns}
            data={clients}
            paginationPerPage={2}
            paginationRowsPerPageOptions={[2, 5, 10, 20, 25]}
            pagination
          />
        </div>
      </div>
    </>
  );
}
