import React, { useEffect, useState } from "react";
import {
  InputNumber,
  Input,
  Select,
  Table,
  Typography,
  Button,
  Layout
} from "antd";
import "antd/dist/antd.css";
import client from "api/http-client";
import "./product.scss";

const { Search } = Input;

const { Option } = Select;

const { Text } = Typography;

const { Content } = Layout;

const ProductContainer = props => {
  const [data, setData] = useState([]);
  useEffect(() => {
    client.get("/getAllProducts").then(({ data }) => setData(data));
  }, []);
  return <Products {...props} data={data} />;
};

class Products extends React.Component {
  state = {};
  handleSelectRow = index => {
    const oldRowState = this.state[index] || {};
    this.setState({
      [index]: {
        ...oldRowState,
        selected: !oldRowState.selected
      }
    });
  };

  handleChangeAmount = (index, value) => {
    const oldRowState = this.state[index] || {};
    this.setState({
      [index]: {
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
      render: (text, record, index) => {
        const rowState = this.state[index];
        const isSelected = rowState && rowState.selected;
        return (
          <InputNumber
            onClick={e => {
              e.stopPropagation();
            }}
            onChange={value => {
              this.handleChangeAmount(index, value);
            }}
            min={0}
            value={(rowState && rowState.value) || 0}
            style={{
              width: 100,
              visibility: isSelected ? "visible" : "hidden"
            }}
          />
        );
      }
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
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
            className="table"
            style={{ width: "75%", background: "#fff", padding: 8 }}
            columns={this.columns}
            dataSource={this.props.data}
            rowClassName={(record, index) => {
              const rowState = this.state[index];
              return rowState && rowState.selected ? "selected" : "";
            }}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  this.handleSelectRow(rowIndex);
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
