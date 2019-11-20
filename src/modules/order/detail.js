import React from "react";
import {
  Row,
  Table,
  Typography,
  Input,
  DatePicker,
  Select,
  Button,
  Layout
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
const OrderDetail = (props) => {
  console.log(props)
  return (
    <Layout id="order-detail" style={{ marginTop: 12 }}>
      <Layout.Content
        style={{ background: "#fff", padding: 8, marginRight: 12 }}
      >
        <Table
          columns={columns}
          dataSource={data}
          style={{ background: "#fff" }}
          pagination={false}
        />
      </Layout.Content>
      <Layout.Sider style={{ background: "#fff",padding: 8, height:'fit-content' }} width={230}>
        <Row style={{ textAlign: "center" }}>Customer Name</Row>
        <Row style={{ marginTop: 16 }}>
          <Text>Total Price: </Text>
          <Input defaultValue="30418" style={{ width: 120, marginLeft: 10 }} />
        </Row>
        <Row style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 16 }}> Date: </Text>
          <DatePicker
            defaultValue={moment("2019/11/18", dateFormat)}
            format={dateFormat}
          />
        </Row>
        <Row style={{ marginTop: 36 }}>
          <Select
            defaultValue="Select Language"
            style={{ width: "100%", minWidth: 100 }}
          >
            <Option value="en">English</Option>
            <Option value="ru">Russian</Option>
          </Select>
        </Row>
        <Row style={{ marginTop: 16 }}>
          <Button
            block
            style={{ width: "100%", minWidth: 100, background: "#C4C4C4" }}
            onClick={() => {
              const orderDetail = document.querySelector("#order-detail");
              const divContents = orderDetail.innerHTML;
              const printWindow = window.open("", "");
              printWindow.document.write(`<html>${document.head.innerHTML}`);
              printWindow.document.write("</head><body >");
              printWindow.document.write(divContents);

              printWindow.document.write("</body></html>");
              printWindow.document.close();
              printWindow.print();
            }}
          >
            Print to PDF
          </Button>
        </Row>
      </Layout.Sider>
    </Layout>
  );
};

export default OrderDetail;
