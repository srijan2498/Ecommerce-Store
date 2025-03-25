import React, { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendApiPrefix } from "../../constants/Constants";
import { useSelector } from "react-redux";

const Header = ({ setIsLogged, isLogged, setCurrentUser }) => {
  const [isUserClicked, setIsUserClicked] = useState(false);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const user = useSelector((state) => state.userReducer);

  const navigate = useNavigate();

  const navigateTo = (path) => {
    if (path === "logout") {
      setIsLogged(false);
      localStorage.removeItem("authToken");
      console.log("setCurrentUser to null");
      setCurrentUser(null);
      navigate("/login");
    } else {
      setIsUserClicked(false);
      navigate(path);
    }
  };

  const onSearch = async (e) => {
    e.preventDefault();
    if (query?.length > 0) {
      navigate(`/search/${query}`);
      setQuery('')
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await axios.get(`${backendApiPrefix}/user/categories`);
      setCategories(res.data.categories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (categories.length === 0) {
      getAllCategories();
    }
  }, [categories]);

  return (
    <div className="headerContainer">
      <div className="header">
        <div className="headerLogoLink">
          <span className="logo" onClick={() => navigate("/")}>
            Vestiq
          </span>
          <div className="headerLinks">
            <div
              className="cart headerLinksButton"
              onClick={() => navigate("/cart")}
            >
              <span className="cartCount">
                {user?.cart?.length < 10
                  ? user?.cart?.length
                  : `${user?.cart?.length}+`}
              </span>
              <FaCartShopping />
            </div>
            <div
              className="user headerLinksButton"
              onClick={() => setIsUserClicked(!isUserClicked)}
            >
              <FaUserAlt />
            </div>
            {isUserClicked && isLogged && (
              <div className="userDropdown">
                <div
                  className="userDropdownItem"
                  onClick={() => navigateTo("my-profile")}
                >
                  My Profile
                </div>
                <div
                  className="userDropdownItem"
                  onClick={() => navigateTo("my-orders")}
                >
                  Orders
                </div>
                <div
                  className="userDropdownItem"
                  onClick={() => navigateTo("my-wishlist")}
                >
                  Wishlist
                </div>
                <div
                  className="userDropdownItem"
                  onClick={() => navigateTo("logout")}
                >
                  Logout
                </div>
              </div>
            )}
            {isUserClicked && !isLogged && (
              <div className="userDropdown">
                <div
                  className="userDropdownItem"
                  onClick={() => navigateTo("login")}
                >
                  Login
                </div>
                <div
                  className="userDropdownItem"
                  onClick={() => navigateTo("register")}
                >
                  New user? Register
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="searchContainer">
          <form onSubmit={(e) => onSearch(e)}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="🔍 Search..."
            />
          </form>
        </div>
      </div>
      {categories.length > 0 ? (
        <div className="categoryHeader">
          {categories.map((category) => (
            <div
              className="categoryHeaderItem"
              key={category._id}
              onClick={() => navigate(`/products-by-category/${category.name}`)}
            >
              {category.name}
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Header;
