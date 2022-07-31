import React, { useContext, useEffect, useState } from "react";
import ImageContainer from "../../imageSlider/ImageContainer";
import AuthContext from "../../store/authentication-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import SureComponent from "../UI/SureComponent";

import classes from "./CarInformation.module.styl";

import { useNavigate, useLocation } from "react-router-dom";

import AddCar from "./AddCar";
import Backdrop from "../UI/Overlay";
import UiContext from "../../store/ui-context";
import RentCar from "../rent-car/RentCar";

const CarInformation = (props) => {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [url, setUrl] = useState("");
  const [cost, setCost] = useState(null);

  const [foundCar, setFoundCar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteState, setDeleteState] = useState(false);

  const [editCar, setEditCar] = useState(false);
  const [rentCar, setRentCar] = useState(false);

  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const isEditCar = params.get("editCar");
  const isRentCar = params.get("rentCar");

  const ctxUI = useContext(UiContext);
  const update = ctxUI.updateFromDataBase;

  const fetchData = () => {
    setLoading(true);
    fetch("https://task5-44bd5-default-rtdb.firebaseio.com/cars.json")
      .then((r) => r.json())
      .then((data) => {
        for (const car in data) {
          if (car === props.id) {
            setName(data[car].nameOfCar);
            setDetails(data[car].details);
            setUrl(data[car].url);
            setCost(data[car].costPerDay);
            setFoundCar(true);
          }
        }

        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, [update]);

  useEffect(() => {
    if (isEditCar === "true") {
      if (ctx.isAdmin !== true) {
        navigate(location.pathname);
        return;
      }
      setEditCar(true);
    } else {
      setEditCar(false);
    }
  }, [isEditCar]);

  useEffect(() => {
    if (isRentCar === "true") {
      if (ctx.isAdmin === true) {
        navigate(location.pathname);
        return;
      }
      setRentCar(true);
    } else {
      setRentCar(false);
    }
  }, [isRentCar]);

  if (!foundCar && !loading) {
    return (
      <div className={classes.centered}>
        <div className={classes.notFoundedCar}>Car Not Found</div>;
      </div>
    );
  }

  if (loading) {
    return (
      <div className={classes.centered}>
        <LoadingSpinner />
      </div>
    );
  }
  const deleteHandler = () => {
    setDeleteState(true);
  };
  const exitDeleteDialogHandler = () => {
    setDeleteState(false);
  };
  const editHandler = () => {
    navigate(location.pathname + "?editCar=true");
  };

  const clearClickedHandler = () => {
    navigate(location.pathname);
  };

  const rentCarHandler = () => {
    navigate(location.pathname + "?rentCar=true");
  };

  return (
    <>
      {rentCar && (
        <RentCar
          exitRent={clearClickedHandler}
          cost={cost}
          id={props.id}
          name={name}
        />
      )}
      {editCar && (
        <AddCar
          clearClicked={clearClickedHandler}
          data={{ name, details, url, cost, id: props.id }}
        />
      )}
      {editCar && <Backdrop clearClicked={clearClickedHandler} />}

      {deleteState && (
        <SureComponent exitDeleting={exitDeleteDialogHandler} id={props.id} />
      )}
      <div className={classes.header}>
        <div className={classes.title}>
          <h2>{name}</h2>
        </div>
        <div className={classes.actions} id="actionss">
          {!ctx.isAdmin && (
            <button
              className={classes.button}
              onClick={rentCarHandler}
              id="rent"
            >
              Rent
            </button>
          )}
          {ctx.isAdmin && (
            <button
              className={classes.button}
              onClick={deleteHandler}
              id="delete"
            >
              Delete
            </button>
          )}
          {ctx.isAdmin && (
            <button className={classes.button} onClick={editHandler} id="edit">
              Edit
            </button>
          )}
        </div>
      </div>
      <div className={classes.photoContainer}>
        <ImageContainer url={url} id={props.id} />
      </div>
      <div className={classes.details}>
        <div className={classes.titleSpan}>Details</div>
        <div className={classes.text}>{details}</div>
      </div>
    </>
  );
};

export default CarInformation;
