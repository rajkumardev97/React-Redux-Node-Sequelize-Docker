import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import setAuthToken from "./services/setAuthToken";
import PrivateRoute from "./components/common/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Users from "./components/manage-users/Users";
import NotFound from "./components/not-found/NotFound";
import { history } from "./helpers/history";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Check for token
const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  const accessToken = user.accessToken;
  // Set auth token header auth
  setAuthToken(accessToken);
}

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Navbar />
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/users/:id" component={Users} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
