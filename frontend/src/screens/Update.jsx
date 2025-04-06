import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state to show or hide
  const [user, setUser] = useState({
    id: 1,
    name: "John Doe",
    email: "john@example.com",
  }); // User data that can be updated
  const navigate = useNavigate();

  // Open the modal
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="px-[60px]">
      <div className="text-[50px] text-green-500 flex justify-center mt-[30px]">
        User Profile
      </div>
      <button
        onClick={() => navigate("/createUser")}
        className="bg-[green] px-[70px] py-[20px] border-none text-[white] text-[20px] mb-[50px] mt-[70px] rounded-[10px]"
      >
        Add User
      </button>
      <table className="table-auto border-collapse mx-auto mt-5 w-[80%]">
        <thead>
          <tr>
            <th className="border p-[10px]">ID</th>
            <th className="border p-[10px]">Name</th>
            <th className="border p-[10px]">Email</th>
            <th className="border p-[10px]"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-[10px]">{user.id}</td>
            <td className="border p-[10px]">{user.name}</td>
            <td className="border p-[10px]">{user.email}</td>
            <td className="border p-[10px] flex justify-center gap-[20px]">
              <button
                onClick={handleModalOpen} // Open the modal
                className="border-none w-[60px] h-[40px] bg-[green] text-[white] rounded-[5px]"
              >
                Edit
              </button>
              <button className="border-none w-[60px] h-[40px] bg-[red] text-[white] rounded-[5px]">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Modal to Edit User */}
      {isModalOpen && (
        <div className=" ">
        {/* bg-[rgba(0,0,0,0.5)] */}
          <div className="bg-white p-[30px] top-[0] absolute  rounded-[10px]">
            <button
              onClick={handleModalClose} // Close the modal when clicked
              className="mb-[30px] ml-[50px] px-[40px] py-[10px] text-[20px] bg-[green] text-[white] border-none rounded-[8px]"
            >
              Back
            </button>
            <div className="flex justify-center text-[50px]">Edit User</div>
            <form className="flex flex-col justify-center items-center mt-[50px] mx-[30%] border py-[50px]">
              <div className="flex flex-col mt-[30px]">
                <label className="text-[20px]">Name:</label>
                <input
                  type="text"
                  className="border-2 border-gray-400 p-[10px] outline-none text-[18px] w-[300px] h-[40px] mt-[10px]"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col mt-[30px]">
                <label className="text-[20px]">Email:</label>
                <input
                  type="email"
                  className="border-2 border-gray-400 p-[10px] outline-none text-[18px] w-[300px] h-[40px] mt-[10px]"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div>
                <button className="mt-[60px] px-[50px] py-[10px] text-[18px] bg-[green] text-[white] rounded-[8px]">
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
