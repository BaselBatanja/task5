import React from "react";
import ReactDOM from "react-dom";

import classes from "./Overlay.module.styl";

const Backdrop = (props) => {
  const clickCancelButton = () => {
    props.clearClicked();
  };
  return (
    <>
      {ReactDOM.createPortal(
        <div className={classes.backdrop} onClick={clickCancelButton}></div>,
        document.getElementById("backdrop")
      )}
    </>
  );
};

export default Backdrop;
