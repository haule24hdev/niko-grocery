import React from "react";
import {
  Row,
  Col,
  Table,
  Typography,
  Input,
  DatePicker,
  Select,
  Button
} from "antd";
import moment from "moment";

const { Text } = Typography;
const { Option } = Select;

const dateFormat = "YYYY/MM/DD";

const columns = [
  {
    title: "Product Name",
    dataIndex: "productName",
    key: "productName"
  },
  {
    title: "Unit Price",
    dataIndex: "unitPrice",
    key: "unitPrice"
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount"
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price"
  }
];

const data = [
  {
    key: "1",
    productName: "Product Name 2",
    unitPrice: 50,
    amount: 50,
    price: 2500
  },
  {
    key: "2",
    productName: "Product Name 1",
    unitPrice: 13,
    amount: 13,
    price: 169
  },
  {
    key: "3",
    productName: "Product Name 1",
    unitPrice: 57,
    amount: 57,
    price: 3249
  },
  {
    key: "4",
    productName: "Product Name 1",
    unitPrice: 90,
    amount: 90,
    price: 8100
  },
  {
    key: "5",
    productName: "Product Name 3",
    unitPrice: 100,
    amount: 100,
    price: 10000
  }
];
const OrderDetail = () => (
  <Row gutter={24} style={{ paddingTop: 24 }}>
    <Col xs={24} sm={24} md={18}>
      <Table columns={columns} dataSource={data} style={{background: '#fff', padding: 8}} />
    </Col>
    <Col xs={24} sm={24} md={6} style={{ padding: 8, background: '#fff' }} >
      {/* <div style={{ width: 300, margin: "auto" }}> */}
      <Row style={{ textAlign: "center" }}>Customer Name</Row>
      <Row style={{ marginTop: 16 }}>
        <Col sm={20} push={2}>
          <Text>Total Price: </Text>
          <Input defaultValue="30418" style={{ width: 120, marginLeft: 10 }} />
        </Col>
      </Row>
      <Row style={{ marginTop: 16 }}>
        <Col sm={20} push={2}>
          <Text style={{ fontSize: 16 }}> Date: </Text>
          <DatePicker
            defaultValue={moment("2019/11/18", dateFormat)}
            format={dateFormat}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: 36 }}>
        <Col sm={12} push={6}>
          <Select
            defaultValue="Select Language"
            style={{ width: "100%", minWidth: 100 }}
          >
            <Option value="en">English</Option>
            <Option value="ru">Russian</Option>
          </Select>
        </Col>
      </Row>
      <Row style={{ marginTop: 16 }}>
        <Col sm={12} push={6}>
          <Button
            block
            style={{ width: "100%", minWidth: 100, background: "#C4C4C4" }}
          >
            Print to PDF
          </Button>
        </Col>
      </Row>
      {/* </div> */}
    </Col>
  </Row>
);

export default OrderDetail;
