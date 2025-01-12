import React from "react";
import { HiArrowSmRight } from "react-icons/hi";

const SubmitBtn = ({ label, onClick, type = "button", className, id }) => {
  return (
    <button
      type={type}
      id={id}
      onClick={onClick}
      className={`z-10 flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-black transition-all duration-300 ease-in-out transform border border-black rounded-lg outline-none bg-tertiary hover:bg-yellow-600 active:scale-95 hover:scale-105 ${className}`}
    >
      {label}
      <HiArrowSmRight />
    </button>
  );
};

export default SubmitBtn;
