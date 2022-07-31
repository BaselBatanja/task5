import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import adminImage from "../../../asserts/admin.webp";
import userImage from "../../../asserts/user.webp";
import AuthContext from "../../store/authentication-context";

import classes from "./NavBar.module.styl";
const NavBar = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <nav className={`${classes.nav} ${props.className}`}>
      <div className={classes.userLogo}>
        {authCtx.isAuth && authCtx.isAdmin && <img src={adminImage} />}
        {authCtx.isAuth && !authCtx.isAdmin && <img src={userImage} />}
      </div>
      <div className={classes.typeOfUser}>
        {authCtx.isAuth && authCtx.isAdmin && "Admin Page"}
        {authCtx.isAuth && !authCtx.isAdmin && "Customer Page"}
      </div>
      <div className={classes.firstDiv}>
        <NavLink
          className={(navData) => {
            return navData.isActive
              ? `${classes.active} ${classes.button}`
              : `${classes.button}`;
          }}
          to="/cars"
          id="carsButton"
        >
          Cars
        </NavLink>
      </div>
      <div className={classes.secondDiv}>
        <NavLink
          className={(navData) => {
            return navData.isActive
              ? `${classes.active} ${classes.button}`
              : `${classes.button}`;
          }}
          to="/history"
          id="historyButton"
        >
          History
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
