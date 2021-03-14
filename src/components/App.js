import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./Header";
import Login from "./Login";
import Upload from "./Upload";
import { history } from "../helpers/history";

import "semantic-ui-css/semantic.min.css";

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <div className="ui container">
      <Router history={history}>
        {isLoggedIn ? (
          <div>
            <Header />
            <Switch>
              <Route path="/" exact component={Upload} />
            </Switch>
          </div>
        ) : (
          <Login></Login>
        )}
      </Router>
    </div>
  );
};

export default App;
