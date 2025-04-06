import React from "react";

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div className="absolute top-[0px] left-[0px] w-[100%] h-[100%] flex justify-center bg-[rgba(0,0,0,0.5)]">
      <div
        className={`bg-[white] w-[30%] my-[auto] h-[30%] text-center items-center justify-center flex flex-col gap-[20px] rounded-md ${
          type === "success" ? "border-green-500" : "border-red-500"
        }`}
      >
        <div
          className={`text-lg font-semibold ${
            type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
        <button
          onClick={onClose}
          className="px-[30px] py-[15px] text-[white] bg-[blue] mt-[50px] border-none rounded-[8px] hover:bg-[gray]"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Notification;
