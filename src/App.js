import React, { useState } from "react";
import AppRouter from "AppRouter";
import { Layout, Menu } from "antd";
import { Router, NavLink } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.scss";
import AppHistory from "AppHistory";

const { Content, Sider } = Layout;

function App() {
  const [active, setActive] = useState("1");
  return (
    <Router history={AppHistory}>
      <Layout
        style={{ background: "#E5E5E5", margin: "auto", minHeight: "100vh" }}
        className="app-layout"
      >
        <Sider
          width={200}
          style={{
            background: "#E1E1E1",
            padding: 12
          }}
          theme="light"
          breakpoint="sm"
          className="dashboard"
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
            selectedKeys={[active]}
          >
            <Menu.Item key="1">
              <NavLink
                exact
                to="/"
                isActive={(match, location) => {
                  const isActive = location.pathname === "/";
                  if (isActive) {
                    setActive("1");
                  }
                  return isActive;
                }}
              >
                Product page
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink
                exact
                to="/cart"
                isActive={(match, location) => {
                  const isActive = location.pathname.includes("/cart");
                  if (isActive) {
                    setActive("2");
                  }
                  return isActive;
                }}
              >
                Cart
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink
                exact
                to="/order-history"
                isActive={(match, location) => {
                  const isActive = location.pathname.includes("/order");
                  if (isActive) {
                    setActive("3");
                  }
                  return isActive;
                }}
              >
                Order history
              </NavLink>
            </Menu.Item>
            <Menu.Item key="4">
              <NavLink
                exact
                to="/product"
                isActive={(match, location) => {
                  const isActive = location.pathname.includes("/product");
                  if (isActive) {
                    setActive("4");
                  }
                  return isActive;
                }}
              >
                Edit Product
              </NavLink>
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
  );
}

export default App;
