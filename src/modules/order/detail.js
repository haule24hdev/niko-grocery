import React from "react";
import {
  Row,
  Table,
  Typography,
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
    dataIndex: "productName[0]",
    key: "productName[0]"
  },
  {
    title: "Unit Price",
    dataIndex: "unitPrice",
    key: "unitPrice"
  },
  {
    title: "Amount",
    dataIndex: "count",
    key: "coun"
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (text, record) => record.unitPrice * record.count
  }
];


const OrderDetail = ({ location }) => {
  const { state: order } = location;
  return (
    <Layout id="order-detail" style={{ marginTop: 12 }}>
      <Layout.Content
        style={{ background: "#fff", padding: 8, marginRight: 12 }}
      >
        <Table
          columns={columns}
          dataSource={order.products}
          style={{ background: "#fff" }}
          pagination={false}
        />
      </Layout.Content>
      <Layout.Sider
        style={{ background: "#fff", padding: 8, height: "fit-content" }}
        width={230}
      >
        <Row style={{ textAlign: "center" }}>Customer Name: {order.customerName}</Row>
        <Row style={{ marginTop: 16 }}>
          <Text>Total Price: {order.totalPrice} </Text>
        </Row>
        <Row style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 16 }}>
            {" "}
            Date: {moment(order.date).format(dateFormat)}{" "}
          </Text>
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
