import React, { useState } from "react";

import classes from "./SureComponent.module.styl";
import Backdrop from "./Overlay";
import { useNavigate } from "react-router";

import LoadingSpinner from "./LoadingSpinner";
const SureComponent = (props) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const exitDeletingHandler = () => {
    props.exitDeleting();
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log(props.id);
    setLoading(true);
    fetch(
      `https://task5-44bd5-default-rtdb.firebaseio.com/cars/${props.id}.json`,
      {
        method: "DELETE",
      }
    ).then((r) => {
      setLoading(false);
      navigate("/cars", { replace: true });
    });
  };
  return (
    <>
      <Backdrop clearClicked={exitDeletingHandler} />
      <div className={classes.deleteCar} onSubmit={submitFormHandler}>
        <form className={classes.form}>
          <div className={classes.heading}>
            <h2>Are you sure</h2>
          </div>
          <div className={classes.heading}>
            <h4>This action will delete this car permanently</h4>
          </div>
          <div className={classes.actions}>
            {!loading && (
              <button className={classes.add} id="delete_car">
                Delete
              </button>
            )}
            {!loading && (
              <button
                className={classes.cancel}
                type="button"
                onClick={exitDeletingHandler}
              >
                Cancel
              </button>
            )}
            {loading && <LoadingSpinner />}
          </div>
        </form>
      </div>
    </>
  );
};

export default SureComponent;
