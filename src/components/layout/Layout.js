import React, { useContext } from "react";

import MainHeader from "./MainHeader";
import NavBar from "./NavBar";

import classes from "./Layout.module.styl";
import AuthContext from "../../store/authentication-context";
const Layout = (props) => {
  const ctx = useContext(AuthContext);
  if (!ctx.isAuth) {
    return <>{props.children}</>;
  }
  return (
    <>
      <MainHeader />
      <div className={classes.innerBody}>
        <NavBar className={classes.navBar} />
        {props.children}
      </div>
    </>
  );
};

export default Layout;
