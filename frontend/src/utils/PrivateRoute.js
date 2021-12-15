import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { authenticateAction } from "../redux/actions/users.js";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/loading/Loading.jsx";

export default function PrivateRoute({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const authenticateState = useSelector((state) => state.authenticate);

  useEffect(() => {
    dispatch(authenticateAction());
  }, [dispatch]);

  if (authenticateState.loading) {
    return <Loading />;
  }

  return (
    <Route
      {...rest}
      render={() => {
        return authenticateState.isAuthenticated === true ? (
          <Component />
        ) : authenticateState.isAuthenticated === false ? (
          <Redirect to="/login" />
        ) : null;
      }}
    />
  );
}
