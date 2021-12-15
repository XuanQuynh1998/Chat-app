import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { authenticateAction } from "../redux/actions/users.js";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/loading/Loading.jsx";

export default function PublicRoute({ component: Component, ...rest }) {
  const authenticateState = useSelector((state) => state.login);
  const dispatch = useDispatch();

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
          <Redirect to="/" />
        ) : authenticateState.isAuthenticated === false ? (
          <Component />
        ) : null;
      }}
    />
  );
}
