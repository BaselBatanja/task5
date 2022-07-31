import React, { useEffect, useState, useRef, useContext } from "react";

import Backdrop from "../UI/Overlay";
import classes from "./RentCar.module.styl";

import LoadingSpinner from "../UI/LoadingSpinner";

import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../store/authentication-context";

const formatDate = (date) => {
  return `${date.getFullYear()}-${date.toLocaleString("en-US", {
    month: "2-digit",
  })}-${date.toLocaleString("en-US", { day: "2-digit" })}`;
};

const getDateTime = (d) => {
  const date = new Date(d);
  const time = date.getTime();
  return time;
};

const RentCar = (props) => {
  const [loading, setLoading] = useState(false);
  const toDateRef = useRef();

  const ctx = useContext(AuthContext);

  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const date = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = formatDate(tomorrow);
  const todayDate = formatDate(date);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [inputValue, setInputValue] = useState("");
  const [minOfToDate, setMinOfToDate] = useState(tomorrowDate);

  const sendingData = async () => {
    const response = await fetch(
      `https://task5-44bd5-default-rtdb.firebaseio.com/rentedCars/${props.id}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          name: props.name,
          from: fromDate,
          to: toDate,
          totalCost: inputValue,
          username: ctx.username,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    navigate(location.pathname);
  };

  const sendRentDateToDatabase = async () => {
    setLoading(true);
    const response = await fetch(
      `https://task5-44bd5-default-rtdb.firebaseio.com/rentedCars/${props.id}.json`
    );
    const data = await response.json();

    console.log(data);

    for (const period in data) {
      const firstDate = data[period].from;
      const lastDate = data[period].to;

      const dateObject = {
        first: firstDate,
        last: lastDate,
      };
      if (
        getDateTime(firstDate) <= getDateTime(fromDate) &&
        getDateTime(lastDate) >= getDateTime(toDate)
      ) {
        return { ...dateObject };
      }

      if (
        getDateTime(firstDate) > getDateTime(fromDate) &&
        getDateTime(firstDate) < getDateTime(toDate)
      ) {
        return { ...dateObject };
      }

      if (
        getDateTime(lastDate) > getDateTime(fromDate) &&
        getDateTime(lastDate) < getDateTime(toDate)
      ) {
        return { ...dateObject };
      }
    }
    await sendingData();
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();

    if (fromDate && toDate) {
      const value = await sendRentDateToDatabase();
      if (value) {
        setError(
          `This car is already rented in this period from ${value.first} to ${value.last}`
        );
      } else {
        setError(null);
      }
      setLoading(false);
    }
  };

  const exitRentingHandler = () => {
    props.exitRent();
  };

  useEffect(() => {
    if (fromDate) {
      const d = new Date(fromDate);
      d.setDate(d.getDate() + 1);
      const dd = formatDate(d);
      setMinOfToDate(dd);
    }
    if (getDateTime(toDate) <= getDateTime(fromDate)) {
      setToDate("");
    }
    if (fromDate && toDate) {
      const diffrenceInTime = getDateTime(toDate) - getDateTime(fromDate);
      const diffrenceInDays = diffrenceInTime / (1000 * 3600 * 24);
      setInputValue(`$${props.cost * diffrenceInDays}`);
    } else {
      setInputValue("");
    }
  }, [fromDate, toDate]);

  const changeFromDateHandler = (event) => {
    setFromDate(event.target.value);
  };
  const changeToDateHandler = (event) => {
    setToDate(event.target.value);
  };

  return (
    <>
      <Backdrop clearClicked={exitRentingHandler} />
      <div className={classes.rentCar} onSubmit={submitFormHandler}>
        <form className={classes.form}>
          <div className={classes.heading}>
            <h2>Rent a Car</h2>
          </div>
          <div className={classes.firstDiv}>
            <div className={classes.fromDate}>
              <label>From</label>
              <input
                type="date"
                onChange={changeFromDateHandler}
                min={todayDate}
                value={fromDate}
              />
            </div>
            <div className={classes.totalCost}>
              <label>Total Cost</label>
              <input type="text" disabled value={inputValue} />
            </div>
          </div>
          <div className={classes.lastDiv}>
            <label>To</label>
            <input
              type="date"
              onChange={changeToDateHandler}
              disabled={!fromDate}
              min={minOfToDate}
              value={toDate}
            />
          </div>
          <div className={classes.actions}>
            {!loading && <button className={classes.add}>Rent</button>}
            {!loading && (
              <button
                className={classes.cancel}
                type="button"
                onClick={exitRentingHandler}
              >
                Cancel
              </button>
            )}
            {!loading && <div className={classes.errorMessage}>{error}</div>}
            {loading && <LoadingSpinner />}
          </div>
        </form>
      </div>
    </>
  );
};

export default RentCar;
