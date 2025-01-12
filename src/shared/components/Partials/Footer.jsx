import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaThreads,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

import ScheduleBtn from "/src/shared/components/partials/ScheduleBtn";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="relative w-full text-white">
      <div className="container z-20 gap-10 px-5 pb-10 mx-auto mt-10">
        <div className="flex flex-col gap-10 md:flex-row font-dm_sans">
          {/* Logo */}
          <div className="flex flex-row items-start justify-center gap-2 md:justify-start basis-1/2 lg:basis-2/5">
            <img
              src="/src/assets/images/logo-icon-dark.png"
              alt="Logo Icon"
              className="w-20 h-20 invert brightness-200"
            />
            <p className="flex items-end text-4xl leading-10 text-nowrap font-quattrocento ">
              Pet Memorial <br /> Garden
            </p>
          </div>

          {/* follow us */}
          <div className="flex flex-col items-center gap-4 text-base md:items-end lg:items-start basis-1/2 lg:basis-3/5">
            <h2 className="text-xl font-semibold">Follow Us</h2>
            <div className="flex mb-8 space-x-2">
              {/* Icons */}
              <a
                href="https://www.facebook.com/profile.php?id=100081677149934"
                target="_blank"
                className="followUs_icons"
              >
                <FaFacebook className="" />
              </a>
              <div className="followUs_icons">
                <FaInstagram className="" />
              </div>
              <div className="followUs_icons">
                <FaXTwitter className="" />
              </div>
              <div className="followUs_icons">
                <FaTiktok className="" />
              </div>
              <div className="followUs_icons">
                <FaThreads className="" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 lg:flex-row font-dm_sans ">
          <div className="flex flex-col gap-4 my-5 lg:mt-auto lg:mb-0 basis-2/5">
            <p className="mb-4 text-5xl text-center text-white lg:text-start text-pretty font-quattrocento">
              Cherish their Memory with Love
            </p>
            <ScheduleBtn />
          </div>

          <div className="flex flex-col gap-10 lg:gap-0 sm:flex-row basis-3/5">
            {/* links */}
            <div className="flex flex-col items-center gap-8 text-base lg:items-start basis-1/3">
              <h2 className="text-xl font-semibold ">Links</h2>
              <div className="flex flex-col items-center justify-between h-full gap-6 font-light lg:items-start text-md font-dm_sans">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "underline w-fit" : "w-fit hover:underline"
                  }
                >
                  <p className="">Home</p>
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "underline w-fit" : "w-fit hover:underline"
                  }
                >
                  <p className="">About</p>
                </NavLink>
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    isActive ? "underline w-fit" : "w-fit hover:underline"
                  }
                >
                  <p className="">Services</p>
                </NavLink>
                <NavLink
                  to="/schedule"
                  className={({ isActive }) =>
                    isActive ? "underline w-fit" : "w-fit hover:underline"
                  }
                >
                  <p className="">Schedule</p>
                </NavLink>
              </div>
            </div>

            {/* opening hours */}
            <div className="flex flex-col items-center gap-4 text-base sm:gap-8 font-dm_sans basis-2/3 sm:items-start">
              <h2 className="text-xl font-semibold ">Opening Hours</h2>
              <div className="flex flex-col items-center h-full gap-4 sm:items-start">
                <div className="flex flex-col items-center sm:items-start">
                  <p className="text-5xl font-quattrocento text-nowrap">
                    9:00 AM - 5:00 PM
                  </p>
                  <p className="text-3xl font-light">Mon - Fri</p>
                </div>
                <div className="flex flex-col gap-0.5 items-center sm:items-start mt-4 sm:mt-0">
                  <p className="">09274293904 || 0908 810 6348</p>
                  <p className="">petmemorial@garden.com</p>
                  <p className="">
                    Barangay MRF, Riverside View A. Lower Balite Street,
                    Barangay Fortune, Marikina City
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute w-full h-[calc(100%+80px)] overflow-hidden -top-20 bg-primary -z-10">
        {/* logo bg */}
        <div className="container relative h-full mx-auto">
          <img
            className="absolute min-w-fit min-h-[350px] h-[35vw] max-h-[350px] -z-10 -top-20 rotate-180 -right-20 mix-blend-multiply opacity-20"
            src="/src/assets/images/paw-primary.png"
          />
          <img
            className="absolute min-w-fit min-h-[350px] h-[35vw] max-h-[350px] -z-10 bottom-0 -left-20 mix-blend-multiply opacity-10"
            src="/src/assets/images/logo-icon-dark.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
