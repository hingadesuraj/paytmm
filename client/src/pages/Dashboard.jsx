import React from "react";

const Dashboard = () => {
  return (
    <div className=" m-4 ">
      {/* upper */}
      <div className="flex justify-between  border-b-2 my-2 py-2 ">
        <h1 className=" font-bold text-2xl">Payments App</h1>
        <h3 className=" font-semibold">
          Hello-Suraj
          <span
            className="border-2 px-3 py-2  m-2 bg-gray-300"
            style={{ borderRadius: "50%" }}
          >
            S
          </span>
        </h3>
      </div>
      {/* show balance login user  */}
      <div>
        <p className="text-lg font-bold  py-2">Your Balance : ₹ 5000</p>
      </div>
      {/* existing user from database with search box */}
      <div>
        <h1 className="text-lg font-bold py-2">Users</h1>
        <div className="">
          <div className="pb-4">
            <input
              type="text"
              className=" w-full outline-none border-2 py-2 px-2 rounded-md"
              placeholder="Search User..."
            />
          </div>
          {/* user render  */}
          <div>
            {/* re-use compontnt */}
            <div className="flex justify-between items-center mt-4">
              <p>
                {" "}
                <span
                  className="border-2 px-2 py-2  m-2 bg-gray-300"
                  style={{ borderRadius: "50%" }}
                >
                  U1
                </span>{" "}
                Pavan
              </p>
              <button className="border-2 p-2 rounded-md bg-gray-400 text-white font-semibold">
                Send Money
              </button>
            </div>
            {/* ------------------------------------------------- */}
            {/* re-use compontnt */}
            <div className="flex justify-between items-center mt-4">
              <p>
                {" "}
                <span
                  className="border-2 px-2 py-2  m-2 bg-gray-300"
                  style={{ borderRadius: "50%" }}
                >
                  U1
                </span>{" "}
                Suraj
              </p>
              <button className="border-2 p-2 rounded-md bg-gray-400 text-white font-semibold">
                Send Money
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;