import React from "react";
import classes from "./CarDetails.module.styl";

import { useParams } from "react-router-dom";
import CarInformation from "../components/car-actions-component/CarInformation";
const CarDetails = () => {
  const param = useParams();
  return (
    <div className={classes.detailPage}>
      <CarInformation id={param.carID} />
    </div>
  );
};

export default CarDetails;
