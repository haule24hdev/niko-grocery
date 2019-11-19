import React from "react";
import { 
  Input, 
  Select,
  Table,
  Typography,
  Button,
  Layout
  } from 'antd';
import 'antd/dist/antd.css';
import './product.scss';

const { Search } = Input;

const { Option } = Select;

const { Text } = Typography;

const { Content } = Layout;

const columns = [{
    title: 'Product Name',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'Unit Price',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  }

]

const data = [{
    key: '1',
    productName: 'Product Name 2',
    unitPrice: 50,
    amount: '100',
    price: 5000
  },
  {
    key: '2',
    productName: 'Product Name 1',
    unitPrice: 13,
    amount: '',
    price: '',
  },
  {
    key: '3',
    productName: 'Product Name 1',
    unitPrice: 57,
    amount: '',
    price: '',
  },
  {
    key: '4',
    productName: 'Product Name 1',
    unitPrice: 90,
    amount: '',
    price: '',
  },
  {
    key: '5',
    productName: 'Product Name 3',
    unitPrice: 100,
    amount: '80',
    price: 8000,
  },

];

function handleChange(value) {
  console.log(`selected ${value}`);
}
class Products extends React.Component {
  render(){
    return (
      <Content>
        <div>
          <Search 
            className="search"
            enterButton="Search"
            size="large"
            style = {{ width: 500}}
            onSearch={value => console.log(value)}
          />
          < Select 
            className="select"
            defaultValue = "Select Language"
            style = {{ width: 200 }}
            onChange = { handleChange } >
            <Option value="en">English</Option>
            <Option value="ru">Russian</Option>
          </Select>
        </div>
        <div className="list-menu">
          <Table
            className="table"
            style = {{ width: '75%' }} 
            columns={columns} 
            dataSource={data} 
          />
            <div className="view-cart" style={{width: '20%'}}>
              <div style={{marginTop: 15}}>
                <Text style={{fontSize: 16}}>Total Price: </Text>
                <Input style={{ width: 120, marginLeft: 10}}  />
              </div>
              <Button className="button">View Cart</Button>
            </div>
        </div>
      </Content>
    )
  }
}

export default Products;
