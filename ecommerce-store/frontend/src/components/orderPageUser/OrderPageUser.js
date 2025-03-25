import React, { useEffect, useState } from "react";
import "./OrderPageUser.css";
import axios from "axios";
import { backendApiPrefix } from "../../constants/Constants";
import { useSelector } from "react-redux";
import { GiShoppingCart } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const OrderPageUser = () => {
  const user = useSelector((state) => state.userReducer);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const getMyOrders = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${backendApiPrefix}/user/myOrders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res) {
        setOrders(res.data.order.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyOrders();
  }, [user.orders]);
  return (
    <div className="OrderPageUserContainer container">
      <div className="categoryHeading">My Orders</div>
      <div className="ordersContainer">
        {orders?.length > 0 ? (
          <div className="ordersListContainer">
            {orders?.map((order, index) => {
              return (
                <div className="orderItem" key={index}>
                  <div className="orderProductsContainer">
                    {order?.orderItems.map((prod, i) => {
                      return (
                        <div className="orderProd" key={i}>
                          <div
                            className="orderProdImg"
                            style={{ backgroundImage: `url(${prod.image})` }}
                          ></div>
                          <div className="orderProdTitle">{prod.name}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="orderPricePaymentMethod">
                    <div className="orderPrice">₹. {order.totalPrice}</div>
                    <div className="paymentMethod">{order.paymentMethod}</div>
                  </div>
                  <div className="orderStatus">
                    <div className="orderCurrentStatus">
                      {order.currentStatus}
                    </div>
                    <div className="orderUpdatedAt">
                      {order.updatedAt
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="noOrders">
            <div className="emptyCartContainer">
              <span className="emptyCartContainerHeading">No Orders Yet</span>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPageUser;
