import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Router } from "react-router-dom";
import {
  FaCircleDollarToSlot,
  FaPenToSquare,
  FaRegTrashCan,
} from "react-icons/fa6";
import CircleLoader from "react-spinners/CircleLoader";
import { Link } from "react-router-dom";

const customStyle = {
  headCell: {
    style: {
      fontSize: 15 + "px",
      // fontWeight:
    },
  },

  cells: {
    style: {
      fontSize: 13 + "px",
      // fontWeight: 500,
    },
  },
};

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <Link to={`/dashboard/edit-contact/${row._id}`}>
             <FaPenToSquare className="table-icon1" />
          </Link>
          <FaRegTrashCan className="table-icon2" />
        </>
      ),
    },
  ];
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:3000/contactmsyt/contacts", {
        headers: {
          Authorization: `Berear ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setContacts(res.data.contacts);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading ? (
        <div className="loader">
          <CircleLoader
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="contact list">
          <DataTable
            columns={columns}
            data={contacts}
            customStyles={customStyle}
            pagination
          />
          {contacts.length === 0 ? <h1> Add a Conatct</h1> : <></>}
        </div>
      )}
    </>
  );
};

export default Contacts;
