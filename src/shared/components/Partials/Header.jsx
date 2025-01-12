import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "./Logo";

const Header = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = localStorage.getItem('refreshToken')

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')

    navigate('/')
  }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="flex flex-col gap-4 m-4 lg:flex-row lg:gap-8">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary active font-bold flex items-center nav"
              : "text-black flex items-center nav"
          }
        >
          Home
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-primary active font-bold flex items-center nav"
              : "text-black flex items-center nav"
          }
        >
          About
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive
              ? "text-primary active font-bold flex items-center nav"
              : "text-black flex items-center nav"
          }
        >
          Services
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to="/schedule"
          className={({ isActive }) =>
            isActive
              ? "text-primary active font-bold flex items-center nav"
              : "text-black flex items-center nav"
          }
        >
          Schedule
        </NavLink>
      </Typography>
    </ul>
  );

  return (
    <div className="container w-full mx-auto lg:px-5">
      <Navbar
        className="px-5 lg:px-0"
        shadow={false}
      >
        <div className="relative flex items-center justify-between text-black">
          <Typography
            as="a"
            href="/"
            className="mr-4 z-20 cursor-pointer py-1.5 font-medium"
          >
            <div className="flex flex-row items-center gap-2 ">
              <Logo size="w-11 h-11 xl:w-[3.75rem] xl:h-[3.75rem]" />
              <p className="text-xl leading-5 xl:leading-7 xl:text-2xl font-quattrocento">
                Pet Memorial <br /> Garden
              </p>
            </div>
          </Typography>

          <div className="absolute z-10 justify-center hidden w-full lg:flex">
            {navList}
          </div>

          {!isAuth ?
            <Button
              variant={location.pathname === "/sign-in" ? "filled" : "outlined"}
              size="md"
              color={location.pathname === "/sign-in" ? "yellow" : "black"}
              className="z-20 hidden px-8 border border-black lg:flex font-dm_sans"
              onClick={() => navigate("/sign-in")}
            >
              <p className="text-base font-bold font-dm_sans">Sign In</p>
            </Button>

            :

            <Button
              variant={location.pathname === "/sign-in" ? "filled" : "outlined"}
              size="md"
              color={location.pathname === "/sign-in" ? "yellow" : "black"}
              className="z-20 hidden px-8 bg-red-400 border border-black lg:flex font-dm_sans"
              onClick={logout}
            >
              <p className="text-base font-bold font-dm_sans">Log out</p>
            </Button>
          }

          <IconButton
            variant="text"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="w-6 h-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="w-6 h-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <div className="visible lg:invisible">{navList}</div>
          <Button
            fullWidth
            variant={location.pathname === "/sign-in" ? "filled" : "outlined"}
            size="md"
            color={location.pathname === "/sign-in" ? "yellow" : "black"}
            className="block mt-4 border border-black lg:hidden"
            onClick={() => navigate("/sign-in")}
          >
            <p className="text-base font-bold font-dm_sans">Sign In</p>
          </Button>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
