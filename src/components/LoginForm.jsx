import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import user from "../assets/account_circle.png";
import visibility from "../assets/visibility.png";
import key from "../assets/key.png";
import mail from "../assets/mail.png";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    const userData = localStorage.getItem("userData");
    if (userData) {
      navigate("/home");
    }
  }, [navigate]);

  const togglePasswordVisibility = () => {
    const x = document.getElementById("floating_password");
    x.type = x.type === "password" ? "text" : "password";
  };

  const validateForm = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!username) return "Username is required.";
    if (username !== "emilys") return "Username must be emilys";
    if (!emailRegex.test(email)) return "Invalid email format.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password,}),
      });

      const data = await response.json();
      setIsLoading(false);

      if (data.accessToken) {
        localStorage.setItem("authToken", data.accessToken);
        localStorage.setItem("userData", JSON.stringify(data));
        navigate("/home");
      } else {
        setError("Invalid credentials.");
      }
    } catch (err) {
      setIsLoading(false);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="">
        <div className="flex rounded-xl p-3 pt-4 bg-form justify-between">
          <div className="flex justify-center items-center h-full pr-3">
            <img className="ml-5 mt-2" src={user} alt="" />
          </div>
          <div className="relative z-0 w-full group">
            <input
              type="text"
              name="floating_username"
              id="floating_username"
              className="block bg-form font-bold py-3 px-3 w-full text-sm text-black rounded-lg appearance-none focus:outline-none focus:ring-0 peer"
              placeholder=" "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label
              htmlFor="floating_username"
              className="peer-focus:font-bold font-bold absolute text-sm text-black dark:text-black duration-300 transform -translate-y-4 scale-75 top-2 left-3 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Username
            </label>
          </div>
        </div>

        <div className="flex mt-4 rounded-xl p-3 pt-4 bg-form justify-between">
          <div className="flex justify-center items-center h-full pr-3">
            <img className="ml-5 mt-2" src={mail} alt="" />
          </div>
          <div className="relative z-0 w-full group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block bg-form font-bold py-3 px-3 w-full text-sm text-black rounded-lg appearance-none focus:outline-none focus:ring-0 peer"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-bold font-bold absolute text-sm text-black dark:text-black duration-300 transform -translate-y-4 scale-75 top-2 left-3 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Email
            </label>
          </div>
        </div>

        <div className="flex mt-4 rounded-xl p-3 pt-4 bg-form justify-between">
          <div className="flex justify-center items-center h-full pr-3">
            <img className="ml-5 mt-2" src={key} alt="" />
          </div>
          <div className="relative z-0 w-full group">
            <input
              type="password"
              id="floating_password"
              className="block bg-form font-bold py-3 px-3 w-full text-sm text-black rounded-lg appearance-none focus:outline-none focus:ring-0 peer"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-bold font-bold absolute text-sm text-black dark:text-black duration-300 transform -translate-y-4 scale-75 top-2 left-3 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Password
            </label>
          </div>
          <div className="flex justify-center items-center h-full pr-3">
            <button type="button" onClick={togglePasswordVisibility}>
              <img className="ml-5 mt-2" src={visibility} alt="show password" />
            </button>
          </div>
        </div>

        {error && <div className="text-red-600 mt-2">{error}</div>}

        <button
          type="submit"
          className="mt-6 w-full flex justify-center items-center py-3 bg-indigo-600 text-white rounded-xl font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
        <div className="mb-4 mt-6 flex justify-between">
          <label className="flex items-center text-black">
            <input
              type="checkbox"
              className="mr-2 rounded bg-form focus:ring-unstop"
            />
            Remember Me
          </label>
          <a className="text-unstop " href="">
            Forgot Password?
          </a>
        </div>

      </form>
    </div>
  );
};

export default LoginForm;
