import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    width: 400,
  },
};

const Dashboard = () => {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [userInformation, setUserInformation] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [accountInfo, setAccountInfo] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // State to hold selected user
  const [modalInput, setModalInput] = useState("");

  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const getData = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/user/userinfo",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    // console.log(response.data.userInfo.firstName);
    // const {firstName,lastName,username} = response.data.userInfo
    setUserInformation(response.data.userInfo);
  };

  // getting account balance
  const getAccountBalance = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/account/balance",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setAccountInfo(response.data);
    // console.log(response.data.balance);
  };

  // get all User and render it
  const getAllUser = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/user/bulk?filter=" + filter.toLowerCase()
    );
    setUsers(response.data.user);
    // console.log(response.data.user);
  };

  // Check if userInformation is defined before accessing its properties
  const initialLetter =
    userInformation && userInformation.firstName
      ? userInformation.firstName.split("")[0]
      : "";

  // handleLogout

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
    window.location.reload();
  };

  // open modal
  const openModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  // transfer money

  const handleTransfer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: selectedUser._id, // Assuming token is the recipient's identifier
          amount: modalInput, // Assuming modalInput contains the amount to transfer
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          }, 
        }
      );
      alert(response.data.message);
      // console.log(response.data)
      window.location.reload();
    } catch (error) {
      console.error("Error transferring funds:", error);
      // Handle error accordingly
    }
  };

  //Question Why handleTransfer function put in dependency array of useEffect the take number of request to server find out solution  

  useEffect(() => {
    getData();
    getAccountBalance();
    getAllUser();
  }, [token, filter]);

  // console.log(localStorage.getItem("token"));
  // console.log(userInformation )
  // console.log(selectedUser._id)
  

  return (
    <div className=" m-4 ">
      {/* upper */}
      <div className="flex justify-between  border-b-2 my-2 py-2 ">
        <h1 className=" font-bold text-2xl">Payments App</h1>
        <h3 className=" font-semibold">
          Hello : {userInformation.firstName}
          <span
            className="border-2 px-3 py-2  m-2 bg-gray-300"
            style={{ borderRadius: "50%" }}
          >
            {initialLetter.toUpperCase()}
          </span>
          <span
            className="border-2 p-2 rounded-md bg-gray-500 text-white cursor-pointer "
            onClick={handleLogout}
          >
            Logout
          </span>
        </h3>
      </div>
      {/* show balance login user  */}
      <div>
        <p className="text-lg font-bold  py-2">
          Your Balance : ₹ {accountInfo.balance}
        </p>
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
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          {/* user render  */}
          <div>
            {/* re-use compontnt */}
            {/* <div className="flex justify-between items-center mt-4">
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
              <button
                onClick={setModalOpen}
                className="border-2 p-2 rounded-md bg-gray-400 text-white font-semibold"
              >
                Send Money
              </button>
            </div> */}
            {users.map((data, index) => {
              return (
                <>
                  <div className="flex justify-between items-center mt-4">
                    <p>
                      {" "}
                      <span
                        className="border-2 px-2 py-2  m-2 bg-gray-300"
                        style={{ borderRadius: "50%" }}
                      >
                        U{index + 1}
                      </span>{" "}
                      {data.firstName}
                    </p>
                    <button
                      onClick={() => openModal(data)}
                      className="border-2 p-2 rounded-md bg-gray-400 text-white font-semibold"
                    >
                      Send Money
                    </button>
                  </div>
                </>
              );
            })}

            {/* Modal */}
            <Modal
              isOpen={modalOpen}
              onRequestClose={() => setModalOpen(false)}
              style={customStyles}
            >
              {/* <div>Login/Signup</div> */}
              {/* design modal */}

              <div>
                {/* heading */}
                <div className="flex justify-center items-center mb-2">
                  <h1 className="text-3xl font-semibold">Send Money</h1>
                </div>
                {/* middle part username */}
                <div>
                  {/* username and icon */}
                  <div>
                    <p className="text-xl font-semibold">
                      <span className=" text-center m-2 mr-3 p-2 px-3 font-bold bg-green-500 rounded-full">
                        S
                      </span>
                      Friend Name : {selectedUser?.firstName}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <label className=" font-semibold my-2">
                      Amount (in Rs)
                    </label>
                    <input
                      className="w-full outline-none border-2 rounded-md py-2 px-2"
                      type="text"
                      placeholder="Enter Money"
                      onChange={(e) => setModalInput(e.target.value)}
                    />
                  </div>
                  <div>
                    <button onClick={handleTransfer} className=" w-full p-2 my-2 bg-green-500 text-white font-medium rounded-md">
                      Initiate Transfer
                    </button>
                  </div>
                </div>
              </div>

              <button
                className=" bg-gray-400 font-bold text-white p-2 rounded-md"
                onClick={() => setModalOpen(false)}
              >
                Close Modal
              </button>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
