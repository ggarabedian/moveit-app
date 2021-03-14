import React from "react";
import { Router, Switch } from "react-router-dom";

import Header from "./Header";
import Login from "./Login";
import { history } from "../helpers/history";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/login" exact component={Login}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
