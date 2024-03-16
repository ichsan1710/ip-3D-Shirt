import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import CardItem from "../components/CardItem";

function Favorite() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: `http://localhost:3000/my-favorites/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });

      setData(data);
    } catch (error) {
      Swal.fire({
        text: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios({
        method: "delete",
        url: `http://localhost:3000/my-favorites/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });

      fetchData();

      Swal.fire({
        text: "successfully delete favorite",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        text: error.response.data.message,
        icon: "error",
      });
    }
  };
  return (
    <>
      <CardItem data={data} handleDelete={handleDelete} key={data.id} />
    </>
  );
}

export default Favorite;
