import React from "react";
import ScheduleBtn from "../shared/components/Partials/ScheduleBtn";
import ServiceBody from "../components/Services/ServiceBody";

const Services = () => {
  const serviceContents = [
    {
      title: "Smart Scheduling System",
      description:
        "Our Smart Scheduling System leverages advanced machine learning algorithms to recommend optimal schedules for services based on availability and preferences. This system is designed to maximize efficiency, minimize conflicts, and ensure smooth operations, providing both clients and providers with seamless planning experiences.",
    },
    {
      title: "Service History Dashboard",
      description:
        "The Service History Dashboard provides a comprehensive overview of all past transactions and services. This feature enables users to track their previous bookings, review service details, and access important documentation. The dashboard ensures all your records are easily accessible in one place.",
    },
    {
      title: "Feedback and Reviews",
      description:
        " Feedback and Reviews are essential for service improvement. Our platform allows clients to share their experiences, rate services, and provide constructive feedback. This feature helps us maintain high-quality standards and gives providers actionable insights to enhance their offerings.",
    },
  ];
  return (
    <>
      {/* Header Section */}
      <section className="relative flex w-full text-white">

        <div className="container relative z-10 flex flex-col px-5 mx-auto overflow-hidden md:inline-block py-14 lg:px-28 text-start bg-primary">
          <h1 className="mb-8 text-6xl font-bold font-quattrocento">
            OUR SERVICES
          </h1>
          <p className="z-10 text-2xl mb-14 font-dm_sans text-pretty">
            We offer a range of innovative solutions designed to simplify and
            enhance your experience. Our services are tailored to meet your
            unique needs, providing seamless scheduling, comprehensive service
            history tracking, and a feedback system that prioritizes quality and
            continuous improvement. Discover how our tools can help streamline
            your processes and deliver exceptional results.
          </p>

          <ScheduleBtn />

          <img
            className="w-[60%] xl:w-[50%] 2xl:w-[40%] min-h-fit -z-10 right-5 bottom-5 absolute mix-blend-multiply opacity-40"
            src="/src/assets/images/bg-icon.png"
          />

        </div>
        <div className="absolute w-full h-full bg-primary -z-10"></div>
      </section>

      {/* Services Section */}
      <section className="mb-32 pt-14">
        <div className="container px-5 mx-auto">
          {/* Smart Scheduling System */}
          <ServiceBody serviceBodies={serviceContents} />
        </div>
      </section>
    </>
  );
};

export default Services;
