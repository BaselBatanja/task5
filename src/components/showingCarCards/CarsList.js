import React, { useContext, useEffect, useState } from "react";
import UiContext from "../../store/ui-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import CarItem from "./CarItem";

import classes from "./CarsList.module.styl";
const CarsList = () => {
  const [arrOfEvents, setArrayOfEvents] = useState([]);
  const [emptyContent, setEmptyContent] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const ctx = useContext(UiContext);
  const update = ctx.updateFromDataBase;

  function fetchData() {
    setIsLoading(true);
    fetch("https://task5-44bd5-default-rtdb.firebaseio.com/cars.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data === null) {
          setArrayOfEvents([]);
        }
        const tempArr = [];
        for (const event in data) {
          tempArr.push({
            id: event,
            costPerDay: data[event].costPerDay,
            nameOfCar: data[event].nameOfCar,
            details: data[event].details,
            url: data[event].url,
          });
        }
        setArrayOfEvents([...tempArr]);
        setIsLoading(false);
        if (tempArr.length === 0) {
          setEmptyContent(true);
          return;
        }
        setEmptyContent(false);
        ctx.toggleUpdate(false);
      });
  }
  useEffect(() => {
    if (update) {
      fetchData();
    }
  }, [update]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={classes.list}>
      {arrOfEvents.map((car) => {
        return (
          <CarItem
            key={car.id}
            name={car.nameOfCar}
            details={car.details}
            costPerDay={car.costPerDay}
            id={car.id}
            url={car.url}
          />
        );
      })}
      {emptyContent && <div className={classes.notFound}>NO DATA FOUND</div>}
      {!emptyContent && loading && (
        <LoadingSpinner className={classes.notFound} />
      )}
    </div>
  );
};

export default CarsList;
