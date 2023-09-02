import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const [loginuser,setloginuser]=useState("")
  const navigate = useNavigate()
  const handlelogout  = ()=>{
    localStorage.removeItem("user")
    navigate("/login")
  }
  useEffect(()=>{
   const user=JSON.parse(localStorage.getItem("user"))
   if(user)
   {
    setloginuser(user.name)
   }
  },[])

  return <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon">
      </span></button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <a className="navbar-brand" href="/">Expense tracker</a>
      {/* <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <a className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </a>
      </ul> */}
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <a className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">{loginuser}</a>
        </a>
      </ul>
       <a className="nav-item">
        <button className="btn btn-primary" aria-current="page" href="/login" onClick={handlelogout}>Logout</button>
      </a>
      
        
    </div>
  </div>
</nav>

  </>;
}

export default Header