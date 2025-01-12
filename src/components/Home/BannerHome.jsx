import React from "react";
import ScheduleBtn from "/src/shared/components/partials/ScheduleBtn";

const Banner = () => {
  return (
    <>
      <div className="mx-5 h-[85vh] lg:h-[75vh] min-h-[700px] flex border border-black rounded-3xl relative overflow-hidden">
        <div className="z-10 flex flex-col justify-between w-full p-10 lg:p-16">

          {/* watermark */}
          <img
            className="object-cover h-12 ml-auto"
            src="../src/assets/images/logo-watermark.png"
            alt="watermark"
          />

          <div className="flex flex-col gap-4 xl:flex-row">
            <h1 className="text-5xl font-bold text-white lg:text-6xl font-quattrocento text-pretty">
              Honoring Cherished Companions <br className="hidden xl:flex" /> with Care
            </h1>
            <div className="flex flex-col gap-8 xl:gap-4 lg:basis-1/3">
              <p className="text-xl text-white xl:text-base text-pretty lg:text-balance font-dm_sans">
                We provide a respectful and compassionate way to memorialize your
                beloved pets, ensuring their memory is preserved with dignity and
                love.
              </p>
              <ScheduleBtn />
            </div>
          </div>
        </div>

        {/* bg img */}
        <img
          className="absolute object-cover object-[-240px] md:object-[-150px] lg:object-center w-full h-full"
          src="../src/assets/images/home-bg.png"
          alt="Pets"
        />

        {/* gradient */}
        <div className="absolute w-full h-full bg-gradient-to-t from-black/70"></div>
      </div>
    </>
  );
};

export default Banner;
