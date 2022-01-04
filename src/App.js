import React from "react";
import Register from "./components/register";
import SnackbarProvider from "react-simple-snackbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
function App() {
  return (
    <div className="">
      <SnackbarProvider>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </SnackbarProvider>
    </div>
  );
}

export default App;
