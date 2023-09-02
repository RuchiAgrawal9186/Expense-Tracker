import React,{useEffect, useState} from 'react'
import {Modal,Form, Select, Input, message,Table} from "antd"
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import axios from 'axios'
import { url } from '../url'
import Spinner from '../components/Spinner'


const HomePage = () => {
  const [showModel,setshowModel]=useState(false)
  const [Loading,setLoading]=useState(false)
  const [alltranscrion,setalltransaction] = useState([])

  // table data 

  const colums = [
    {
      title:"Date",
      dataIndex:"date",
    },
    {
      title:"Amount",
      dataIndex:"amount",
    },
    {
      title:"Type",
      dataIndex:"type",
    },
    {
      title:"Category",
      dataIndex:"category",
    },
    {
      title:"Refrence",
      dataIndex:"refrence",
    },
    {
      title:"Actions",

    }

  ]

  const getAlltransaction = async()=>{
    try {
      const user = JSON.parse(localStorage.getItem("user"))
      setLoading(true)
      const res = await axios.post(`${url}/transaction/getall`, {userid:user._id})
      setLoading(false)
      setalltransaction(res.data)
      console.log(res.data)

      
    } catch (error) {
      console.log(error)
      message.error("Fetch Issue with Transaction")
    }
  }

  useEffect(()=>{
    getAlltransaction()
  },[])

  const handleSubmit = async(values) =>{
    try {
      const user = JSON.parse(localStorage.getItem("user"))
      setLoading(true)
      await axios.post(`${url}/transaction/add`, {...values,userid:user._id})
      setLoading(false)
      message.success("Transaction Added Successfully.")
      setshowModel(false)
    } catch (error) {
      message.error("Fail to add Transaction")
    }
  }
  return (
    <>
    {/* <h1>welcome to home page</h1> */}
    {Loading && <Spinner/>}
    <div className='filters'>
      <div>range filters</div>
      <div>
        <button className='btn btn-primary' onClick={()=> setshowModel(true)}>Add New</button>
      </div>
    </div>
    <div className='contents'>
      <Table columns={colums} dataSource={alltranscrion}/>
    </div>
    <Modal title="Add Transaction" open={showModel} onCancel={()=> setshowModel(false)}
    footer={false}>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Amount" name="amount">
          <Input type="text"/>
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
          <Input type="date"/>
        </Form.Item>
        <Form.Item label="Reference" name="refrence">
          <Input type="text"/>
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input type="text"/>
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