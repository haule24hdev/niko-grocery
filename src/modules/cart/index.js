import React from "react";
import "./cart.scss";
import { Input, Select, Table, Typography, Button, Layout } from "antd";
import moment from "moment";
import client from "api/http-client";
import { languages } from "config";

const { Option } = Select;

const { Text } = Typography;

const { Content } = Layout;

const dateFormat = "YYYY/MM/DD";

class Carts extends React.Component {
  state = {
    name: "",
    language: languages[0].code
  };
  getColumns = () => [
    {
      title: "Product Name",
      dataIndex: `name[${this.state.language}]`,
      key: `name[${this.state.language}]`
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice"
    },
    {
      title: "Amount",
      dataIndex: "value",
      key: "value"
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price"
    }
  ];
  render() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) return <h2>Empty Cart</h2>;

    return (
      <Content>
        <div className="clearfix">
          <Select
            className="select"
            defaultValue={languages[0].code}
            style={{ width: 200 }}
            onChange={value => this.setState({ language: value })}
          >
            {languages.map(({ code, label }) => (
              <Option key={code} value={code}>
                {label}
              </Option>
            ))}
          </Select>
        </div>
        <div className="list-menu-cart">
          <Table
            rowKey={record => record.no}
            className="table-cart"
            style={{ width: "75%", background: "#fff", padding: 8 }}
            columns={this.getColumns()}
            dataSource={cart.products}
            pagination={false}
          />
          <div className="view-cart-cart" style={{ width: "20%" }}>
            <div style={{ marginTop: 20 }}>
              <div>
                <Text style={{ fontSize: 16 }}>Total Price: {cart.total}</Text>
              </div>
              <div style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 16 }}>
                  {" "}
                  Date: {moment().format(dateFormat)}{" "}
                </Text>
              </div>
              <div style={{ marginTop: 50 }}>
                <Text style={{ fontSize: 16 }}>Customer Name </Text>
                <Input
                  placeholder="Input customer name"
                  style={{ marginTop: 15 }}
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </div>
            </div>
            <Button
              onClick={() => {
                if (this.state.name === "") {
                  alert("customer name is required");
                  return;
                }

                const payload = {
                  totalPrice: cart.total,
                  customerName: this.state.name,
                  products: cart.products.map(product => ({
                    productName: Object.values(product.name),
                    no: product.no,
                    count: product.value,
                    unitPrice: product.unitPrice
                  })),
                  date: moment.utc()
                };

                client.post("/order", payload).then(() => {
                  this.props.history.push("/order-history");
                  localStorage.removeItem("cart");
                });
              }}
              className="button-cart"
            >
              Confirm
            </Button>
          </div>
        </div>
      </Content>
    );
  }
}

export default Carts;
