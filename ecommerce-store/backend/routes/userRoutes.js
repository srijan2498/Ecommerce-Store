import express from 'express';
import {
  getMyProfile,
  updateMyProfile,
  addAddress,
  getAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  getProduct,
  getProductsByCategoryName,
  getSearchProducts,
  getCategories,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  addToCart,
  removeFromCart,
  getCart,
  getProductsByCategoryId,
  createOrder,
  getMyAllOrders,
  clearAllCart,
} from "../controllers/userController.js";
import { protect } from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.get('/profile', protect, getMyProfile);
userRouter.put('/profile', protect, updateMyProfile);
userRouter.post('/address', protect, addAddress);
userRouter.get('/address', protect, getAddresses);
userRouter.get('/address/:id', protect, getAddress);
userRouter.put('/address/:id', protect, updateAddress);
userRouter.delete('/address/:id', protect, deleteAddress);
userRouter.get('/product/:id', getProduct);
userRouter.get("/products-by-category/:category", getProductsByCategoryName);
userRouter.post("/products-by-category-id/:id", getProductsByCategoryId);
userRouter.get("/products/:query", getSearchProducts);
userRouter.get('/categories', getCategories);
userRouter.post('/addToWishlist/:id', protect, addToWishlist)
userRouter.delete('/removeFromWishlist/:id', protect, removeFromWishlist)
userRouter.get("/myWishlist", protect, getWishlist);
userRouter.post("/addToCart/:id", protect, addToCart);
userRouter.delete("/removeFromCart/:id", protect, removeFromCart);
userRouter.delete("/clearCart", protect, clearAllCart);
userRouter.get("/myCart", protect, getCart);
userRouter.post("/order", protect, createOrder);
userRouter.get("/myOrders", protect, getMyAllOrders);

export default userRouter;