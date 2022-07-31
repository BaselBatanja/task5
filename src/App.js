import React, { useContext } from "react";
import { Route, Navigate, Routes } from "react-router-dom";

import History from "./pages/History";
import Dashboard from "./pages/dashboard";

import Layout from "./components/layout/Layout";
import NotFound from "./components/UI/NotFound";
import Login from "./pages/Login";
import AuthContext from "./store/authentication-context";
import CarDetails from "./pages/CarDetails";

const App = () => {
  const auth = useContext(AuthContext).isAuth;

  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={auth ? <Navigate to="/cars" /> : <Navigate to="/login" />}
          />
          <Route
            path="/cars"
            element={auth ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/cars/:carID"
            element={auth ? <CarDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="/history"
            element={auth ? <History /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!auth ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="*"
            element={auth ? <NotFound /> : <Navigate to="/login" />}
          />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
