import React, { Component } from "react";
import Login from "../src/components/login";
import Posts from "./components/posts";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
require("../src/styles/app.module.scss");

//Private route component, redirects user to login page if login token is not present
function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        auth() === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

//Public Route, if no user in local storage redirect login to Posts page
function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        auth() === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/posts", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

//checks if username is stored in local storage, returns true if username exists
function auth() {
  let authToken = JSON.parse(localStorage.getItem("username"));
  return authToken ? true : false;
}

class App extends Component {
  render() {
    return (
      <main>
        <Router>
          <Switch>
            <PublicRoute
              authed={this.props.authed}
              path={"/login"}
              component={Login}
            />
            <PrivateRoute
              authed={this.props.authed}
              path={"/"}
              component={Posts}
            />
          </Switch>
        </Router>
      </main>
    );
  }
}
export default App;
