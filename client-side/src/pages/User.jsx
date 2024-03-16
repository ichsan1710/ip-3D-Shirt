import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Form from "../components/Form";

const User = () => {
  const [dataUser, setDataUser] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const { id } = useParams();

  const fetchUserById = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: `http://localhost:3000/my-profile/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });

      setDataUser(data);
    } catch (error) {
      Swal.fire({
        text: error.response.data.message,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserById();
    }
  }, [id]);

  return (
    <>
      <Form dataUser={dataUser} key={dataUser.id} />
    </>
  );
};

export default User;
