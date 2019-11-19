import React from "react";
import './cart.scss'
import { 
    Input, 
    Select,
    Table,
    Typography,
    Button,
    Layout,
    DatePicker
    } from 'antd';
import moment from 'moment';

const { Option } = Select;

const { Text } = Typography;

const { Content } = Layout;

const dateFormat = 'YYYY/MM/DD';

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
        amount: 50,
        price: 2500
    },
    {
        key: '2',
        productName: 'Product Name 1',
        unitPrice: 13,
        amount: 13,
        price: 169,
    },
    {
        key: '3',
        productName: 'Product Name 1',
        unitPrice: 57,
        amount: 57,
        price: 3249,
    },
    {
        key: '4',
        productName: 'Product Name 1',
        unitPrice: 90,
        amount: 90,
        price: 8100,
    },
    {
        key: '5',
        productName: 'Product Name 3',
        unitPrice: 100,
        amount: 100,
        price: 10000,
    },

];

function handleChange(value) {
    console.log(`selected ${value}`);
  }

class Carts extends React.Component {
    render() {
        return(
            <Content>
                <div className="clearfix">
                    <Select 
                        className="select-cart"
                        defaultValue = "Select Language"
                        style = {{ width: 200 }}
                        onChange = { handleChange } >
                        <Option value="en">English</Option>
                        <Option value="ru">Russian</Option>
                    </Select>
                </div>
                <div className="list-menu-cart">
                    <Table
                        className="table-cart"
                        style = {{ width: '75%' }} 
                        columns={columns} 
                        dataSource={data} 
                    />
                    <div className="view-cart-cart" style={{width: '20%'}}>
                    <div style={{marginTop: 20}}>
                        <div>
                            <Text style={{fontSize: 16}}>Total Price: </Text>
                            <Input defaultValue="30418" style={{ width: 120, marginLeft: 10}}  />
                        </div>
                        <div style={{marginTop: 20}}>
                            <Text style={{fontSize: 16}}> Date: </Text>
                            <DatePicker defaultValue={moment('2019/11/18', dateFormat)} format={dateFormat} />
                        </div>
                        <div style={{marginTop: 50}}>
                            <Text style={{fontSize: 16}}>Customer Name </Text>
                            <Input placeholder="Input customer name" style={{ width: 200, marginTop: 15}}  />
                        </div>
                    </div>
                        <Button className="button-cart">Confirm</Button>
                    </div>
                </div>
            </Content>
        )
    }
}

export default Carts;