import React from 'react'
import "./footer.css";

const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <div className="footer">
      Developed by <span className="logo">Srijan</span> | &copy; {year}
    </div>
  );
}

export default Footer
