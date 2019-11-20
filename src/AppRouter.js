import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Products from "modules/product";
import Carts from "modules/cart";
import AppHistory from "AppHistory";
import OrderHistory from "modules/orderHistory";
import OrderDetail from "modules/orderHistory/detail";
import EditableFormTable from 'modules/editFoodDetails';

const AppRouter = () => (
  <Router history={AppHistory}>
    <Switch>
      <Route exact path="/" component={Products} />
      <Route exact path="/cart" component={Carts} />
      <Route exact path="/order-history" component={OrderHistory} />
      <Route exact path="/order/:id" component={OrderDetail} />
      <Route exact path="/edit-food-details" component={EditableFormTable}/>
    </Switch>
  </Router>
);

export default AppRouter;
