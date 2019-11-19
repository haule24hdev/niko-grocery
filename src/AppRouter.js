import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Products from "modules/product";
import AppHistory from "AppHistory";

const AppRouter = () => (
  <Router history={AppHistory}>
    <Switch>
      <Route path="/">{Products}</Route>
    </Switch>
  </Router>
);

export default AppRouter;
