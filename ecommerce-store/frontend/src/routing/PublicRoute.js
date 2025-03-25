import axios from "axios";
import { backendApiPrefix } from "../constants/Constants";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const authenticateToken = async()=>{
    try {
      const token = localStorage.getItem('authToken')
      if(token){
        const res = await axios.get(`${backendApiPrefix}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if(res.data.user){
          setIsAuthenticated(true)
        }
        else{
          localStorage.removeItem('authToken')
          setIsAuthenticated(false)
        }
      }
      else{
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    authenticateToken()
  }, [isAuthenticated])

  if(isAuthenticated !== null){
    if(isAuthenticated){
      return <Navigate to={'/'}/>
    }
    else{
      return children
    }
  }
};

export default PublicRoute;
