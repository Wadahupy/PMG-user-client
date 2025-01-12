import React from "react";
import { HiArrowSmRight } from "react-icons/hi";
import Cards from "/src/components/Home/Cards";
import Testimonials from "/src/components/Home/Testimonials";
import BannerCards from "/src/components/Home/BannerCards";
import BannerHome from "/src/components/Home/BannerHome";
import SubmitBtn from "../shared/components/Partials/SubmitBtn";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const cardItems = [
    {
      title: "Memorial Planning",
      description:
        "Simplify the process with thoughtful service options designed for your peace of mind.",
      image: "../src/assets/images/home-bg.png",
    },
    {
      title: "Resting Place Options",
      description:
        "Choose from beautifully maintained spaces dedicated to honoring your pet’s memory.",
      image: "../src/assets/images/home-bg.png",
    },
    {
      title: "Support & Resources",
      description:
        "Access compassionate guidance and resources to help you through this journey.",
      image: "../src/assets/images/home-bg.png",
    },
  ];

  const testimonialItems = [
    {
      image: "../src/assets/images/home-bg.png",
      text: "Losing our beloved Max was one of the hardest moments for our family. Pet Cemetery Management and Services made the process so much easier, handling everything with care and professionalism. We are grateful for the dignified resting place they provided for him.",
      author: "Maria S.",
    },
    {
      image: "../src/assets/images/home-bg.png",
      text: "The team was incredibly compassionate and supportive during such a difficult time. They helped us honor Bella's memory in a way that truly reflected how much she meant to us. Thank you for making this experience as smooth as possible.",
      author: "John D.",
    },
  ];

  const chooseUsItems = [
    {
      title: "Compassionate Support",
    },
    {
      title: "Simplified Process",
    },
    {
      title: "Respectful Memorialization",
    },
    {
      title: "Personalized Care",
    },
    {
      title: "Dedicated to Preservation",
    },
    {
      title: "Expert Guidance",
    },
  ];

  const handleSubmit = () => {
    console.log("Submit Button was clicked");
    // Perform Submit logic here
  };

  return (
    <>
      <div className="z-0 min-h-screen overflow-hidden">
        {/* Home Banner  */}
        <section className="container relative mx-auto overflow-hidden">
          <BannerHome />
        </section>

        {/* Services Section */}
        <section className="relative w-full text-center text-white ">
          <div className="container px-5 mx-auto mt-10">
            <h2 className="text-6xl font-bold font-quattrocento">
              OUR SERVICES AT A GLANCE
            </h2>
            <p className="text-base mt-2 font-dm_sans w-[70%] lg:w-full mx-auto text-pretty">
              Discover how we can help you honor the memory of your beloved pets
              with care and ease.
            </p>
            <a
              className="flex items-center justify-center gap-2 mx-auto text-sm font-normal w-max hover:underline my-7 font-dm_sans"
              href="/services"
            // onClick={() => navigate("/services")}

            >
              View more
              <HiArrowSmRight />
            </a>
            <Cards items={cardItems} />
          </div>
          <div className="absolute w-full h-[calc(100%+40px)] -top-20 bg-primary -z-10"></div>
        </section>

        {/* Testimonials Section*/}
        <section className="container px-5 mx-auto mt-10">
          <h2 className="mb-10 text-5xl font-bold text-center md:text-6xl font-quattrocento">
            TESTIMONIALS
          </h2>
          <Testimonials testimonials={testimonialItems} />
        </section>

        {/* Why choose us Section*/}
        <section className="relative w-full pt-5 pb-10 mt-5 text-center text-white lg:mt-0 lg:py-0">
          <div className="container px-5 mx-auto mt-5 lg:mt-10">
            <h2 className="text-6xl font-bold mb-7 font-quattrocento">
              WHY CHOOSE US?
            </h2>
            <div>
              <BannerCards bannerCards={chooseUsItems} />
            </div>
          </div>
          <div className="absolute w-full h-[calc(100%-80px)] top-0 lg:h-[calc(100%+40px)] lg:-top-20 bg-primary -z-10"></div>
        </section>

        {/* Have a Question Section*/}
        <section className="container px-5 mx-auto mt-0 lg:mt-12">
          <div className="relative flex flex-col xl:w-[80%] xl:mx-auto gap-5 p-10 overflow-hidden border border-black rounded-3xl bg-secondary lg:flex-row">
            {/* left: Text Section */}
            <div className="z-10 flex flex-col flex-1">
              <div className="relative flex flex-col">
                <img
                  className={`w-10 h-fit mb-10 mx-auto md:mx-0 top-0 right-0 absolute lg:relative`}
                  src="../src/assets/images/logo-icon-dark.png"
                  alt="logo"
                />
                <h2 className="mb-4 text-6xl font-bold text-black font-quattrocento">
                  Have <br /> Questions?
                </h2>
              </div>
              <p className="text-base font-dm_sans text-pretty">
                If you need assistance or more information about our services, feel
                free to reach out. Our team is ready to answer any questions you may
                have and guide you through the memorialization process.
              </p>
            </div>

            {/* right: Form Section */}
            <div className="z-10 flex-1 mt-5 lg:mt-0">
              <form className="flex flex-col gap-4">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="sr-only">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Subject"
                    className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    placeholder="Message"
                    className="w-full min-h-[200px] p-3 border border-black rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  ></textarea>
                </div>
                <SubmitBtn
                  label="Submit"
                  onClick={handleSubmit}
                  id="SubmitBtn"
                  type="submit"
                  className=""
                />
              </form>
            </div>

            {/* logo bg */}
            <img
              className="min-w-fit h-[40%] md:h-[50%] lg:h-[90%] mix-blend-multiply absolute z-[9] -top-5 -right-5 lg:top-auto lg:right-auto lg:bottom-5 lg:-left-5 opacity-40"
              src="../src/assets/images/bg-icon-pink.png"
              alt="logo"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
