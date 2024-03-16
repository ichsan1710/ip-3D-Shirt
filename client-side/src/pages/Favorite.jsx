import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CardItem from "../components/CardItem";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavoriteById, fetchData } from "../features/favoriteSlice";

function Favorite() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.list);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchData(id));
  }, []);

  const handleDelete = async (id) => {
    dispatch(deleteFavoriteById(id));
    navigate("/home");
  };
  return (
    <>
      <CardItem
        data={favorites}
        handleDelete={handleDelete}
        key={favorites.id}
      />
    </>
  );
}

export default Favorite;
