import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser, updateUser, getUser } from "../api/user";
import UserDetails from "./UserDetails";

const Home = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const usersData = await getUsers();
        setUsers(usersData || []);
      } catch (err) {
        console.error("Error fetching users:", err.message);
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };
    console.log("Updated selected user details:", selectedUserDetails);
    console.log("New user data:", selectedUser);

    fetchUsers();
  }, [selectedUserDetails, selectedUser]);

  const handleModalOpen = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { _id, __v, createdAt, updatedAt, ...sanitizedUserData } =
        selectedUser;

      console.log("Updating user with ID:", _id);
      console.log("Sanitized data:", sanitizedUserData);

      const response = await updateUser(_id, sanitizedUserData);

      if (response && response.success) {
        const updatedUsers = users.map((u) =>
          u._id === _id ? { ...u, ...sanitizedUserData } : u
        );
        setUsers(updatedUsers);
        handleModalClose();
      } else {
        console.error("Update failed:", response.message);
        alert(
          "Failed to update user: " + (response.message || "Unknown error")
        );
      }
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Error updating user: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err.message);
    }
  };

  const handleViewDetails = async (userId) => {
    try {
      console.log("Fetching user details for ID:", userId);
      const response = await getUser(userId);
      console.log("Received user details:", response);

      if (response && response.data) {
        setSelectedUserDetails(response.data);
      } else {
        console.error("No user data received");
      }
      setIsDetailsOpen(true);
    } catch (err) {
      console.error("Error fetching user details:", err);
      setSelectedUserDetails(null);
    }
  };

  const handleDetailsClose = () => {
    setIsDetailsOpen(false);
    setSelectedUserDetails(null);
  };

  return (
    <div className="px-[60px]">
      <div className="text-[50px] text-green-500 flex justify-center mt-[30px]">
        Users Profile
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
            <th className="border p-[10px]">Details</th>
            <th className="border p-[10px]"></th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                </div>
              </td>
            </tr>
          ) : users && users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td className="border p-[10px]">{user._id}</td>
                <td className="border p-[10px]">{user.name}</td>
                <td className="border p-[10px]">{user.email}</td>
                <td className="border p-[10px]">
                  <button
                    onClick={() => handleViewDetails(user._id)}
                    className="bg-[blue] text-white px-[10px] py-[5px] rounded-[5px] border-none"
                  >
                    View details
                  </button>
                </td>
                <td className="border p-[10px] flex justify-center gap-[20px]">
                  <button
                    onClick={() => handleModalOpen(user)}
                    className="bg-[green] text-white px-[10px] text-[white] py-[5px] rounded-[5px] border-none"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-[red] text-white px-[10px] text-[white] py-[5px] rounded-[5px] border-none"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                {isLoading ? "" : "No users found"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal to Edit User */}
      {isModalOpen && (
        <div className="absolute top-[0px] left-[0px] w-[100%] h-[100%] flex justify-center bg-[rgba(0,0,0,0.5)] ">
          <div className="w-[80%] bg-[white] my-[70px]">
            <div className="mt-[70px] w-[100%]">
              <button
                onClick={handleModalClose}
                className="mb-[30px] ml-[50px] px-[40px] py-[10px] text-[20px] bg-[green] text-[white] border-none rounded-[8px]"
              >
                Back
              </button>
              <div className="flex justify-center text-[50px]">Edit User</div>
              <form
                className="flex flex-col justify-center items-center pt-[50px] mx-[30%] border py-[50px]"
                onSubmit={handleUpdate}
              >
                <div className="flex flex-col mt-[30px]">
                  <label className="text-[20px]">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={selectedUser?.name || ""}
                    onChange={handleChange}
                    className="border-2 border-gray-400 p-[10px] outline-none text-[18px] w-[300px] h-[40px] mt-[10px]"
                  />
                </div>
                <div className="flex flex-col mt-[30px]">
                  <label className="text-[20px]">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={selectedUser?.email || ""}
                    onChange={handleChange}
                    className="border-2 border-gray-400 p-[10px] outline-none text-[18px] w-[300px] h-[40px] mt-[10px]"
                  />
                </div>
                <div>
                  <button className="mt-[60px] px-[50px] py-[10px] text-[18px] border-none bg-[green] text-[white] rounded-[8px]">
                    Update User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {isDetailsOpen && (
        <UserDetails user={selectedUserDetails} onClose={handleDetailsClose} />
      )}
    </div>
  );
};

export default Home;
