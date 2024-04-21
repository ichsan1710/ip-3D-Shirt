import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useEffect } from "react";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleInputChange(e) {
    const { name, value } = e.target;

    const newInput = {
      ...input,
    };

    newInput[name] = value;

    setInput(newInput);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3000/login",
        data: input,
      });

      localStorage.access_token = data.access_token;
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/home");
    } catch (error) {
      Swal.fire({
        text: error.response.data.message,
        icon: "error",
      });
    }
  };

  const handleCredentialResponse = async ({ credential }) => {
    try {
      const { data } = await axios.post("http://localhost:3000/google-login", {
        googleToken: credential,
      });

      localStorage.access_token = data.access_token;
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } catch (error) {
      Swal.fire({
        text: error.response.data.message,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "94685430126-uo9ad5ajqq6044hqhcfq4r0aoqb6egt7.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("google-login-button"),
      { theme: "outline", size: "large" }
    );
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');\n\n  html, body{\n    font-family: 'Roboto', sans-serif;\n  }\n\n  .break-inside {\n    -moz-column-break-inside: avoid;\n    break-inside: avoid;\n  }\n  body {\n    display: flex;\n    justify-content: space-between;\n    flex-direction: column;\n    min-height: 100vh;\n    line-height: 1.5;\n  }\n  \n",
        }}
      />
      <div className="flex min-h-screen">
        <div className="flex flex-row w-full">
          <div className="hidden lg:flex flex-col justify-between bg-[#ffe85c] lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg">
            <div className="flex items-center justify-start space-x-3">
              <span className="bg-black rounded-full w-8 h-8" />
              <p href="#" className="font-medium text-xl">
                ThreeJS
              </p>
            </div>
            <div className="space-y-5">
              <h1 className="lg:text-3xl xl:text-5xl xl:leading-snug font-extrabold">
                Enter your account and discover new experiences
              </h1>
              <p className="text-lg">You do not have an account?</p>
              <Link
                to={"/register"}
                className="inline-block flex-none px-4 py-3 border-2 rounded-lg font-medium border-black bg-black text-white">
                Create account here
              </Link>
            </div>
            <p className="font-medium">© iCHSAN 2024</p>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center px-10 relative">
            <div className="flex lg:hidden justify-between items-center w-full py-4">
              <div className="flex items-center justify-start space-x-3">
                <span className="bg-black rounded-full w-6 h-6" />
                <p className="font-medium text-lg">ThreeJS</p>
              </div>
              <div className="flex items-center space-x-2">
                <span>Not a member? </span>
                <Link
                  to={"/register"}
                  className="underline font-medium text-[#070eff]">
                  Sign up now
                </Link>
              </div>
            </div>

            <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
              <div className="flex flex-col space-y-2 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Sign in to account
                </h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col max-w-md space-y-5">
                  <input
                    type="email"
                    placeholder="Email"
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                    name="email"
                    onChange={handleInputChange}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                    name="password"
                    onChange={handleInputChange}
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white">
                    Login
                  </button>
                  <div className="flex justify-center items-center">
                    <span className="w-full border border-black" />
                    <span className="px-4">Or</span>
                    <span className="w-full border border-black" />
                  </div>
                </div>
              </form>
              <div
                id="google-login-button"
                className="flex items-center justify-center"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
