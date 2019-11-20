import React, { useEffect, useState } from "react";
import "./orderHistory.scss";
import { useHistory } from "react-router-dom";
import client from "api/http-client";
import { Table, Layout } from "antd";
import moment from "moment";

const { Content } = Layout;

const OrderHistoryContainer = props => {
  const [orderHistory, setOrderHistory] = useState([]);
  useEffect(() => {
    client.get("/order").then(({ data = [] }) => setOrderHistory(data));
  }, []);
  const history = useHistory();
  const handleGoToDetail = order => {
    history.push("/order/detail", order);
  };
  return (
    <OrderHistory
      {...props}
      data={orderHistory}
      handleGoToDetail={handleGoToDetail}
    />
  );
};

class OrderHistory extends React.Component {
  columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName"
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text, record) => moment(record.date).format("YYYY-MM-DD")
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice"
    },
    {
      title: "",
      dataIndex: "details",
      key: "details",
      render: (text, record) => (
        <a
          onClick={() => {
            this.props.handleGoToDetail(record);
          }}
        >
          Details
        </a>
      )
    }
  ];

  render() {
    return (
      <Content>
        <div className="list-menu-cart">
          <Table
            className="table-cart"
            style={{ width: "100%", background: "#fff", padding: 8 }}
            columns={this.columns}
            dataSource={this.props.data}
            pagination={false}
          />
        </div>
      </Content>
    );
  }
}

export default OrderHistoryContainer;
