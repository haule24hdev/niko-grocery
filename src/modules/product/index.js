import React, { useEffect, useState } from "react";
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
  return <Products {...props} data={products} />;
};

class Products extends React.Component {
  state = {};

  handleSelectRow = no => {
    const oldRowState = this.state[no] || {};
    this.setState({
      [no]: {
        ...oldRowState,
        selected: true
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
  handleChangeAmount = (no, value) => {
    const oldRowState = this.state[no] || {};
    this.setState({
      [no]: {
        ...oldRowState,
        value
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
                this.handleChangeAmount(record.no, value);
              }}
              min={0}
              value={(rowState && rowState.value) || 0}
              style={{
                width: 100
              }}
            />
            <Icon
              style={{
                marginLeft: 8,
                color: 'gray'
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
      key: "price"
    }
  ];

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
                  this.handleSelectRow(record.no);
                }
              };
            }}
          />
          <div className="view-cart" style={{ width: "20%" }}>
            <div style={{ marginTop: 15 }}>
              <Text style={{ fontSize: 16 }}>Total Price: </Text>
              <Input style={{ width: 120, marginLeft: 10 }} />
            </div>
            <Button className="button">View Cart</Button>
          </div>
        </div>
      </Content>
    );
  }
}

export default ProductContainer;
