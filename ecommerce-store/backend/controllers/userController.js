import User from "../models/userModel.js";
import Address from "../models/addressModel.js";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// get user profile
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (user) {
      res.json({ user, message: "User profile fetched successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// update user profile
export const updateMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.mobile = req.body.mobile || user.mobile;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({ user: updatedUser, message: "Profile Updated Successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// add address
export const addAddress = async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      pinCode,
      locality,
      addressLine,
      city,
      state,
      landmark,
      alternatePhone,
      addressType,
      isDefault,
    } = req.body;
    if (
      !fullName ||
      !mobile ||
      !pinCode ||
      !locality ||
      !addressLine ||
      !city ||
      !state ||
      !addressType
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await User.findById(req.user._id);
    if (user) {
      const address = new Address({
        user: req.user._id,
        fullName,
        mobile,
        pinCode,
        locality,
        addressLine,
        city,
        state,
        landmark,
        alternatePhone,
        addressType,
        isDefault,
      });
      if (user.address.length === 0) {
        address.isDefault = true;
      }
      await address.save();
      user.address.push(address._id);
      await user.save();
      res.json({ address, message: "Address Added Successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// get a single address
export const getAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (address) {
      res.json({ address, message: "Address fetched successfully" });
    } else {
      res.status(404).json({ message: "Address not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// get all addresses
export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id });
    res.json({ addresses, message: "Addresses fetched successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// update address
export const updateAddress = async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      pinCode,
      locality,
      addressLine,
      city,
      state,
      landmark,
      alternatePhone,
      addressType,
      isDefault = false,
    } = req.body;
    const user = await User.findById(req.user._id);
    if (user) {
      const address = await Address.findById(req.params.id);
      if (address) {
        address.fullName = fullName || address.fullName;
        address.mobile = mobile || address.mobile;
        address.pinCode = pinCode || address.pinCode;
        address.locality = locality || address.locality;
        address.addressLine = addressLine || address.addressLine;
        address.city = city || address.city;
        address.state = state || address.state;
        address.landmark = landmark || address.landmark;
        address.addressType = addressType || address.addressType;
        await address.save();
        res.json({ address, message: "Address Updated Successfully" });
      } else {
        res.status(404).json({ message: "Address not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// delete address
export const deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      const address = await Address.findById(req.params.id);
      if (address) {
        await Address.findByIdAndDelete(req.params.id);
        user.address = user.address.filter(
          (address) => address._id.toString() !== req.params.id
        );
        await user.save();
        res.json({ message: "Address Deleted Successfully" });
      } else {
        res.status(404).json({ message: "Address not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// get a product
export const getProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const productInfo = {
      ...product,
      image: `data:${
        product.image.contentType
      };base64,${product.image.data.toString("base64")}`,
    };
    res.status(200).json({ product: productInfo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get products by category name
export const getProductsByCategoryName = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ name: req.params.category });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const products = await productModel.find({ category: category._id });
    const productsInfo = products.map((product) => ({
      ...product,
      image: `data:${
        product.image.contentType
      };base64,${product.image.data.toString("base64")}`,
    }));
    res.status(200).json({ products: productsInfo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get products by category id
export const getProductsByCategoryId = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ _id: req.params.id });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const products = await productModel.find({ category: category._id });
    const prods = products.filter(
      (prod) => prod._doc._id != req.body.currentProd
    );
    const productsInfo = prods.map((product) => ({
      ...product,
      image: `data:${
        product.image.contentType
      };base64,${product.image.data.toString("base64")}`,
    }));
    res.status(200).json({ products: productsInfo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get search products
export const getSearchProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    const searchProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(req.params.query.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(req.params.query.toLowerCase())
    );
    const productsInfo = searchProducts.map((product) => ({
      ...product,
      image: `data:${
        product.image.contentType
      };base64,${product.image.data.toString("base64")}`,
    }));
    res.status(200).json({ products: productsInfo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// add to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.wishlist.push(req.params.id);
    await user.save();
    res.status(200).json({ message: "Added to wishlist" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// remove from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.wishlist = user.wishlist.filter(
      (product) => product.toString() !== req.params.id
    );
    await user.save();
    res.status(200).json({ message: "Removed from wishlist" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get wishlist
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const wishlist = user.wishlist.map((product) => ({
      ...product,
      image: `data:${
        product.image.contentType
      };base64,${product.image.data.toString("base64")}`,
    }));
    res.status(200).json({ wishlist });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// add to cart
export const addToCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.cart.push(req.params.id);
    await user.save();
    res.status(200).json({ message: "Added to cart" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// remove from cart
export const removeFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.cart = user.cart.filter(
      (product) => product.toString() !== req.params.id
    );
    await user.save();
    res.status(200).json({ message: "Removed from cart" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// clear all cart
export const clearAllCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.cart = [];
    await user.save();
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get cart
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const cart = user.cart.map((product) => ({
      ...product,
      image: `data:${
        product.image.contentType
      };base64,${product.image.data.toString("base64")}`,
    }));
    res.status(200).json({ cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create order
export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;
    const user = await userModel.findById(req.user._id);
    if (user) {
      const orderProds = [];
      for (let i = 0; i < orderItems.length; i++) {
        const prod = await productModel.findById(orderItems[i]);
        if (prod) {
          if (prod.countInStock > 0) {
            orderProds.push(prod);
            prod.countInStock = prod.countInStock - 1;
            await prod.save();
          } else {
            res.status(400).send({
              message: "Out of Stock",
            });
          }
        } else {
          res.status(400).send({
            message: "Not a Valid Product",
          });
        }
      }
      const order = new orderModel({
        user: req.user._id,
        orderItems: orderProds,
        shippingAddress,
        totalPrice,
      });
      await order.save();
      user.orders.push(order);
      await user.save();
      res.status(200).send({
        message: "order placed",
        order,
      });
    } else {
      res.status(400).send({
        message: "Not a Valid User",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// get my all orders
export const getMyAllOrders = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).populate("orders");
    if (user) {
      const userFinalOrder = await Promise.all(
        user.orders.map(async (item) => {
          const orderProducts = [];
          for (let i = 0; i < item.orderItems.length; i++) {
            const prod = await productModel.findById(item.orderItems[i]);
            if (prod) {
              orderProducts.push({
                ...prod._doc,
                image: `data:${
                  prod.image.contentType
                };base64,${prod.image.data.toString("base64")}`,
              });
            }
          }
          return {
            ...item._doc,
            orderItems: orderProducts,
          };
        })
      );
      res.status(200).send({
        message: "My orders fetched",
        order: userFinalOrder,
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
