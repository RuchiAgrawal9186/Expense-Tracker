// import logo from './logo.svg';
// import './App.css';

import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

function App() {
  return (
    <>
    <Header></Header>
    <Routes>
      <Route path="/" element={<HomePage></HomePage>}/>
      <Route path="/register" element={<Register></Register>}/>
      <Route path="/login" element={<Login></Login>}/>
    </Routes>
    <Footer></Footer>
    </>
  );
}

export default App;
