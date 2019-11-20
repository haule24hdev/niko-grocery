import React from "react";
import { Link } from 'react-router-dom';
import "./editFoodDetails.scss";

import {
  Table,
  Button,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Row,
  Col,
  Icon
} from "antd";

const data = [
  {
    key: "1",
    productName: "Product Name 2",
    unitPrice: 50,
    edit: "",
    remove: ""
  },
  {
    key: "2",
    productName: "Product Name 1",
    unitPrice: 13,
    edit: "",
    remove: ""
  },
  {
    key: "3",
    productName: "Product Name 1",
    unitPrice: 57,
    edit: "",
    remove: ""
  },
  {
    key: "4",
    productName: "Product Name 1",
    unitPrice: 90,
    edit: "",
    remove: ""
  },
  {
    key: "5",
    productName: "Product Name 3",
    unitPrice: 100,
    edit: "",
    remove: ""
  }
];

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber />;
    }
    return <Input />;
  };
  
  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`
                }
              ],
              initialValue: record[dataIndex]
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data, editingKey: "" };
    this.columns = [
      {
        title: "productName",
        dataIndex: "productName",
        width: "25%",
        editable: true
      },
      {
        title: "unitPrice",
        dataIndex: "unitPrice",
        width: "15%",
        editable: true
      },
      {
        title: "edit",
        dataIndex: "edit",
        align: 'center',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <Link
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </Link>
                )}
              </EditableContext.Consumer>
              <Popconfirm
                title="Sure to cancel?"
                onConfirm={() => this.cancel(record.key)}
              >
                <Link>Cancel</Link>
              </Popconfirm>
            </span>
          ) : (
            <Link
              disabled={editingKey !== ""}
              onClick={() => this.edit(record.key)}
            >
              Edit
            </Link>
          );
        }
      },
      {
        title: "remove",
        dataIndex: "remove",
        width: "40%",
        // editable: true,
        render: ()=> (<Icon type='delete' />),
        align: 'center'
      }
    ];
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        this.setState({ data: newData, editingKey: "" });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: "" });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell
      }
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === "age" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Row gutter={12}>
          <Col xs={24} sm={24} md={18}>
            <Table
              components={components}
              bordered
              dataSource={this.state.data}
              columns={columns}
              rowClassName="editable-row"
              pagination={{
                onChange: this.cancel
              }}
              style={{ width: "100%", padding: 12, background: '#fff' }}
            />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={6}
            style={{ padding: 8, background: "#fff" }}
          >
            <Row style={{ marginTop: 16, marginBottom: 16 }}>
              <Col sm={12} push={6}>
                <Button
                  block
                  style={{
                    width: "100%",
                    minWidth: 100,
                    background: "#C4C4C4"
                  }}
                >
                  Add New Product
                </Button>
              </Col>
            </Row>
            {/* </div> */}
          </Col>
        </Row>
      </EditableContext.Provider>
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);

export default EditableFormTable;
