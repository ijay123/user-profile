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
            className="mt-[30px] bg-[blue] text-[white] px-[20px] flex justify-center items-center w-[90px] py-[10px] rounded-[8px] border-none"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-[0px] left-[0px] w-[100%] h-[100%] flex justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="bg-[white] p-[15px] rounded-lg w-[50%] h-[50%] my-[auto] flex flex-col ">
        <h1 className="text-[5 flex justify-center font-bold mb-[40px]">User Details</h1>
        <div className="space-y-[15px] px-[30px] text-[20px]">
          {user._id && <p><span className="font-medium text-[green]">ID:</span> {user._id}</p>}
          {user.name && <p><span className="font-medium text-[green]">Name:</span> {user.name}</p>}
          {user.email && <p><span className="font-medium text-[green]">Email:</span> {user.email}</p>}
        </div>
        <button
          onClick={onClose}
          className="mt-[60px] bg-[blue] mx-auto text-[white] px-[20px] flex justify-center items-center w-[150px] py-[10px] rounded-[8px] border-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
