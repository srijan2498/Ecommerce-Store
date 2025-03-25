import React, { useEffect, useState } from "react";
import "./CartPage.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { backendApiPrefix } from "../../constants/Constants";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { GiShoppingCart } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { setUserAction } from "../../redux/actions/UserActions";
import paymentpng from "../../assets/paymentPng.png";

const CartPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const [cartProducts, setCartProducts] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const getCartProducts = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${backendApiPrefix}/user/myCart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartProducts(res.data.cart.filter((prod) => prod._doc.countInStock));
      let prodTotalPrice = 0;
      for (let i = 0; i < res.data.cart.length; i++) {
        prodTotalPrice = prodTotalPrice + res.data.cart[i]._doc.price;
      }
      setTotalPrice(prodTotalPrice);
    } catch (error) {
      console.log(error);
    }
  };

  const getAddresses = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${backendApiPrefix}/user/address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data?.addresses) {
        setAddresses(res.data.addresses);
      }
    } catch (error) {
      console.log(error);
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

  const removeCartProduct = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.delete(
        `${backendApiPrefix}/user/removeFromCart/${id}`,
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

  const orderProducts = async () => {
    try {
      const orderProductsId = [];
      for (let i = 0; i < cartProducts.length; i++) {
        orderProductsId.push(cartProducts[i]._doc._id)
      }
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        `${backendApiPrefix}/user/order`,
        {
          orderItems: orderProductsId,
          shippingAddress: selectedAddress,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(res.data){
      const token = localStorage.getItem("authToken");
        const response = await axios.delete(
          `${backendApiPrefix}/user/clearCart`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchUserDetails()
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartProducts();
    getAddresses();
  }, [user.cart]);
  return (
    <div className="container cartContainer">
      <div className="categoryHeading">My Cart</div>
      {user?.cart?.length <= 0 ? (
        <div className="emptyCartContainer">
          <span className="emptyCartContainerHeading">Cart is empty</span>
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
            <span
              className="emptyCartContainerBtn"
              onClick={() => {
                navigate("/my-wishlist");
              }}
            >
              Wishlist
            </span>
          </div>
        </div>
      ) : (
        cartProducts.length > 0 && (
          <table className="myCartContainer">
            <thead>
              <tr>
                <th className="firstCol">
                  <span>Products</span>
                  <span>Prices</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {cartProducts?.map((prod, index) => {
                return (
                  <tr className="cartProd" key={index}>
                    <td className="cartProduct">
                      <p
                        className="cartProdImg"
                        style={{ backgroundImage: `url(${prod.image})` }}
                      ></p>
                      <p className="cartProdName">{prod._doc.name}</p>
                    </td>
                    <td className="cartPrice">
                      <span>{prod._doc.price}</span>
                      <span
                        className="cartDel"
                        onClick={() => removeCartProduct(prod._doc._id)}
                      >
                        <RiDeleteBin7Fill />
                      </span>
                    </td>
                  </tr>
                );
              })}
              <tr className="cartTableCalculation">
                <td className="cartTableTotalCalculation">Total</td>
                <td className="cartTableCalculationValue">{totalPrice}</td>
              </tr>
            </tbody>
          </table>
        )
      )}
      <div>
        {cartProducts?.length > 0 ? (
          <div className="selectAddress">
            <div className="selectAddressHeading">Select Address</div>
            {addresses?.length > 0 ? (
              <div>
                {addresses.map((item, index) => {
                  return (
                    <div
                      className={`profileRightSectionContentItemValue ${
                        selectedAddress === item._id
                          ? "selectedAddressCart"
                          : ""
                      }`}
                      key={index}
                      onClick={() => setSelectedAddress(item._id)}
                    >
                      <div className="addressLineOne">
                        <span className="addressType">{item.addressType}</span>
                        <div className="addressName">
                          <span>{item.fullName} </span>
                          <span>{item.mobile}</span>
                        </div>
                      </div>
                      <div className="addressLineTwo">
                        <div>
                          {item.addressLine}, near {item.landmark},{" "}
                          {item.locality}, {item.city}, {item.state} -{" "}
                          {item.pinCode}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="emptyCartContainerBtns">
                <span
                  className="createAddressOrder"
                  onClick={() => navigate("/my-addresses")}
                >
                  Create Address
                </span>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        {cartProducts?.length > 0 ? (
          <div className="selectPayment">
            <div className="selectPaymentHeading">Select Payment</div>
            <div
              className="selectPaymentImg"
              style={{ backgroundImage: `url(${paymentpng})` }}
            ></div>
            <div className="selectPaymentMethod">
              <input type="radio" name="paymentMethod" readOnly checked></input>
              <label htmlFor="paymentMethod">Cash On Delivery</label>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        {cartProducts?.length > 0 ? (
          <button
            onClick={() => orderProducts()}
            className="orderBtn"
            disabled={selectedAddress ? false : true}
          >
            Order
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CartPage;
