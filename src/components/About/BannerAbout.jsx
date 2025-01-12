import React from "react";

const BannerAbout = () => {
  return (
    <>
      <div className="mx-5 h-[85vh] lg:h-[75vh] min-h-[700px] flex border border-black rounded-3xl relative overflow-hidden">
        <div className="z-10 flex flex-col justify-between w-full p-10 lg:p-16">


          {/* watermark */}
          <img
            className="object-cover h-12 ml-auto "
            src="../src/assets/images/logo-watermark.png"
            alt="watermark"
          />

          <div className="mt-auto text-white font-quattrocento">
            <p className="text-2xl">About</p>
            <h1 className="text-5xl font-bold lg:text-7xl text-pretty">
              Pet Memorial <br /> Garden
            </h1>
          </div>

          <p className="w-full mt-5 text-xl text-white text-balance lg:text-pretty font-dm_sans">
            Losing a beloved pet is never easy, and we understand the deep
            emotional bond shared between you and your furry, feathered, or scaly
            family members. That’s why we’re committed to providing a platform
            that honors their memory while simplifying the process of managing pet
            burial and memorial services.
          </p>
        </div>

        {/* bg img */}
        <img
          className="absolute object-cover object-[-800px] md:object-[-600px] w-full h-full lg:object-center"
          src="../src/assets/images/banner-about.png"
          alt="Pets"
        />

        {/* gradient */}
        <div className="absolute w-full h-full bg-gradient-to-t from-black/70"></div>
      </div>
    </>
  );
};

export default BannerAbout;
