import ReactDOM from "react-dom";
import React from "react";

import classes from "./ErrorModal.module.styl";
const ErrorModal = (props) => {
  function closeHandler() {
    props.onClose();
  }
  return (
    <>
      {ReactDOM.createPortal(
        <div className={classes.backdrop} onClick={closeHandler}></div>,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <div className={classes.overlay}>
          <div className={classes.errorTitle}>
            <span>Error</span>
          </div>
          <div className={classes.errorMessage}>
            <span>{props.message}</span>
            <div className={classes.actions}>
              <button onClick={closeHandler}>Close</button>
            </div>
          </div>
        </div>,
        document.getElementById("overlay")
      )}
    </>
  );
};

export default ErrorModal;
