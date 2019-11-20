import React from "react";
import { Provider } from "react-redux";
import AppRouter from "AppRouter";
import store from "redux/store";
import { Layout, Menu } from "antd";
import {Router, Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import AppHistory from "AppHistory";

const { Content, Sider } = Layout;

function App() {
  return (
    <Provider store={store}>
      <Router history={AppHistory}>
        <Layout
          style={{ background: "#E5E5E5", margin: "auto", minHeight: "100vh" }}
          className="layout"
        >
          <Sider
            width={250}
            style={{ background: "#E1E1E1", padding: 24 }}
            theme="light"
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item key="1">
                <Link to="/">Product page</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/cart">Cart</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/order-history">Order history</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/product">Edit Product</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            <AppRouter />
          </Content>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
