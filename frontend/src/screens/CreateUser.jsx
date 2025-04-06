import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/user";
import Notification from "./Notification"; 

const CreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await createUser(formData);
      setMessage(`User ${newUser.name} created successfully!`);
      setType("success");
      setFormData({ name: "", email: "" }); 
    } catch (err) {
      setMessage(err.message);
      setType("error");
    }
  };

  const handleCloseNotification = () => {
    setMessage(""); 
  };

  return (
    <div className="mt-[70px]">
      <button
        onClick={() => navigate(-1)}
        className="mb-[30px] ml-[50px] px-[40px] py-[10px] text-[20px] bg-[green] text-[white] border-none rounded-[8px]"
      >
        Back
      </button>
      <div className="flex justify-center text-[50px]">Create User</div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center mt-[50px] mx-[30%] border py-[50px]"
      >
        <div className="flex flex-col mt-[30px]">
          <label className="text-[20px]">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border-2 border-gray-400 p-[10px] outline-none text-[18px] w-[300px] h-[40px] mt-[10px]"
            required
          />
        </div>
        <div className="flex flex-col mt-[30px]">
          <label className="text-[20px]">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border-2 border-gray-400 p-[10px] outline-none text-[18px] w-[300px] h-[40px] mt-[10px]"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="mt-[60px] px-[50px] py-[10px] text-[18px] bg-[green] text-[white] rounded-[8px]"
          >
            Create User
          </button>
        </div>
      </form>

      {/* Notification component */}
      {message && (
        <Notification
          message={message}
          type={type}
          onClose={handleCloseNotification} 
        />
      )}
    </div>
  );
};

export default CreateUser;
