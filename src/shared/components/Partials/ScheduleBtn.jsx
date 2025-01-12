import React from "react";
import { HiArrowSmRight } from "react-icons/hi";

const ScheduleBtn = () => {
  return (
    <>
      <button className="z-10 flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-black transition-all duration-300 ease-in-out transform border border-black rounded-lg outline-none bg-tertiary hover:bg-yellow-600 active:scale-95 hover:scale-105">
        Make a schedule
        <HiArrowSmRight />
      </button>
    </>
  );
};

export default ScheduleBtn;
