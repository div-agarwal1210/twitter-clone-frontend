import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import PageLoading from "./PageLoading/PageLoading";
const ProtectedRoute = ({children}) => {
    const [user , isloading] =useAuthState(auth)
  if(isloading){
    return <PageLoading />
  }
  if (!user) {
    return <Navigate to="/login" />;
}
return children;
};

export default ProtectedRoute;