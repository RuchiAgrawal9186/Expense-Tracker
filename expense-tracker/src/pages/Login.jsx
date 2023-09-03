import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { url } from "../url.js";
import axios from "axios";
import Spinner from '../components/Spinner.jsx';
import {message} from "antd"

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [loading,setloading]=useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      email,
      password
    };

    try {
      setloading(true)
      const response = await axios.post(`${url}/users/login`, obj);
      const data = response.data;
      // console.log(data);
      // console.log("login done");
      localStorage.setItem("user", JSON.stringify({ ...data.user, password: "" }));
      message.success("Login Successfully")
      navigate("/");
      setloading(false)
    } catch (error) {
      setloading(false)
      message.error("Not able login Something wrong.")
      // console.log("not login");
      // console.log(error);
    }
  };

  if (localStorage.getItem("user")) {
    // If user is logged in, no need to render the login form
    return null;
  }

  return (
    <>
    {loading ? <Spinner></Spinner> : 
      <div className='login-page'>
        
        <h2 style={{textAlign:"center"}}>Login form</h2>
        <br />
        <form action="" onSubmit={handleSubmit}>
          <input type="email" name="email" value={email} placeholder='enter an email' style={{ width: "100%" }} onChange={(e) => setemail(e.target.value)} />
          <br />
          <br />
          <input type="password" name="password" value={password} placeholder='enter a password' style={{ width: "100%" }} onChange={(e) => setpassword(e.target.value)} />
          <br />
          <br />
          <button style={{ width: "100%" ,backgroundColor:"black",color:"white",padding:"1%",cursor:"pointer"}}>Submit</button>
          <br />
          <br />
          New User? Click here to <Link to='/register'>Register</Link>
        </form>
      </div>
    }
    </>
  );
};

export default Login;