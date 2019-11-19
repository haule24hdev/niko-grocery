import React from "react";
import { Provider } from "react-redux";
import AppRouter from "AppRouter";
import store from "redux/store";
import { Layout, Menu } from "antd";

import "antd/dist/antd.css";
import "./App.css";

const { Content, Sider } = Layout;

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Sider width={200} style={{ background: "#fff", padding: 24 }} theme="light">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="1">Product page</Menu.Item>
            <Menu.Item key="2">Cart</Menu.Item>
            <Menu.Item key="3">Order History</Menu.Item>
            <Menu.Item key="4">Edit Food Detail</Menu.Item>
          </Menu>
        </Sider>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <AppRouter />
        </Content>
      </Layout>
    </Provider>
  );
}

export default App;
