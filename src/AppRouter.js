import React from "react";
import { Switch, Route } from "react-router-dom";
import Products from "modules/product";
import Carts from "modules/cart";
import OrderHistory from "modules/order";
import OrderDetail from "modules/order/detail";
import EditableFormTable from "modules/editFoodDetails";

const AppRouter = () => (
  <Switch>
    <Route exact path="/" component={Products} />
    <Route exact path="/cart" component={Carts} />
    <Route exact path="/order-history" component={OrderHistory} />
    <Route exact path="/order/detail" component={OrderDetail} />
    <Route exact path="/product" component={EditableFormTable} />
  </Switch>
);

export default AppRouter;
