import React from "react";
import Header from "../Partials/Header.jsx";
import Footer from "../Partials/Footer.jsx";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
