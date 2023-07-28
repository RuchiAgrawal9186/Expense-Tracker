import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
    <div className='login-page'>
        <h2>Login form</h2>
     <form action="">
        
        <input type="email" name="email" placeholder='enter a email'/>
        <br />
        <input type="password" name="password" placeholder='enter a password'/>
        <br />
        <button>Submit</button>
        <br/>
        new User ? click here to <Link to='/register'>Register</Link>

     </form>
    </div>
    </>
  )
}

export default Login