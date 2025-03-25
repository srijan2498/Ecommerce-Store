import axios from "axios";
import { backendApiPrefix } from "../constants/Constants";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProtectedRoute = ({
  setCurrentUser,
  setIsLogged,
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const authenticateToken = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        const response = await axios.get(`${backendApiPrefix}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response?.data?.user) {
          setIsAuthenticated(true);
          setCurrentUser(response.data.user);
          setIsLogged(true);
        } else {
          localStorage.removeItem("authToken");
          setIsAuthenticated(false);
          setIsLogged(false);
        }
      } else {
        setIsAuthenticated(false);
        setIsLogged(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    authenticateToken();
  }, [isAuthenticated]);
  if (isAuthenticated !== null) {
    if (isAuthenticated) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  }
};
