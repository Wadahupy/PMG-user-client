import React from "react";

const Logo = ({ size = "h-10 w-10" }) => {
  return (
    <img
      className={`${size}`}
      src="../src/assets/images/logo-icon.png"
      alt="logo"
    />
  );
};

export default Logo;
