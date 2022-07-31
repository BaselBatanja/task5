import React from "react";
import CarsList from "../components/showingCarCards/CarsList";

import classes from "./dashboard.module.styl";

const Dashboard = (props) => {
  return (
    <div className={classes.dashboard}>
      <CarsList />
    </div>
  );
};

export default Dashboard;
