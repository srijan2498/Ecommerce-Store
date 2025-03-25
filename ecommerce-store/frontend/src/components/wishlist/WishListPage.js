import React, { useEffect, useState } from "react";
import "./WishListPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendApiPrefix } from "../../constants/Constants";
import { IoHeartSharp } from "react-icons/io5";
import { GiShoppingCart } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { setUserAction } from "../../redux/actions/UserActions";

const WishListPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);

  const getWishlistProducts = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${backendApiPrefix}/user/myWishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(
        res.data.wishlist.reverse().filter((prod) => prod._doc.countInStock)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        const response = await axios.get(`${backendApiPrefix}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response?.data?.user) {
          dispatch(setUserAction(response.data.user));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWishlist = async (prod) => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.delete(
        `${backendApiPrefix}/user/removeFromWishlist/${prod}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data) {
        fetchUserDetails();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (prod) => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        `${backendApiPrefix}/user/addToCart/${prod}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data) {
        fetchUserDetails();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishlistProducts();
  }, [user.wishlist]);
  return (
    <div className="container wishListContainer">
      <p className="categoryHeading">My Wishlist</p>
      {user?.wishlist?.length <= 0 ? (
        <div className="emptyCartContainer">
          <span className="emptyCartContainerHeading">Wishlist is Empty</span>
          <span className="emptyCartIcon">
            <GiShoppingCart />
          </span>
          <div className="emptyCartContainerBtns">
            <span
              className="emptyCartContainerBtn"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </span>
          </div>
        </div>
      ) : (
        <div className="wishlistProductContainer">
          {products.map((product, index) => (
            <div className="wishlistProductsListCard" key={index}>
              <div className="productImg">
                <div
                  className="wishlistProductsListCardImage"
                  style={{ backgroundImage: `url(${product.image})` }}
                >
                  <span
                    className={`heart`}
                    onClick={() => {
                      removeFromWishlist(product._doc._id);
                    }}
                  >
                    <IoHeartSharp />
                  </span>
                </div>
              </div>
              <div className="wishlistProductsListCardDetails">
                <p className="wishlistProductsListCardName">
                  {product._doc.name}
                </p>
                <div className="priceAndCart">
                  <div className="productPrices">
                    <p className="wishlistProductsListCardPrice">
                      ₹. {product._doc.price}
                    </p>
                    <p
                      className="addToCart"
                      onClick={() => {
                        if (user?.cart?.includes(product._doc._id)) {
                          navigate("/cart");
                        } else {
                          addToCart(product._doc._id);
                        }
                      }}
                    >
                      {user?.cart?.includes(product._doc._id)
                        ? "Go to Cart"
                        : "Add To Cart"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishListPage;
