import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTimes } from "react-icons/fa";

function CardItem({ data, handleDelete }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const image = event.target.files[0];
    setFile(image);
    setPreviewImage(URL.createObjectURL(image));
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("imgUrl", file);

      await axios({
        method: "post",
        url: "http://localhost:3000/my-favorites",
        data: formData,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/home");
      Swal.fire({
        text: "Image has been updated",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        text: error.response.data.message,
        icon: "error",
      });
    } finally {
      setLoading(false);
      setFile(null);
      setPreviewImage(null);
    }
  };

  const cancelPreview = () => {
    setFile(null);
    setPreviewImage(null);
  };

  const closeModal = () => {
    navigate("/");
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
        <div className="bg-white p-8 rounded-lg relative max-h-full max-w-full overflow-auto">
          <button
            onClick={closeModal}
            className="absolute top-0 right-0 mt-4 mr-4 bg-transparent font-bold py-2 px-4 rounded">
            <FaTimes />
          </button>
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold mt-2">My Favorite</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((item) => (
              <div
                key={item.id}
                className="max-w-xs cursor-pointer rounded-lg p-4 shadow duration-150 hover:scale-105 hover:shadow-md">
                <img
                  className="w-full rounded-lg object-cover object-center"
                  src={item.imgUrl}
                  alt="favorite"
                />
                <div className="flex flex-col items-center mt-5">
                  <button
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white">
              <form onSubmit={handleSubmitForm}>
                <div className="mb-6 pt-4">
                  <label className="flex items-center justify-center mb-5 text-xl font-semibold text-[#07074D]">
                    Upload File
                  </label>
                  <div className="mb-8">
                    <input
                      type="file"
                      name="imgUrl"
                      id="file"
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <label
                      htmlFor="file"
                      className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center cursor-pointer hover:bg-gray-100">
                      {previewImage ? (
                        <div className="relative">
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="max-h-[200px] mx-auto mb-2"
                          />
                          <button
                            onClick={cancelPreview}
                            className="absolute top-0 right-0 mt-1 mr-1 bg-transparent font-bold py-1 px-2 rounded">
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                            Drop files here
                          </span>
                          <span className="mb-2 block text-base font-medium text-[#6B7280]">
                            Or
                          </span>
                          <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                            Browse
                          </span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
                <div>
                  {loading ? (
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-500"></div>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="hover:shadow-form w-full rounded-md bg-yellow-500 hover:bg-yellow-600 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                      Upload
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardItem;
