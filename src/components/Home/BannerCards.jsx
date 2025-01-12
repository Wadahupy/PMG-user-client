import React from "react";

const BannerCards = ({ bannerCards }) => {
  return (
    <div className="container grid grid-cols-1 gap-8 mx-auto lg:gap-4 md:grid-cols-2 lg:grid-cols-3 ">
      {bannerCards.map((bannerCard, index) => (
        <div
          key={index}
          className={`flex flex-col hover:scale-[102%] ease-in-out duration-300 lg:flex-row items-center font-dm_sans text-black border border-black justify-center text-3xl p-10 rounded-3xl 
            ${index % 6 === 0
              ? "bg-secondary"
              : index % 6 === 1
                ? "bg-[#FFE2C8]"
                : index % 6 === 2
                  ? "bg-[#FFC8C8]"
                  : index % 6 === 3
                    ? "bg-[#FFE2C8]"
                    : index % 6 === 4
                      ? "bg-[#FFC8C8]"
                      : "bg-secondary"
            }`}
        >
          <h1 className="text-3xl">{bannerCard.title}</h1>
        </div>
      ))}
    </div>
  );
};

export default BannerCards;
