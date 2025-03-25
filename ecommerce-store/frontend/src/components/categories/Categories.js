import React, { useEffect, useState } from "react";
import "./Categories.css";
import axios from "axios";
import { backendApiPrefix } from "../../constants/Constants";
import { useNavigate } from "react-router-dom";

const Categories = ({ category }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProductsByCategory = async () => {
    try {
      const res = await axios.get(
        `${backendApiPrefix}/user/products-by-category/${category}`
      );
      setProducts(
        res.data.products.reverse().filter((prod) => prod._doc.countInStock)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (products.length === 0) {
      getProductsByCategory();
    }
  }, []);
  return (
    <div className="">
      {products.length > 0 && (
        <div className="categoriesContainer">
          <p className="categoryHeading">{category}</p>
          <div className="categoryProductsList">
            {products.map((product, index) => {
              if (index < 4) {
                return (
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
                );
              }
            })}
            {products.length > 4 && (
              <div
                className="viewMoreBtn"
                onClick={() => navigate(`/products-by-category/${category}`)}
              >
                View More
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
