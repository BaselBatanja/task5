import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isAuth: false,
  isAdmin: null,
  username: null,
  setAdmin: (value) => {},
  login: (token) => {},
  logout: () => {},
  setUsername: (email) => {},
});

export const AuthContextProvider = (props) => {
  const localStorageToken = localStorage.getItem("token");
  const localStoargeAdmin = localStorage.getItem("admin");
  const localStoargeUsername = localStorage.getItem("username");

  console.log(localStoargeAdmin);
  const [token, setToken] = useState(localStorageToken);
  const [admin, setAdmin] = useState(
    localStoargeAdmin === "false" ? false : true
  );
  const [username, setUsername] = useState(localStoargeUsername);

  const loginHandler = (token) => {
    setToken(token);

    localStorage.setItem("token", token);
  };

  const logoutHandler = (token) => {
    setToken(null);
    setAdmin(null);
    setUsername(null);
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("username");
  };

  const setAdminHandler = (value) => {
    setAdmin(value);
    localStorage.setItem("admin", value);
  };

  const setUsernameHandler = (email) => {
    setUsername(email);
    localStorage.setItem("username", email);
  };
  const authObject = {
    token: token,
    isAuth: !!token,
    isAdmin: !!admin,
    username: username,
    setAdmin: setAdminHandler,
    login: loginHandler,
    logout: logoutHandler,
    setUsername: setUsernameHandler,
  };
  return (
    <AuthContext.Provider value={authObject}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
