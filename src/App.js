import React from "react";
import { Provider } from "react-redux";
import AppRouter from "AppRouter";
import store from "redux/store";

import "antd/dist/antd.css";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
