import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const authToken = localStorage.getItem("authToken");
    console.log(localStorage.getItem("authToken"));
    if (!storedUserData || !authToken) {
      navigate("/");
      // console.log("auth",authToken)
      return;
    }
  
    fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      // credentials:'include'
     
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        console.log(data)
      })
      
      .catch((err) => {
        console.error("Error fetching user data:", err.message);
        // navigate("/auth/login");
      });
  }, [navigate]);

  

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    navigate("/auth/login");
  };

  return (
    <div className="flex justify-center items-center flex-col p-4">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-semibold">Welcome to</h1>
        <h1 className="font-extrabold text-5xl text-unstop">Unstop</h1>
      </div>

      {userData ? (
        <div className="items-center border bg-white p-6 rounded-lg shadow-md">
          <img
            src={userData.image}
            alt="User Profile"
            className="mx-auto rounded-full w-36 h-36 mb-4"
          />
          <h2 className="text-xl font-bold text-center text-unstop  mb-2">
            {userData.firstName} {userData.lastName}
          </h2>
          <p className="text-gray-600 text-center capitalize">{userData.email}</p>
          <p className="text-gray-600 capitalize text-center mb-4">{userData.gender}</p>
          <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-unstop w-36 px-4 py-2 text-white font-semibold rounded-xl"
          >
            Logout
          </button> 
          </div>
          
        </div>
      ) : (
        <p className="text-gray-500">Loading user details...</p>
      )}
    </div>
  );
};

export default Home;
