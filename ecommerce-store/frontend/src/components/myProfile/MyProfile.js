import React, { use, useEffect } from "react";
import "./MyProfile.css";
import userIcon from "../../assets/usericon.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { backendApiPrefix } from "../../constants/Constants";
import AddressModel from "./AddressModel";
import { setUserAction } from "../../redux/actions/UserActions";

const MyProfile = () => {
  const [path, setPath] = React.useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer);
  const [addresses, setAddresses] = React.useState([]);
  const [enableProfileEdit, setEnableProfileEdit] = React.useState(false);
  const [enableAddressEdit, setEnableAddressEdit] = React.useState(false);
  const [name, setName] = React.useState(user.name);
  const [email, setEmail] = React.useState(user.email);
  const [mobile, setMobile] = React.useState(user.mobile);
  const [updateAddressId, setUpdateAddressId] = React.useState(0);
  const [showAddressModel, setShowAddressModel] = React.useState(false);

  const dispatch = useDispatch()

  const getAllAddresses = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${backendApiPrefix}/user/address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAddresses(res.data.addresses);
    } catch (error) {}
  };

  const updateUserDetails = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("authToken");
      await axios.put(
        `${backendApiPrefix}/user/profile`,
        {
          name,
          email,
          mobile,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAddress = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(
        `${backendApiPrefix}/user/address/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getAllAddresses();
    } catch (error) {
      console.log(error);
    }
  }

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

  useEffect(() => {
      getAllAddresses();
      fetchUserDetails();
  }, [user.address, showAddressModel]);

  useEffect(() => {
    if (window.location.pathname === "/my-profile") {
      setPath("profile");
    }
    if (window.location.pathname === "/my-addresses") {
      setPath("address");
    }
    if (window.location.pathname === "/my-orders") {
      setPath("orders");
    }
    if (window.location.pathname === "/my-wishlist") {
      setPath("wishlist");
    }
  }, [window.location.pathname]);

  const navigateTo = (url) => {
    navigate(url);
  };

  return (
    <div className="container profileContainer">
      <div className="profileLeftPanel">
        <div className="profileGreet">
          <div
            className="profileImg"
            style={{ backgroundImage: `url(${userIcon})` }}
          ></div>
          <div className="greetText">
            <div className="greet">Hello,</div>
            <div className="greetUserName">{user.name}</div>
          </div>
        </div>
        <div className="profileLeftSection">
          <div
            className={`profileLeftSectionSelect profileSelected ${
              path === "profile" ? "selectedProfile" : ""
            }`}
            onClick={() => navigateTo("/my-profile")}
          >
            Profile Information
          </div>
          <div
            className={`profileLeftSectionSelect manageSelected ${
              path === "address" ? "selectedProfile" : ""
            }`}
            onClick={() => navigateTo("/my-addresses")}
          >
            Manage Addresses
          </div>
          <div
            className={`profileLeftSectionSelect ordersSelected ${
              path === "orders" ? "selectedProfile" : ""
            }`}
            onClick={() => navigateTo("/my-orders")}
          >
            My Orders
          </div>
          <div
            className={`profileLeftSectionSelect wishlistSelected ${
              path === "wishlist" ? "selectedProfile" : ""
            }`}
            onClick={() => navigateTo("/my-wishlist")}
          >
            My Wishlist
          </div>
        </div>
      </div>
      <div className="profileRightPanel">
        {path === "profile" && (
          <div className="profileRightSection">
            <div className="profileRightSectionTitle">
              Profile Information{" "}
              <span
                className="editIcon"
                onClick={() => setEnableProfileEdit(!enableProfileEdit)}
              >
                <MdEdit />
              </span>
            </div>
            <form
              className="profileRightSectionContent"
              onSubmit={updateUserDetails}
            >
              <div className="profileRightSectionContentItem">
                <div className="profileRightSectionContentItemTitle">Name</div>
                <input
                  className="profileRightSectionContentItemValue"
                  value={!enableProfileEdit ? (name ? name : user.name) : name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!enableProfileEdit}
                  required
                />
              </div>
              <div className="profileRightSectionContentItem">
                <div className="profileRightSectionContentItemTitle">Email</div>
                <input
                  className="profileRightSectionContentItemValue"
                  value={
                    !enableProfileEdit ? (email ? email : user.email) : email
                  }
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!enableProfileEdit}
                  required
                />
              </div>
              <div className="profileRightSectionContentItem">
                <div className="profileRightSectionContentItemTitle">Phone</div>
                <input
                  className="profileRightSectionContentItemValue"
                  value={
                    !enableProfileEdit
                      ? mobile
                        ? mobile
                        : user.mobile
                      : mobile
                  }
                  onChange={(e) => setMobile(e.target.value)}
                  disabled={!enableProfileEdit}
                  required
                />
              </div>
              {enableProfileEdit && (
                <div>
                  <button className="profileRightSectionSaveBtn">Save</button>
                </div>
              )}
            </form>
          </div>
        )}
        {path === "address" && (
          <div className="profileRightSection">
            <div className="profileRightSectionTitle">
              Manage Addresses{" "}
              <span
                className="editIcon"
                onClick={() => {
                  setEnableAddressEdit(!enableAddressEdit);
                }}
              >
                <MdEdit />
              </span>
              <span
                className="newAddressBtn"
                onClick={() => setShowAddressModel(!showAddressModel)}
              >
                New
              </span>
            </div>
            <div className="profileRightSectionContent">
              {addresses.length > 0 &&
                addresses?.map((item, index) => (
                  <div className="profileRightSectionContentItem" key={index}>
                    <div className="profileRightSectionContentItemTitle">
                      Address {index + 1}
                    </div>
                    <div className="profileRightSectionContentItemValue">
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
                        {enableAddressEdit && (
                          <div className="addressBtns">
                            <span
                              onClick={() => {
                                setUpdateAddressId(item._id);
                                setShowAddressModel(!showAddressModel);
                              }}
                            >
                              <MdEdit />
                            </span>
                            <span onClick={() => deleteAddress(item._id)}>
                              <MdDelete />
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      {showAddressModel == true && (
        <div className="addressModelContainer">
          <AddressModel
            updateAddressId={updateAddressId}
            setUpdateAddressId={setUpdateAddressId}
            setShowAddressModel={setShowAddressModel}
            setEnableAddressEdit={setEnableAddressEdit}
          />
        </div>
      )}
    </div>
  );
};

export default MyProfile;
