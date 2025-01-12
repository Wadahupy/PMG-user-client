import React from "react";

const Cards = ({ items }) => {
  return (
    <div className="grid grid-cols-1 gap-6 mx-auto lg:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="relative flex w-full p-5 items-center overflow-hidden select-none hover:scale-[104%] ease-in-out duration-300 text-white border border-black h-[300px] rounded-3xl font-dm_sans group"
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl">
            <img
              className=" object-cover w-full h-full group-hover:scale-[106%] ease-in-out duration-[600ms]"
              src={item.image}
              alt="services"
            />
          </div>

          <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl">
            <div className="w-full h-full bg-gradient-to-t from-black backdrop-blur-[2px] group-hover:backdrop-blur-none duration-[700ms] ease-in-out"></div>
          </div>


          <div className="z-10 flex flex-col justify-center w-full">
            <h3 className="mx-auto mb-4 text-3xl font-medium text-pretty w-[80%] xl:w-full sm:translate-y-[300%] translate-y-[100%] lg:translate-y-[200%] xl:translate-y-[300%] group-hover:translate-y-0 ease-in-out duration-[500ms]">{item.title}</h3>
            <p className="mx-auto text-lg lg:text-base font-normal text-balance w-[80%] translate-y-[300%] group-hover:translate-y-0 ease-in-out duration-[500ms]">
              {item.description}
            </p>
          </div>

        </div>
      ))}
    </div>
  );
};

export default Cards;