import React, { useEffect, useState } from "react";
import { InputNumber, Input, Table, Button, Layout } from "antd";
import "antd/dist/antd.css";
import client from "api/http-client";

const { Search } = Input;

const { Content } = Layout;

const ProductContainer = props => {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    client.get("/product").then(({ data = [] }) =>
      setProducts(
        data.map(([name, unitPrice], index) => ({
          name,
          unitPrice,
          no: index
        }))
      )
    );
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdateProduct = product => {
    if (products.find(p => p.no == product.no)) {
      client.post(`/product`, product).then(() => fetchProducts());
      return;
    }
    client.put(`/product/${product.no}`, product).then(() => fetchProducts());
  };

  const handleDeleteProduct = product => {
    client.delete(`/product/${product.no}`).then(() => fetchProducts());
  };

  const handleNewProduct = initalNewProduct => {
    setProducts(oldProducts => {
      return [...oldProducts, initalNewProduct];
    });
  };

  return (
    <Products
      {...props}
      data={products}
      handleUpdateProduct={handleUpdateProduct}
      handleDeleteProduct={handleDeleteProduct}
      handleNewProduct={handleNewProduct}
    />
  );
};

class Products extends React.Component {
  state = {};

  handleSelectRow = record => {
    const oldRowState = this.state[record.no] || {};
    this.setState({
      [record.no]: {
        ...oldRowState,
        editing: true,
        name: record.name,
        unitPrice: record.unitPrice | 0
      }
    });
  };

  handleDeSelectRow = no => {
    const oldRowState = this.state[no] || {};
    this.setState({
      [no]: {
        ...oldRowState,
        editing: false
      }
    });
  };
  handleChange = (no, key, value) => {
    const oldRowState = this.state[no] || {};
    this.setState({
      [no]: {
        ...oldRowState,
        [key]: value
      }
    });
  };

  columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        const rowState = this.state[record.no];
        const editing = rowState && rowState.editing;
        if (!editing) return text;
        return (
          <>
            <Input
              onChange={e => {
                this.handleChange(record.no, "name", e.target.value);
              }}
              value={rowState.name}
              style={{
                width: 100
              }}
            />
          </>
        );
      }
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (text, record) => {
        const rowState = this.state[record.no];
        const editing = rowState && rowState.editing;
        if (!editing) {
          if (rowState && !rowState.unitPrice) {
            return null;
          }
          return text;
        }
        return (
          <>
            <InputNumber
              onChange={value => {
                this.handleChange(record.no, "unitPrice", value);
              }}
              value={rowState.unitPrice}
              min={0}
              style={{
                width: 100
              }}
            />
          </>
        );
      }
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      render: (text, record) => {
        const rowState = this.state[record.no];
        if (rowState && rowState.editing) {
          return (
            <Button
              icon="check"
              onClick={() => {
                this.props.handleUpdateProduct({
                  no: record.no,
                  productName: rowState.name,
                  unitPrice: rowState.unitPrice
                });
                this.handleDeSelectRow(record.no);
              }}
            />
          );
        }
        return (
          <Button icon="edit" onClick={() => this.handleSelectRow(record)} />
        );
      }
    },
    {
      title: "Remove",
      dataIndex: "remove",
      key: "remove",
      render: (text, record) => {
        return (
          <Button
            icon="delete"
            onClick={() => this.props.handleDeleteProduct(record)}
          />
        );
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
          />
          <div className="view-cart" style={{ width: "20%" }}>
            <Button
              onClick={() => {
                const initalNewProduct = {
                  no: this.props.data.length,
                  name: "",
                  unitPrice: 1,
                  isNew: true
                };
                this.props.handleNewProduct(initalNewProduct);
                this.handleSelectRow(initalNewProduct);
              }}
              className="button"
            >
              New Product
            </Button>
          </div>
        </div>
      </Content>
    );
  }
}

export default ProductContainer;
