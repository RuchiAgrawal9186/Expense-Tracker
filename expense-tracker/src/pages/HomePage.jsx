import React, { useEffect, useState } from 'react'
import { Modal, Form, Select, Input, message, Table, DatePicker } from "antd"
import moment from "moment"
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import axios from 'axios'
import { url } from '../url'
import Spinner from '../components/Spinner'
import Analytics from '../components/Analytics'
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModel, setshowModel] = useState(false)
  const [Loading, setLoading] = useState(false)
  const [alltranscrion, setalltransaction] = useState([])

  const [frequency, setfrequency] = useState("7")

  const [selectedDate, setselectedDate] = useState([])
  const [type, settype] = useState("all")
  const [viewdata, setviewdata] = useState("table")

  const [editable, seteditable] = useState(null)



  // table data 

  const colums = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("DD-MM-YYYY")}</span>
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Refrence",
      dataIndex: "refrence",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => {
            seteditable(record)
            setshowModel(true)
          }}></EditOutlined>
          <DeleteOutlined className='mx-2' onClick={() => { handleDelete(record) }} />
        </div>
      )

    }

  ]

  const getAlltransaction = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"))
      setLoading(true)
      const res = await axios.post(`${url}/transaction/getall`, { userid: user._id, frequency, selectedDate, type })
      setLoading(false)
      setalltransaction(res.data)
      // console.log(res.data)


    } catch (error) {
      // console.log(error)
      message.error("Fetch Issue with Transaction")
    }
  }



  useEffect(() => {
    const getAlltransaction = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"))
        setLoading(true)
        const res = await axios.post(`${url}/transaction/getall`, { userid: user._id, frequency, selectedDate, type })
        setLoading(false)
        setalltransaction(res.data)
        // console.log(res.data)
  
  
      } catch (error) {
        // console.log(error)
        message.error("Fetch Issue with Transaction")
      }
    }
    getAlltransaction()
  }, [frequency, selectedDate, type])

  const handleDelete = async (record) => {

    try {
      setLoading(true)
      console.log("record", record)
      await axios.delete(`${url}/transaction/delete`, {
        data: { transactionId: record._id },
      })
      setLoading(false)
      message.success("Transaction Deleted Successfully.")
      getAlltransaction()


    } catch (error) {
      setLoading(false)
      message.error("Unable to delete.")

    }

  }

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"))
      setLoading(true)

      if (editable) {
        await axios.put(`${url}/transaction/edit`, {
          payload: {
            ...values,
            userId: user._id
          },
          transactionId: editable._id

        })
        setLoading(false)
        message.success("Transaction Updated Successfully.")
        getAlltransaction()
      }
      else {
        await axios.post(`${url}/transaction/add`, { ...values, userid: user._id })
        setLoading(false)
        message.success("Transaction Added Successfully.")
        getAlltransaction()
      }

      setshowModel(false)
      seteditable(null)
    } catch (error) {
      message.error("Fail to add Transaction")
    }
  }
  return (
    <>
      {/* <h1>welcome to home page</h1> */}
      {Loading && <Spinner />}
      <div className='filters'>
        <div>
          <h6 style={{fontWeight:"bolder"}}>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setfrequency(values)}>
            <Select.Option value="7">LAST 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">custom</Select.Option>
          </Select>
          {frequency == "custom" && <RangePicker value={selectedDate} onChange={(values) => setselectedDate(values)}></RangePicker>}
        </div>
        <div>
          <h6 style={{fontWeight:"bolder"}}>Select Type</h6>
          <Select value={type} onChange={(values) => settype(values)}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
          {frequency == "custom" && <RangePicker value={selectedDate} onChange={(values) => setselectedDate(values)}></RangePicker>}
        </div>
        <div className='switch-icons'>
          <UnorderedListOutlined className={`mx-2 ${viewdata == "table" ? "active-icon" : "inactive-icon"}`} onClick={() => setviewdata("table")}></UnorderedListOutlined>
          <AreaChartOutlined className={`mx-2 ${viewdata == "analytics" ? "active-icon" : "inactive-icon"}`} onClick={() => setviewdata("analytics")}></AreaChartOutlined>
        </div>
        <div>
          <button className='btn btn-dark' onClick={() => setshowModel(true)}>Add New</button>
        </div>
      </div>
      <div className='contents'>
        {viewdata == "table" ? <Table columns={colums} dataSource={alltranscrion} className='table'/> : <Analytics alltransaction={alltranscrion}></Analytics>}

      </div>
      <Modal title={editable ? "Edit Transaction" : "Add Transaction"} open={showModel} onCancel={() => setshowModel(false)}
        footer={false}>
        <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fees</Select.Option>
              <Select.Option value="tax">TAX</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="refrence">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className='d-flex justify-content-end'>
            <button className='btn btn-primary' type='submit'>{" "}SAVE</button>
          </div>

        </Form>
      </Modal>

    </>
  )
}

export default HomePage