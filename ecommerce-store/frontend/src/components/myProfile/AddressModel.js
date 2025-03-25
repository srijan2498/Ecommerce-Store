import axios from "axios";
import React, { useEffect } from "react";
import { backendApiPrefix } from "../../constants/Constants";
import { IoMdClose } from "react-icons/io";

const AddressModel = ({
  updateAddressId = 0,
  setShowAddressModel,
  setUpdateAddressId,
  setEnableAddressEdit,
}) => {
  const [address, setAddress] = React.useState(null);
  const getAddress = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        `${backendApiPrefix}/user/address/${updateAddressId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAddress(res.data.address);
    } catch (error) {
      console.log(error);
    }
  };

  const updateAddress = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.put(
        `${backendApiPrefix}/user/address/${updateAddressId}`,
        address,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowAddressModel(false);
      setUpdateAddressId(0);
      setEnableAddressEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const createAddress = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        `${backendApiPrefix}/user/address`,
        address,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowAddressModel(false);
      setUpdateAddressId(0);
      setEnableAddressEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (updateAddressId !== 0) {
      getAddress();
    }
  }, [updateAddressId]);

  return (
    <>
      {
        <div className="container addressModelFormContainer">
          <h2>
            <span>{updateAddressId !== 0 ? "Update" : "Create"} Address</span>
            <span className="icon" onClick={() => setShowAddressModel(false)}>
              <IoMdClose />
            </span>
          </h2>
          <form
            className="addressModelForm"
            onSubmit={(e) => {
              e.preventDefault();
              if (updateAddressId !== 0) {
                updateAddress();
              } else {
                createAddress();
              }
            }}
          >
            <div className="addressModelRow">
              <p>
                <label>Home</label>
                <input
                  type="radio"
                  name="addressType"
                  value="home"
                  checked={address?.addressType === "home"}
                  onChange={(e) =>
                    setAddress({ ...address, addressType: e.target.value })
                  }
                ></input>
              </p>
              <p>
                <label>Work</label>
                <input
                  type="radio"
                  name="addressType"
                  value="work"
                  checked={address?.addressType === "work"}
                  onChange={(e) =>
                    setAddress({ ...address, addressType: e.target.value })
                  }
                ></input>
              </p>
            </div>
            <div className="modelRow">
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={address?.fullName}
                required
                onChange={(e) =>
                  setAddress({ ...address, fullName: e.target.value })
                }
              />
            </div>
            <div className="modelRow">
              <label>Mobile</label>
              <input
                type="text"
                placeholder="Mobile"
                value={address?.mobile}
                required
                onChange={(e) =>
                  setAddress({ ...address, mobile: e.target.value })
                }
              />
            </div>
            <div className="modelRow">
              <label>Address</label>
              <input
                type="text"
                placeholder="Address"
                value={address?.addressLine}
                required
                onChange={(e) =>
                  setAddress({ ...address, addressLine: e.target.value })
                }
              />
            </div>
            <div className="modelRow">
              <label>Locality</label>
              <input
                type="text"
                placeholder="Locality"
                value={address?.locality}
                required
                onChange={(e) =>
                  setAddress({ ...address, locality: e.target.value })
                }
              />
            </div>
            <div className="modelRow">
              <label>City</label>
              <input
                type="text"
                placeholder="City"
                value={address?.city}
                required
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />
            </div>
            <div className="modelRow">
              <label>State</label>
              <input
                type="text"
                placeholder="State"
                value={address?.state}
                required
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
              />
            </div>
            <div className="modelRow">
              <label>Pincode</label>
              <input
                type="text"
                placeholder="Pincode"
                value={address?.pinCode}
                required
                onChange={(e) =>
                  setAddress({ ...address, pinCode: e.target.value })
                }
              />
            </div>
            <div className="modelRow">
              <label>Landmark</label>
              <input
                type="text"
                placeholder="Landmark"
                value={address?.landmark}
                onChange={(e) =>
                  setAddress({ ...address, landmark: e.target.value })
                }
              />
            </div>
            <button type="submit">
              {updateAddressId !== 0 ? "Update" : "Create"} Address
            </button>
          </form>
        </div>
      }
    </>
  );
};

export default AddressModel;
