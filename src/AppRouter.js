import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Products from "modules/product";
import AppHistory from "AppHistory";

const AppRouter = () => (
  <Router history={AppHistory}>
    <Switch>
      <Route exact path="/">{Products}</Route>
      <Route exact path="/another">{() => <h1>another</h1>}</Route>
    </Switch>
  </Router>
);

export default AppRouter;
