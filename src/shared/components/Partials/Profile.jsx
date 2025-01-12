import React from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
const Profile = () => {
  return (
    <Menu>
      <MenuHandler>
        <Button
          variant="outlined"
          size="sm"
          className="flex items-center gap-2"
        >
          <UserCircleIcon className="w-5 h-5" />
          <span>Profile</span>
        </Button>
      </MenuHandler>
      <MenuList>
        <MenuItem onClick={() => navigate("/profile")}>View Profile</MenuItem>
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Profile;
