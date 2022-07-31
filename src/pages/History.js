import React from "react";
import HistoryTable from "../components/history-components/HistoryTable";

import classes from "./History.module.styl";
const History = (props) => {
  return (
    <div className={classes.createActivityBox}>
      <div className={classes.title}>
        <h2>User history</h2>
      </div>
      <HistoryTable />
    </div>
  );
};

export default History;
