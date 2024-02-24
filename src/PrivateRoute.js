import React from "react";
import { useSelector  } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  let isLoggedIn = useSelector((state) => state.isLoggedIn.status);
  console.log('----------IS LOGGED IN? -------------', isLoggedIn)
  return isLoggedIn ? children : <Navigate to={'/login/'}/>
}

export default PrivateRoute