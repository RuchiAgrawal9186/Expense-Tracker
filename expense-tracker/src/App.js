import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    if (localStorage.getItem("user")) {
      setAuthenticated(true);
    }
  }, [authenticated]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Use the authenticated state to determine which page to show */}
        <Route
          path="/"
          element={authenticated ? <HomePage /> : <Navigate to="/login"  replace/>}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;