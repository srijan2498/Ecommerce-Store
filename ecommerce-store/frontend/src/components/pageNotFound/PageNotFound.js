import React from 'react'
import "./PageNotFound.css";
import { TbError404 } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate()
  return <div className="pageNotFoundContainer container">
    <div className='icon'><TbError404/></div>
    <div>Page not found</div>
    <div className='btn' onClick={()=> navigate('/')}>Home</div>
  </div>;
}

export default PageNotFound
