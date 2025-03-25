import React, { useEffect, useState } from "react";
import "./LoginRegister.css";
import axios from "axios";
import { backendApiPrefix } from "../../constants/Constants";
import { useNavigate } from "react-router-dom";

const Login = ({ setShowHeader, setIsLogged }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setShowHeader(false);
  }, [setShowHeader]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${backendApiPrefix}/auth/login`, {
        email,
        password,
      });
      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
      }
      if (res?.data?.user) {
        setEmail("");
        setPassword("");
        setIsLogged(true)
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="loginRegisterContainer">
      <div className="leftPanel">
        <span className="loginRegisterHeading">Login</span>
      </div>
      <div className="rightPanel">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="abc@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <div className="loginRegisterLink">
          <span>Don't have an account?</span>
          <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
