import { useState, useEffect } from "react";

import Header from "../components/Header";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

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

  const isValidFormData = () => {
    if (!fname) {
      return Swal.fire("Error", "Please enter first name", "error");
    }
    if (!lname) {
      return Swal.fire("Error", "Please enter last name", "error");
    }
    if (!email) {
      return Swal.fire("Error", "Please enter email", "error");
    }
    if (!phone) {
      return Swal.fire("Error", "Please enter phone number", "error");
    }
    if (!address) {
      return Swal.fire("Error", "Please enter address", "error");
    }

    if (clients.some((client) => client.email === email && client._id !== id)) {
      return Swal.fire("Oops...", "E-mail already registered!!", "error");
    }
  };

  const handleSubmitCreateClient = async (e) => {
    e.preventDefault();

    if (isValidFormData()) return;
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

  const handlShowUpdateClient = (row) => {
    setId(row._id);
    setFName(row.fname);
    setLname(row.lname);
    setEmail(row.email);
    setPhone(row.phone);
    setAddress(row.address);
  };

  const handleUpdateClient = async (e) => {
    e.preventDefault();

    if (isValidFormData()) return;

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
      grow: 0.5,
    },
    {
      name: "Last Name",
      selector: (row) => row.lname,
      sortable: true,
      grow: 0.5,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      grow: 0.5,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
      grow: 0.5,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      wrap: true,
      sortable: true,
      grow: 0.5,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <div className="flex gap-2 mr-2">
          <button
            onClick={() => handlShowUpdateClient(row)}
            className="w-[44px] h-[22px] border border-[#ADC6FF] rounded-sm bg-[#F0F5FF] hover:bg-[#ADC6FF] text-[#2F54EB]"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteClient(row._id)}
            className="w-[44px] h-[22px] border border-[#ADC6FF] rounded-sm bg-[#F0F5FF] hover:bg-[#ADC6FF] text-[#2F54EB]"
          >
            Delete
          </button>
        </div>
      ),
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
                  type="tel"
                  name="AUS"
                  pattern="[0-9]{4}[0-9]{4}[0-9]{4}"
                  maxLength={12}
                  autoComplete="phone"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Phone eg. 081223232323"
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                isloading={isLoading ? 1 : 0}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {id ? "edit" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-[#E5E5E5]  px-5  ">
        <div className="md-flex  mx-auto rounded-xl shadow-md overflow-hidden m-4 col-span-2 bg-[#FFFFFF] ">
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
