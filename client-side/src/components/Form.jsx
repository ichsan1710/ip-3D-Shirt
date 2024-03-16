import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function Form({ dataUser }) {
  const [input, setInput] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "put",
        url: `http://localhost:3000/my-profile/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
        data: input,
      });

      navigate("/");
      Swal.fire({
        text: "User updated successfully",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        text: error.response.data.message,
        icon: "error",
      });
    }
  };

  function handleInputChange(e) {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  }

  useEffect(() => {
    if (dataUser) {
      setInput(dataUser);
    }
  }, [dataUser]);

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg">
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold mt-2">Update Profile</h2>
          </div>
          <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px]">
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="mb-3 block text-base font-medium text-[#07074D]">
                    User Name
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={input.userName}
                    className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    disabled
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-base font-medium text-[#07074D]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={input.email}
                    className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    disabled
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="phoneNumber"
                    className="mb-3 block text-base font-medium text-[#07074D]">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={input.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="address"
                    className="mb-3 block text-base font-medium text-[#07074D]">
                    Address
                  </label>
                  <textarea
                    rows={3}
                    name="address"
                    value={input.address}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <button
                    type="submit"
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                    Update
                  </button>
                </div>
              </form>
              <div className="flex flex-col items-center mt-5">
                <Link
                  to={"/"}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
