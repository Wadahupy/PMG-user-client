import React from "react";

const Testimonials = ({ testimonials }) => {
  return (
    <div className="grid grid-cols-1 gap-10 mb-10 lg:mb-0 lg:gap-0 lg:grid-cols-1 ">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className={`flex flex-col lg:flex-row gap-5 lg:gap-10 items-center ${index % 2 === 0 ? "" : "lg:flex-row-reverse"
            }`}
        >
          <div className="flex basis-1/2">
            <img
              src={testimonial.image}
              alt="Testimonial"
              className="object-cover w-full rounded-3xl h-[500px] border border-black"
            />
          </div>
          <div className="flex flex-col w-full px-5 text-2xl basis-1/2">
            <p className="mb-5 text-gray-700 text-balance">"{testimonial.text}"</p>
            <p className="font-bold text-black font-quattrocento">— {testimonial.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
