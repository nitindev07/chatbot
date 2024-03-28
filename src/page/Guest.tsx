import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import PrivateComp from "./PrivateComp";

const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event:any) => {
    event.preventDefault();
  
    if (email === "test123" && password === "test123") {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
  
      navigate("/layout");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };
  
 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-[400px] mx-auto my-20">
      <div className="flex flex-col justify-center items-center p-4 lg:p-12 md:border border-gray-500/40 rounded-lg">
        <div className="flex flex-col justify-center text-center gap-y-6 items-center mb-12">
          <img
            src="/sidganga.png"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
            }}
            alt="logo"
          />
          <h1 className="text-xl font-semibold">
            Sidganga Institute Of Technology Chatbot
          </h1>
        </div>
        <h1 className="text-2xl font-bold mb-7">Login</h1>
        <div className="flex flex-col items-center gap-5 justify-center w-full">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border rounded-md border-black/20 w-full py-3 px-3"
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border w-full rounded-md border-black/20 py-3 px-3"
            />
            <button
              className="absolute right-4 top-1/2 transform opacity-50 -translate-y-1/2 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <IoEyeOffOutline size={20}/> : <IoEyeOutline size={20}/>}
            </button>
          </div>
          <button
            onClick={handleLogin}
            className="bg-gray-500 hover:bg-gray-500/50 py-3 rounded-md text-white font-semibold px-3 w-[200px]"
          >
            Login
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
