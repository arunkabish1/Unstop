import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import google from "../assets/google.png";
import facebook from "../assets/facebook.png";
import frame from "../assets/frame.png";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) navigate("/home");
  }, [navigate]);

  return (
    <div className="login-page bg-bgbase flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <img
          src={frame}
          className="max-w-full h-auto object-contain"
          alt="illustration"
        />
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-5/6 mx-auto">
          <div className="p-6">
            <h1 className="text-4xl font-semibold text-center">Welcome to</h1>
            <h1 className="font-extrabold text-4xl text-unstop text-center">
              Unstop
            </h1>
          </div>

          <div className="px-6 space-y-4">
            <button
              className="py-4 px-4  shadow-md flex rounded-xl justify-center gap-3 items-center w-full transition ease-in duration-200 text-center text-base bg-white border-2 border-gray-100 font-semibold"
              type="button"
            >
              <img className="h-6" src={google} alt="Google" />
              Login with Google
            </button>

            <button
              className="py-4 px-4 shadow-md flex rounded-xl justify-center gap-3 items-center w-full transition ease-in duration-200 text-center text-base bg-white border-2 border-gray-100 font-semibold"
              type="button"
            >
              <img className="h-6" src={facebook} alt="Facebook" />
              Login with Facebook
            </button>
          </div>

          <div className="flex items-center justify-center px-6 mt-5">
            <hr className="w-full h-px bg-gray-300 border-0" />
            <span className="px-3 text-sm text-gray-500">OR</span>
            <hr className="w-full h-px bg-gray-300 border-0" />
          </div>

          <div className="px-6 mt-4">
            <LoginForm />
          </div>

          <p className="text-center my-6 text-sm">
            Don't have an account?{" "}
            <a className="font-semibold text-blue-500" href="#">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
