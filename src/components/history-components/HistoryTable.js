import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/authentication-context";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./HistoryTable.module.styl";

function* generator() {
  let i = 1;
  while (true) {
    yield i++;
  }
}
const HistoryTable = () => {
  const [arrayOfRentedCars, setArrayOfRentedCars] = useState([]);
  const [objectHistory, setObjectHistory] = useState({});

  const [loading, setLoading] = useState(false);
  const gen = generator();
  const ctx = useContext(AuthContext);
  useEffect(() => {
    setLoading(true);
    fetch("https://task5-44bd5-default-rtdb.firebaseio.com/rentedCars.json")
      .then((r) => r.json())
      .then((data) => {
        const arr = [];
        for (const line in data) {
          const value = data[line];
          for (const entry in value) {
            const v = value[entry];
            if (v.username === ctx.username || ctx.isAdmin) {
              arr.push({
                car: v.name,
                from: v.from,
                to: v.to,
                total: v.totalCost,
                username: v.username,
              });
            }
          }
        }
        const obj = {};
        if (arr.length !== 0) {
          for (const v of arr) {
            if (v.username in obj) {
              obj[v.username].push(v);
            } else {
              obj[v.username] = [v];
            }
          }
        }
        setObjectHistory({ ...obj });
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    for (const v in objectHistory) {
      setArrayOfRentedCars((prev) => {
        return [...prev, objectHistory[v]];
      });
    }
  }, [objectHistory]);
  return (
    <div className={classes.table}>
      <table>
        {!loading && (
          <thead>
            <tr>
              {ctx.isAdmin && <th id="usernameField">Username</th>}
              <th>ID</th>
              <th>Car</th>
              <th>From</th>
              <th>To</th>
              <th>Total $</th>
            </tr>
          </thead>
        )}
        <tbody>
          {arrayOfRentedCars.map((e, ii) => {
            return e.map((v, i) => {
              return (
                <tr key={i}>
                  {i === 0 && ctx.isAdmin && (
                    <td
                      className={classes.exitAlignment}
                      rowSpan={5}
                      valign="top"
                    >
                      {v.username}
                    </td>
                  )}
                  <td>{gen.next().value}</td>
                  <td>{v.car}</td>
                  <td>{v.from}</td>
                  <td>{v.to}</td>
                  <td>{v.total}</td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
      {loading && (
        <div className={classes.centered}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default HistoryTable;
