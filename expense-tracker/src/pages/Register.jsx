import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {

    const [name,setname] = useState("")
    const [email,setemail] = useState("")
    const [password,setpassword]=useState("")

    const handleSubmit = (e) =>{
        e.preventDefault()

        let obj = {
            name,email,password
        }
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