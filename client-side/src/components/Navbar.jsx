import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("user"));
  const userName = userData ? userData.userName : "";
  const userId = userData ? userData.id : "";
  return (
    <nav className="bg-black text-white">
      <div className="mx-auto px-4 py-4 flex items-center">
        <div className="flex-initial">
          <span className="font-bold mr-4">Hello, {userName}</span>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              localStorage.removeItem("access_token");
              localStorage.removeItem("user");
              navigate("/");
            }}>
            Logout
          </button>
        </div>
        <div className="flex-1 text-start">
          <Link to={`/favorites/${userId}`} className="font-bold ml-11 mr-5">
            My Favorites
          </Link>
          <Link to={`/user/${userId}`} className="font-bold ml-5">
            Update Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
