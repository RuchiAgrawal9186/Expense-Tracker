import React, { useEffect, useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import {url} from "../url.js"
import axios from "axios"

const Register = () => {

    const [name,setname] = useState("")
    const [email,setemail] = useState("")
    const [password,setpassword]=useState("")

    const navigate = useNavigate()

    // useEffect(()=>{
    //   if(localStorage.getItem("user"))
    //   {
    //     navigate("/")
    //   }
    // },[navigate])

    const handleSubmit = (e) =>{
        e.preventDefault()

        let obj = {
            name,email,password
        }
        axios.post(`${url}/users/register`,obj)
        .then((res)=>{
          console.log(res.data)
          console.log("register done")
          navigate("/login")
        })
        .catch((err)=>{
          console.log("not register")
          console.log(err)
        })
        console.log(obj)

    }
  return (
    <>
    <div className='register-page'>
        <h4 style={{textAlign:"center"}}>Register form</h4>
     <form action="" onSubmit={handleSubmit}>
       
        <input type="text" name="name" value = {name} placeholder='enter a name' style={{width:"100%"}} onChange={(e)=>setname(e.target.value)}/>
        <br />
        
        <input type="email" name="email" value = {email} placeholder='enter a email' style={{width:"100%"}}  onChange={(e)=>setemail(e.target.value)}/>
        <br />
        <input type="password" name="password" value = {password} placeholder='enter a password' style={{width:"100%"}}  onChange={(e)=>setpassword(e.target.value)}/>
        <br />
        <button style={{width:"90%"}}>Submit</button>
        <br />
        Already register ? click here to <Link to='/login'>Login</Link>

     </form>
    </div>
    </>
  )
}

export default Register