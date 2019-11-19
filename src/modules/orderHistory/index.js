import React from 'react';
import './orderHistory.scss';
import { 
    Input, 
    Table,
    Typography,
    Button,
    Layout,
} from 'antd';

const { Content } = Layout;

const columns = [{
        title: 'Customer Name',
        dataIndex: 'customerName',
        key: 'customerName',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Total Price',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
    },
    {
        title: '',
        dataIndex: 'details',
        key: 'details',
    }

]

const data = [{
        key: '1',
        customerName: 'Customer Name 1',
        date: 50,
        totalPrice: 50,
        details: 2500
    },
    {
        key: '1',
        customerName: 'Customer Name 1',
        date: 50,
        totalPrice: 50,
        details: 2500
    },
    {
        key: '1',
        customerName: 'Customer Name 1',
        date: 50,
        totalPrice: 50,
        details: 2500
    },
    {
        key: '1',
        customerName: 'Customer Name 1',
        date: 50,
        totalPrice: 50,
        details: 2500
    },
    {
        key: '1',
        customerName: 'Customer Name 1',
        date: 50,
        totalPrice: 50,
        details: 2500
    }

];

class OrderHistory extends React.Component {
    render(){
        return(
            <Content>
                <div className="list-menu-cart">
                    <Table
                        className="table-cart"
                        style = {{ width: '100%' }} 
                        columns={columns} 
                        dataSource={data} 
                    />
                </div>
            </Content>
        )
    }
}

export default OrderHistory;