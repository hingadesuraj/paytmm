import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token,setToken] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://paytmm-surajs-projects-3dd6a32b.vercel.app/api/v1/user/signin",
        {
          username: username,
          password: password,
        }
      );
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
      window.location.reload(); // Reload the page after successful login
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

// https://paytmm-surajs-projects-3dd6a32b.vercel.app/
// http://localhost:3000/
// console.log(token)

  return (
    <div>
      <div className=" min-h-full m-4  flex flex-wrap justify-center items-center">
        <div className=" p-2 m-2 shadow-md rounded-md">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-4xl font-bold">Sign In</h2>
            <p className="text-lg text-gray-400 py-2">
              Enter Your Information to create an account
            </p>
          </div>

          <div className=" flex flex-col">
            <label className="font-bold py-2">Email</label>
            <input
              type="email"
              placeholder="Username || email"
              className="border-2 rounded-md border-gray-300 outline-none p-2"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className=" flex flex-col">
            <label className="font-bold py-2">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="border-2 rounded-md border-gray-300 outline-none p-2"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <button
              onClick={handleLogin}
              className="bg-black text-white w-full rounded-md py-2 mt-4 font-semibold"
            >
              Sign In
            </button>
            <p className="text-gray-400 my-2">
              Don't have an account?{" "}
              <Link className="hover:text-black " to="/signup">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
