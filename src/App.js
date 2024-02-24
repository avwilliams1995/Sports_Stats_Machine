import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Routes, Route } from "react-router-dom";
// import { UseSelector, useSelector } from "react-redux";
import Main from "./Main";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute";


const App = () => {
  
  return (
    <div className="app">
      <img src="https://i.etsystatic.com/24392251/r/il/dd101d/3281104020/il_fullxfull.3281104020_cad3.jpg" alt="logo"/>
      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          
          }/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Signup />}/>
          <Route path="/profile" element={<Profile />}/>
        </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
};

export default App;
