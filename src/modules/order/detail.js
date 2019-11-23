import React, { useState } from "react";
import { Row, Table, Typography, Select, Button, Layout } from "antd";
import moment from "moment";
import { languages } from "config";

const { Text } = Typography;
const { Option } = Select;

const dateFormat = "YYYY/MM/DD";

const OrderDetail = ({ location }) => {
  const { state: order } = location;
  const [language, setLanguage] = useState(languages[0].code);

  const columns = [
    {
      title: "Product Name",
      dataIndex: `productName[${languages.findIndex(
        l => l.code === language
      )}]`,
      key: `productName[${languages.findIndex(l => l.code === language)}]`
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

  return (
    <Layout id="order-detail" style={{ marginTop: 12 }}>
      <Layout.Content style={{ background: "#fff", marginRight: 12 }}>
        <Table
          columns={columns}
          dataSource={order.products}
          style={{ background: "#fff", width: "100%" }}
          pagination={false}
        />
      </Layout.Content>
      <Layout.Sider
        style={{ background: "#fff", padding: 8, height: "fit-content" }}
        width={200}
      >
        <Row style={{ textAlign: "center" }}>
          Customer Name: {order.customerName}
        </Row>
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
            className="select"
            defaultValue={languages[0].code}
            style={{ width: "100%" }}
            onChange={setLanguage}
          >
            {languages.map(({ code, label }) => (
              <Option key={code} value={code}>
                {label}
              </Option>
            ))}
          </Select>
        </Row>
        <Row style={{ marginTop: 16 }}>
          <Button
            block
            style={{ width: "100%", minWidth: 100, background: "#C4C4C4" }}
            onClick={async () => {
              window.print();
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
