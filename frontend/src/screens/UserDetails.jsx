import React from "react";

const UserDetails = ({ user, onClose }) => {
  console.log('Received UserDetails user object:', user);
  
  if (!user || typeof user !== 'object') {
    return (
      <div className="absolute top-[0px] left-[0px] w-[100%] h-[100%] flex justify-center bg-[rgba(0,0,0,0.5)]">
        <div className="bg-[white] p-[15px] rounded-lg w-[40%] h-[40%] my-[auto]">
          <h1 className="text-2xl font-bold mb-4">User Details</h1>
          <div className="text-red-500 text-center py-10">
            Error: Invalid user data
          </div>
          <button
            onClick={onClose}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-[0px] left-[0px] w-[100%] h-[100%] flex justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="bg-[white] p-[15px] rounded-lg w-[40%] h-[40%] my-[auto]">
        <h1 className="text-2xl font-bold mb-4">User Details</h1>
        <div className="space-y-2">
          {user._id && <p><span className="font-medium">ID:</span> {user._id}</p>}
          {user.name && <p><span className="font-medium">Name:</span> {user.name}</p>}
          {user.email && <p><span className="font-medium">Email:</span> {user.email}</p>}
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
