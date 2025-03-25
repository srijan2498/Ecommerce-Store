import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backendApiPrefix } from "../../constants/Constants";
import axios from "axios";

const SearchProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const onSearch = async () => {
    try {
      const res = await axios.get(
        `${backendApiPrefix}/user/products/${category}`
      );
      setProducts(res.data.products)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
      onSearch();
  }, [category]);
  return (
    <div className="container categoryWiseContainer">
      <p className="categoryHeading">{category}</p>
      <div className="categoryWiseProductContainer">
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
  );
};

export default SearchProducts;
