import React from "react";
import classes from "./LoadingSpinner.module.styl";

const LoadingSpinner = (props) => {
  return <div className={`${classes.spinner} ${props.className}`}></div>;
};

export default LoadingSpinner;
