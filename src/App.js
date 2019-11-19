import React from "react";
import { Provider } from "react-redux";
import AppRouter from "AppRouter";
import store from "redux/store";
import { Layout, Menu, Icon } from "antd";

import "antd/dist/antd.css";
import "./App.css";

const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0
          }}
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span className="nav-text">nav 1</span>
            </Menu.Item>{" "}
          </Menu>
        </Sider>
        <Content>
          <AppRouter />
        </Content>
      </Layout>
    </Provider>
  );
}

export default App;
