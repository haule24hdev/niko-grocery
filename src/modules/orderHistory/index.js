import React from 'react';
import './orderHistory.scss';
import { 
    Table,
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
        render: () => <a>Details</a>
    }

]

const data = [{
        key: '1',
        customerName: 'Customer Name 1',
        date: "2019-11-18",
        totalPrice: 50,
        details: ''
    },
    {
        key: '1',
        customerName: 'Customer Name 1',
        date: "2019-11-18",
        totalPrice: 13,
        details: ''
    },
    {
        key: '1',
        customerName: 'Customer Name 1',
        date: "2019-11-18",
        totalPrice: 57,
        details: ''
    },
    {
        key: '1',
        customerName: 'Customer Name 1',
        date: "2019-11-18",
        totalPrice: 90,
        details: ''
    },
    {
        key: '1',
        customerName: 'Customer Name 1',
        date: "2019-11-18",
        totalPrice: 100,
        details: ''
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