import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { backendApiPrefix } from "../../constants/Constants";
import "./ProductDetails.css";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setUserAction } from "../../redux/actions/UserActions";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

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

  const getProductDetails = async () => {
    try {
      const res = await axios.get(`${backendApiPrefix}/user/product/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      console.error(error);
    }
  };

  const addToWishlist = async (prod) => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        `${backendApiPrefix}/user/addToWishlist/${prod}`,
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

  const getProductsByCategory = async (category, currentProd) => {
    try {
      const res = await axios.post(
        `${backendApiPrefix}/user/products-by-category-id/${category}`,
        { currentProd }
      );
      setProducts(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (product) {
      getProductsByCategory(product._doc.category, product._doc._id);
    }
  }, [product]);

  useEffect(() => {
      getProductDetails();
  }, [id]);
  return (
    <div className="container productDetailsContainerParent">
      <div className="productDetailsContainer">
        {product === null ? (
          <div></div>
        ) : (
          <div className="productsListCard">
            <div className="productImg">
              <div
                className="productsListCardImage"
                style={{ backgroundImage: `url(${product.image})` }}
              ></div>
            </div>
            <div className="productsListCardDetails">
              <div>
                <p className="productsListCardName">{product._doc.name}</p>
                <p className="productsListCardDesc">
                  {product._doc.description}
                </p>
                <div className="productPrices">
                  <p className="productsListCardPrice">
                    ₹. {product._doc.price}
                  </p>
                </div>
              </div>
              <div className="productDetailPageBtns">
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
                <p
                  className="addToWishlist"
                  onClick={() => {
                    if (user?.wishlist?.includes(product._doc._id)) {
                      removeFromWishlist(product._doc._id);
                    } else {
                      addToWishlist(product._doc._id);
                    }
                  }}
                >
                  Wishlist
                  {user?.wishlist?.includes(product._doc._id) ? "ed " : " "}
                  <span className="icon">
                    {user?.wishlist?.includes(product._doc._id) ? (
                      <IoHeart />
                    ) : (
                      <IoMdHeartEmpty />
                    )}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {product != null && (
        <div className="categoryWiseProductContainer">
          <div className="categoryHeading">Similar Products</div>
          <div className="categoryProductsList">
            {products.map((product, index) => (
              <div
                className="categoryProductsListCard"
                key={index}
                onClick={() => {
                  navigate(`/product/${product._doc._id}`);
                }}
              >
                <div className="productImg">
                  <div
                    className="categoryProductsListCardImage"
                    style={{ backgroundImage: `url(${product.image})` }}
                  >
                    <span className={`addToWishList`}></span>
                  </div>
                </div>
                <div className="categoryProductsListCardDetails">
                  <p className="categoryProductsListCardName">
                    {product._doc.name}
                  </p>
                  <div className="priceAndCart">
                    <div className="productPrices">
                      <p className="categoryProductsListCardPrice">
                        ₹. {product._doc.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
