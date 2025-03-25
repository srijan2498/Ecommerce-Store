import React, { useEffect, useState } from "react";
import "./LoginRegister.css";
import axios from "axios";
import { backendApiPrefix } from "../../constants/Constants";
import { useNavigate } from "react-router-dom";

const Register = ({ setShowHeader }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${backendApiPrefix}/auth/register`, {
        name,
        email,
        password,
        mobile,
      });
      if(res.data){
        setName('')
        setEmail('')
        setMobile('')
        setPassword('')
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setShowHeader(false);
  }, []);
  return (
    <div className="loginRegisterContainer">
      <div className="leftPanel">
        <span className="loginRegisterHeading">Register</span>
      </div>
      <div className="rightPanel">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
            required
          />
          <label htmlFor="mobile">Mobile</label>
          <input
            type="number"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="+91"
            required
          />
          <button type="submit">Register</button>
        </form>
        <div className="loginRegisterLink">
          <span>Already have an account?</span>
          <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
