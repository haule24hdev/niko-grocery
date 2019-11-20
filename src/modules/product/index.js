import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  InputNumber,
  Input,
  Select,
  Table,
  Typography,
  Button,
  Layout,
  Icon
} from "antd";
import "antd/dist/antd.css";
import client from "api/http-client";
import "./product.scss";

const { Search } = Input;

const { Option } = Select;

const { Text } = Typography;

const { Content } = Layout;

const ProductContainer = props => {
  const [products, setProducts] = useState([]);
  const history = useHistory();
  useEffect(() => {
    client.get("/product").then(({ data = [] }) =>
      setProducts(
        data.map(([name, unitPrice], index) => ({
          name,
          unitPrice,
          no: index
        }))
      )
    );
  }, []);

  const handleShowCart = cart => {
    history.push('/cart', cart);
  };
  return (
    <Products {...props} data={products} handleShowCart={handleShowCart} />
  );
};

class Products extends React.Component {
  state = {};

  handleSelectRow = (no, record) => {
    const oldRowState = this.state[no] || {};
    this.setState({
      [no]: {
        ...oldRowState,
        selected: true,
        value: oldRowState.value || 1,
        price: oldRowState.price || record.unitPrice
      }
    });
  };

  handleDeSelectRow = no => {
    const oldRowState = this.state[no] || {};
    this.setState({
      [no]: {
        ...oldRowState,
        selected: false
      }
    });
  };
  handleChangeAmount = (no, value, record) => {
    const oldRowState = this.state[no] || {};
    this.setState({
      [no]: {
        ...oldRowState,
        value,
        price: record.unitPrice * value
      }
    });
  };

  columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice"
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text, record) => {
        const rowState = this.state[record.no];
        const isSelected = rowState && rowState.selected;
        if (!isSelected) return null;
        return (
          <>
            <InputNumber
              onClick={e => {
                e.stopPropagation();
              }}
              onChange={value => {
                this.handleChangeAmount(record.no, value, record);
              }}
              min={1}
              value={(rowState && rowState.value) || 0}
              style={{
                width: 100
              }}
            />
            <Icon
              style={{
                marginLeft: 8,
                color: "gray"
              }}
              type="delete"
              onClick={e => {
                e.stopPropagation();
                this.handleDeSelectRow(record.no);
              }}
            />
          </>
        );
      }
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => {
        const rowState = this.state[record.no];
        return rowState && rowState.selected && rowState.price;
      }
    }
  ];

  getTotal = () => {
    return Object.keys(this.state).reduce((acc, key) => {
      const rowState = this.state[key];
      if (rowState && rowState.selected) {
        return acc + rowState.price || 0;
      }
      return acc;
    }, 0);
  };

  toOrderDetail = () => {
    const products = Object.keys(this.state).map(key => {
      const productState = this.state[key];

      return {
        ...this.props.data.find(record => record.no == key),
        ...productState
      };
    });
    return {
      products,
      total: this.getTotal()
    };
  };

  isEmptyCart = () => {
    const selected = Object.keys(this.state)
      .map(key => this.state[key])
      .filter(row => row.selected);
    return selected.length === 0;
  };
  render() {
    return (
      <Content>
        <div>
          <Search
            className="search"
            enterButton="Search"
            size="large"
            style={{ width: 500 }}
            onSearch={value => console.log(value)}
          />
          <Select
            className="select"
            defaultValue="Select Language"
            style={{ width: 200 }}
            // onChange={handleChange}
          >
            <Option value="en">English</Option>
            <Option value="ru">Russian</Option>
          </Select>
        </div>
        <div className="list-menu">
          <Table
            rowKey={record => record.no}
            className="table"
            style={{ width: "75%", background: "#fff", padding: 8 }}
            columns={this.columns}
            dataSource={this.props.data}
            rowClassName={record => {
              const rowState = this.state[record.no];
              return rowState && rowState.selected ? "selected" : "";
            }}
            onRow={record => {
              return {
                onClick: () => {
                  this.handleSelectRow(record.no, record);
                }
              };
            }}
          />
          <div className="view-cart" style={{ width: "20%" }}>
            <div style={{ marginTop: 15 }}>
              <Text style={{ fontSize: 16 }}>Total Price: </Text>
              <Input
                value={this.getTotal()}
                style={{ width: 120, marginLeft: 10 }}
              />
            </div>
            <Button
              onClick={() => {
                if (!this.isEmptyCart()) {
                  const cart = this.toOrderDetail();
                  this.props.handleShowCart(cart);
                }
              }}
              className="button"
            >
              View Cart
            </Button>
          </div>
        </div>
      </Content>
    );
  }
}

export default ProductContainer;
