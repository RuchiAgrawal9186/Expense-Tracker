import React, { useEffect, useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import {url} from "../url.js"
import axios from "axios"
import {message} from "antd"
import Spinner from '../components/Spinner.jsx'

const Register = () => {

    const [name,setname] = useState("")
    const [email,setemail] = useState("")
    const [password,setpassword]=useState("")
    const [loading,setloading]=useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
      if(localStorage.getItem("user"))
      {
        navigate("/")
      }
    },[navigate])

    const handleSubmit = async(e) =>{
        e.preventDefault()

        let obj = {
            name,email,password
        }
        try {
          setloading(true)
          await axios.post(`${url}/users/register`, obj);
          message.success("Register Successfully")
          navigate("/login");
          setloading(false)
        } catch (error) {
          setloading(false)
          message.error("Not able Register Something wrong.")
        }
    }
  return (
    <>
    {loading ? <Spinner/> : 
    <div className='register-page'>
        <h4 style={{textAlign:"center"}}>Register form</h4>
        <br />
     <form action="" onSubmit={handleSubmit}>
       
        <input type="text" name="name" value = {name} placeholder='enter a name' style={{width:"100%"}} onChange={(e)=>setname(e.target.value)}/>
        <br />
        <br />
        
        <input type="email" name="email" value = {email} placeholder='enter a email' style={{width:"100%"}}  onChange={(e)=>setemail(e.target.value)}/>
        <br />
        <br />
        <input type="password" name="password" value = {password} placeholder='enter a password' style={{width:"100%"}}  onChange={(e)=>setpassword(e.target.value)}/>
        <br />
        <br />
        <button style={{width:"100%",backgroundColor:"black",color:"white",padding:"1%",cursor:"pointer"}}>Submit</button>
        <br />
        <br />
        Already register ? click here to <Link to='/login'>Login</Link>

     </form>
    </div>}
    </>
  )
}

export default Register