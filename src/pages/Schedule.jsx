import React, { useEffect, useState } from "react";
import ScheduleTable from "../components/Schedule/Table";
import UserInfo from "../components/Schedule/UserInfo";
import { userApi } from "../config/axios";
import MyTable from "../components/Schedule/MyTable";

const Schedule = () => {
  

  return (
    <div className="container px-5 mx-auto">
      {/* <UserInfo /> */}
      <ScheduleTable />
    </div>
  );
};

export default Schedule;
