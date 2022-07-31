import React, { useContext, useRef, useState } from "react";
import classes from "./Login.module.styl";
import AuthContext from "../store/authentication-context";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const Login = () => {
  const authCTX = useContext(AuthContext);

  const nameRef = useRef();
  const passRef = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const submitFormHandler = (e) => {
    e.preventDefault();

    const email = nameRef.current.value;
    const pass = passRef.current.value;
    setLoading(true);
    setError(false);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAqxFhWyDCC7ItUCU23XlVprSUa7waaQjE",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: pass,
          returnSecureToken: true,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Authentication faild");
        }
      })
      .then((data) => {
        const token = data.idToken;
        let uid = data.localId;
        fetch("https://task5-44bd5-default-rtdb.firebaseio.com/admins.json")
          .then((r) => {
            if (!r.ok) {
              throw new Error("error");
            } else {
              return r.json();
            }
          })
          .then((data) => {
            let isAdmin = false;
            for (const admin in data) {
              if (data[admin] === uid) {
                authCTX.setAdmin(true);
                isAdmin = true;
              }
            }
            if (!isAdmin) {
              authCTX.setAdmin(false);
            }
            authCTX.login(token);
            authCTX.setUsername(email);
            setLoading(false);
          });
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
      });
  };
  return (
    <>
      <div className={classes.containerOfBackdrop}>
        <div className={classes.backdrop}>
          <div className={classes.groupOfPhotos}></div>
        </div>
      </div>
      <div className={classes.overlay}>
        <form onSubmit={submitFormHandler}>
          <div className={classes.login}>
            <div className={classes.header}>Car Rental Login</div>
            <div className={classes.inputs}>
              <div className={classes.username}>
                <label htmlFor="name">Username</label>
                <input type="email" id="name" ref={nameRef} />
              </div>
              <div className={classes.password}>
                <label htmlFor="pass">Password</label>
                <input type="password" id="pass" min="6" ref={passRef} />
              </div>
              {error && (
                <span style={{ color: "red" }}>
                  Error, Authentication Faild!
                </span>
              )}
            </div>
            <div className={classes.footer}>
              {!loading && <button>Sign In</button>}
              {loading && <LoadingSpinner />}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
