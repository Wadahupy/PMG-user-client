import React from "react";

const ServiceBody = ({ serviceBodies }) => {
  return (
    <>
      {serviceBodies.map((serviceBody, index) => (
        <div key={index} className="text-center mb-14 lg:px-28">
          <h2 className="mb-6 text-5xl font-bold xl:text-6xl font-quattrocento text-primary">
            {serviceBody.title}
          </h2>
          <p className="text-2xl text-justify indent-10 text-pretty">{serviceBody.description}</p>
        </div>
      ))}
    </>
  );
};

export default ServiceBody;
