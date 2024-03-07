import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className=" min-h-full m-4  flex flex-wrap justify-center items-center">
      <div className=" p-2 m-2 shadow-md rounded-md">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold">Sign Up</h2>
          <p className="text-lg text-gray-400 py-2">
            Enter Your Information to create an account
          </p>
        </div>
        <div className=" flex flex-col">
          <label className="font-bold py-2">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            className="border-2 rounded-md border-gray-300 outline-none p-2"
          />
        </div>
        <div className=" flex flex-col">
          <label className="font-bold py-2">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            className="border-2 rounded-md border-gray-300 outline-none p-2"
          />
        </div>
        <div className=" flex flex-col">
          <label className="font-bold py-2">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="border-2 rounded-md border-gray-300 outline-none p-2"
          />
        </div>
        <div className=" flex flex-col">
          <label className="font-bold py-2">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="border-2 rounded-md border-gray-300 outline-none p-2"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <button className="bg-black text-white w-full rounded-md py-2 mt-4 font-semibold">
            Sign up
          </button>
          <p className="text-gray-400 my-2">
            Already have an account?{" "}
            <Link className="hover:text-black " to="/signin">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
