import React, { useContext, useEffect, useState } from "react";
import classes from "./MainHeader.module.styl";

import AuthContext from "../../store/authentication-context";
import logoImage from "../../../asserts/carcar-removebg-preview.webp";
import AddCar from "../car-actions-component/AddCar";
import Backdrop from "../UI/Overlay";

import { useLocation, useNavigate } from "react-router-dom";
const MainHeader = () => {
  const [logoutHover, setLogoutHover] = useState(false);
  const [addUserHover, setAddUserHover] = useState(false);
  const [click, setClick] = useState(false);

  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const ctx = useContext(AuthContext);
  const serachParam = new URLSearchParams(location.search).get("addNewCar");
  const ad = ctx.isAdmin;

  const enterHandler = () => {
    setLogoutHover(true);
  };
  const leaveHandler = () => {
    setLogoutHover(false);
  };
  const logoutHandler = () => {
    ctx.logout();
  };

  const enterAddingHandler = () => {
    setAddUserHover(true);
  };
  const leaveAddingHandler = () => {
    setAddUserHover(false);
  };
  const addingHadnler = () => {
    console.log(location);
    navigate(location.pathname + "?addNewCar=true");
  };
  const clearClicked = () => {
    if (!loading) {
      console.log(location);
      navigate(location.pathname);
    }
  };

  useEffect(() => {
    if (serachParam !== null && !ad) {
      navigate(location.pathname, { replace: true });
    } else if (serachParam === "true") {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [serachParam, ad]);

  const loadingHandler = (v) => {
    setLoading(v);
  };

  return (
    <>
      {click && <Backdrop clearClicked={clearClicked} />}
      {click && <AddCar clearClicked={clearClicked} loading={loadingHandler} />}
      <header className={classes.header}>
        <div className={classes.container}>
          <div className={classes.logo}>
            <img src={logoImage} />
            <div>Car Rental</div>
          </div>
          <div className={classes.actions}>
            {ctx.isAdmin && (
              <div
                className={`${classes.logoutButton} ${
                  !addUserHover ? classes.leave : ""
                }`}
                onMouseEnter={enterAddingHandler}
                onMouseLeave={leaveAddingHandler}
                onClick={addingHadnler}
                id="addUser"
              >
                {addUserHover ? "Add New User" : "+"}
              </div>
            )}
            <div
              className={`${classes.logoutButton} ${
                !logoutHover ? classes.leave : ""
              }`}
              onMouseEnter={enterHandler}
              onMouseLeave={leaveHandler}
              onClick={logoutHandler}
              id="logout"
            >
              {logoutHover ? "Logout" : "x"}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default MainHeader;
