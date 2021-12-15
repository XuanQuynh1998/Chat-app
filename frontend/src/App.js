import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import PrivateRoute from "./utils/PrivateRoute.js";
import PublicRoute from "./utils/PublicRoute.js";
import SocketProvider from "./services/Socket.js";
import "./App.css";

export default function App() {
  return (
    <SocketProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PublicRoute exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
    </SocketProvider>
  );
}
