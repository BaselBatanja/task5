import React, { useContext } from "react";

import classes from "./CarItem.module.styl";

import { useNavigate, useLocation } from "react-router-dom";
const CarItem = (props) => {
  const navigate = useNavigate();

  const location = useLocation();
  const clickEventHandler = () => {
    navigate(location.pathname + `/${props.id}`);
  };

  return (
    <div onClick={clickEventHandler} className={classes.eventItem}>
      <div title={props.name} className={classes.nameDiv}>
        <img src={props.url} />
      </div>
      <div className={classes.dateDiv}>
        <div>{`${props.name} - ${props.costPerDay}$`}</div>
        <div className={classes.description}>{props.details}</div>
      </div>
    </div>
  );
};

export default CarItem;
